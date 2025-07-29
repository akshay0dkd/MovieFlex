// //  e42c733
// const API_URL = 'http://www.omdbapi.com/?apikey=e42c733'

import './App.css'
import Searchbar from './components/Searchbar.jsx'
import MovieCard from './components/MovieCard.jsx'
import Nav from './components/Nav.jsx'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'
// import { useLocation } from 'react-router-dom';


function App() {
  const [AllmovieData, setAllmovieData] = useState([]);
  const [SearchMovie, setSearchMovie] = useState("");
  const [Loading, setLoading] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`https://omdbapi.com/?s=${SearchMovie}&apikey=a1de9591`);
      const data = await res.json();
      console.log(data.Search);
      setAllmovieData(data.Search || []); // Use an empty array if no results found
      setLoading(false);
    }
    catch (error) {

      console.error("Error fetching movie data:", error);
      setLoading(false);
    }
  }

  return (
    <>

      <Nav />

      <Routes>
        <Route path='/' element={
          <>
          
            <div className='bg'>
              <div>
                <Searchbar SearchMovie={SearchMovie}
                  setSearchMovie={setSearchMovie}
                  fetchMovieData={fetchMovieData} />
                <MovieCard AllmovieData={AllmovieData}
                  Loading={Loading} />
              </div>
            </div>
          
          </>
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About />} />

      </Routes>


    </>
  )
}

export default App
