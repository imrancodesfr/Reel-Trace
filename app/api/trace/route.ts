import { NextRequest, NextResponse } from "next/server";
import { searchTraceWithTmdb } from "@/lib/search/engine";
import { quotesDatabase } from "@/lib/domain/quotes-database";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  if (!q.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required", matches: [] },
      { status: 400 }
    );
  }

  try {
    const matches = await searchTraceWithTmdb(quotesDatabase, q, limit);
    return NextResponse.json({
      query: q,
      count: matches.length,
      matches,
      source: "REELTRACE_INDEX",
    });
  } catch (error) {
    console.error("Trace search error:", error);
    return NextResponse.json(
      { error: "Search failed", matches: [] },
      { status: 500 }
    );
  }
}
