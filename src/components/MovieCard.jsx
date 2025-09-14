import React, { useEffect, useState } from "react";
import { fetchMovieCast, fetchMovieTrailer } from "../services/movieService";

function MovieCard({ Loading, AllmovieData }) {
  const [castList, setCastList] = useState({});
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiSummaries, setAiSummaries] = useState({});

  const fetchAISummary = async (id, title, overview) => {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, overview }),
      });
      const data = await res.json();
      setAiSummaries((prev) => ({
        ...prev,
        [id]: data.summary || "AI could not generate summary",
      }));
    } catch (err) {
      console.error("Error fetching AI summary:", err);
    }
  };

  const openTrailerModal = async (id) => {
    const link = await fetchMovieTrailer(id);
    if (link) {
      setSelectedTrailer(link);
      setIsModalOpen(true);
    } else {
      alert("Trailer not available");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrailer(null);
  };

  useEffect(() => {
    AllmovieData.forEach((movie) => {
      if (movie.id && !castList[movie.id]) {
        fetchMovieCast(movie.id).then((cast) =>
          setCastList((prev) => ({ ...prev, [movie.id]: cast }))
        );
      }
    });
  }, [AllmovieData]);

  return (
    <div>
      {Loading ? (
        <div className="flex justify-center">
          <img
            className="py-20 w-16"
            src="https://i.gifer.com/ZZ5H.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="flex flex-wrap px-4 lg:px-10">
          {AllmovieData.map((item, index) => {
            const { id, title, release_date, poster_path, vote_average, overview } = item;
            const posterUrl = poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://www.serieslike.com/img/shop_01.png";
            const cast = castList[id] || "Loading...";

            return (
              <div key={index} className="p-2 sm:w-full md:w-1/3 xl:w-1/4">
                <div className="bg-[#1e1e2e] shadow-lg p-4 border border-gray-700 rounded-2xl text-white hover:scale-[1.02] transition-all">
                  <img
                    className="mb-3 rounded-lg w-full h-[400px] object-cover"
                    src={posterUrl}
                    alt={title}
                  />
                  <h2 className="font-bold text-lg">{title}</h2>
                  <p className="text-sm">📅 {release_date?.slice(0, 4)}</p>
                  <p className="text-sm">⭐ Rating: {vote_average}</p>
                  <p className="text-sm">🎭 Cast: {cast}</p>
                  <p className="mt-2 text-sm">📝 {overview?.slice(0, 80)}...</p>

                  <button
                    onClick={() => openTrailerModal(id)}
                    className="bg-blue-600 hover:bg-blue-700 mt-3 px-3 py-1 rounded-md text-white text-sm"
                  >
                    ▶ Watch Trailer
                  </button>
                  <br />
                  <button
                    onClick={() => fetchAISummary(id, title, overview)}
                    className="bg-green-600 hover:bg-green-700 mt-4 ml-2 px-3 py-1 rounded-md text-white text-sm"
                  >
                    🤖 AI Summary
                  </button>

                  {aiSummaries[id] && (
                    <p className="mt-2 text-gray-300 text-sm italic">{aiSummaries[id]}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && selectedTrailer && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm">
          <div className="relative mx-auto p-4 w-full max-w-3xl">
            <button
              onClick={closeModal}
              className="top-4 right-4 absolute bg-red-600 px-3 py-1 rounded font-bold text-white text-xl"
            >
              ✖
            </button>
            <iframe
              className="rounded-xl w-full aspect-video"
              src={selectedTrailer}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
