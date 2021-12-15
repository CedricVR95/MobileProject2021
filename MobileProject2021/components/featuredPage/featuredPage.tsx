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

interface FeaturedProps {
  navigation: any;
  setArtist: any;
  setName: any;
  setId:any;
}

const FeaturedPage = ({ navigation, setName, setArtist, setId }: FeaturedProps) => {
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
    <ScrollView>
      {featuredArtists.map((artist: Artist) => {
        return (
          <View key={artist.idArtist}>
            <Text>{artist.strArtist}</Text>
            <TouchableOpacity onPress={() => setPressedFeatured(artist)}>
              <Text>Info</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FeaturedPage;
