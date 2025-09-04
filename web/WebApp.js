import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '3d39487c';
const BASE_URL = 'https://www.omdbapi.com';

const MOCK_MOVIES = [
  {
    imdbID: 'tt0372784',
    Title: 'Batman Begins',
    Year: '2005',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt1345836',
    Title: 'The Dark Knight Rises',
    Year: '2012',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0096895',
    Title: 'Batman',
    Year: '1989',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg'
  }
];

const MOCK_MOVIE_DETAILS = {
  'tt0468569': {
    Title: 'The Dark Knight',
    Year: '2008',
    Director: 'Christopher Nolan',
    Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    Genre: 'Action, Crime, Drama',
    Runtime: '152 min',
    imdbRating: '9.0',
    Plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
  }
};

const WebApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('batman');
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/?apikey=${API_KEY}&s=${query}&type=movie`
      );
      if (response.data.Response === 'True') {
        setMovies(response.data.Search || []);
      } else {
        // Use mock data if API fails or returns no results
        setMovies(MOCK_MOVIES);
      }
    } catch (error) {
      console.error('Error searching movies, using mock data:', error);
      // Fallback to mock data when API fails
      setMovies(MOCK_MOVIES);
    }
    setLoading(false);
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`
      );
      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
      } else {
        // Use mock details if available
        if (MOCK_MOVIE_DETAILS[id]) {
          setSelectedMovie(MOCK_MOVIE_DETAILS[id]);
        }
      }
    } catch (error) {
      console.error('Error fetching movie details, using mock data:', error);
      // Fallback to mock details
      if (MOCK_MOVIE_DETAILS[id]) {
        setSelectedMovie(MOCK_MOVIE_DETAILS[id]);
      }
    }
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  };

  if (selectedMovie) {
    return (
      <div style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <button 
          onClick={() => setSelectedMovie(null)}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          ← Back to Movies
        </button>
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <img 
            src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : '/api/placeholder/300/400'}
            alt={selectedMovie.Title}
            style={{
              width: '300px',
              height: 'auto',
              borderRadius: '10px'
            }}
          />
          <div style={{ flex: 1 }}>
            <h1>{selectedMovie.Title} ({selectedMovie.Year})</h1>
            <p><strong>Director:</strong> {selectedMovie.Director}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
            <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
            <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Movie App</h1>
      
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        justifyContent: 'center'
      }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          style={{
            flex: 1,
            maxWidth: '400px',
            padding: '10px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <p>Loading movies...</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => getMovieDetails(movie.imdbID)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                background: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/200/300'}
                alt={movie.Title}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  marginBottom: '10px'
                }}
              />
              <h3 style={{ margin: '10px 0 5px 0', fontSize: '16px' }}>
                {movie.Title}
              </h3>
              <p style={{ margin: '5px 0', color: '#666' }}>
                {movie.Year} • {movie.Type}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>No movies found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default WebApp;