/* ───────────────────────────────────────────────────────
 *  REELTRACE — Search & ranking engine (v2)
 *  Now searches the large quotes database AND can
 *  enrich results with TMDB data.
 *  
 *  This module is used SERVER-SIDE in API routes.
 * ─────────────────────────────────────────────────────── */

import { TraceMatch, Film } from "../domain/types";
import type { QuoteFilm } from "../domain/quotes-database";
import {
  findMovie,
  posterUrl,
  genreNames,
  searchMovies,
  type TmdbMovie,
} from "../providers/tmdb";

// ── Text normalisation ──

export function normalise(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[""'''`!?.,:;()\[\]{}—–\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Simple Levenshtein edit distance */
function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// ── Quote search scoring ──

interface QuoteSearchHit {
  film: QuoteFilm;
  matchedQuote: string;
  matchedScene?: string;
  matchedCharacter?: string;
  score: number;
  matchType: "exact" | "close" | "related";
}

/**
 * Score how well a query matches a single quote text.
 */
function scoreQuote(quoteNorm: string, queryNorm: string, queryWords: string[]): number {
  // Exact match
  if (quoteNorm === queryNorm) return 100;

  // Quote contains the full query phrase
  if (quoteNorm.includes(queryNorm)) return 80;

  // Query contains the full quote (user typed more than the quote)
  if (queryNorm.includes(quoteNorm) && quoteNorm.length > 5) return 70;

  // Token overlap scoring
  const quoteWords = quoteNorm.split(" ").filter((w) => w.length > 1);
  let matched = 0;
  let fuzzyMatched = 0;

  for (const qw of queryWords) {
    if (quoteWords.some((cw) => cw.includes(qw) || qw.includes(cw))) {
      matched++;
    } else if (
      qw.length > 3 &&
      quoteWords.some((cw) => cw.length > 3 && editDistance(qw, cw) <= 1)
    ) {
      fuzzyMatched++;
    }
  }

  if (queryWords.length === 0) return 0;
  const matchRatio = (matched + fuzzyMatched * 0.6) / queryWords.length;
  
  if (matchRatio >= 0.8) return 55;
  if (matchRatio >= 0.5) return 35;
  if (matchRatio >= 0.3) return 20;
  if (matched >= 1) return 12;

  return 0;
}

/**
 * Score how well a query matches a film's keywords.
 */
function scoreKeywords(keywordsNorm: string, queryNorm: string, queryWords: string[]): number {
  if (keywordsNorm.includes(queryNorm)) return 40;

  let matched = 0;
  for (const qw of queryWords) {
    if (keywordsNorm.includes(qw)) matched++;
  }

  if (queryWords.length === 0) return 0;
  const ratio = matched / queryWords.length;
  if (ratio >= 0.7) return 30;
  if (ratio >= 0.4) return 15;
  if (matched >= 1) return 8;
  return 0;
}

/**
 * Score how well a query matches a film title.
 */
function scoreTitle(titleNorm: string, queryNorm: string): number {
  if (titleNorm === queryNorm) return 90;
  if (titleNorm.includes(queryNorm)) return 60;
  if (queryNorm.includes(titleNorm)) return 50;
  return 0;
}

function matchTypeFromScore(score: number): "exact" | "close" | "related" {
  if (score >= 55) return "exact";
  if (score >= 20) return "close";
  return "related";
}

/**
 * Search the quotes database for dialogue matches.
 * Returns scored hits sorted by relevance.
 */
export function searchQuotesDatabase(
  quotesDb: QuoteFilm[],
  query: string,
  maxResults = 6
): QuoteSearchHit[] {
  const queryNorm = normalise(query);
  if (!queryNorm) return [];
  const queryWords = queryNorm.split(" ").filter((w) => w.length > 1);

  const hits: QuoteSearchHit[] = [];

  for (const film of quotesDb) {
    let bestScore = 0;
    let bestQuote = "";
    let bestScene: string | undefined;
    let bestCharacter: string | undefined;

    // Check title
    const titleScore = scoreTitle(normalise(film.title), queryNorm);
    if (titleScore > bestScore) {
      bestScore = titleScore;
      bestQuote = film.quotes[0]?.text || film.title;
    }

    // Check each quote
    for (const q of film.quotes) {
      const qScore = scoreQuote(normalise(q.text), queryNorm, queryWords);
      if (qScore > bestScore) {
        bestScore = qScore;
        bestQuote = q.text;
        bestScene = q.scene;
        bestCharacter = q.character;
      }
    }

    // Check keywords
    const kwNorm = normalise(film.keywords.join(" "));
    const kwScore = scoreKeywords(kwNorm, queryNorm, queryWords);
    if (kwScore > bestScore) {
      bestScore = kwScore;
      bestQuote = film.quotes[0]?.text || film.title;
    }

    if (bestScore > 0) {
      hits.push({
        film,
        matchedQuote: bestQuote,
        matchedScene: bestScene,
        matchedCharacter: bestCharacter,
        score: bestScore,
        matchType: matchTypeFromScore(bestScore),
      });
    }
  }

  return hits
    .sort((a, b) => b.score - a.score || a.film.title.localeCompare(b.film.title))
    .slice(0, maxResults);
}

// ── TMDB enrichment ──

/**
 * Convert a TMDB movie to our Film type
 */
export function tmdbToFilm(movie: TmdbMovie): Film {
  return {
    id: `tmdb-${movie.id}`,
    title: movie.title,
    year: movie.release_date ? parseInt(movie.release_date.substring(0, 4)) : undefined,
    kind: "movie",
    genres: genreNames(movie.genre_ids),
    overview: movie.overview,
    posterUrl: posterUrl(movie.poster_path),
    backdropUrl: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
      : undefined,
  };
}

/**
 * Enrich a quote hit with TMDB data (poster, overview, etc.)
 * Falls back to local data if TMDB lookup fails.
 */
export async function enrichWithTmdb(hit: QuoteSearchHit): Promise<TraceMatch> {
  let film: Film = {
    id: normalise(hit.film.title).replace(/\s+/g, "-"),
    title: hit.film.title,
    year: hit.film.year,
    kind: hit.film.kind,
    genres: hit.film.genres,
  };

  try {
    const tmdbResult = await findMovie(hit.film.title, hit.film.year);
    if (tmdbResult) {
      film = {
        ...film,
        id: `tmdb-${tmdbResult.id}`,
        overview: tmdbResult.overview,
        posterUrl: posterUrl(tmdbResult.poster_path),
        backdropUrl: tmdbResult.backdrop_path
          ? `https://image.tmdb.org/t/p/w780${tmdbResult.backdrop_path}`
          : undefined,
        genres:
          genreNames(tmdbResult.genre_ids).length > 0
            ? genreNames(tmdbResult.genre_ids)
            : hit.film.genres,
      };
    }
  } catch (e) {
    console.error(`TMDB lookup failed for "${hit.film.title}":`, e);
    // Continue with local data
  }

  return {
    id: film.id,
    film,
    snippet: hit.matchedQuote,
    matchType: hit.matchType,
    score: hit.score,
    sourceLabel: "REELTRACE INDEX",
    timecodeVerified: false,
    tag: hit.film.genres[0]?.toUpperCase() || "FILM",
    timecodeDisplay: hit.film.quotes.find(
      (q) => q.text === hit.matchedQuote
    )?.approximateTime,
    moment: hit.matchedScene || hit.matchedCharacter,
  };
}

/**
 * Full search pipeline: search quotes DB, then enrich top results with TMDB.
 */
export async function searchTraceWithTmdb(
  quotesDb: QuoteFilm[],
  query: string,
  maxResults = 6
): Promise<TraceMatch[]> {
  const hits = searchQuotesDatabase(quotesDb, query, maxResults);

  // Also try TMDB title search as a fallback for queries that might be movie titles
  let tmdbFallbacks: TraceMatch[] = [];
  if (hits.length < 3) {
    try {
      const tmdbResults = await searchMovies(query);
      tmdbFallbacks = tmdbResults.slice(0, 3 - hits.length).map((m) => ({
        id: `tmdb-${m.id}`,
        film: tmdbToFilm(m),
        snippet: m.overview?.substring(0, 120) || "",
        matchType: "related" as const,
        score: 5,
        sourceLabel: "TMDB SEARCH",
        timecodeVerified: false,
        tag: genreNames(m.genre_ids)[0]?.toUpperCase() || "FILM",
      }));
    } catch {
      // TMDB fallback failed — continue without it
    }
  }

  // Enrich quote hits with TMDB data (posters, overview)
  const enriched = await Promise.all(hits.map(enrichWithTmdb));

  // Combine: quote DB results first, then TMDB fallbacks
  const combined = [...enriched, ...tmdbFallbacks];
  // Deduplicate by title
  const seen = new Set<string>();
  return combined.filter((r) => {
    const key = normalise(r.film.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Scene search: combines quote DB search with TMDB movie lookup.
 */
export async function searchScenesWithTmdb(
  quotesDb: QuoteFilm[],
  query: string,
  filmTitle?: string,
  maxResults = 6
): Promise<TraceMatch[]> {
  const combinedQuery = [filmTitle, query].filter(Boolean).join(" ");
  let results = await searchTraceWithTmdb(quotesDb, combinedQuery, maxResults);

  if (results.length === 0 && filmTitle) {
    results = await searchTraceWithTmdb(quotesDb, filmTitle, maxResults);
  }

  return results;
}
