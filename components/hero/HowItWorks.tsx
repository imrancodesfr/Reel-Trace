"use client";

import { useCallback } from "react";

export default function HowItWorks() {
  const scrollToMode = useCallback((mode: string) => {
    const el = document.getElementById("finder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("reeltrace:switchMode", { detail: mode })
        );
      }, 350);
    }
  }, []);

  return (
    <section className="found-section shell" id="how-it-works">
      <div className="found-left">
        <div className="mono dim">A DIFFERENT KIND OF MOVIE NIGHT</div>
        <h2>
          Not a catalogue.
          <br />A <em>memory</em>
          <br />
          with a search bar.
        </h2>
        <p>
          Streaming services ask what you want to watch. Reeltrace starts with
          what you can&apos;t quite remember—and makes room for the happy
          accident.
        </p>
      </div>
      <div className="found-right">
        <article
          className="idea-card quote"
          onClick={() => scrollToMode("quote")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && scrollToMode("quote")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-top">
            <span className="mono">01 / RECALL</span>
            <span className="mini-icon">⌕</span>
          </div>
          <h3>Quote detective</h3>
          <p>Find the film hiding behind one half-remembered sentence.</p>
          <span className="scribble">found?</span>
        </article>
        <article
          className="idea-card scene"
          onClick={() => scrollToMode("scene")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && scrollToMode("scene")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-top">
            <span className="mono">02 / REWIND</span>
            <span className="mini-icon">↶</span>
          </div>
          <h3>Scene coordinates</h3>
          <p>Follow words, details, and clues back to a moment.</p>
          <span className="scribble">00:42</span>
        </article>
        <article
          className="idea-card roulette"
          onClick={() => scrollToMode("roulette")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && scrollToMode("roulette")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-top">
            <span className="mono">03 / LET GO</span>
            <span className="mini-icon">✳</span>
          </div>
          <h3>Open the mystery envelope.</h3>
          <p>
            One unexpected pick. One less night scrolling. Keep it, skip it, or
            give the reel another spin.
          </p>
          <span className="scribble">surprise!</span>
        </article>
      </div>
    </section>
  );
}
