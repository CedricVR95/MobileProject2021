import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Album } from "../../types";

interface TrackProps {
//   navigation: any;
  TrackData: any; //ADD TRACK DATA TYPE
}

const TracksPage = ({route, navigation}:any, /*{route}:any*/) => {
    // const route: RouteProp<any> = useRoute();
    const {trackData} = route.params;
    console.log(trackData);

  return (
    <View style={styles.trackspage}>
      <Text>Tracks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trackspage: {
    flex: 30,
  },
});

export default TracksPage;
