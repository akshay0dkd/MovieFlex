import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// Helper function
const getVideoLink = async (movieId, apiKey) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await res.json();
    const trailer = data.results.find(
      video => video.site === "YouTube" && video.type === "Trailer"
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};

function MovieCard({ Loading, AllmovieData }) {
  const [castList, setCastList] = useState({});
  // const [aiSummaries, setAiSummaries] = useState({});
  const [videoLinks, setVideoLinks] = useState({});
  const [visibleTrailer, setVisibleTrailer] = useState({});

  const apiKey = '8a5159ae66789c60b6417ade00adc19e';
  // const backendURL = 'http://localhost:3001';

  // Fetch cast
  const fetchCast = async (movieId) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
      const data = await res.json();
      const castNames = data.cast.slice(0, 3).map(actor => actor.name).join(', ');
      setCastList(prev => ({ ...prev, [movieId]: castNames }));
    } catch (error) {
      console.error('Failed to fetch cast:', error);
    }
  };

  // AI summary
  // const fetchAISummary = async (title, overview, id) => {
  //   try {
  //     const res = await axios.post(`${backendURL}/api/ai-summary`, {
  //       title,
  //       review: overview
  //     });
  //     setAiSummaries(prev => ({ ...prev, [id]: res.data.summary }));
  //   } catch (error) {
  //     console.error('OpenAI error:', error);
  //   }
  // };

  // Trailer fetch
  const loadTrailer = async (id) => {
    const link = await getVideoLink(id, apiKey);
    setVideoLinks(prev => ({ ...prev, [id]: link }));
    setVisibleTrailer(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    AllmovieData.forEach(movie => {
      if (movie.id && !castList[movie.id]) fetchCast(movie.id);
      // if (movie.id && !aiSummaries[movie.id]) fetchAISummary(movie.title, movie.overview, movie.id);
    });
  }, [AllmovieData]);

  return (
    <div>
      {Loading ? (
        <div className='flex justify-center'>
          <img className='py-20 w-16' src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." />
        </div>
      ) : (
        <div className='flex flex-wrap px-4 lg:px-10'>
          {AllmovieData.map((item, index) => {
            const { id, title, release_date, poster_path, vote_average, overview } = item;
            const posterUrl = poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image';
            const cast = castList[id] || 'Loading...';
            // const aiSummary = aiSummaries[id] || 'Generating summary...';
            const movieLink = `https://www.themoviedb.org/movie/${id}`;

            return (
              <div key={index} className="p-2 sm:w-full md:w-1/3 xl:w-1/4">
                <div className="bg-[#1e1e2e] shadow-lg p-4 border border-gray-700 rounded-2xl text-white hover:scale-[1.02] transition-all">
                  <img className='mb-3 rounded-lg w-full h-[400px] object-cover' src={posterUrl} alt={title} />
                  <h2 className='font-bold text-lg'>{title}</h2>
                  <p className='text-sm'>📅 {release_date?.slice(0, 4)}</p>
                  <p className='text-sm'>⭐ Rating: {vote_average}</p>
                  <p className='text-sm'>🎭 Cast: {cast}</p>
                  <p className='mt-2 text-sm'>📝 {overview?.slice(0, 80)}...</p>
                  <p className='mt-2 text-green-300 text-xs italic'></p>

                  {/* Trailer button / video */}
                  {!visibleTrailer[id] ? (
                    <button 
                      onClick={() => loadTrailer(id)}
                      className='bg-blue-600 hover:bg-blue-700 mt-3 px-3 py-1 rounded-md text-white text-sm'
                     
                    >
                      ▶ Do you want to Watch Trailer
                    </button>
                 ) : videoLinks[id] ? (
                     <a  href={videoLinks[id]}>▶ click again to Watch Trailer</a>
                    //   <iframe
                    //   className="mt-3 rounded-lg w-full aspect-video"
                    //   src={videoLinks[id]}
                    //   title={`${title} Trailer`}
                    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    //   allowFullScreen
                    // ></iframe>


                  ) : (
                    <p className='mt-2 text-gray-400 text-sm italic'>🎬 Trailer not available</p>
                  )}

                  <a
                    href={movieLink}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-block mt-3 text-blue-400 text-sm underline'
                  >
                    🔗 More Info
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MovieCard;
