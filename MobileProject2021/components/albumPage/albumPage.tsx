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
  Alert,
} from "react-native";
import { Album } from "../../types";


interface AlbumProps {
  navigation: any;
  albumData: Album[];
  setName:any;
}

interface navProp {
  album: Album;
}

//--- STRINGS FOR API CALL ---
const baseURL = "https://theaudiodb.com/api/v1/json/2";
const getAllTrackInfoByAlbumId: string = "/track.php?m=";

const AlbumPage = ({ navigation, albumData, setName }: AlbumProps) => {
  const getTracks = async (albumId: number) => {
    try {
      const data = await axios({
        method: "get",
        url: baseURL + getAllTrackInfoByAlbumId + albumId.toString(),
      });
      return data.data.track;
    } catch (e: any) {
      Alert.alert("Track data not found");
    }
  };

  const handlePress = async(albumId: number) => {
    try {
      let trackData = await getTracks(albumId);
      // console.log(trackData);
      setName(trackData[0].strAlbum);
      navigation.navigate(trackData[0].strAlbum + " by " + trackData[0].strArtist, { data: trackData });
    } catch (e: any) {
      Alert.alert("Track data not found");
    }
  };

  return (
    <FlatList<Album>
      renderItem={({ item }) => (
        <View>
          <Text>{item.strAlbum}</Text>
          <Text>{item.intYearReleased}</Text>
          <Image
            source={{ uri: item.strAlbumThumb }}
            style={{ height: 200, width: 200 }}
          />
          <TouchableOpacity onPress={() => handlePress(item.idAlbum!)}>
            <Text>Tracks</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(album: Album) => album.idAlbum!.toString()}
      data={albumData}
    />
  );
};

const styles = StyleSheet.create({
  albumpage: {
    flex: 30,
  },
});

export default AlbumPage;
