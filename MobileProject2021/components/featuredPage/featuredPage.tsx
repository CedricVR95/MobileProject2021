import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Artist } from "../../types";
import { featuredArtists } from "../featuredArtists/featured";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FeaturedProps {
  navigation: any;
  setArtist: any;
  setId: any;
}

const FeaturedPage = ({ navigation, setArtist, setId }: FeaturedProps) => {
  const [pressedFeatured, setPressedFeatured] = useState<Artist>({
    idArtist: undefined,
  });
  const [favourite, setFavourite] = useState<boolean>(false);
  const [data, setData] = useState<Artist[]>([]);

  const addFavouriteItem = async (value: Artist) => {
    const data = await AsyncStorage.getItem("FavoriteArtist");
    let storageData = data ? (JSON.parse(data) as Artist[]) : ([] as Artist[]);
    if (!storageData.some((x) => x.idArtist === value.idArtist)) {
      storageData.push(value);
      const jsonValue = JSON.stringify(storageData);
      await AsyncStorage.setItem("FavoriteArtist", jsonValue);
    }
  };

  const loadFavouriteItem = async () => {
    const jsonValue = await AsyncStorage.getItem("FavoriteArtist");
    setData(jsonValue != null ? JSON.parse(jsonValue) : null);
  };

  useEffect(() => {
    loadFavouriteItem();
  }, [data]);

  const handlePress = async (artist: Artist) => {
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
    <View style={styles.container}>
      {featuredArtists.map((artist: Artist) => {
        return (
          <View key={artist.idArtist} style={styles.artistContainer}>
            <TouchableOpacity onPress={() => setPressedFeatured(artist)}>
              <Image
                source={{ uri: artist.strArtistLogo }}
                style={styles.image}
              ></Image>
            </TouchableOpacity>
            {favourite !== true ? (
              <TouchableOpacity
                onPress={() => {
                  addFavouriteItem(artist);
                }}
              >
                <Text style={styles.buttonText}>favourite {artist.strArtist}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFavourite(false);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>favourite {artist.strArtist}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
  artistContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop:-50
  },
  artistName: {
    color: "white",
  },
  button: {
    alignSelf: "center",
    marginTop:10,
    marginBottom:10
  },
  buttonText: {
    color: "white",
    borderColor:'white',
    borderWidth:2,
    borderRadius:20,
    padding:5,
    textAlign:'center',
    fontSize:13
  },
  image: {
    height: 150,
    width: 400,
    resizeMode: "center",
    marginBottom:-30
  },
});

export default FeaturedPage;
