import { getTopMovies, getMovieDetails } from "../api/MoviesApi";
import { AddToFavourite, DeleteFromFavourite, GetTopMovies, GetMovieDetails } from "./MovieSlice";

    const getMoviesAction = () => async dispatch => {
        const res = await getTopMovies();
        dispatch(GetTopMovies(res.results));
    };
    const deleteFromFavouriteAction =
        ({movieId}) =>
        async dispatch => {
         dispatch(DeleteFromFavourite(movieId));
    };
    
    const addToFavouriteAction = movie => async dispatch => {
        dispatch(AddToFavourite(movie));
    };
  
  const getMovieDetailsAction =
        ({movieId}) =>
        async dispatch => {
        const res = await getMovieDetails(movieId);
        dispatch(GetMovieDetails({data: res, movieId: movieId}));
    };

export { getMoviesAction, deleteFromFavouriteAction, addToFavouriteAction, getMovieDetailsAction };