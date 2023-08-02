
import React, { useEffect, useState, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Screen from "../components/Screen";
import Spacing from "../constants/Spacing";
import AppText from "../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import {View, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity} from 'react-native';
import { getMoviesAction } from "../redux/Actions";
import { selectMovie } from "../redux/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

const HomeScreen = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const { movieList } = useSelector(selectMovie)
    
    // Component for rendering a divider between list items
    const ItemDivider = () => {
        return <View style={styles.divider} />;
    };

    useEffect(() => {
        dispatch(getMoviesAction())
    })

     // Filter movies based on the search value
    const filteredMovies = useMemo(
        () =>
        movieList?.filter(movie => movie?.title?.toLowerCase().includes(inputValue?.toLowerCase())),
        [inputValue, movieList]
    );
    const keyExtractor = item => item.id?.toString();
    const renderFoodItem = ({item}) => <MovieCard key={item.id} movie={item} />;

  return (
     <Screen>
      <TouchableOpacity
        onPress={() => navigation.navigate('Favourites')}
        style={styles.favouriteContainer}>
        <Ionicons name= "heart-outline" width={28} height={28} />
      </TouchableOpacity>
      <View style={styles.SearchContainer}>
        <Ionicons name="search" style={styles.Search} />
        <TextInput
          onChangeText={text => setInputValue(text)}
          style={styles.SearchInput}
          placeholder="Rechercher"
          value={inputValue}
        />
        {inputValue !== '' && <Ionicons name="archive" onPress={() => setInputValue('')} />}
      </View>
      <FlatList
        style={styles.ListContainer}
        numColumns={2}
        data={filteredMovies}
        keyExtractor={keyExtractor}
        renderItem={renderFoodItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemDivider}
      />
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    divider: {
      height: 5,
      width: '100%',
      backgroundColor: '#fff'
    },
    Search: {
      marginRight: 5
    },
    XIcon: {
      alignSelf: 'flex-start'
    },
    SearchInput: {
      width: 250,
      paddingHorizontal: 10,
      color: '#000',
      textAlign: 'left'
    },
    SearchContainer: {
      display: 'flex',
      alignSelf: 'center',
      flexDirection: 'row',
      borderColor: '#000',
      borderWidth: 1,
      width: '90%',
      height: 49,
      borderRadius: 15,
      paddingHorizontal: 15,
      marginTop: 20,
      marginBottom: 30,
      alignItems: 'center'
    },
    ListContainer: {
      paddingLeft: 20,
      
    },
  
    favouriteContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 15
    }
  });