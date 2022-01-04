import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
} from "react-native";
import { Track } from "../../types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import YoutubeButton from '../youtubeButton/youtubeButton';
import { MutableRefObject } from "react";

interface TracksData {
  data: Track[];
}

const TracksPage = ({ route }: any) => {
  const { data }: TracksData = route.params;

  return (
    <SafeAreaProvider style={styles.trackspage}>
      <FlatList<Track>
      
        renderItem={({ item }) => (
          <View style={styles.track}>
            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Text style={styles.infoString}>Title: </Text>
                <Text style={styles.infoString}>{item.strTrack}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoString}>Artist: </Text>
                <Text style={styles.infoString}>{item.strArtist}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoString}>Album: </Text>
                <Text style={styles.infoString}>{item.strAlbum}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoString}>Plays: </Text>
                <Text style={styles.infoString}>
                  {item.intTotalPlays ? item.intTotalPlays + "/ 10" : "unavailable"}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoString}>Score: </Text>
                <Text style={styles.infoString}>
                  {item.intScore ? item.intScoreVotes + "/ 10" : "unavailable"}
                </Text>
              </View>
            </View>

            <YoutubeButton
              url={item.strMusicVid ? item.strMusicVid : undefined!}
              trackName={item.strTrack!}
            />
          </View>
        )}
        keyExtractor={(track: Track) => track.idTrack!.toString()}
        data={data}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "stretch",
  },
  infoString: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  track: {
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
  },
  trackspage: {
    backgroundColor: "black",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default TracksPage;
