import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import VoorbeeldArtisten from "./components/VoorbeeldArtisten/VoorbeeldArtisten";

export interface DataArtist {
  idArtist?: number;
  idLabel?: number;
  intBornYear?: number;
  intCharted?: string;
  intDiedYear?: string;
  intFormedYear?: string;
  intMembers?: string;
  strArtist?: string;
  strArtistAlternate?: string;
  strArtistBanner?: string;
  strArtistClearart?: string;
  strArtistFanart?: string;
  strArtistFanart2?: string;
  strArtistFanart3?: string;
  strArtistFanart4?: string;
  strArtistLogo?: any;
  strArtistStripped?: string;
  strArtistThumb?: string;
  strArtistWideThumb?: string;
  strBiographyCN?: string;
  strBiographyDE?: string;
  strBiographyEN?: string;
  strBiographyES?: string;
  strBiographyFR?: string;
}

export default async function App() {
  const [Voorbeeldartist, VoorbeeldsetArtist] = useState<DataArtist[]>([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "https://theaudiodb.com/api/v1/json/1";
  // const artistName: string = "nirvana";
  const getArtistInfoByArtistName: string = "/search.php?s=";
  //--- AJAX CALLS ---
  let voorbeeldArtist: string[] = ["coldplay", "daft_punk", "nirvana", "imagine_dragons", "The_Weeknd"]
    const loadVoorbeeldArtistData = async() => {
      setLoading(true);
      const artistDataByName = await axios({
        method: "get",
        url: baseURL + getArtistInfoByArtistName + voorbeeldArtist,
      });
      
      VoorbeeldsetArtist(artistDataByName.data.artists[0])
      setLoading(false);
    }
      useEffect(() => {
        loadVoorbeeldArtistData();
        },[]);
  return (
    <View style={styles.container}> 
      <StatusBar style="auto" hidden={true} />
      <View>
      {loading ? <div>Loading data</div> :
        <VoorbeeldArtisten   name={Voorbeeldartist} />}
      
        
      </View>
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
