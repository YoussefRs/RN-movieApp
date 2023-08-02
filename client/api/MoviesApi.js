import Http from "./Http";
import {API_KEY} from "../config.json"

const getTopMovies = async () => {
    const res = await Http.get(`/trending/all/day?api_key=${API_KEY}`);
    return res.data;
  };
  const getMovieDetails = async movieId => {
    const res = await Http.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return res.data;
  };
  
  export {getTopMovies, getMovieDetails};