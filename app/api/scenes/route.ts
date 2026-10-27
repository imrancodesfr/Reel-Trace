import { NextRequest, NextResponse } from "next/server";
import { searchScenes } from "@/lib/search/engine";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const movie = searchParams.get("movie") || undefined;
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  if (!q.trim() && !movie?.trim()) {
    return NextResponse.json(
      { error: "At least one of 'q' or 'movie' is required", matches: [] },
      { status: 400 }
    );
  }

  const matches = searchScenes(q, movie, limit);
  return NextResponse.json({
    query: q,
    movie: movie || null,
    count: matches.length,
    matches,
    source: "DEMO_INDEX",
    notice: "Sample scene coordinates only. Timestamps are illustrative.",
  });
}
