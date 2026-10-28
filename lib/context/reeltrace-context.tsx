/* ───────────────────────────────────────────────────────
 *  REELTRACE — Global state context
 *  Manages watchlist, watched, and skipped state.
 *  Provides hooks for all components.
 * ─────────────────────────────────────────────────────── */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { UserFilmState, Film, SavedFilmItem } from "@/lib/domain/types";
import { loadFilmState, saveFilmState } from "@/lib/storage/local-storage";
import { demoFilms } from "@/lib/domain/demo-data";

interface ReeltraceContextValue {
  state: UserFilmState;
  savedCount: number;
  isSaved: (id: string) => boolean;
  isWatched: (id: string) => boolean;
  toggleSave: (id: string, filmData?: Film) => void;
  markWatched: (id: string) => void;
  clearWatchlist: () => void;
  clearWatched: () => void;
  getSavedFilms: () => SavedFilmItem[];
  toast: (message: string) => void;
  toastMessage: string | null;
  exportKeepPile: () => void;
}

const ReeltraceContext = createContext<ReeltraceContextValue | null>(null);

export function useReeltrace(): ReeltraceContextValue {
  const ctx = useContext(ReeltraceContext);
  if (!ctx)
    throw new Error("useReeltrace must be used within ReeltraceProvider");
  return ctx;
}

export function ReeltraceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserFilmState>({
    watchlistIds: [],
    watchedIds: [],
    skippedIds: [],
    savedFilmsMap: {},
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    setState(loadFilmState());
    setMounted(true);
  }, []);

  // Persist state changes
  useEffect(() => {
    if (mounted) {
      saveFilmState(state);
    }
  }, [state, mounted]);

  const toast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2100);
  }, []);

  const isSaved = useCallback(
    (id: string) => state.watchlistIds.includes(id),
    [state.watchlistIds]
  );

  const isWatched = useCallback(
    (id: string) => state.watchedIds.includes(id),
    [state.watchedIds]
  );

  const toggleSave = useCallback(
    (id: string, filmData?: Film) => {
      setState((prev) => {
        const alreadySaved = prev.watchlistIds.includes(id);
        const newWatchlist = alreadySaved
          ? prev.watchlistIds.filter((x) => x !== id)
          : [...prev.watchlistIds, id];

        const updatedMap = { ...(prev.savedFilmsMap || {}) };

        if (!alreadySaved && filmData) {
          updatedMap[id] = {
            id: filmData.id,
            title: filmData.title,
            year: filmData.year,
            genres: filmData.genres || [],
            posterUrl: filmData.posterUrl,
            tag: filmData.genres?.[0]?.toUpperCase() || "SAVED",
          };
        } else if (!alreadySaved && !updatedMap[id]) {
          const fallback = demoFilms.find((f) => f.id === id);
          if (fallback) {
            updatedMap[id] = {
              id: fallback.id,
              title: fallback.title,
              year: fallback.year,
              genres: fallback.genres,
              posterUrl: fallback.art,
              tag: fallback.tag,
            };
          }
        }

        return {
          ...prev,
          watchlistIds: newWatchlist,
          savedFilmsMap: updatedMap,
        };
      });

      toast(
        state.watchlistIds.includes(id)
          ? "Removed from your keep pile."
          : "Pinned to your keep pile."
      );
    },
    [state.watchlistIds, toast]
  );

  const markWatched = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        watchedIds: prev.watchedIds.includes(id)
          ? prev.watchedIds
          : [...prev.watchedIds, id],
        watchlistIds: prev.watchlistIds.filter((x) => x !== id),
      }));
      toast("Marked as watched.");
    },
    [toast]
  );

  const clearWatchlist = useCallback(() => {
    if (state.watchlistIds.length === 0) {
      toast("Your shelf is already empty.");
      return;
    }
    setState((prev) => ({ ...prev, watchlistIds: [] }));
    toast("Shelf cleared.");
  }, [state.watchlistIds.length, toast]);

  const clearWatched = useCallback(() => {
    setState((prev) => ({ ...prev, watchedIds: [] }));
    toast("Watched list reset.");
  }, [toast]);

  const getSavedFilms = useCallback((): SavedFilmItem[] => {
    const map = state.savedFilmsMap || {};
    return state.watchlistIds
      .map((id) => {
        if (map[id]) return map[id];
        const demo = demoFilms.find((f) => f.id === id);
        if (demo) {
          return {
            id: demo.id,
            title: demo.title,
            year: demo.year,
            genres: demo.genres,
            posterUrl: demo.art,
            tag: demo.tag,
          };
        }
        return {
          id,
          title: id.replace(/^tmdb-/, "").replace(/-/g, " "),
          genres: ["FILM"],
          tag: "SAVED",
        };
      })
      .filter((f): f is SavedFilmItem => !!f);
  }, [state.watchlistIds, state.savedFilmsMap]);

  const exportKeepPile = useCallback(() => {
    const films = getSavedFilms();
    if (films.length === 0) {
      toast("Save a film first, then export your list.");
      return;
    }
    const text = films
      .map((f) => `${f.title} (${f.year || "—"}) — ${f.genres.join(", ")}`)
      .join("\n");
    const blob = new Blob([`REELTRACE — MY KEEP PILE\n\n${text}\n`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reeltrace-keep-pile.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast("Your list is ready.");
  }, [getSavedFilms, toast]);

  const savedCount = state.watchlistIds.length;

  return (
    <ReeltraceContext.Provider
      value={{
        state,
        savedCount,
        isSaved,
        isWatched,
        toggleSave,
        markWatched,
        clearWatchlist,
        clearWatched,
        getSavedFilms,
        toast,
        toastMessage,
        exportKeepPile,
      }}
    >
      {children}
    </ReeltraceContext.Provider>
  );
}
