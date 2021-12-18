import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Artist } from "../../types";
import { featuredArtists } from "../featuredArtists/featured";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface FeaturedProps {
  navigation: any;
  setArtist: any;
  setName: any;
  setId: any;
}

const FeaturedPage = ({
  navigation,
  setName,
  setArtist,
  setId,
}: FeaturedProps) => {
  const [pressedFeatured, setPressedFeatured] = useState<Artist>({
    idArtist: undefined,
  });

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
    <View style={styles.container}>
      {featuredArtists.map((artist: Artist) => {
        return (
          <View key={artist.idArtist} style={styles.artistContainer}>
            <TouchableOpacity
              onPress={() => setPressedFeatured(artist)}
              style={styles.button}
            >
              <Image
                source={{ uri: artist.strArtistLogo }}
                style={styles.image}
              ></Image>
            </TouchableOpacity>
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
  },
  artistName: {
    color: "white",
  },
  button: {},
  buttonText: {
    color: "white",
  },
  image: {
    // alignSelf: "stretch",
    height: 150,
    width: 400,
    resizeMode: "center",
  },
});

export default FeaturedPage;
