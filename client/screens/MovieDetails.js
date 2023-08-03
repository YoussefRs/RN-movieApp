import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { BASE_IMG } from '../config.json'
import { useDispatch, useSelector } from 'react-redux';
import { selectMovie } from '../redux/movieSlice';
import { useNavigation } from '@react-navigation/native'
import { addToFavouriteAction, deleteFromFavouriteAction } from '../redux/actions';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const MovieDetails = ({route}) => {
    const {movie} = route.params || {};
    const {moviesDetails, favouritesList} = useSelector(selectMovie);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const favouriteIdList = favouritesList.map(favourite => favourite.id);
    const [isFavourite, setIsFavourite] = useState(favouriteIdList.includes(movie?.id));

    //Calculate the rating from the vote average values
  const Rating = () => {
    const rating = (moviesDetails[movie?.id]?.vote_average / 10) * 5;
    return rating.toFixed(1);
  };

  // Handle adding a movie to favorites
  const handleAddFavourite = () => {
    setIsFavourite(oldState => !oldState);
    dispatch(addToFavouriteAction(movie));
  };
  
  // Handle removing a movie from favorites
  const handleDeleteFavourite = () => {
    setIsFavourite(oldState => !oldState);
    dispatch(deleteFromFavouriteAction({movieId: movie.id}));
  };

  return (
      <ScrollView >
        <View style={styles.headerContainer}>
              <Image source={{uri: `${BASE_IMG}${movie.poster_path}`}} style={styles.image} />
           
            <View style={styles.header}>
              <AntDesign name='banckward' size={24} color={Colors.accent} onPress={() => navigation.goBack()} />
              {isFavourite ? (
                <AntDesign name="heart" color="red" size={24} onPress={handleDeleteFavourite}  />
                ) : (
                <AntDesign name="hearto" size={24} color='white' onPress={handleAddFavourite}  />
                            )}
            </View>  
            <LinearGradient colors={['black', 'transparent']} style={styles.gradientContainer}>
              <View style={styles.infoContainer}>
                  <View style={{width: '85%'}}>
                              <Text style={styles.movieTitle}>{movie?.title}</Text>
                    <View style={styles.info}>
                      <View style={styles.infoTitleContainer}>
                        <Text style={styles.infoTitle}>Duration</Text>
                        <Text style={[styles.infoTitle, styles.infoValue]}>
                        {moviesDetails[movie?.id]?.runtime} min
                        </Text>
                      </View>
                      <View style={styles.infoTitleContainer}>
                        <Text style={styles.infoTitle}>Release date</Text>
                        <Text style={(styles.infoTitle, styles.infoValue)}>{movie?.release_date}</Text>
                      </View>
                    </View>
                    <View style={styles.category}>
                      {moviesDetails[movie?.id]?.genres?.map(genre => (
                      <Text key={genre.id} style={styles.genre}>{genre?.name}</Text>
                      ))}
                    </View>
                  </View>
                  <View style={styles.rateContainer}>
                    <Text style={styles.rate}>{Rating()}</Text>
                    <AntDesign name="star" size={18} color="gold" />
                  </View>
              </View>
            </LinearGradient>
            
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <View style={styles.overviewText}>
              <Text style={{color: 'white'}}>{movie?.overview}</Text>
          </View>
        </View>
      </ScrollView>
    
  )
}

export default MovieDetails

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
    },
    overviewContainer: {display: 'flex', paddingTop: 1, paddingHorizontal: 10},
    overviewText: {padding: 12},
    overviewTitle: {color: '#fff', fontSize: 24, fontWeight: '500'},
    movieTitle: {color: '#fff', fontSize: 28, fontWeight: '500', marginBottom: 30},
    info: {display: 'flex', flexDirection: 'row', marginBottom: 20},
    infoTitleContainer: {display: 'flex', flexDirection: 'column'},
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical : 50,
    },
    infoTitle: {color: '#fff', marginRight: 20},
    infoValue: {marginTop: 3, color: '#fff'},
    category: {
      display: 'flex',
      paddingHorizontal: 0,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    genre: {
      color: '#fff',
      borderWidth: 1,
      borderRadius: 99,
      borderColor: '#fff',
      paddingVertical: 5,
      paddingHorizontal: 10,
      height: 35,
      textAlign: 'center',
      marginRight: 10,
      marginTop: 5
    },
    headerContainer: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: 620,
      justifyContent: 'space-between'
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '110%',
      height: '100%',
      objectFit: 'fill',
      zIndex: -1
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 15,
      paddingBottom: 80
    },
    rate: {color: '#fff', fontSize: 15, fontWeight: '500', marginRight: 10},
    rateContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center'
    }
  });