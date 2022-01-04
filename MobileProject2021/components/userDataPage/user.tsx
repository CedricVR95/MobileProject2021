import React, { ChangeEvent, useState } from "react";
import {
  Button,
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const UserPage = ({ navigation }: any) => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("Enter a name for your profile");
  const [email, setEmail] = useState<string>("Enter an emailaddress");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleNameChange = (event: any) => {
    setName(event);
  };
  const handleEmailChange = (event: any) => {
    setEmail(event);
  };

  return (
    <ScrollView style={{backgroundColor:'black'}}> 
      <View style={styles.container}>

        <View style={styles.inputs}>
          <Text style={styles.title}>Enter your information</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            onChangeText={handleNameChange}
            style={styles.input}
          ></TextInput>
          <Text style={styles.label}>Email</Text>
          <TextInput
            keyboardType="email-address"
            onChangeText={handleEmailChange}
            style={styles.input}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose a profile picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.outputs}>
          <Text style={styles.title}>User Info</Text>
          <Image
            source={{ uri: image ? image : "https://via.placeholder.com/150" }}
            style={styles.image}
            resizeMethod='resize'
          />
          <Text style={styles.userString}>{name}</Text>
          <Text style={styles.userString}>{email}</Text>
        </View>

      </View>
      </ScrollView>
  
  );
}


const styles = StyleSheet.create({
  container: {    
    alignItems:'center',
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginBottom: 10,
    textDecorationLine:'underline'
  },
  inputs: {
    marginBottom:10
  },
  outputs: {
    marginTop:10
  },
  image: {
    width: 300,
    height: 300,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    // padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    borderColor:'white',
    borderWidth:2,
    borderRadius:20,
  },
  userString: {
    color: "white",
    fontWeight:'bold',
    fontSize:20,
    marginTop: 5
  },
  label: {
    color: "white",
    fontSize:15
  },
  input: {
    borderWidth: 1,
    color: "black",
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 50,
    height: 30,
    fontSize: 13,
    marginBottom: 10,
  },
});

export default UserPage;
