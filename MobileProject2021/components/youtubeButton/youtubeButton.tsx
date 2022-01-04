import React from "react";
import {
  Alert,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  url: string;
  trackName: string;
}

const YoutubeButton = ({ url, trackName }: ButtonProps) => {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (e: any) {
      Alert.alert("Sorry, this link is unavailable right now.");
    }
  };
  if (url == null) {
    return null;
  } else {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>play {trackName} on Youtube</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {

  },
  buttonText:{
    color: 'black',
    backgroundColor:'white',
    borderWidth: 2,
    borderColor: "black",
    textAlign:'center',
    borderRadius: 20,
    padding: 5,
    paddingLeft:10,
    paddingRight:10,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 17,
    alignSelf:'center'
  }
});

export default YoutubeButton;
