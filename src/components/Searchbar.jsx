import React from 'react';

function Searchbar({ SearchMovie, setSearchMovie, fetchMovieData }) {
  return (
    <div className='flex justify-center px-4 py-4 pt-20 main'>
      <input
        type="text"
        placeholder='Search here...'
        value={SearchMovie}
        onChange={(e) => setSearchMovie(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchMovieData()}
        className='bg-gray-200 px-2 py-2 border-2 border-gray-500 rounded-l-lg outline-none w-80 text-black placeholder-gray-400'
      />

      <button
        onClick={fetchMovieData}
        className='bg-[#140c35d6] shadow-md px-4 border border-gray-500 border-t-2 border-r-2 border-b-2 rounded-r-lg text-white'
      >
        Search
      </button>
    </div>
  );
}

export default Searchbar;
