import axios from "axios";
import React, { useState } from "react";
import {View,Text,TextInput,NativeSyntheticEvent,TextInputChangeEventData,TouchableOpacity,StyleSheet,Button} from "react-native";
import { Artist } from "../../types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Navigation} from 'react-native-navigation';
interface SearchArtistProps {
  setState: any;
  state: string;
  getData: any;
  /*ASK FOR TYPES*/
}

const SearchArtist = (/*{setState, state, getData}: SearchArtistProps,*/ {navigation, setState, state, getData}:any) => {
  const handleChange = (e: string) => {
    setState(e);
  };
  
  const handleSubmit = () => {
    getData(state);
    navigation.navigate("Artist");
  };
  const test = () => {
    navigation.navigate("Artist");
  }

  return (
    <View style={styles.search}>
      <Text>Look for an artist by entering their name</Text>
      {/* <Button title="test" onPress={test}>Album</Button> */}
      <TextInput
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        style={{ borderWidth: 1 }}
      ></TextInput>
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={{ textAlign: "center", borderWidth: 1, marginTop: 10 }}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  search:{
    flex:10,
    marginTop:30
  }
});

export default SearchArtist;
