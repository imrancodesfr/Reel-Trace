/* ───────────────────────────────────────────────────────
 *  REELTRACE — localStorage persistence
 *  Validates persisted JSON before using it.
 *  Handles unavailable storage gracefully.
 * ─────────────────────────────────────────────────────── */

import { UserFilmState, SavedFilmItem } from "../domain/types";

const STORAGE_KEY = "reeltrace-state";

const defaultState: UserFilmState = {
  watchlistIds: [],
  watchedIds: [],
  skippedIds: [],
  savedFilmsMap: {},
};

function isStorageAvailable(): boolean {
  try {
    const test = "__reeltrace_test__";
    localStorage.setItem(test, "1");
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function validateState(data: unknown): UserFilmState {
  if (!data || typeof data !== "object") return { ...defaultState };
  const d = data as Record<string, unknown>;
  const savedMap: Record<string, SavedFilmItem> = {};

  if (d.savedFilmsMap && typeof d.savedFilmsMap === "object") {
    const mapObj = d.savedFilmsMap as Record<string, unknown>;
    for (const [k, v] of Object.entries(mapObj)) {
      if (v && typeof v === "object") {
        const item = v as Record<string, unknown>;
        savedMap[k] = {
          id: String(item.id || k),
          title: String(item.title || ""),
          year: typeof item.year === "number" ? item.year : undefined,
          genres: Array.isArray(item.genres) ? item.genres.map(String) : [],
          posterUrl: typeof item.posterUrl === "string" ? item.posterUrl : undefined,
          tag: typeof item.tag === "string" ? item.tag : undefined,
        };
      }
    }
  }

  return {
    watchlistIds: Array.isArray(d.watchlistIds)
      ? d.watchlistIds.filter((x): x is string => typeof x === "string")
      : [],
    watchedIds: Array.isArray(d.watchedIds)
      ? d.watchedIds.filter((x): x is string => typeof x === "string")
      : [],
    skippedIds: Array.isArray(d.skippedIds)
      ? d.skippedIds.filter((x): x is string => typeof x === "string")
      : [],
    savedFilmsMap: savedMap,
  };
}

export function loadFilmState(): UserFilmState {
  if (!isStorageAvailable()) return { ...defaultState };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return validateState(parsed);
  } catch {
    return { ...defaultState };
  }
}

export function saveFilmState(state: UserFilmState): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked — fail silently
  }
}

export function clearFilmState(): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fail silently
  }
}
