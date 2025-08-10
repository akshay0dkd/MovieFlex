import React, { useEffect, useState } from 'react';

// Helper: Get YouTube trailer link
const getVideoLink = async (movieId, apiKey) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    );
    const data = await res.json();
    const trailer = data.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};

function MovieCard({ Loading, AllmovieData }) {
  const [castList, setCastList] = useState({});
  const [selectedTrailer, setSelectedTrailer] = useState(null); // URL of trailer
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state
  const apiKey = '8a5159ae66789c60b6417ade00adc19e';

  // Fetch cast list
  const fetchCast = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
      );
      const data = await res.json();
      const castNames = data.cast.slice(0, 3).map((actor) => actor.name).join(',');
      setCastList((prev) => ({ ...prev, [movieId]: castNames }));
    } catch (error) {
      console.error('Failed to fetch cast:', error);
    }
  };

  // Load and show trailer in modal
  const openTrailerModal = async (id) => {
    const link = await getVideoLink(id, apiKey);
    if (link) {
      setSelectedTrailer(link);
      setIsModalOpen(true);
    } else {
      alert('Trailer not available');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrailer(null);
  };

  useEffect(() => {
    AllmovieData.forEach((movie) => {
      if (movie.id && !castList[movie.id]) fetchCast(movie.id);
    });
  }, [AllmovieData]);

  return (
    <div>
      {Loading ? (
        <div className="flex justify-center">
          <img className="py-20 w-16" src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." />
        </div>
      ) : (
        <div className="flex flex-wrap px-4 lg:px-10">
          {AllmovieData.map((item, index) => {
            const { id, title, release_date, poster_path, vote_average, overview } = item;
            const posterUrl = poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://www.serieslike.com/img/shop_01.png';
            const cast = castList[id] || 'Loading...';
            const movieLink = `https://www.themoviedb.org/movie/${id}`;

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

                  <a
                    href={movieLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-blue-400 text-sm underline"
                  >
                    🔗 More Info
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trailer Modal */}
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
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
