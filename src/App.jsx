import './App.css';
import Searchbar from './components/Searchbar.jsx';
import MovieCard from './components/MovieCard.jsx';
import Nav from './components/Nav.jsx';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Contact from './components/Contact.jsx';
import About from './components/About.jsx';

function App() {
  const [AllmovieData, setAllmovieData] = useState([]);
  const [SearchMovie, setSearchMovie] = useState("");
  const [Loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_KEY;

  // 🔹 Fetch popular movies on page load
  const fetchPopularMovies = async () => {
    if (!apiKey) {
      console.error("TMDB API key is missing. Please set VITE_TMDB_KEY in your .env file.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
      const data = await res.json();
      setAllmovieData(data.results || []);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch searched movies
  const fetchMovieData = async () => {
    if (!apiKey) {
      console.error("TMDB API key is missing. Please set VITE_TMDB_KEY in your .env file.");
      return;
    }
    if (!SearchMovie.trim()) {
      fetchPopularMovies(); // if no search term, show popular
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(SearchMovie)}`);
      const data = await res.json();
      setAllmovieData(data.results || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load popular movies when app starts
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg">
              <div>
                <Searchbar
                  SearchMovie={SearchMovie}
                  setSearchMovie={setSearchMovie}
                  fetchMovieData={fetchMovieData}
                />
                <MovieCard AllmovieData={AllmovieData} Loading={Loading} />
              </div>
            </div>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
