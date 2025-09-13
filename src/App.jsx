
import './App.css'
import Searchbar from './components/Searchbar.jsx'
import MovieCard from './components/MovieCard.jsx'
import Nav from './components/Nav.jsx'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'




function App() {
  const [AllmovieData, setAllmovieData] = useState([]);
  const [SearchMovie, setSearchMovie] = useState("");
  const [Loading, setLoading] = useState(false);

 const fetchMovieData = async () => {
  try {
    const apiKey = "8a5159ae66789c60b6417ade00adc19e";
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(SearchMovie)}`);
    const data = await res.json();
    console.log(data.results); // Corrected
    setAllmovieData(data.results || []);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    setLoading(false);
  }
};
 




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
  );
}

export default App;
