import { TextInput, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import AppText from "../components/AppText";
import Spacing from "../constants/Spacing";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import SectionHeader from "../components/SectionHeader";
import Screen from "../components/Screen";
import { useDispatch, useSelector } from "react-redux";
import { selectMovie } from "../redux/movieSlice";
import { getMoviesAction } from "../redux/actions";
import MovieCard from "../components/MovieCard";
import { FlashList } from '@shopify/flash-list';



const HomeScreen= ({ navigation: { navigate } }) => {

const dispatch = useDispatch();
const { movieList } = useSelector(selectMovie)
const [inputValue, setInputValue] = useState('');

useEffect(() => {
  dispatch(getMoviesAction())
})

const filteredMovies = useMemo(
  () =>
  movieList?.filter(movie => movie?.title?.toLowerCase().includes(inputValue?.toLowerCase())),
  [inputValue, movieList]
);

const renderItem = ({item}) => <MovieCard key={item.id} movie={item} />;

const keyExtractor = item => item.id?.toString();

  return (
      <Screen style={{ paddingHorizontal : 5, flex: 1}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginLeft: Spacing.margin.base,
              }}
            >
              
              <AppText
                style={{
                  fontFamily: Font["poppins-semiBold"],
                  textTransform: "capitalize",
                  fontSize: FontSize.xxl,
                  color: Colors.accent
                }}
              >
                M 
                <AppText style={{
                  fontFamily: Font["poppins-semiBold"],
                  fontSize: FontSize.xl,
                  color: Colors.text
                }}>
                 OVIES
                </AppText>
              </AppText>
            </View>
          </View>
          <IconButton name='heart-outline' onPress={() => navigate('Favourites')} />
        </View>

        <View
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: Spacing.padding.sm,
            paddingHorizontal: Spacing.padding.base,
            borderRadius: Spacing.borderRadius.base,
            marginVertical: Spacing.margin.xl,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20
          }}
        >
          <Ionicons name='search-outline' size={24} color={Colors.text}  />
          <TextInput
            placeholder='Search Movies..'
            placeholderTextColor={Colors.text}
            style={{
              fontSize: FontSize.base,
              width: "80%",
              color: 'white'
            }}
            onChangeText={text => setInputValue(text)}
            value={inputValue}
          />
          <IconButton
            name='options-outline'
            style={{
              backgroundColor: Colors.accent,
            }}
            color={Colors.black}
          />
        </View>
        <SectionHeader title='Top movies of the week'  />
        <FlashList
          numColumns={2}
          data={filteredMovies}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={258}
      />
    </Screen>
    
  );
};

export default HomeScreen;
