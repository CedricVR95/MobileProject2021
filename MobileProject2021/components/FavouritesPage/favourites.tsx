import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Artist } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavouritedProps {
  navigation: any;
  setArtist: any;
  setName: any;
  setId: any;
}

const FavouritesPage = ({
  navigation,
  setName,
  setArtist,
  setId,
}: FavouritedProps) => {
  const [pressedFeatured, setPressedFeatured] = useState<Artist>({
    idArtist: undefined,
  });
  const [data, setData] = useState<Artist[]>([]);

  const loadFavouriteItem = async () => {
    const jsonValue = await AsyncStorage.getItem("FavoriteArtist");
    setData(jsonValue != null ? JSON.parse(jsonValue) : null);
  };

  const handlePress = async (artist: Artist) => {
    await setName(artist.strArtist?.trim());
    await setArtist(artist);
    await setId(artist.idArtist);
    navigation.navigate("Info about " + artist.strArtist);
  };
  useEffect(() => {
    loadFavouriteItem();
    if (pressedFeatured.idArtist !== undefined) {
      handlePress(pressedFeatured);
    }
  }, [pressedFeatured]);
  return (
    <ScrollView style={styles.container}>
      {data !== null ? (
        data.map((artist) => (
          <View key={artist.idArtist}>
            <Image
              source={{ uri: artist.strArtistLogo }}
              style={styles.image}
            ></Image>
            <Text>{artist.strArtist}</Text>
            <TouchableOpacity
              onPress={() => setPressedFeatured(artist)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Info</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
          <Text style={styles.string}>You have not favourited an artist.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -20,
    textAlign: "center",
    fontSize: 20,
  },
  string: {
    color: "white",
    fontSize: 50,
    alignSelf: "center",
    textAlign: "center",
    marginTop:200
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    height: 150,
    width: 400,
    resizeMode: "center",
    marginBottom: -30,
  },
});

export default FavouritesPage;
