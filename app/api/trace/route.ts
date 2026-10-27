import { NextRequest, NextResponse } from "next/server";
import { searchTrace } from "@/lib/search/engine";

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

  const matches = searchTrace(q, limit);
  return NextResponse.json({
    query: q,
    count: matches.length,
    matches,
    source: "DEMO_INDEX",
    notice: "Sample results only. Timestamps are illustrative.",
  });
}
