"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { searchTrace, searchScenes } from "@/lib/search/engine";
import { pickRandom, getRouletteGenres } from "@/lib/search/roulette";
import { TraceMatch } from "@/lib/domain/types";
import { DemoFilm } from "@/lib/domain/demo-data";
import { useReeltrace } from "@/lib/context/reeltrace-context";
import ResultCard from "@/components/film/ResultCard";
import RoulettePickCard from "@/components/film/RoulettePickCard";

type FinderMode = "quote" | "scene" | "roulette";

export default function FinderSection() {
  const [activeMode, setActiveMode] = useState<FinderMode>("quote");
  const [results, setResults] = useState<TraceMatch[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [resultTitle, setResultTitle] = useState("Recovered fragments");
  const [resultNotice, setResultNotice] = useState("");
  const [resultMode, setResultMode] = useState<"quote" | "scene">("quote");

  // Roulette state
  const [roulettePick, setRoulettePick] = useState<DemoFilm | null>(null);
  const [rouletteMessage, setRouletteMessage] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [lastPickId, setLastPickId] = useState<string | null>(null);
  const [sessionSkipped, setSessionSkipped] = useState<string[]>([]);
  const [spinRotation, setSpinRotation] = useState(0);

  // Form refs
  const quoteInputRef = useRef<HTMLInputElement>(null);
  const sceneMovieRef = useRef<HTMLInputElement>(null);
  const sceneClueRef = useRef<HTMLInputElement>(null);

  const { state, toggleSave, markWatched, isSaved, toast } = useReeltrace();

  const genres = getRouletteGenres();

  // Listen for mode switch events from nav/cards
  useEffect(() => {
    const handler = (e: Event) => {
      const mode = (e as CustomEvent).detail as FinderMode;
      setActiveMode(mode);
      setShowResults(false);
      setRoulettePick(null);
      setRouletteMessage(null);
    };
    window.addEventListener("reeltrace:switchMode", handler);
    return () => window.removeEventListener("reeltrace:switchMode", handler);
  }, []);

  const switchMode = useCallback((mode: FinderMode) => {
    setActiveMode(mode);
    setShowResults(false);
    setRoulettePick(null);
    setRouletteMessage(null);
  }, []);

  // ── Quote search ──
  const handleQuoteSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = quoteInputRef.current?.value.trim() || "";
      if (!q) {
        toast("Drop in a few words first.");
        return;
      }
      const found = searchTrace(q);
      setResults(found);
      setResultTitle("Fragments that sound familiar");
      setResultMode("quote");
      setResultNotice(
        "DEMO INDEX · SAMPLE RESULTS ONLY · TIMESTAMPS ARE ILLUSTRATIVE · NO LIVE SUBTITLE DATABASE CONNECTED"
      );
      setShowResults(true);
      setRoulettePick(null);
    },
    [toast]
  );

  const handleChipClick = useCallback(
    (query: string) => {
      if (quoteInputRef.current) {
        quoteInputRef.current.value = query;
      }
      switchMode("quote");
      // Submit after mode switch
      setTimeout(() => {
        const found = searchTrace(query);
        setResults(found);
        setResultTitle("Fragments that sound familiar");
        setResultMode("quote");
        setResultNotice(
          "DEMO INDEX · SAMPLE RESULTS ONLY · TIMESTAMPS ARE ILLUSTRATIVE · NO LIVE SUBTITLE DATABASE CONNECTED"
        );
        setShowResults(true);
        setRoulettePick(null);
      }, 50);
    },
    [switchMode]
  );

  // ── Scene search ──
  const handleSceneSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const movie = sceneMovieRef.current?.value.trim() || "";
      const clue = sceneClueRef.current?.value.trim() || "";
      const query = [movie, clue].filter(Boolean).join(" ") || "scene";
      const found = searchScenes(clue || query, movie || undefined);
      setResults(found);
      setResultTitle("Scene coordinates recovered");
      setResultMode("scene");
      setResultNotice(
        "DEMO INDEX · SAMPLE RESULTS ONLY · TIMESTAMPS ARE ILLUSTRATIVE · NO LIVE SUBTITLE DATABASE CONNECTED"
      );
      setShowResults(true);
      setRoulettePick(null);
    },
    []
  );

  const handleSceneChipClick = useCallback(
    (movieTitle: string, clue: string) => {
      if (sceneMovieRef.current) sceneMovieRef.current.value = movieTitle;
      if (sceneClueRef.current) sceneClueRef.current.value = clue;
      switchMode("scene");
      setTimeout(() => {
        const found = searchScenes(clue, movieTitle);
        setResults(found);
        setResultTitle("Scene coordinates recovered");
        setResultMode("scene");
        setResultNotice(
          "DEMO INDEX · SAMPLE RESULTS ONLY · TIMESTAMPS ARE ILLUSTRATIVE · NO LIVE SUBTITLE DATABASE CONNECTED"
        );
        setShowResults(true);
        setRoulettePick(null);
      }, 50);
    },
    [switchMode]
  );

  // ── Roulette ──
  const roll = useCallback(() => {
    const result = pickRandom(
      selectedGenre,
      state.watchedIds,
      lastPickId,
      sessionSkipped
    );

    if (result.isEmpty) {
      toast(result.message || "No eligible films remaining.");
      setRouletteMessage(result.message || null);
      return;
    }

    setSpinning(true);
    setSpinRotation((prev) => prev + 810);
    setShowResults(false);

    setTimeout(() => {
      setSpinning(false);
      if (result.film) {
        setRoulettePick(result.film);
        setLastPickId(result.film.id);
        setShowResults(true);
        setResultNotice(
          "DEMO RECOMMENDATION · SAMPLE CATALOGUE ONLY · WATCHED PICKS ARE STORED ON THIS DEVICE"
        );
      }
    }, 680);
  }, [selectedGenre, state.watchedIds, lastPickId, sessionSkipped, toast]);

  const handleWatched = useCallback(() => {
    if (roulettePick) {
      markWatched(roulettePick.id);
      toast("Marked as watched. On to the next.");
      roll();
    }
  }, [roulettePick, markWatched, toast, roll]);

  const handleSkip = useCallback(() => {
    if (roulettePick) {
      setSessionSkipped((prev) => [...prev, roulettePick.id]);
    }
    roll();
  }, [roulettePick, roll]);

  return (
    <section className="finder-section shell" id="finder">
      <div className="section-top">
        <div>
          <div className="mono dim">THE SEARCH ROOM / 01—03</div>
          <h2>
            Start with what
            <br />
            you <em>remember.</em>
          </h2>
        </div>
        <div className="section-aside">
          You don&apos;t need the title. You don&apos;t need to be sure. A
          fragment is enough to start.
        </div>
      </div>

      <div className="finder">
        <aside className="finder-sidebar">
          <div className="mono">CHOOSE YOUR CLUE</div>
          <button
            className={`mode-tab ${activeMode === "quote" ? "active" : ""}`}
            onClick={() => switchMode("quote")}
          >
            <span className="num">01</span>
            <strong>Find a line</strong>
            <span className="tab-arrow">↗</span>
          </button>
          <button
            className={`mode-tab ${activeMode === "scene" ? "active" : ""}`}
            onClick={() => switchMode("scene")}
          >
            <span className="num">02</span>
            <strong>Find a scene</strong>
            <span className="tab-arrow">↗</span>
          </button>
          <button
            className={`mode-tab ${activeMode === "roulette" ? "active" : ""}`}
            onClick={() => switchMode("roulette")}
          >
            <span className="num">03</span>
            <strong>Spin the shelf</strong>
            <span className="tab-arrow">↗</span>
          </button>
          <div className="bottom-label">
            NO SPOILERS. JUST CLUES.
            <br />
            THE INDEX IS ONLY A DEMO FOR NOW.
          </div>
        </aside>

        <div className="finder-main">
          {/* ── Mode: Quote ── */}
          <div
            className={`mode-content ${activeMode === "quote" ? "active" : ""}`}
            id="mode-quote"
          >
            <h3 className="mode-heading">
              I remember <em>what they said…</em>
            </h3>
            <p className="mode-description">
              Type the line, a few words, or even the bit you might have got
              wrong.
            </p>
            <form onSubmit={handleQuoteSearch}>
              <label className="field-label" htmlFor="quoteInput">
                THE LINE IN YOUR HEAD
              </label>
              <div className="search-line">
                <input
                  id="quoteInput"
                  ref={quoteInputRef}
                  autoComplete="off"
                  placeholder={`"why so serious?"`}
                />
                <button
                  className="search-go"
                  type="submit"
                  aria-label="Search lines"
                >
                  ↗
                </button>
              </div>
            </form>
            <div className="helper-chips">
              <button
                className="chip"
                onClick={() => handleChipClick("why so serious")}
              >
                why so serious?
              </button>
              <button
                className="chip"
                onClick={() => handleChipClick("there is no spoon")}
              >
                there is no spoon
              </button>
              <button
                className="chip"
                onClick={() => handleChipClick("i'll be back")}
              >
                i&apos;ll be back
              </button>
            </div>
          </div>

          {/* ── Mode: Scene ── */}
          <div
            className={`mode-content ${activeMode === "scene" ? "active" : ""}`}
            id="mode-scene"
          >
            <h3 className="mode-heading">
              Pinpoint the <em>moment.</em>
            </h3>
            <p className="mode-description">
              Give us the movie, a line, a location, or just the kind of scene
              you remember.
            </p>
            <form onSubmit={handleSceneSearch}>
              <div className="scene-fields">
                <div>
                  <label className="field-label" htmlFor="sceneMovie">
                    FILM / SERIES (IF KNOWN)
                  </label>
                  <input
                    id="sceneMovie"
                    ref={sceneMovieRef}
                    placeholder="e.g. The Matrix"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="sceneClue">
                    WHAT HAPPENS?
                  </label>
                  <input
                    id="sceneClue"
                    ref={sceneClueRef}
                    placeholder="e.g. the spoon scene"
                    autoComplete="off"
                  />
                </div>
              </div>
              <button className="solid-action scene-submit" type="submit">
                Locate this scene ↗
              </button>
            </form>
            <div className="helper-chips">
              <button
                className="chip"
                onClick={() =>
                  handleSceneChipClick("The Matrix", "the spoon scene")
                }
              >
                the spoon scene
              </button>
              <button
                className="chip"
                onClick={() =>
                  handleSceneChipClick(
                    "The Dark Knight",
                    "the interrogation room"
                  )
                }
              >
                the interrogation room
              </button>
              <button
                className="chip"
                onClick={() =>
                  handleSceneChipClick("Casablanca", "the airport ending")
                }
              >
                the airport ending
              </button>
            </div>
          </div>

          {/* ── Mode: Roulette ── */}
          <div
            className={`mode-content ${activeMode === "roulette" ? "active" : ""}`}
            id="mode-roulette"
          >
            <div className="roulette-layout">
              <div>
                <h3 className="mode-heading">
                  No clue? <em>Trust the cut.</em>
                </h3>
                <p className="mode-description">
                  Give the algorithm absolutely no context. Let the next film
                  find you.
                </p>
                <div className="roulette-controls">
                  <div className="genre-wrap">
                    <label className="field-label" htmlFor="genreSelect">
                      TONIGHT&apos;S MOOD
                    </label>
                    <select
                      id="genreSelect"
                      className="genre-select"
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                      <option value="All">Surprise me with anything</option>
                      {genres.map((g) => (
                        <option key={g} value={g}>
                          {genreMoodLabel(g)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="solid-action"
                    onClick={roll}
                    disabled={spinning}
                    type="button"
                  >
                    Roll the reel ↗
                  </button>
                </div>
              </div>
              <div
                className={`wheel`}
                aria-label="Animated movie selector"
                style={{
                  transform: `rotate(${spinRotation}deg)`,
                  transition: spinning
                    ? "transform 1s cubic-bezier(.15,.8,.1,1)"
                    : "none",
                }}
              ></div>
            </div>
          </div>

          {/* ── Results area ── */}
          <div
            id="results"
            className={`results ${showResults ? "show" : ""}`}
            aria-live="polite"
          >
            {roulettePick ? (
              <>
                <div className="result-head">
                  <h3>The reel chose for you</h3>
                  <span className="mono">01 MATCH</span>
                </div>
                <div className="result-grid">
                  <RoulettePickCard
                    film={roulettePick}
                    isSaved={isSaved(roulettePick.id)}
                    onSave={() => toggleSave(roulettePick.id)}
                    onWatched={handleWatched}
                    onNext={handleSkip}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="result-head">
                  <h3>{resultTitle}</h3>
                  <span className="mono">
                    {String(results.length).padStart(2, "0")} MATCH
                    {results.length === 1 ? "" : "ES"}
                  </span>
                </div>
                <div className="result-grid">
                  {results.length > 0 ? (
                    results.map((r) => (
                      <ResultCard
                        key={r.id}
                        match={r}
                        mode={resultMode}
                        isSaved={isSaved(r.id)}
                        onSave={() => toggleSave(r.id)}
                      />
                    ))
                  ) : (
                    <div
                      className="result-card"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <div className="result-copy">
                        <div className="mono">NO MATCH IN THIS TINY SAMPLE</div>
                        <h4>That clue isn&apos;t indexed here yet.</h4>
                        <p>
                          Try fewer words, a character name, or use Spin the
                          Shelf. A real version would need a licensed subtitle
                          index and movie metadata source.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="notice">{resultNotice}</div>

            {rouletteMessage && !roulettePick && (
              <div className="notice" style={{ color: "var(--orange)" }}>
                {rouletteMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Map genre names to friendly mood labels for the roulette selector */
function genreMoodLabel(genre: string): string {
  const map: Record<string, string> = {
    Action: "Turn it up / action",
    Adventure: "Take me somewhere / adventure",
    Comedy: "I need a laugh / comedy",
    Crime: "Something shady / crime",
    Drama: "Feel something / drama",
    Mystery: "Make me think / mystery",
    Romance: "A love story / romance",
    "Sci-Fi": "Somewhere else / sci-fi",
    Thriller: "Keep me guessing / thriller",
  };
  return map[genre] || genre;
}
