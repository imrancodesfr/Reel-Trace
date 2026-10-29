"use client";

import { Film } from "@/lib/domain/types";

export interface RouletteFilmData extends Film {
  art?: string;
  snippet?: string;
  moment?: string;
  tag?: string;
}

interface RoulettePickCardProps {
  film: RouletteFilmData;
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
  const imageUrl =
    film.posterUrl ||
    film.art ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80";

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
          backgroundImage: `linear-gradient(180deg, transparent 45%, #0008), url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
            background: "#d8f36a",
            color: "#191a17",
            display: "inline",
            padding: "2px 8px",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {film.title}{" "}
          {film.year && (
            <span
              style={{
                font: "13px var(--mono)",
                color: "var(--muted)",
              }}
            >
              ({film.year})
            </span>
          )}
        </h4>
        <p style={{ maxWidth: "420px", fontSize: "14px", lineHeight: "1.5" }}>
          {film.snippet || film.overview || "A cinematic memory waiting to be uncovered."}
        </p>
        {film.moment && (
          <p style={{ maxWidth: "420px", fontSize: "12px", color: "var(--muted)" }}>
            Key moment: {film.moment}
          </p>
        )}
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
