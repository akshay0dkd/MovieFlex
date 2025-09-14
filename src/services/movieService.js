// services/movieService.js

const TMDB_BASE = "/api/movies"; // your Vercel API route

// Fetch popular movies
export const fetchPopularMovies = async () => {
  const res = await fetch(TMDB_BASE);
  return res.json();
};

// Fetch cast for a movie
export const fetchMovieCast = async (movieId) => {
  const res = await fetch(`${TMDB_BASE}?id=${movieId}&type=credits`);
  const data = await res.json();
  return data.cast?.slice(0, 3).map((actor) => actor.name).join(", ");
};

// Fetch trailer for a movie
export const fetchMovieTrailer = async (movieId) => {
  const res = await fetch(`${TMDB_BASE}?id=${movieId}&type=videos`);
  const data = await res.json();
  const trailer = data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
};
