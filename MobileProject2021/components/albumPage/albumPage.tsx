import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const AlbumPage = () => {
  return (
    <View style={styles.albumpage}>
      <Text>ALBUM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    albumpage:{
        flex:30
    }
})

export default AlbumPage;