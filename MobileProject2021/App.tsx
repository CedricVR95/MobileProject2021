import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import SearchArtist from "./components/searchArtist/searchArtist";
import { Artist, Album } from "./types";
import axios from "axios";
import ArtistPage from "./components/ArtistPage/artistPage";
import Footer from "./components/footer/footer";
import {
  NavigationContainer,
  StackNavigationState,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "react-native-navigation";
import AlbumPage from "./components/albumPage/albumPage";
import { useState } from "react";
import TracksPage from "./components/tracksPage/tracksPage";
import FavouritesPage from "./components/FavouritesPage/favourites";
import FeaturedPage from "./components/featuredPage/featuredPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

// options={{title: 'Search', headerLeft: () => (<Button title="Left" onPress={() => navigation.navigate.goBack()}></Button>)}}

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
  const [artistName, setArtistName] = useState<string>("artist");
  const [artistId, setArtistId] = useState<string>("");
  const [artistData, setArtistData] = useState<Artist>({});
  const [albumData, setAlbumData] = useState<Album[]>([]);
  const [albumName, setAlbumName] = useState<string>("album");

  //--- AJAX CALLS ---
  const getArtistDataByName = async (artistName: string) => {
    const artistDataByName = await axios({
      method: "get",
      url: baseURL + getArtistInfoByArtistName + artistName,
    });
    setArtistData(artistDataByName.data.artists[0]);
    setArtistId(artistDataByName.data.artists[0].idArtist.toString());
  };

  const getAlbumInfoByArtistId = async (id: string) => {
    const albumInfoById = await axios({
      method: "get",
      url: baseURL + getAllAlbumInfoByArtistId + id,
    });
    setAlbumData(albumInfoById.data.album);
  };

  //============================================================================================================================//

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <View style={styles.container}>
        <StatusBar style="auto" hidden={true} />
        <SearchArtist setState={setArtistName} state={artistName} getData={getArtistDataByName}></SearchArtist> 
  */}
        <Stack.Navigator
          initialRouteName="Search"
          screenOptions={{
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 25 },
            headerTitleAlign: 'center',
            
          }}
        >
          <Stack.Screen name="Search">
            {(props) => (
              <SearchArtist
                {...props}
                setState={setArtistName}
                state={artistName}
                getData={getArtistDataByName}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name={"Info about " + artistName}>
            {(props) => (
              <ArtistPage
                {...props}
                artist={artistData}
                artistId={artistId}
                getAlbums={getAlbumInfoByArtistId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name={"Albums by " + artistName}>
            {(props) => (
              <AlbumPage
                {...props}
                albumData={albumData}
                setName={setAlbumName}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name={albumName}>
            {(props) => <TracksPage {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Favourites">
            {(props) => <FavouritesPage {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Featured">
            {(props) => (
              <FeaturedPage
                {...props}
                setName={setArtistName}
                setArtist={setArtistData}
                setId={setArtistId}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <Footer></Footer>
      </NavigationContainer>
    </SafeAreaProvider>
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
