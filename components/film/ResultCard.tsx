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
      : match.snippet || "";

  const matchLabel =
    match.matchType === "exact"
      ? "EXACT TRACE"
      : match.matchType === "close"
        ? "CLOSE MATCH"
        : "RELATED";

  return (
    <article className="result-card">
      <div
        className="result-art"
        style={{
          background: `linear-gradient(180deg, transparent 45%, #0008), url('${match.film.posterUrl}') center/cover`,
          backgroundColor: "#888",
        }}
      />
      <div className="result-copy">
        <div className="mono">
          {match.tag || ""} / {match.film.year || "—"}
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
