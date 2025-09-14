const apiKey = import.meta.env.VITE_TMDB_KEY;

// Fetch cast for a movie
export const fetchMovieCast = async (movieId) => {
  if (!apiKey) return "API key is missing";
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
    const data = await res.json();
    return data.cast?.slice(0, 3).map((actor) => actor.name).join(", ");
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    return "Error fetching cast";
  }
};

// Fetch trailer for a movie
export const fetchMovieTrailer = async (movieId) => {
  if (!apiKey) return null;
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await res.json();
    const trailer = data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    return null;
  }
};
