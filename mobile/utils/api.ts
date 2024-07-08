import axios from 'axios';
import { API_KEY } from '@env';

const api = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
});

export default api;
