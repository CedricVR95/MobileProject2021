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
      <TouchableOpacity style={styles.favorites} onPress={handleFeaturedPress}><Text style={styles.bottomText}>Featured</Text></TouchableOpacity>
      <TouchableOpacity style={styles.favorites} onPress={handleFavouritesPress}><Text style={styles.bottomText}>Favourites</Text></TouchableOpacity>
      <TouchableOpacity style={styles.search} onPress={handleSearchPress}><Text style={styles.bottomText}>Search</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    footer:{
        flex: 0,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent:"space-between",
        backgroundColor:'black',
        borderTopWidth: 1,
        borderTopColor: 'white',
    },
    favorites:{
        // padding:10
    },
    search:{
        // padding:10
    },
    bottomText:{
      fontWeight: 'bold',
      fontSize: 15,
      padding: 10,
      color: 'white',
    }
  });
  

export default Footer;
