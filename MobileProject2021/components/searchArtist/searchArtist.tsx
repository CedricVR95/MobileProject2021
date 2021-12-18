import axios from "axios";
import * as React from "react";
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { Artist } from "../../types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "react-native-navigation";
interface SearchArtistProps {
  setState: any;
  state: string;
  getData: any;
  /*ASK FOR TYPES*/
}

const SearchArtist = ({ navigation, setState, state, getData }: any) => {
  const handleChange = (e: string) => {
    setState(e.trim());
  };

  const handleSubmit = async () => {
    try {
      await getData(state);
      navigation.navigate("Info about " + state);
    } catch (e: any) {
      Alert.alert("artist not found");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.cta}>
          Look for an artist by entering their name
        </Text>
        <TextInput
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          style={styles.input}
        ></TextInput>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcome}>Welcome to the Music Database!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  welcome: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 50,
    flex: 1,
    marginTop: 20,
  },
  cta: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    marginBottom: 10,
    // flex: 1,
  },
  button: {
    alignSelf: "center",
    borderColor:'white',
    borderWidth:2,
    borderRadius:20
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    color: "black",
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 50,
    height: 50,
    fontSize: 30,
  },
  search: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});

export default SearchArtist;
