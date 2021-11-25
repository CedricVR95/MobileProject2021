import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.favorites}><Text>Favorites</Text></TouchableOpacity>
      <TouchableOpacity style={styles.favorites}><Text>Albums</Text></TouchableOpacity>
      <TouchableOpacity style={styles.search}><Text>Search</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    footer:{
        flex: 3,
        flexDirection: "row",
        alignSelf: "stretch",
        alignContent: "flex-end",
        justifyContent:"space-between",
        borderWidth:1
    },
    favorites:{
        padding:10
    },
    search:{
        padding:10
    }
  });
  

export default Footer;
