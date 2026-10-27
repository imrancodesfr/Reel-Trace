import { NextRequest, NextResponse } from "next/server";
import { pickRandom, getRouletteGenres } from "@/lib/search/roulette";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre") || "All";
  const watchedRaw = searchParams.get("watched") || "";
  const lastPickId = searchParams.get("lastPick") || null;
  const skippedRaw = searchParams.get("skipped") || "";

  const watchedIds = watchedRaw ? watchedRaw.split(",").filter(Boolean) : [];
  const skippedIds = skippedRaw ? skippedRaw.split(",").filter(Boolean) : [];

  const result = pickRandom(genre, watchedIds, lastPickId, skippedIds);

  return NextResponse.json({
    pick: result.film,
    isEmpty: result.isEmpty,
    message: result.message || null,
    availableGenres: getRouletteGenres(),
    source: "DEMO_RECOMMENDATION",
  });
}
