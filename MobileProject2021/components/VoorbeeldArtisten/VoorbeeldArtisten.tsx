import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { Artist } from "../../App";


interface ArtistPageProp{
    setState: any;
    state: string[];
    getData: any;
    artistData: Artist[];
  }
  
  const VoorbeeldArtist = ({state,getData,setState,artistData}: ArtistPageProp) => {
    return(
      <View>
        <View >
          
        <VoorbeeldArtisten artist={artistData[0]}/>
        
        </View>
      </View>
    )
    
  }
  
  /*  let voorbeeldArtist: string[] = ["coldplay", "daft_punk", "nirvana", "imagine_dragons", "The_Weeknd"]
     setState(voorbeeldArtist)
    console.log(state);
    useEffect(() => { 
   
    
     
        getData(voorbeeldArtist);
        console.log(state);
    },[])

  interface ArtistPageProps{
    name: Artist[]
  }
  
  const VoorbeeldArtisten = ({name}: ArtistPageProps) => {
    return(
      <View>
        {name.map((artist: Artist) =>
          <VoorbeeldArtist artists={artist}/>
        )}
      </View>
    )
  }*/

  interface ArtistPagePropse{
    artist: Artist,
}


  const VoorbeeldArtisten = ({artist}: ArtistPagePropse) => {
    return (
      <View >
        <Image source={{uri: artist.strArtistBanner}} style={{height: 60, width: 200}}></Image>
        <Text>Artist/Band: {artist.strArtist}</Text>
        <Text>Formed in: {artist.intFormedYear}</Text>
        <Text>Members: {artist.intMembers}</Text>
      </View>
    );
  };

  export default VoorbeeldArtist; 