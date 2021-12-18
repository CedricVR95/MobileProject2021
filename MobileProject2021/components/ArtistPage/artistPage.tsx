import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Artist } from "../../types";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface ArtistPageProps {
  navigation: any;
  artist: Artist;
  artistId: string;
  getAlbums: any;
}

const ArtistPage = ({
  navigation,
  artist,
  artistId,
  getAlbums,
}: ArtistPageProps) => {
  const handlePress = async () => {
    try {
      await getAlbums(artistId);
      navigation.navigate("Albums by " + artist.strArtist);
    } catch (e: any) {
      Alert.alert("Album data not found");
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.artistpage}>
          <Image
            source={{ uri: artist.strArtistLogo }}
            style={styles.logoImage}
          ></Image>

          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={styles.infoString}>Name: </Text>
              <Text style={styles.infoString}>{artist.strArtist}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoString}>From: </Text>
              <Text style={styles.infoString}>{artist.strCountry}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoString}>Genre: </Text>
              <Text style={styles.infoString}>{artist.strGenre}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoString}>Formed in: </Text>
              <Text style={styles.infoString}>{artist.intFormedYear}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoString}>Members: </Text>
              <Text style={styles.infoString}>{artist.intMembers}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoString}>Label: </Text>
              <Text style={styles.infoString}>{artist.strLabel}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>Albums by {artist.strArtist}</Text>
          </TouchableOpacity>

          <Image
            source={{ uri: artist.strArtistBanner }}
            style={styles.bannerImage}
          ></Image>

          <Text style={styles.descriptionTitle}>Complete Description</Text>
          <Text></Text>
          <Text style={styles.descriptionString}>{artist.strBiographyEN}</Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  artistpage: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  bannerImage: {
    height: 150,
    width: 400,
    resizeMode: "center",
  },
  logoImage: {
    height: 150,
    width: 400,
    resizeMode: "center",
  },
  infoString: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  descriptionTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    textDecorationLine: "underline",
  },
  descriptionString: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom:15
  },
  buttonText: {
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    fontWeight: "bold",
    borderRadius: 20,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 20,
    fontSize: 25,
  },
  infoContainer: {
    alignItems:'stretch'
  },
});

export default ArtistPage;
