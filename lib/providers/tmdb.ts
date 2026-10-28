/* ───────────────────────────────────────────────────────
 *  REELTRACE — TMDB API client (SERVER-SIDE ONLY)
 *  Uses the read access token from env vars.
 *  Includes an in-memory cache to avoid duplicate calls.
 *  
 *  ⚠ NEVER import this file in client components.
 * ─────────────────────────────────────────────────────── */

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

function getToken(): string {
  const token = process.env.TMDB_READ_TOKEN;
  if (!token) throw new Error("TMDB_READ_TOKEN is not set in environment");
  return token;
}

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
}

// ── Simple in-memory cache ──
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

async function cachedFetch<T>(url: string): Promise<T> {
  const now = Date.now();
  const hit = cache.get(url);
  if (hit && now - hit.ts < CACHE_TTL) return hit.data as T;

  const res = await fetch(url, { headers: headers(), next: { revalidate: 3600 } });
  if (!res.ok) {
    console.error(`TMDB error ${res.status}: ${url}`);
    throw new Error(`TMDB API error: ${res.status}`);
  }
  const data = await res.json();
  cache.set(url, { data, ts: now });
  return data as T;
}

// ── Types ──
export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
}

export interface TmdbMovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  runtime: number | null;
  vote_average: number;
  tagline: string;
  imdb_id: string | null;
}

interface TmdbSearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: TmdbMovie[];
}

// ── Genre ID → name map (TMDB standard) ──
const GENRE_MAP: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
  53: "Thriller", 10752: "War", 37: "Western",
};

// ── Public API ──

/** Build a poster URL from a TMDB poster_path */
export function posterUrl(path: string | null, size: "w200" | "w342" | "w500" | "original" = "w500"): string {
  if (!path) return "";
  return `${IMG_BASE}/${size}${path}`;
}

/** Build a backdrop URL */
export function backdropUrl(path: string | null, size: "w780" | "w1280" | "original" = "w780"): string {
  if (!path) return "";
  return `${IMG_BASE}/${size}${path}`;
}

/** Convert genre IDs to names */
export function genreNames(ids: number[]): string[] {
  return ids.map((id) => GENRE_MAP[id] || "Unknown").filter((g) => g !== "Unknown");
}

/** Search movies by title */
export async function searchMovies(query: string, year?: number): Promise<TmdbMovie[]> {
  let url = `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
  if (year) url += `&year=${year}`;
  const data = await cachedFetch<TmdbSearchResult>(url);
  return data.results || [];
}

/** Get movie details by TMDB ID */
export async function getMovieById(id: number): Promise<TmdbMovieDetail> {
  const url = `${TMDB_BASE}/movie/${id}?language=en-US`;
  return cachedFetch<TmdbMovieDetail>(url);
}

/** Search movies by title and return the best match */
export async function findMovie(title: string, year?: number): Promise<TmdbMovie | null> {
  const results = await searchMovies(title, year);
  if (results.length === 0 && year) {
    // Retry without year
    const retry = await searchMovies(title);
    return retry[0] || null;
  }
  return results[0] || null;
}

/** Get popular movies, optionally filtered by genre */
export async function getPopularMovies(page = 1, genreId?: number): Promise<TmdbMovie[]> {
  let url = `${TMDB_BASE}/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}&vote_count.gte=100`;
  if (genreId) url += `&with_genres=${genreId}`;
  const data = await cachedFetch<TmdbSearchResult>(url);
  return data.results || [];
}

/** Get genre ID from name */
export function genreIdFromName(name: string): number | undefined {
  const lower = name.toLowerCase();
  for (const [id, gName] of Object.entries(GENRE_MAP)) {
    if (gName.toLowerCase() === lower) return Number(id);
  }
  return undefined;
}

/** Get all available genre names */
export function getAllGenres(): string[] {
  return Object.values(GENRE_MAP).sort();
}
