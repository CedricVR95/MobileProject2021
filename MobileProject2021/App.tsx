import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SearchArtist from "./components/searchArtist/searchArtist";
import { Artist } from "./types";
import axios from "axios";
import Footer from "./components/footer/footer";
import ArtistPage from "./components/artistPage/artistPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Navigation} from 'react-native-navigation';
import AlbumPage from "./components/albumPage/albumPage";

const Stack = createNativeStackNavigator();

//--- STRINGS FOR DIFFERENT API CALLS ---
const baseURL = "https://theaudiodb.com/api/v1/json/2";
// const artistName: string = "nirvana";
const getArtistInfoByArtistName: string = "/search.php?s=";
// const getDiscographyByArtistsName: string = "/discography.php?s=";
// const getArtistInfoByArtistId: string = "/artist.php?i=";
const getAllAlbumInfoByArtistId: string = "/album.php?i=";
const getAlbumInfoByAlbumId: string = "/album.php?m=";
const getAllTrackInfoByAlbumId: string = "/track.php?m=";
const getTrackInfoByTrackId: string = "/track.php?h=";
const getAllMusicVideosByArtistId: string = "/mvid.php?i=";

export default function App() {
  //--- STATES ---
  const [artistName, setArtistName] = useState<string>("");
  const [artistId, setArtistId] = useState<string>("");
  const [artistData, setArtistData] = useState<Artist>({});

  //--- AJAX CALLS ---
  const getArtistDataByName = async (artistName: string) => {
    try {
      const artistDataByName = await axios({
        method: "get",
        url: baseURL + getArtistInfoByArtistName + artistName,
      });
      await setArtistData(artistDataByName.data.artists[0]);
      await setArtistId(artistDataByName.data.artists[0].idArtist!.toString());
    } catch (e: any) {
      alert("Artist not found");
    }
  };

  const getAlbumInfoByArtistId = async (id: string) => {
    try {
      const discographyByName = await axios({
        method: "get",
        url: baseURL + getAllAlbumInfoByArtistId + id,
      });
      console.log(discographyByName.data.album[2]);
    } catch (e: any) {
      alert("Discography not found");
    }
  };

  return (
    <NavigationContainer>
      {/* <View style={styles.container}>
        <StatusBar style="auto" hidden={true} />
        <SearchArtist setState={setArtistName} state={artistName} getData={getArtistDataByName}></SearchArtist> */}
        <Stack.Navigator initialRouteName='Search'>       
          <Stack.Screen name="Search">
            {props => <SearchArtist {...props} setState={setArtistName} state={artistName} getData={getArtistDataByName}/>}
          </Stack.Screen>   
          {/* <Stack.Screen name="Search" component={SearchArtist}/> */}
          <Stack.Screen name="Artist">
            {props => <ArtistPage {...props} artist={artistData}/>}
          </Stack.Screen>
          <Stack.Screen name="Album" component={AlbumPage}/>
        </Stack.Navigator>
        {/* <ArtistPage artist={artistData}></ArtistPage> */}
        {/* <Footer></Footer> */}
      {/* </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "space-around",
  },
  list: {
    padding: 20,
    margin: 10,
    backgroundColor: "#bbb",
  },
});
