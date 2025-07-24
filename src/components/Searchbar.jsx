import React from 'react'


function Searchbar({SearchMovie, setSearchMovie, fetchMovieData}) {
  return (
    <div className='main flex justify-center py-4 px-4 pt-20 '>
      <input type="text"
        placeholder='Search here...'
        value={SearchMovie}
        onChange={(e)=>setSearchMovie(e.target.value)}
        className='bg-gray-200 rounded-l-lg placeholder-gray-400 px-2 py-2  outline-none border-2 border-gray-500 text-black  w-80'
       />

      <button 
      onClick={fetchMovieData}
      className='bg-[#140c35d6] px-4 text-white rounded-r-lg border-t-2 border-b-2 border-r-2 border border-gray-500 shadow-md '>Search</button>

    </div>
  )
}

export default Searchbar
