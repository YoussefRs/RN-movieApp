import axios from "axios";
import {BASE_URL, API_KEY} from '../config.json'

// Create an instance of Axios with a base URL
const Http = axios.create({baseURL: BASE_URL});

const getTopMovies = async () => {
    const res = await Http.get(`/trending/all/day?api_key=${API_KEY}&page=1`);
    return res.data
  };

const getMovieDetails = async movieId => {
    const res = await Http.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return res.data;
  };
  
  export {getTopMovies, getMovieDetails};