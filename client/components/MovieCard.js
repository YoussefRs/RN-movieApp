import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import {BASE_IMG} from "../config.json"
import { AntDesign } from '@expo/vector-icons'
import { deleteFromFavouriteAction, getMovieDetailsAction } from '../redux/actions'
import { selectMovie } from '../redux/movieSlice'

const MovieCard = ({ movie, favourite }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {moviesDetails} = useSelector(selectMovie);

    // Calculate the rating of the movie
    const Rating = () => {
        const rating = (moviesDetails[movie?.id]?.vote_average / 10) * 5;
        return rating.toFixed(1);
      };
    // Handle removing a movie from favorites
    const handleDeleteFavourite = () => {
      dispatch(deleteFromFavouriteAction({movieId: movie.id}));
    };
    
    useEffect(() => {
        dispatch(getMovieDetailsAction({movieId: movie.id}));
      }, []);
    

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('Details', {movie: movie})}
        style={styles.CardContainer}>
        <View style={styles.imageContainer}>
          <Image loading="lazy" source={{uri: `${BASE_IMG}${movie.poster_path}`}} style={styles.poster} />
          {favourite && (
          <TouchableOpacity onPress={handleDeleteFavourite} style={styles.minus}>
            <AntDesign name="minuscircleo" size={24} color="orange"/>
          </TouchableOpacity>
        )}
        </View>
        <Text style={{width: 153, marginTop: 5, color: 'white'}}>{movie?.title}</Text>
            <View style={styles.rating}>
            <Text style={styles.rate}>{Rating()}</Text>
            <AntDesign name="star" size={18} color="gold" />
            </View>
      </TouchableOpacity>
  )
}

export default MovieCard

const styles = StyleSheet.create({
    CardContainer: {
      flex: 1 / 2,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 20
    },
    poster: {width: 153, height: 200, objectFit: 'cover'},
    imageContainer: {position: 'relative'},
    rating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3
      },
      rate: {marginRight: 5, color: 'white'},
      minus: {
        position: 'absolute',
        top: 5,
        right: 10,
        zIndex: 99,
        borderRadius: 99
      },
    
  });