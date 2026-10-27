/* ───────────────────────────────────────────────────────
 *  REELTRACE — Roulette / random picker logic
 *  Implements selection rules: no repeats, watched
 *  exclusion, genre filtering, and empty-state handling.
 * ─────────────────────────────────────────────────────── */

import { DemoFilm, demoFilms } from "../domain/demo-data";

export interface RouletteResult {
  film: DemoFilm | null;
  message?: string;
  isEmpty: boolean;
}

/**
 * Pick a random film respecting all selection rules.
 *
 * @param genre     - Genre filter (or "All" for any)
 * @param watchedIds - IDs the user has already watched
 * @param lastPickId - The most recent pick to avoid immediate repeats
 * @param skippedIds - Session-skipped IDs (optional)
 */
export function pickRandom(
  genre: string,
  watchedIds: string[],
  lastPickId: string | null,
  skippedIds: string[] = []
): RouletteResult {
  // Filter by genre
  let candidates = demoFilms.filter(
    (f) => genre === "All" || f.genres.includes(genre)
  );

  // Exclude watched
  candidates = candidates.filter((f) => !watchedIds.includes(f.id));

  if (candidates.length === 0) {
    return {
      film: null,
      isEmpty: true,
      message:
        genre === "All"
          ? "You've watched every film in this demo catalogue. Clear your watched list or try a broader filter."
          : `No unwatched "${genre}" films remain. Try a different mood or reset your watched list.`,
    };
  }

  // Try to avoid last pick and session skips
  let pool = candidates.filter(
    (f) => f.id !== lastPickId && !skippedIds.includes(f.id)
  );
  if (pool.length === 0) {
    // Fall back: allow last pick and skipped, but still exclude watched
    pool = candidates;
  }

  const pick = pool[Math.floor(Math.random() * pool.length)];

  return { film: pick, isEmpty: false };
}

/**
 * Get unique genre options for the roulette selector.
 */
export function getRouletteGenres(): string[] {
  const genres = new Set<string>();
  demoFilms.forEach((f) => f.genres.forEach((g) => genres.add(g)));
  return Array.from(genres).sort();
}
