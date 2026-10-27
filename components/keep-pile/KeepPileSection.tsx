"use client";

import { useReeltrace } from "@/lib/context/reeltrace-context";

export default function KeepPileSection() {
  const {
    savedCount,
    getSavedFilms,
    toggleSave,
    clearWatchlist,
    exportKeepPile,
  } = useReeltrace();

  const films = getSavedFilms();

  return (
    <section className="shelf" id="shelf">
      <div className="shell">
        <div className="shelf-header">
          <div>
            <div className="mono dim">
              YOUR PERSONAL COLLECTION / LOCAL TO THIS DEVICE
            </div>
            <h2>
              The <em>keep</em>
              <br />
              pile.
            </h2>
          </div>
          <div className="shelf-actions">
            <button className="tiny-button" onClick={exportKeepPile}>
              Export list ↗
            </button>
            <button className="tiny-button" onClick={clearWatchlist}>
              Clear shelf ×
            </button>
          </div>
        </div>

        <div id="shelfContent">
          {films.length === 0 ? (
            <div className="shelf-empty">
              <p>
                Nothing pinned yet.
                <br />
                Found something good? Save it here so it doesn&apos;t
                disappear into the scroll.
              </p>
              <span className="empty-icon">↗</span>
            </div>
          ) : (
            <div className="saved-list">
              {films.map((f) => (
                <article key={f.id} className="saved-item">
                  <div className="saved-swatch">{f.year}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>
                      {f.genres[0]?.toUpperCase() || "FILM"} / {f.tag}
                    </p>
                  </div>
                  <button
                    className="remove-save"
                    onClick={() => toggleSave(f.id)}
                    aria-label={`Remove ${f.title}`}
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
