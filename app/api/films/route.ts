import { NextRequest, NextResponse } from "next/server";
import { demoFilms, demoGenres } from "@/lib/domain/demo-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");

  let films = demoFilms;
  if (genre && genre !== "All") {
    films = films.filter((f) => f.genres.includes(genre));
  }

  return NextResponse.json({
    total: films.length,
    genres: demoGenres,
    films: films.map((f) => ({
      id: f.id,
      title: f.title,
      year: f.year,
      kind: f.kind,
      genres: f.genres,
      overview: f.overview,
      posterUrl: f.art,
      line: f.line,
      moment: f.moment,
      time: f.time,
      tag: f.tag,
    })),
  });
}
