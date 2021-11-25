import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SearchArtist from "./components/searchArtist/searchArtist";
import { Artist } from "./types";
import axios from "axios";
import Footer from "./components/footer/footer";
import ArtistPage from "./components/artistPage/artistPage";

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

export default function App() {
  //--- STATES ---
  const [artistName, setArtistName] = useState<string>("");
  const [artistData, setArtistData] = useState<Artist>({});
  
  //--- AJAX CALLS ---
  const getArtistDataByName = async (artistName: string) => {
    try{
      const artistDataByName = await axios({
        method: "get",
        url: baseURL + getArtistInfoByArtistName + artistName,
      });
      setArtistData(artistDataByName.data.artists[0]);
    } catch(e: any){
      alert("Artist not found");
    }
  };

  return (
  <View style={styles.container}>
    <StatusBar style="auto" hidden={true} />
    <SearchArtist setState={setArtistName} state={artistName} getData={getArtistDataByName}></SearchArtist>
    <ArtistPage artist={artistData}></ArtistPage>
    <Footer></Footer>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "space-around",
  },
  list:{
    padding: 20,
    margin: 10,
    backgroundColor: '#bbb'
  }
});
