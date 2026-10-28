import { NextRequest, NextResponse } from "next/server";
import { pickRandomWithTmdb } from "@/lib/search/roulette";
import { quotesDatabase } from "@/lib/domain/quotes-database";
import { getAllGenres } from "@/lib/providers/tmdb";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre") || "All";
  const watchedRaw = searchParams.get("watched") || "";
  const lastPickId = searchParams.get("lastPick") || null;

  const watchedIds = watchedRaw ? watchedRaw.split(",").filter(Boolean) : [];

  try {
    const result = await pickRandomWithTmdb(quotesDatabase, genre, watchedIds, lastPickId);
    return NextResponse.json({
      pick: result.film,
      snippet: result.snippet || null,
      moment: result.moment || null,
      tag: result.tag || null,
      isEmpty: result.isEmpty,
      message: result.message || null,
      availableGenres: ["All", ...getAllGenres()],
      source: "REELTRACE_RECOMMENDATION",
    });
  } catch (error) {
    console.error("Roulette error:", error);
    return NextResponse.json(
      { error: "Roulette failed", pick: null, isEmpty: true },
      { status: 500 }
    );
  }
}
