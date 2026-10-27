"use client";

import { DemoFilm } from "@/lib/domain/demo-data";

interface RoulettePickCardProps {
  film: DemoFilm;
  isSaved: boolean;
  onSave: () => void;
  onWatched: () => void;
  onNext: () => void;
}

export default function RoulettePickCard({
  film,
  isSaved,
  onSave,
  onWatched,
  onNext,
}: RoulettePickCardProps) {
  return (
    <article
      className="result-card"
      style={{
        gridColumn: "1 / -1",
        gridTemplateColumns: "minmax(120px, 190px) 1fr",
        padding: "15px",
        gap: "20px",
      }}
    >
      <div
        className="result-art"
        style={{
          minHeight: "220px",
          background: `linear-gradient(180deg, transparent 45%, #0008), url('${film.art}') center/cover`,
          backgroundColor: "#888",
        }}
      />
      <div className="result-copy">
        <div className="mono">
          TONIGHT&apos;S ACCIDENT / {film.genres[0]?.toUpperCase() || "FILM"}
        </div>
        <h4
          style={{
            fontSize: "clamp(24px, 4vw, 42px)",
            margin: "12px 0",
          }}
        >
          {film.title}{" "}
          <span
            style={{
              font: "13px var(--mono)",
              color: "var(--muted)",
            }}
          >
            ({film.year})
          </span>
        </h4>
        <p style={{ maxWidth: "390px", fontSize: "13px" }}>
          {film.moment}.{" "}
          <span style={{ color: "#6d6c63" }}>{film.tag}.</span>
        </p>
        <p style={{ maxWidth: "390px" }}>
          Your mission: give it a chance. If it&apos;s not the one, send it
          back to the shelf and roll again.
        </p>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "auto",
            paddingTop: "12px",
          }}
        >
          <button className="solid-action" onClick={onSave}>
            {isSaved ? "✓ On your shelf" : "＋ Keep this one"}
          </button>
          <button
            className="tiny-button"
            style={{ borderColor: "#191a1740" }}
            onClick={onWatched}
          >
            Already watched ↗
          </button>
          <button
            className="tiny-button"
            style={{ borderColor: "#191a1740" }}
            onClick={onNext}
          >
            Another frame ↻
          </button>
        </div>
      </div>
    </article>
  );
}
