export default async function handler(req, res) {
  try {
    const { query } = req.query; // e.g. /api/movies?query=batman

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching search movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}
