import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react'
import Screen from '../components/Screen';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectMovie } from '../redux/movieSlice';
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors';
import MovieCard from '../components/MovieCard';

const Favourites = () => {
    const navigation = useNavigation();
    const {favouritesList} = useSelector(selectMovie);

    // Rendering a divider between list items
    const ItemDivider = () => {
        return <View style={styles.divider} />;
    };
   // Extract the key for each item in the list
   const keyExtractor = item => item.id?.toString();

   // Render each movie item using the MovieCard component
   const renderItem = ({item}) => <MovieCard key={item.id} favourite movie={item} />;

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='banckward' size={24} color={Colors.accent} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.favouritesText}>Favourites</Text>
      </View>
      <FlatList
        numColumns={2}
        data={favouritesList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemDivider}
      />
    </Screen>
  )
}

export default Favourites

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      padding: 15,
      marginBottom: 30
    },
    divider: {
      height: 10,
      width: '100%',
      backgroundColor: '#fff'
    },
    columnWrapper: {
      flex: 0.5
    },
    favouritesText: {color: Colors.accent , fontSize: 24, fontWeight: '500'},
    icon : {
        paddingTop: 7,
    }
  });