import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View , Text, Image, Button } from "react-native";
import axios from "axios";
import VoorbeeldArtist from "./components/VoorbeeldArtisten/VoorbeeldArtisten";

export interface Artist {
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

const baseURL = "https://theaudiodb.com/api/v1/json/2";
const getArtistInfoByArtistName: string = "/search.php?s=";

export default function App() {
  
  const [VoorbeeldartistData, setVoorbeeldArtistData] = useState<Artist[]>([]);
  const voorbeeldArtisten : Artist[] = [];
  const [updating, setUpdating] = useState(true);
  //--- AJAX CALLS ---
  const getVoorbeeldArtistDataByName = async () => {
    setUpdating(true);
    let voorbeeldArtist: string[] = ["coldplay", "daft_punk", "nirvana", "imagine_dragons", "The_Weeknd"]
      const artistDataByName = await axios({
        method: "get",
        url: baseURL + getArtistInfoByArtistName + voorbeeldArtist,
      })
      
      voorbeeldArtisten.push(artistDataByName.data.artists[0]) 
      console.log(voorbeeldArtisten)
       
      setVoorbeeldArtistData(voorbeeldArtisten)
      
      setUpdating(false);
  };
  useEffect(() => {
    setTimeout(() => {
      
      
      getVoorbeeldArtistDataByName()
  },1000);
},[])


  return (
//     <View style={styles.container}> 
//       <StatusBar style="auto" hidden={true} />
//       {updating ? <View><Text>Loading data</Text></View> :
//          voorbeeldArtisten.map((e: Artist) =>{
        
//         <View key={e.idArtist} style={styles.list}>
//           <Text>{e.idArtist}</Text>
//           <Image source={{ uri: e.strArtistBanner }}
//         style={{ height: 100, width: 200 }}></Image>
//           <Text>{e.strBiographyEN}</Text>
//           <Text>ok</Text>
//           {console.log(e)}
//         </View> 
// })}
//     </View>
    <View>
      {voorbeeldArtisten.map((artist:any) => {
        return(
          <View>
            <Text>{artist.idArtist}</Text>
//           <Image source={{ uri: artist.strArtistBanner }}/>
          </View>
        )
      })}
    </View>
  );
}
//<Button onPress={}><p>{e.strArtist}</p></Button>
/**/
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
    border: '2px solid black'
  }
});

/*
const [Voorbeeldartist, setVoorbeeldArtist] = useState<DataArtist[]>([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "https://theaudiodb.com/api/v1/json/2";
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
      
      setVoorbeeldArtist(artistDataByName.data.artists[0])
      setLoading(false);
    }
      useEffect(() => {
        loadVoorbeeldArtistData();
        },[]);*/