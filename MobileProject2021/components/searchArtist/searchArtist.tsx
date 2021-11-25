import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from "react-native";
import { Artist } from "../../types";

//--- STRINGS FOR DIFFERENT API CALLS ---
const baseURL = "https://theaudiodb.com/api/v1/json/1";
// const artistName: string = "nirvana";
const getArtistInfoByArtistName: string = "/search.php?s=";
const getDiscographyByArtistsName: string = "/discography.php?s=";
const getArtistInfoByArtistId: string = "/artist.php?i=";
const getAllAlbumInfoByArtistId: string = "/album.php?i=";
const getAlbumInfoByAlbumId: string = "/album.php?m=";
const getAllTrackInfoByAlbumId: string = "/track.php?m=";
const getTrackInfoByTrackId: string = "/track.php?h=";
const getAllMusicVideosByArtistId: string = "/mvid.php?i=";

//--- GET ARTIST DATA BY ARTIST NAME ---

interface SearchArtistProps {
  setState: any;
  state: string;
  getData: any;
  /*ASK FOR TYPES*/
}

const SearchArtist = (props: SearchArtistProps) => {
  const handleChange = (e: string) => {
    props.setState(e);
  };
  
  const handleSubmit = () => {
    props.getData(props.state);
  };

  return (
    <View>
      <Text>Look for an artist by entering their name</Text>
      <TextInput
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        style={{ borderWidth: 1 }}
      ></TextInput>
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={{ textAlign: "center", borderWidth: 1, marginTop: 10 }}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchArtist;
