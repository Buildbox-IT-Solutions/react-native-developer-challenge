import { MediaType, TrendingResult } from "../interfaces/apiResult";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

export const getTrending = async (): Promise<TrendingResult> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=pt-BR&api_key=${API_KEY}&page=${1}`
    )
 
    const data = await response.json()

    return data
}

export const getSearchResults = async (query: string): Promise<TrendingResult> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?language=pt-BR&api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    )

    const data = response.json()
    return data;
}

export const getMovieDetails = async (id: number, type: MediaType) : Promise<any> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=pt-BR&api_key=${API_KEY}`
    );
  
    const data = await response.json()
    return data;


}