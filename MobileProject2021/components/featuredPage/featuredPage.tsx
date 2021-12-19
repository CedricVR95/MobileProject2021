import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollViewBase,
  ScrollView,
} from "react-native";
import { Artist } from "../../types";
import {featuredArtists} from "../featuredArtists/featured";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FeaturedProps {
  navigation: any;
  setArtist: any;
  setName: any;
  setId:any;
}

const FeaturedPage = ({ navigation, setName, setArtist, setId }: FeaturedProps) => {
  const [pressedFeatured, setPressedFeatured] = useState<Artist>({idArtist: undefined,});
  const [favourite, setFavourite] = useState<boolean>(false);
  const [data, setData] = useState<Artist[]>([]);

  const addFavouriteItem = async (value: Artist) => {
      const data = await AsyncStorage.getItem('FavoriteArtist')
      let storageData = data? JSON.parse(data) as Artist[]: [] as Artist[];
      if(!storageData.some(x => x.idArtist === value.idArtist)){
        storageData.push(value);
        const jsonValue = JSON.stringify(storageData);
        await AsyncStorage.setItem('FavoriteArtist', jsonValue);}
      }
      

      
  
  const loadFavouriteItem = async () => {
      const jsonValue = await AsyncStorage.getItem("FavoriteArtist");
      setData(jsonValue != null ? (JSON.parse(jsonValue)) : null);
  };
          

  useEffect(() => {
    setTimeout(() => {
    
    loadFavouriteItem()
      }, 1000);
  }, [data]);
      
  const handlePress = async (artist: Artist) => {
    await setName(artist.strArtist?.trim());
    await setArtist(artist);
    await setId(artist.idArtist);
    navigation.navigate("Info about " + artist.strArtist);
  };

  useEffect(() => {
    if (pressedFeatured.idArtist !== undefined) {
      handlePress(pressedFeatured);
    }
  }, [pressedFeatured]);

  return (
    <ScrollView>
      {featuredArtists.map((artist: Artist) => {
        return (
          <View key={artist.idArtist}>
            <Text>{artist.strArtist}</Text>
            <TouchableOpacity onPress={() => setPressedFeatured(artist)}>
              <Text>Info</Text>
            </TouchableOpacity>
            {favourite !== true ?
            <TouchableOpacity onPress={() => {addFavouriteItem(artist);}}>
              <Text>favourite</Text>
            </TouchableOpacity>:
            <TouchableOpacity onPress={() => {setFavourite(false);}}>
              <Text>favourite</Text>
            </TouchableOpacity>}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FeaturedPage;
