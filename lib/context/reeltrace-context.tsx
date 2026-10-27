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
import { UserFilmState } from "@/lib/domain/types";
import { loadFilmState, saveFilmState } from "@/lib/storage/local-storage";
import { demoFilms, DemoFilm } from "@/lib/domain/demo-data";

interface ReeltraceContextValue {
  state: UserFilmState;
  savedCount: number;
  isSaved: (id: string) => boolean;
  isWatched: (id: string) => boolean;
  toggleSave: (id: string) => void;
  markWatched: (id: string) => void;
  clearWatchlist: () => void;
  clearWatched: () => void;
  getSavedFilms: () => DemoFilm[];
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
    (id: string) => {
      setState((prev) => {
        const alreadySaved = prev.watchlistIds.includes(id);
        const next = {
          ...prev,
          watchlistIds: alreadySaved
            ? prev.watchlistIds.filter((x) => x !== id)
            : [...prev.watchlistIds, id],
        };
        return next;
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
        // Remove from watchlist when marked watched
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

  const getSavedFilms = useCallback((): DemoFilm[] => {
    return state.watchlistIds
      .map((id) => demoFilms.find((f) => f.id === id))
      .filter((f): f is DemoFilm => !!f);
  }, [state.watchlistIds]);

  const exportKeepPile = useCallback(() => {
    const films = getSavedFilms();
    if (films.length === 0) {
      toast("Save a film first, then export your list.");
      return;
    }
    const text = films
      .map((f) => `${f.title} (${f.year}) — ${f.genres.join(", ")}`)
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
