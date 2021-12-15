import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Footer = () => {
  const navigation : any = useNavigation();

  const handleFeaturedPress = () => {
    navigation.navigate('Featured');
  }
  const handleFavouritesPress = () => {
    navigation.navigate('Favourites');
  }
  const handleSearchPress = () => {
    navigation.navigate('Search');
  }

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.favorites} onPress={handleFeaturedPress}><Text>Featured</Text></TouchableOpacity>
      <TouchableOpacity style={styles.favorites} onPress={handleFavouritesPress}><Text>Favourites</Text></TouchableOpacity>
      <TouchableOpacity style={styles.search} onPress={handleSearchPress}><Text>Search</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    footer:{
        flex: 1,
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
