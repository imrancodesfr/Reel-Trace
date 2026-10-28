/* ───────────────────────────────────────────────────────
 *  REELTRACE — Roulette / random picker logic (v2)
 *  Can use both local quotes DB and TMDB for picks.
 * ─────────────────────────────────────────────────────── */

import { Film } from "../domain/types";
import type { QuoteFilm } from "../domain/quotes-database";
import {
  getPopularMovies,
  genreIdFromName,
  posterUrl,
  genreNames,
  type TmdbMovie,
} from "../providers/tmdb";

export interface RouletteResult {
  film: Film | null;
  snippet?: string;
  moment?: string;
  tag?: string;
  message?: string;
  isEmpty: boolean;
}

function tmdbToFilm(m: TmdbMovie): Film {
  return {
    id: `tmdb-${m.id}`,
    title: m.title,
    year: m.release_date ? parseInt(m.release_date.substring(0, 4)) : undefined,
    kind: "movie",
    genres: genreNames(m.genre_ids),
    overview: m.overview,
    posterUrl: posterUrl(m.poster_path),
    backdropUrl: m.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}`
      : undefined,
  };
}

/**
 * Pick a random film from the quotes database (offline/fast path).
 */
export function pickFromQuotesDb(
  quotesDb: QuoteFilm[],
  genre: string,
  watchedIds: string[],
  lastPickId: string | null
): RouletteResult {
  let candidates = quotesDb.filter(
    (f) => genre === "All" || f.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
  );

  // Exclude watched
  const watchedTitles = new Set(watchedIds.map((id) => id.toLowerCase()));
  candidates = candidates.filter(
    (f) => !watchedTitles.has(f.title.toLowerCase()) && !watchedTitles.has(`tmdb-${f.tmdbId}`)
  );

  if (candidates.length === 0) {
    return {
      film: null,
      isEmpty: true,
      message:
        genre === "All"
          ? "No unwatched films remain in this catalogue."
          : `No unwatched "${genre}" films remain. Try a different mood.`,
    };
  }

  // Avoid last pick
  let pool = candidates.filter(
    (f) =>
      f.title.toLowerCase().replace(/\s+/g, "-") !== lastPickId &&
      `tmdb-${f.tmdbId}` !== lastPickId
  );
  if (pool.length === 0) pool = candidates;

  const pick = pool[Math.floor(Math.random() * pool.length)];

  return {
    film: {
      id: pick.tmdbId ? `tmdb-${pick.tmdbId}` : pick.title.toLowerCase().replace(/\s+/g, "-"),
      title: pick.title,
      year: pick.year,
      kind: pick.kind,
      genres: pick.genres,
    },
    snippet: pick.quotes[0]?.text,
    moment: pick.quotes[0]?.scene,
    tag: pick.genres[0]?.toUpperCase() || "FILM",
    isEmpty: false,
  };
}

/**
 * Pick a random film using TMDB popular movies.
 * Falls back to quotes DB if TMDB fails.
 */
export async function pickRandomWithTmdb(
  quotesDb: QuoteFilm[],
  genre: string,
  watchedIds: string[],
  lastPickId: string | null
): Promise<RouletteResult> {
  try {
    const genreId = genre !== "All" ? genreIdFromName(genre) : undefined;
    const page = Math.floor(Math.random() * 5) + 1; // Random page 1-5
    const movies = await getPopularMovies(page, genreId);

    // Filter out watched
    const watchedSet = new Set(watchedIds);
    let candidates = movies.filter(
      (m) => !watchedSet.has(`tmdb-${m.id}`) && `tmdb-${m.id}` !== lastPickId
    );

    if (candidates.length === 0) candidates = movies;

    if (candidates.length > 0) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      const film = tmdbToFilm(pick);

      // Try to find a quote from our database for this movie
      const quotesMatch = quotesDb.find(
        (q) => q.title.toLowerCase() === pick.title.toLowerCase()
      );

      return {
        film,
        snippet: quotesMatch?.quotes[0]?.text || pick.overview?.substring(0, 120),
        moment: quotesMatch?.quotes[0]?.scene,
        tag: film.genres[0]?.toUpperCase() || "FILM",
        isEmpty: false,
      };
    }
  } catch (e) {
    console.error("TMDB roulette failed, falling back to local:", e);
  }

  // Fallback to local quotes DB
  return pickFromQuotesDb(quotesDb, genre, watchedIds, lastPickId);
}
