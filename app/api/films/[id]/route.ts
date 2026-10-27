import { NextRequest, NextResponse } from "next/server";
import { demoFilms } from "@/lib/domain/demo-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const film = demoFilms.find((f) => f.id === params.id);

  if (!film) {
    return NextResponse.json(
      { error: `Film with id '${params.id}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: film.id,
    title: film.title,
    year: film.year,
    kind: film.kind,
    genres: film.genres,
    overview: film.overview,
    posterUrl: film.art,
    line: film.line,
    moment: film.moment,
    time: film.time,
    tag: film.tag,
    clues: film.clues,
  });
}
