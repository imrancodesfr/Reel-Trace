"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TraceMatch, Film } from "@/lib/domain/types";
import { useReeltrace } from "@/lib/context/reeltrace-context";
import ResultCard from "@/components/film/ResultCard";
import RoulettePickCard, { RouletteFilmData } from "@/components/film/RoulettePickCard";

type FinderMode = "quote" | "scene" | "roulette";

export default function FinderSection() {
  const [activeMode, setActiveMode] = useState<FinderMode>("quote");
  const [results, setResults] = useState<TraceMatch[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultTitle, setResultTitle] = useState("Recovered fragments");
  const [resultNotice, setResultNotice] = useState("");
  const [resultMode, setResultMode] = useState<"quote" | "scene">("quote");

  // Roulette state
  const [roulettePick, setRoulettePick] = useState<RouletteFilmData | null>(null);
  const [rouletteMessage, setRouletteMessage] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [lastPickId, setLastPickId] = useState<string | null>(null);
  const [spinRotation, setSpinRotation] = useState(0);

  // Form refs
  const quoteInputRef = useRef<HTMLInputElement>(null);
  const sceneMovieRef = useRef<HTMLInputElement>(null);
  const sceneClueRef = useRef<HTMLInputElement>(null);

  const { state, toggleSave, markWatched, isSaved, toast } = useReeltrace();

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];

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

  // ── Quote search via backend API ──
  const executeQuoteSearch = useCallback(
    async (query: string) => {
      const q = query.trim();
      if (!q) {
        toast("Drop in a few words first.");
        return;
      }
      setLoading(true);
      setShowResults(true);
      setResultTitle("Searching memory index...");
      setResultNotice("Scanning dialogue archives & cinema database...");
      setRoulettePick(null);

      try {
        const res = await fetch(`/api/trace?q=${encodeURIComponent(q)}&limit=6`);
        if (!res.ok) throw new Error("Search request failed");
        const data = await res.json();
        const matches: TraceMatch[] = data.matches || [];

        setResults(matches);
        setResultTitle(
          matches.length > 0 ? "Fragments that sound familiar" : "No exact trace found"
        );
        setResultMode("quote");
        setResultNotice(
          data.source === "REELTRACE_INDEX"
            ? "REELTRACE DIALOGUE INDEX · POWERED BY TMDB & VERIFIED CINEMA ARCHIVES"
            : "SAMPLE INDEX · DEMO SEARCH"
        );
      } catch (err) {
        console.error("Quote search error:", err);
        toast("Unable to complete search. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const handleQuoteSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = quoteInputRef.current?.value || "";
      executeQuoteSearch(q);
    },
    [executeQuoteSearch]
  );

  const handleChipClick = useCallback(
    (query: string) => {
      if (quoteInputRef.current) {
        quoteInputRef.current.value = query;
      }
      switchMode("quote");
      executeQuoteSearch(query);
    },
    [switchMode, executeQuoteSearch]
  );

  // ── Scene search via backend API ──
  const executeSceneSearch = useCallback(
    async (movie: string, clue: string) => {
      const q = clue.trim();
      const m = movie.trim();
      if (!q && !m) {
        toast("Enter a film title or describe what happened.");
        return;
      }
      setLoading(true);
      setShowResults(true);
      setResultTitle("Pinpointing scene coordinates...");
      setResultNotice("Reconstructing scene from remembered fragments...");
      setRoulettePick(null);

      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (m) params.set("movie", m);
        params.set("limit", "6");

        const res = await fetch(`/api/scenes?${params.toString()}`);
        if (!res.ok) throw new Error("Scene search failed");
        const data = await res.json();
        const matches: TraceMatch[] = data.matches || [];

        setResults(matches);
        setResultTitle(
          matches.length > 0 ? "Scene coordinates recovered" : "Scene not located"
        );
        setResultMode("scene");
        setResultNotice(
          "SCENE COORDINATES RECONSTRUCTED · TIMESTAMPS APPROXIMATED FROM DIALOGUE CUES"
        );
      } catch (err) {
        console.error("Scene search error:", err);
        toast("Unable to locate scene. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const handleSceneSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const movie = sceneMovieRef.current?.value || "";
      const clue = sceneClueRef.current?.value || "";
      executeSceneSearch(movie, clue);
    },
    [executeSceneSearch]
  );

  const handleSceneChipClick = useCallback(
    (movieTitle: string, clue: string) => {
      if (sceneMovieRef.current) sceneMovieRef.current.value = movieTitle;
      if (sceneClueRef.current) sceneClueRef.current.value = clue;
      switchMode("scene");
      executeSceneSearch(movieTitle, clue);
    },
    [switchMode, executeSceneSearch]
  );

  // ── Roulette via backend API ──
  const roll = useCallback(async () => {
    setSpinning(true);
    setSpinRotation((prev) => prev + 810);
    setRoulettePick(null);
    setRouletteMessage(null);

    try {
      const params = new URLSearchParams();
      if (selectedGenre) params.set("genre", selectedGenre);
      if (state.watchedIds.length > 0) params.set("watched", state.watchedIds.join(","));
      if (lastPickId) params.set("lastPick", lastPickId);

      const res = await fetch(`/api/roulette?${params.toString()}`);
      const data = await res.json();

      setTimeout(() => {
        setSpinning(false);
        if (data.isEmpty || !data.pick) {
          setRouletteMessage(data.message || "No eligible films remaining for this mood.");
          toast(data.message || "No unwatched films remain for this mood.");
          setShowResults(true);
        } else {
          const pickFilm: RouletteFilmData = {
            ...data.pick,
            snippet: data.snippet,
            moment: data.moment,
            tag: data.tag || data.pick.genres?.[0]?.toUpperCase() || "FILM",
          };
          setRoulettePick(pickFilm);
          setLastPickId(pickFilm.id);
          setShowResults(true);
          setResultNotice(
            "CURATED FILM SELECTION · WATCHED FILMS EXCLUDED ON THIS DEVICE"
          );
        }
      }, 700);
    } catch (err) {
      console.error("Roulette roll error:", err);
      setSpinning(false);
      toast("Roulette encountered an error. Please try again.");
    }
  }, [selectedGenre, state.watchedIds, lastPickId, toast]);

  const handleWatched = useCallback(() => {
    if (roulettePick) {
      markWatched(roulettePick.id);
      toast("Marked as watched. On to the next.");
      roll();
    }
  }, [roulettePick, markWatched, toast, roll]);

  const handleSkip = useCallback(() => {
    roll();
  }, [roll]);

  // Helper to save film with its metadata
  const handleSaveFilm = useCallback(
    (film: Film) => {
      toggleSave(film.id, film);
    },
    [toggleSave]
  );

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
            FULL LIVE CINEMA INDEX ACTIVE.
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
                  placeholder={`"I am vengeance" or "I have abandoned my child"`}
                />
                <button
                  className="search-go"
                  type="submit"
                  aria-label="Search lines"
                  disabled={loading}
                >
                  {loading ? "…" : "↗"}
                </button>
              </div>
            </form>
            <div className="helper-chips">
              <button
                className="chip"
                onClick={() => handleChipClick("I am vengeance")}
              >
                I am vengeance
              </button>
              <button
                className="chip"
                onClick={() => handleChipClick("I have abandoned my child")}
              >
                I have abandoned my child
              </button>
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
                onClick={() => handleChipClick("I drink your milkshake")}
              >
                I drink your milkshake
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
                    placeholder="e.g. The Batman"
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
                    placeholder="e.g. subway brawl opening"
                    autoComplete="off"
                  />
                </div>
              </div>
              <button
                className="solid-action scene-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Locating..." : "Locate this scene ↗"}
              </button>
            </form>
            <div className="helper-chips">
              <button
                className="chip"
                onClick={() =>
                  handleSceneChipClick("The Batman", "subway station brawl")
                }
              >
                The Batman · subway brawl
              </button>
              <button
                className="chip"
                onClick={() =>
                  handleSceneChipClick(
                    "There Will Be Blood",
                    "baptism church confession"
                  )
                }
              >
                There Will Be Blood · church baptism
              </button>
              <button
                className="chip"
                onClick={() =>
                  handleSceneChipClick("The Matrix", "the spoon scene")
                }
              >
                The Matrix · the spoon scene
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
                The Dark Knight · interrogation
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
                    {spinning ? "Rolling..." : "Roll the reel ↗"}
                  </button>
                </div>
              </div>
              <div
                className="wheel"
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
            {loading ? (
              <div
                style={{
                  padding: "36px 0",
                  textAlign: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".1em",
                  color: "var(--muted)",
                }}
              >
                <span style={{ color: "var(--orange)" }}>✳</span> SCANNING
                CINEMA MEMORY INDEX...
              </div>
            ) : roulettePick ? (
              <>
                <div className="result-head">
                  <h3>The reel chose for you</h3>
                  <span className="mono">01 SELECTION</span>
                </div>
                <div className="result-grid">
                  <RoulettePickCard
                    film={roulettePick}
                    isSaved={isSaved(roulettePick.id)}
                    onSave={() => handleSaveFilm(roulettePick)}
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
                        onSave={() => handleSaveFilm(r.film)}
                      />
                    ))
                  ) : (
                    <div
                      className="result-card"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <div className="result-copy">
                        <div className="mono">NO MATCH FOUND</div>
                        <h4>That clue isn&apos;t indexed yet.</h4>
                        <p>
                          Try fewer words, an alternate phrasing, or use Spin
                          the Shelf to let a film find you.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {resultNotice && <div className="notice">{resultNotice}</div>}

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
    Animation: "Pure imagination / animation",
    Comedy: "I need a laugh / comedy",
    Crime: "Something shady / crime",
    Drama: "Feel something / drama",
    Fantasy: "Another realm / fantasy",
    Horror: "Give me chills / horror",
    Mystery: "Make me think / mystery",
    Romance: "A love story / romance",
    "Sci-Fi": "Somewhere else / sci-fi",
    Thriller: "Keep me guessing / thriller",
  };
  return map[genre] || genre;
}
