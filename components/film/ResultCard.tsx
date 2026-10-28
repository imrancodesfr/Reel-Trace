"use client";

import { TraceMatch } from "@/lib/domain/types";

interface ResultCardProps {
  match: TraceMatch;
  mode: "quote" | "scene";
  isSaved: boolean;
  onSave: () => void;
}

export default function ResultCard({
  match,
  mode,
  isSaved,
  onSave,
}: ResultCardProps) {
  const detail =
    mode === "scene"
      ? `${match.moment || "Scene"} · ${match.timecodeDisplay || "—"}`
      : match.snippet || match.film.overview?.substring(0, 100) || "";

  const matchLabel =
    match.matchType === "exact"
      ? "EXACT TRACE"
      : match.matchType === "close"
        ? "CLOSE MATCH"
        : "RELATED";

  const poster =
    match.film.posterUrl ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";

  return (
    <article className="result-card">
      <div
        className="result-art"
        style={{
          backgroundImage: `linear-gradient(180deg, transparent 45%, #0008), url('${poster}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#888",
        }}
      />
      <div className="result-copy">
        <div className="mono">
          {match.tag || match.film.genres[0]?.toUpperCase() || "CINEMA"} / {match.film.year || "—"}
        </div>
        <h4>{match.film.title}</h4>
        <p>{detail}</p>
        <div className="result-bottom">
          <span>
            {matchLabel} · {match.film.genres[0]?.toUpperCase() || "FILM"}
          </span>
          <button
            aria-label={
              isSaved ? "Remove from your shelf" : "Save to your shelf"
            }
            onClick={onSave}
          >
            {isSaved ? "✓" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}
