import { GetMovieDetails, GetTopMovies, AddToFavourite, DeleteFromFavourite } from "./movieSlice";
import { getMovieDetails, getTopMovies } from "../data/Api";

const getMoviesAction = () => async dispatch => {
    const res = await getTopMovies();
    dispatch(GetTopMovies(res.results));
};

const getMovieDetailsAction =
    ({movieId}) =>
    async dispatch => {
    const res = await getMovieDetails(movieId);
    dispatch(GetMovieDetails({data: res, movieId: movieId}));
};
const addToFavouriteAction = movie => async dispatch => {
    dispatch(AddToFavourite(movie));
};

const deleteFromFavouriteAction =
    ({movieId}) =>
    async dispatch => {
    dispatch(DeleteFromFavourite(movieId));
};
    

export { getMoviesAction, getMovieDetailsAction, deleteFromFavouriteAction, addToFavouriteAction };