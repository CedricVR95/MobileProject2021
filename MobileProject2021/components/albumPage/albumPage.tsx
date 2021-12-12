import axios from "axios";
import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Album } from "../../types";

interface AlbumProps {
  navigation: any;
  albumData: Album[];
}

interface navProp {
  album: Album;
}

//--- STRINGS FOR API CALL ---
const baseURL = "https://theaudiodb.com/api/v1/json/2";
const getAllTrackInfoByAlbumId: string = "/track.php?m=";


const AlbumPage = ({navigation, albumData}:AlbumProps) => {
  const [trackData, setTrackData] = useState();

  const getTracks = async(albumId:number) => {
    try{
    const data = await axios({
      method: "get",
      url: baseURL + getAllTrackInfoByAlbumId + albumId.toString()
    })
    setTrackData(data.data.track);
    // return(data.data.track);
  }catch (e: any) {
    alert("Track data not found");
  }}
  

  const handlePress = async(albumId:number) => {
    try {
      /*const trackData = */await getTracks(albumId);
      // console.log(trackData);
      navigation.navigate("Tracks", {trackData: trackData});
    } catch (e: any) {
      alert("Track data not found");
    }
  };

  /*
  <FlatList<Album>
renderAlbum={
({album}) => <View style={styles.albumpage}>
      {albumData.map((album: Album) => {
        return (
          <View key={album.idAlbum}>
            <Text>ALBUM</Text>
            <Text>{album.strAlbum}</Text>
            <Text>{album.intYearReleased}</Text>
            <Image
              source={{ uri: album.strAlbumThumb }}
              style={{ height: 200, width: 200 }}
            />
            <Image
              source={{ uri: album.strAlbumThumbBack }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        );
      })}
      <TouchableOpacity onPress={handlePress}>
        <Text>Tracks</Text>
      </TouchableOpacity>
    </View>
}
keyExtractor={
(album : Album) => album.idAlbum
}
album={albumData}/>
*/

  return (
    
    <FlatList<Album>
      renderItem={({ item }) => (
        <View>
          <Text>ALBUM</Text>
          <Text>{item.strAlbum}</Text>
          <Text>{item.intYearReleased}</Text>
          <Image
            source={{ uri: item.strAlbumThumb }}
            style={{ height: 200, width: 200 }}
          />
          {/* <Image
            source={{ uri: item.strAlbumThumbBack }}
            style={{ height: 200, width: 200 }}
          /> */}
          <TouchableOpacity onPress={() => handlePress(item.idAlbum!)}>
            <Text>Tracks</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(album: Album) => album.idAlbum!.toString()}
      data={albumData}
    />
    // <View>
    //   <Text>TEST</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  albumpage: {
    flex: 30,
  },
});

export default AlbumPage;
