"use client";

import { useState, useCallback } from "react";
import { useReeltrace } from "@/lib/context/reeltrace-context";

export default function Header() {
  const { savedCount } = useReeltrace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToFinder = useCallback((mode: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById("finder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Dispatch a custom event to switch the finder mode
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("reeltrace:switchMode", { detail: mode })
        );
      }, 350);
    }
  }, []);

  const scrollToShelf = useCallback(() => {
    setMobileMenuOpen(false);
    const el = document.getElementById("shelf");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header>
        <a className="brand" href="#top" aria-label="Reeltrace home">
          <span className="brand-mark">
            <span></span>
          </span>
          REELTRACE
          <span
            style={{
              font: "9px var(--mono)",
              letterSpacing: ".08em",
              color: "var(--muted)",
              marginLeft: "1px",
            }}
          >
            ™
          </span>
        </a>
        <nav className="nav" aria-label="Main navigation">
          <button
            onClick={() => scrollToFinder("quote")}
            data-nav="quote"
          >
            Find a line
          </button>
          <button
            onClick={() => scrollToFinder("scene")}
            data-nav="scene"
          >
            Find a scene
          </button>
          <button
            onClick={() => scrollToFinder("roulette")}
            data-nav="roulette"
          >
            Surprise me
          </button>
        </nav>
        <div className="top-right">
          <div className="status mono">
            <i></i> archive is awake
          </div>
          <button className="saved-pill" onClick={scrollToShelf}>
            your shelf <b>{savedCount}</b>
          </button>
          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-label="Mobile navigation">
          <button
            className="mobile-menu-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <button onClick={() => scrollToFinder("quote")}>Find a line</button>
          <button onClick={() => scrollToFinder("scene")}>Find a scene</button>
          <button onClick={() => scrollToFinder("roulette")}>Surprise me</button>
          <button onClick={scrollToShelf}>Your shelf ({savedCount})</button>
        </div>
      )}
    </>
  );
}
