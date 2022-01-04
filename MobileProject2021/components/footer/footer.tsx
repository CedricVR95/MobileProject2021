import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Footer = () => {
  const navigation: any = useNavigation();

  const handleFeaturedPress = () => {
    navigation.navigate("Featured");
  };
  const handleFavouritesPress = () => {
    navigation.navigate("Favourites");
  };
  const handleSearchPress = () => {
    navigation.navigate("Search");
  };
  const handleUserPress = () => {
    navigation.navigate("User");
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleFeaturedPress}>
        <Text style={styles.bottomText}>Featured</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFavouritesPress}>
        <Text style={styles.bottomText}>Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUserPress}>
        <Text style={styles.bottomText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearchPress}>
        <Text style={styles.bottomText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopColor: "white",
  },
  bottomText: {
    fontWeight: "bold",
    fontSize: 15,
    padding: 10,
    color: "white",
  },
});

export default Footer;
