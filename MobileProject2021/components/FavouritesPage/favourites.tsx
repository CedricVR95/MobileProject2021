import React, { useState } from "react";
import { View, Text } from "react-native";
import { Artist } from "../../types";
import { SafeAreaProvider } from "react-native-safe-area-context";

const FavouritesPage = ({ navigation }: any) => {
  return (
    <SafeAreaProvider>
      <View>
        <Text>Favourites</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default FavouritesPage;
