import { NextRequest, NextResponse } from "next/server";
import { searchScenesWithTmdb } from "@/lib/search/engine";
import { quotesDatabase } from "@/lib/domain/quotes-database";

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

  try {
    const matches = await searchScenesWithTmdb(quotesDatabase, q, movie, limit);
    return NextResponse.json({
      query: q,
      movie: movie || null,
      count: matches.length,
      matches,
      source: "REELTRACE_INDEX",
      notice: "Scene coordinates identified via dialogue index and metadata.",
    });
  } catch (error) {
    console.error("Scene search error:", error);
    return NextResponse.json(
      { error: "Scene search failed", matches: [] },
      { status: 500 }
    );
  }
}
