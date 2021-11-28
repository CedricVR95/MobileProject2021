import React from "react";
import { Text, View } from "react-native";
import { DataArtist } from "../../App";


interface ArtistPageProp{
    artists: DataArtist
  }
  
  const VoorbeeldArtist = ({artists}: ArtistPageProp) => {
    return(
      <View>
          <View key={artists.idArtist}>
            <Text>{artists.strArtist}</Text>
            <Text>{artists.strBiographyEN}</Text>
            <Text>{artists.intFormedYear}</Text>
          </View>
      </View>
    )
  }
  
  
  interface ArtistPageProps{
    name: DataArtist[]
  }
  
  const VoorbeeldArtisten = ({name}: ArtistPageProps) => {
    return(
      <View>
        {name.map((artist) => {
          <View>
            <VoorbeeldArtist artists={artist} />
          </View>
        })}
        
      </View>
    )
  }

  export default VoorbeeldArtisten;