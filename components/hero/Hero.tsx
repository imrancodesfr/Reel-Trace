"use client";

import { useCallback } from "react";

export default function Hero() {
  const scrollToFinder = useCallback(() => {
    const el = document.getElementById("finder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("quoteInput") as HTMLInputElement;
        if (input) input.focus({ preventScroll: true });
      }, 350);
    }
  }, []);

  return (
    <section className="hero shell">
      <div className="hero-copy">
        <div className="kicker mono">
          <span className="rule"></span> THE CINEMA MEMORY MACHINE / VOL. 001
        </div>
        <h1>
          YOU KNOW
          <br />
          THE <em>moment.</em>
          <br />
          WE FIND THE
          <br />
          <span className="under">MOVIE.</span>
        </h1>
        <p className="hero-deck">
          That half-remembered line. The scene you can almost see. The film
          you&apos;ve somehow missed.{" "}
          <strong>Let&apos;s pull it out of your head.</strong>
        </p>
        <div className="hero-actions">
          <button className="round-cta" onClick={scrollToFinder}>
            Open the archive <span className="arrow">↘</span>
          </button>
          <a className="text-link" href="#how-it-works">
            Three ways to get lost ↗
          </a>
        </div>
        <div className="hero-meta mono">
          <span>01 / REMEMBER</span>
          <span>02 / RECONSTRUCT</span>
          <span>03 / RE-DISCOVER</span>
        </div>
      </div>
      <div className="hero-art" aria-label="Layered cinematic contact-sheet artwork">
        <div className="art-backdrop"></div>
        <div className="orbit"></div>
        <div className="poster poster-one">
          <span className="big-num">FIG. 001</span>
          <div className="poster-info">
            <div className="mono">THE DARK / THE CITY</div>
            <strong>
              A feeling
              <br />
              without a title.
            </strong>
          </div>
        </div>
        <div className="poster poster-two">
          <span className="big-num">FIG. 014</span>
          <div className="poster-info">
            <div className="mono">LOST FOOTAGE</div>
            <strong>
              Wait. I know
              <br />
              this scene.
            </strong>
          </div>
        </div>
        <div className="poster poster-three">
          <span className="big-num">FIG. 032</span>
          <div className="poster-info">
            <div className="mono">ARCHIVE NOTE</div>
            <strong>
              Found in
              <br />
              your memory.
            </strong>
          </div>
        </div>
        <div className="ticket">
          <div className="mono">ADMIT ONE / MEMORY</div>
          <strong>
            NOT ALL
            <br />
            WHO WANDER
          </strong>
          <p>Know what you&apos;re looking for? Start anywhere.</p>
        </div>
        <div className="art-stamp">
          CINEMA
          <br />
          IS A <span>FEELING</span>
        </div>
        <div className="side-note">
          NO. 0001 / PLEASE KEEP THE LIGHTS LOW
        </div>
      </div>
    </section>
  );
}
