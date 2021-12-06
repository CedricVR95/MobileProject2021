import axios from "axios";
const baseURL = "https://theaudiodb.com/api/v1/json/2";

//--- STRINGS FOR DIFFERENT API CALLS ---
const artistName: string = "nirvana";
//const artistId: string = "111319";
const getArtistInfoByArtistName: string = "/search.php?s=";
const getDiscographyByArtistsName: string = "/discography.php?s=";
const getArtistInfoByArtistId: string = "/artist.php?i=";
const getAllAlbumInfoByArtistId: string = "/album.php?i=";
const getAlbumInfoByAlbumId: string = "/album.php?m=";
const getAllTrackInfoByAlbumId: string = "/track.php?m=";
const getTrackInfoByTrackId: string = "/track.php?h=";
const getAllMusicVideosByArtistId: string = "/mvid.php?i=";

//--- THIS FUCTION TEST ALL POSSIBLE FREE CALLS FOR THE AUDIODB API ---
const GetStuff = async () => {
  //--- GET ARTIST DATA BY ARTIST NAME ---
  const artistDataByName = await axios({
    method: "get",
    url: baseURL + getArtistInfoByArtistName + artistName,
  });
  //   console.log(artistDataByName.data.artists[0]);
  //   console.log(artistDataByName.data.artists[0].strArtist);
  //   console.log(artistDataByName.data.artists[0].strLabel);
  //   console.log(artistDataByName.data.artists[0].strGenre);
  //   console.log(artistDataByName.data.artists[0].strBiographyEN);
  const artistId = artistDataByName.data.artists[0].idArtist;

  //--- GET ARTIST DATA BY ARTIST ID ---
  const artistDataById = await axios({
    method: "get",
    url: baseURL + getArtistInfoByArtistId + artistId,
  });
  //   console.log(artistDataById.data.artists[0]);

  //--- GET DISCOGRAPHY BY ARTIST NAME ---
  const discographyByArtistName = await axios({
    method: "get",
    url: baseURL + getDiscographyByArtistsName + artistName,
  });
  //   console.log(discographyByArtistName.data.album);

  //--- GET ALBUM INFO BY ARTIST ID ---
  const albumInfoByArtistId = await axios({
    method: "get",
    url: baseURL + getAllAlbumInfoByArtistId + artistId,
  });
  //   console.log(albumInfoByArtistId.data.album);
  //--- MAP ALBUM INFO TO SMALLER ARRAY
  let albumIdsAndNames: any = albumInfoByArtistId.data.album.map((e: any) => {
    return {
      albumId: e.idAlbum,
      albumName: e.strAlbum,
      artistName: e.strArtist,
    };
  });
  const albumId = albumIdsAndNames[0].albumId; //--- FIRST ALBUM FROM ARRAY ---
  //console.log(albumIdsAndNames);

  //--- GET ALBUM INFO BY ALBUM ID ---
  const albumInfoByAlbumId = await axios({
    method: "get",
    url: baseURL + getAlbumInfoByAlbumId + albumId,
  });
  //console.log(albumInfoByAlbumId.data.album);

  // GET TRACK INFO BY ALBUM ID ---
  const trackInfoByAlbumId = await axios({
    method: "get",
    url: baseURL + getAllTrackInfoByAlbumId + albumId,
  });
  //console.log(trackInfoByAlbumId.data);
  //--- MAP TRACK INFO TO SMALLER ARRAY
  let trackIdsAndNames: any = trackInfoByAlbumId.data.track.map((e: any) => {
    return { trackId: e.idTrack, trackName: e.strTrack, albumName: e.strAlbum, artistName: e.strArtist };
  });
  const trackId = trackIdsAndNames[0].trackId;
  //console.log(trackIdsAndNames);

  //--- GET TRACK INFO BY TRACK ID ---
  const trackInfoByTrackId = await axios({
    method: "get",
    url: baseURL + getTrackInfoByTrackId + trackId
  })
  //--- PULL MUSIC VIDEO URL FROM TRACK OBJECT ---
  const musicVideoURL = trackInfoByTrackId.data.track[0].strMusicVid;
  //console.log(musicVideoURL);
  //console.log(trackInfoByTrackId.data);

  //--- GET MUSIC VIDEOS BY ARTIST ID ---
  const MusicVideosByArtistId = await axios({
    method:"get",
    url: baseURL + getAllMusicVideosByArtistId + artistId
  })
  // console.log(MusicVideosByArtistId.data.mvids);
};

GetStuff();
