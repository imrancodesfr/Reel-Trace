/* ───────────────────────────────────────────────────────
 *  REELTRACE — Domain types
 *  Keep provider details out of the UI by normalising data.
 * ─────────────────────────────────────────────────────── */

export type MediaKind = "movie" | "tv";

export type Film = {
  id: string;
  title: string;
  year?: number;
  kind: MediaKind;
  genres: string[];
  overview?: string;
  posterUrl?: string;
  backdropUrl?: string;
  runtimeMinutes?: number;
  externalIds?: Record<string, string>;
};

export type MatchType = "exact" | "close" | "related";

export type TraceMatch = {
  id: string;
  film: Film;
  snippet?: string;
  startMs?: number;
  endMs?: number;
  matchType: MatchType;
  score: number;
  sourceLabel?: string;
  sourceUrl?: string;
  timecodeVerified: boolean;
  /** demo display helpers */
  tag?: string;
  timecodeDisplay?: string;
  moment?: string;
};

export type UserFilmState = {
  watchlistIds: string[];
  watchedIds: string[];
  skippedIds: string[];
};
