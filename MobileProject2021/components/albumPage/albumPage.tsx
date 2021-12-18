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
import { SafeAreaProvider } from "react-native-safe-area-context";

interface AlbumProps {
  navigation: any;
  albumData: Album[];
  setName: any;
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

  const handlePress = async (albumId: number) => {
    try {
      let trackData = await getTracks(albumId);
      // console.log(trackData);
      setName(trackData[0].strAlbum);
      navigation.navigate(
        trackData[0].strAlbum,
        { data: trackData }
      );
    } catch (e: any) {
      Alert.alert("Track data not found");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList<Album>
        renderItem={({ item }) => (
          <View style={styles.album}>
            <TouchableOpacity onPress={() => handlePress(item.idAlbum!)}>
              <Image
                source={{
                  uri: item.strAlbumThumb
                    ? item.strAlbumThumb
                    : "https://via.placeholder.com/1",
                }}
                style={styles.thumb}
              />
            </TouchableOpacity>

            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Text style={styles.infoString}>Title: </Text>
                <Text style={styles.infoString}>{item.strAlbum}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoString}>Released in: </Text>
                <Text style={styles.infoString}>{item.intYearReleased}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoString}>Sales: </Text>
                <Text style={styles.infoString}>{item.intSales} records</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => handlePress(item.idAlbum!)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Tracks on {item.strAlbum}</Text>
            </TouchableOpacity>

            <Text style={styles.descriptionTitle}>Complete Description</Text>
            <Text style={styles.description}>
              Description{item.strDescriptionEN}
            </Text>
          </View>
        )}
        keyExtractor={(album: Album) => album.idAlbum!.toString()}
        data={albumData}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  infoString: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    fontWeight: "bold",
    textAlign:'center',
    borderRadius: 20,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 25,
  },
  container: {
    alignItems: "stretch",
    backgroundColor: "black",
  },
  album: {
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
  },
  thumb: {
    height: 200,
    width: 200,
    resizeMode: "center",
    alignSelf: "center",
  },
  descriptionTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  description: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
  },
  infoContainer: {
    alignItems: "stretch",
  },
});

export default AlbumPage;
