/* ───────────────────────────────────────────────────────
 *  REELTRACE — Search & ranking engine
 *  Transparent baseline search for demo data.
 *  Separated from UI components for testability.
 * ─────────────────────────────────────────────────────── */

import { TraceMatch, MatchType } from "../domain/types";
import { DemoFilm, demoFilms } from "../domain/demo-data";

/**
 * Normalise a string for matching:
 * - lowercase, collapse whitespace, strip common punctuation
 */
export function normalise(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[""'''!?.,:;()\[\]{}—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Simple Levenshtein edit distance for typo tolerance
 */
function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );
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

/**
 * Score a single film against a query.
 * Returns 0 when there is no match.
 */
export function rankFilm(film: DemoFilm, rawQuery: string): number {
  const q = normalise(rawQuery);
  if (!q) return 0;

  const title = normalise(film.title);
  const hay = normalise(
    [film.title, ...film.genres, film.line, film.moment, ...film.clues].join(
      " "
    )
  );

  // Exact title match
  if (title === q) return 100;

  // Title contains query
  if (title.includes(q)) return 65;

  // Haystack contains exact query phrase
  if (hay.includes(q)) return 55;

  // Token overlap scoring
  const words = q.split(" ").filter((w) => w.length > 2);
  let score = 0;
  for (const w of words) {
    if (hay.includes(w)) {
      score += 10;
    } else {
      // Typo tolerance: check if any word in the haystack is close
      const hayWords = hay.split(" ");
      for (const hw of hayWords) {
        if (hw.length > 2 && editDistance(w, hw) <= 1) {
          score += 6;
          break;
        }
      }
    }
  }

  return score;
}

/**
 * Determine match type label from score
 */
function matchTypeFromScore(score: number): MatchType {
  if (score >= 55) return "exact";
  if (score >= 20) return "close";
  return "related";
}

/**
 * Search the demo catalogue by dialogue / quote query.
 * Returns normalised TraceMatch[] sorted by relevance.
 */
export function searchTrace(query: string, maxResults = 6): TraceMatch[] {
  return demoFilms
    .map((f) => {
      const score = rankFilm(f, query);
      return { film: f, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.film.title.localeCompare(b.film.title))
    .slice(0, maxResults)
    .map(({ film, score }) => ({
      id: film.id,
      film: {
        id: film.id,
        title: film.title,
        year: film.year,
        kind: film.kind,
        genres: film.genres,
        overview: film.overview,
        posterUrl: film.art,
      },
      snippet: film.line,
      matchType: matchTypeFromScore(score),
      score,
      sourceLabel: "DEMO INDEX",
      timecodeVerified: false,
      tag: film.tag,
      timecodeDisplay: film.time,
      moment: film.moment,
    }));
}

/**
 * Search the demo catalogue by scene description.
 */
export function searchScenes(
  query: string,
  filmTitle?: string,
  maxResults = 6
): TraceMatch[] {
  const combinedQuery = [filmTitle, query].filter(Boolean).join(" ");
  let results = searchTrace(combinedQuery, maxResults);

  // If no results with combined query, try just the film title
  if (results.length === 0 && filmTitle) {
    results = searchTrace(filmTitle, maxResults);
  }

  return results;
}
