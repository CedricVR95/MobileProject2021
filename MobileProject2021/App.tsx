import * as React from "react";
import SearchArtist from "./components/searchArtist/searchArtist";
import { Artist, Album } from "./types";
import axios from "axios";
import ArtistPage from "./components/ArtistPage/artistPage";
import Footer from "./components/footer/footer";
import {NavigationContainer,} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumPage from "./components/albumPage/albumPage";
import { useState } from "react";
import TracksPage from "./components/tracksPage/tracksPage";
import FavouritesPage from "./components/FavouritesPage/favourites";
import FeaturedPage from "./components/featuredPage/featuredPage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserPage from "./components/userDataPage/user";
import { StatusBar } from "expo-status-bar";

//--- STACK NAVIGATOR ---
const Stack = createNativeStackNavigator();

//--- STRINGS FOR DIFFERENT API CALLS ---
const baseURL = "https://theaudiodb.com/api/v1/json/2";
const getArtistInfoByArtistName: string = "/search.php?s=";
const getAllAlbumInfoByArtistId: string = "/album.php?i=";

export default function App() {
  const[artistName, setArtistName] = useState<string>('');
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
    await setArtistId(artistDataByName.data.artists[0].idArtist!.toString());
    await setArtistData(artistDataByName.data.artists[0]);
    return artistDataByName.data.artists[0];;
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
      <StatusBar hidden/>
      <NavigationContainer>
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
                setName={setArtistName}
                nameState={artistName}
                getData={getArtistDataByName}
                artistState={artistData}
                setArtistState={setArtistData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name={"Info about " + artistData.strArtist}>
            {(props) => (
              <ArtistPage
                {...props}
                artist={artistData}
                artistId={artistId}
                getAlbums={getAlbumInfoByArtistId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name={"Albums by " + artistData.strArtist}>
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
            {(props) => <FavouritesPage {...props} setName={setArtistName} setArtist={setArtistData} setId={setArtistId}/>}
          </Stack.Screen>
          <Stack.Screen name="Featured">
            {(props) => (
              <FeaturedPage
                {...props}
                setArtist={setArtistData}
                setId={setArtistId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name = 'User'>
            {(props) => <UserPage {...props}/>}
          </Stack.Screen>
        </Stack.Navigator>
        <Footer></Footer>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}