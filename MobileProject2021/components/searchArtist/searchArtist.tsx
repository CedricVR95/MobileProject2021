import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from "react-native";
import {Artist} from '../../types'
interface SearchArtistProps {
  navigation:any;
  setName: any;
  nameState: string;
  getData: any;
  artistState:Artist;
  setArtistState:any;
}

const SearchArtist = ({ navigation, setName, nameState, getData,artistState, setArtistState}: SearchArtistProps) => {
  const handleChange = (e: string) => {
    setName(e.trimEnd());
  };

  const handleSubmit = async () => {
    try {
      const data = await getData(nameState);
      navigation.navigate("Info about " + data.strArtist);
    } catch (e: any) {
      Alert.alert("artist not found");
    }
  };

  return (
    <ScrollView style={styles.outerContainer}>
    <View style={styles.innerContainer}>

      <View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer:{
    backgroundColor:'black'    
  },
  innerContainer: {
    flex: 1,
    justifyContent:'center'
  },
  welcome: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 100,
  },
  cta: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    marginBottom: 10,
    marginTop:20,
  },
  button: {
    alignSelf: "center",
    borderColor:'white',
    borderWidth:2,
    borderRadius:20,
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
    fontSize: 20,
    marginBottom:20
  },
});

export default SearchArtist;
