import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { Artist } from "../../types";

interface ArtistPageProps {
  navigation: any;
  artist: Artist;
  artistId:string;
  getAlbums:any;
}

const ArtistPage = ({
  navigation,
  artist,
  artistId,
  getAlbums,
}: ArtistPageProps) => {
  const handlePress = async() => {
    try {
      await getAlbums(artistId);
      navigation.navigate("Albums by " + artist.strArtist);
      
    } catch (e: any) {
      Alert.alert("Album data not found");
    }
  };

  return (
    <View style={styles.artistpage}>
      <Text>ARTIST</Text>
      <Image
        source={{ uri: artist.strArtistBanner }}
        style={{ height: 100, width: 200 }}
      ></Image>
      <Image
        source={{ uri: artist.strArtistLogo }}
        style={{ height: 60 }}
      ></Image>
      <Text>{artist.strArtist}</Text>
      <Text>{artist.intFormedYear}</Text>
      <Text>{artist.intMembers}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Albums</Text>
      </TouchableOpacity>
      {/* <Text>{artist.strBiographyEN}</Text> */}
      {/* <TouchableOpacity></TouchableOpacity> */}
      {/* intBornYear?: number;
  intCharted?: string;
  intDiedYear?: string;
  intFormedYear?: string;
  intMembers?: string;


  strArtistBanner?: string;
  strArtistClearart?: string;
  strArtistFanart?: string;
  strArtistFanart2?: string;
  strArtistFanart3?: string;
  strArtistFanart4?: string;

  strArtistStripped?: string;
  strArtistThumb?: string;
  strArtistWideThumb?: string;
  strBiographyCN?: string;
  strBiographyDE?: string;
  strBiographyEN?: string;
  strBiographyES?: string;
  strBiographyFR?: string; */}
    </View>
  );
};

const styles = StyleSheet.create({
  artistpage: {
    flex: 30,
  },
});

export default ArtistPage;
