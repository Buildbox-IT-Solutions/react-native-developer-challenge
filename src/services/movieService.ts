import axios from 'axios';
import { MovieSearchResponse, MovieDetails } from '../types/movie';

const API_KEY = '3d39487c'; // Demo API key - you should use your own
const BASE_URL = 'https://www.omdbapi.com/';

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const movieService = {
  searchMovies: async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
    try {
      const response = await movieApi.get('', {
        params: {
          s: query,
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  getMovieDetails: async (imdbID: string): Promise<MovieDetails> => {
    try {
      const response = await movieApi.get('', {
        params: {
          i: imdbID,
          plot: 'full',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },
};