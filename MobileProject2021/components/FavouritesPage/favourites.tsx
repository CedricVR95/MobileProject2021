import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Artist } from "../../types";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavouritedProps {
  navigation: any;
  setArtist: any;
  setName: any;
  setId:any;
} 

const FavouritesPage = ({ navigation, setName, setArtist, setId }: FavouritedProps) => {
  const [pressedFeatured, setPressedFeatured] = useState<Artist>({idArtist: undefined,});
  const [data, setData] = useState<Artist[]>([]);
  
  const loadFavouriteItem = async () => {
      const jsonValue = await AsyncStorage.getItem("FavoriteArtist");
      setData(jsonValue != null ? (JSON.parse(jsonValue)) : null);
  };
  
  const handlePress = async (artist: Artist) => {
    await setName(artist.strArtist?.trim());
    await setArtist(artist);
    await setId(artist.idArtist);
    navigation.navigate("Info about " + artist.strArtist);
  };
  useEffect(() => {
      loadFavouriteItem()
    if (pressedFeatured.idArtist !== undefined) {
      handlePress(pressedFeatured);
    }  
  }, [pressedFeatured]);
  return (
    <View>
      <Text>Favourites</Text>
      {data !== null?
      
      data.map(artist => (
      <View key={artist.idArtist}>
      <Text>{artist.strArtist}</Text>
      <TouchableOpacity onPress={() => setPressedFeatured(artist)}>
              <Text>Info</Text>
      </TouchableOpacity>
      </View>))
      : <Text>You have not favourited an artist.</Text>
      }
    </View>
  );
};

export default FavouritesPage;
