import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favouritesList: [],
  moviesDetails: {},
  movieList: [],
};
export const movieSlice = createSlice({
  name: 'Movie',
  initialState,
  reducers: {

    GetTopMovies: (state, action) => {
      state.movieList = action.payload;
    },

    AddToFavourite: (state, action) => {
      state.favouritesList = [...state.favouritesList, action.payload];
    },

    DeleteFromFavourite: (state, action) => {
      state.favouritesList = state.favouritesList.filter(movie => movie.id !== action.payload);
    },

    GetMovieDetails: (state, action) => {
      state.moviesDetails[action.payload.movieId] = action.payload.data;
    }
  }
});

export const {AddToFavourite, DeleteFromFavourite, GetTopMovies, GetMovieDetails} =
  movieSlice.actions;
  
export const selectMovie = state => state.Movie;

export default movieSlice.reducer;