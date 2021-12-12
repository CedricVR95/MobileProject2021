import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Linking,
  Alert,
} from "react-native";
import { Album } from "../../types";
import { Track } from "../../types";

interface TrackProps {
  //   navigation: any;
  TrackData: any; //ADD TRACK DATA TYPE
}

interface TracksData {
  data: Track[];
}

interface ButtonProps {
  url: string;
  trackName: string;
}

const TracksPage = ({ route, navigation }: any) => {
  const { data }: TracksData = route.params;

  const YoutubeButton = ({ url, trackName }: ButtonProps) => {
    const handlePress = async () => {
      try{
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
         }
      }catch (e:any){
        Alert.alert("Sorry, this link is unavailable right now.")
      }
      
    };
    if (url == null) {
      return null;
    } else {
      return <Button title={trackName} onPress={handlePress} />;
    }
  };

  return (
    <FlatList<Track>
      renderItem={({ item }) => (
        <View>
          <Text>{item.strTrack}</Text>
          <Text>{item.strArtist}</Text>
          <Text>{item.strAlbum}</Text>
          <YoutubeButton url={item.strMusicVid!} trackName="Play on Youtube" />
          <Text></Text>

          {/* <Image
              source={{ uri: item.strTrackThumb }}
              style={{ height: 200, width: 200 }}
            /> */}

          {/* <TouchableOpacity onPress={() => handlePress()}>
              <Text>Tracks</Text>
            </TouchableOpacity> */}
        </View>
      )}
      keyExtractor={(track: Track) => track.idTrack!.toString()}
      data={data}
    />
  );
};

const styles = StyleSheet.create({
  trackspage: {
    flex: 30,
  },
});

export default TracksPage;
