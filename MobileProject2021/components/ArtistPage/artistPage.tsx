import React from "react";
import { View, Text, Image } from "react-native";
import {Artist} from "../../types";

interface ArtistPageProps{
    artist: Artist
}

const ArtistPage = (data: ArtistPageProps) => {
  return (
    <View>
        <Image source={{uri: data.artist.strArtistBanner}} style={{height: 100, width:200}}></Image>
        <Image source={{uri: data.artist.strArtistLogo}} style={{height: 60}}></Image>
      <Text>{data.artist.strArtist}</Text>
      <Text>{data.artist.intFormedYear}</Text>
      <Text>{data.artist.intMembers}</Text>
      {/* <Text>{data.artist.strBiographyEN}</Text> */}
      
  {/* intBornYear?: number;
  intCharted?: string;
  intDiedYear?: string;
  intFormedYear?: string;
  intMembers?: string;


  strArtistBanner?: string;
  strArtistClearart?: string;
  strArtistFanart?: string;
  strArtistFanart2?: string;
  strArtistFanart3?: string;
  strArtistFanart4?: string;

  strArtistStripped?: string;
  strArtistThumb?: string;
  strArtistWideThumb?: string;
  strBiographyCN?: string;
  strBiographyDE?: string;
  strBiographyEN?: string;
  strBiographyES?: string;
  strBiographyFR?: string; */}
    </View>
  );
};

export default ArtistPage;