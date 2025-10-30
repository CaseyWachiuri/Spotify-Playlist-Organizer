import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Tracklist from "./Tracklist";
import Tracks from "./Tracks";
import { fetchApi } from "../../utils/auth";

function PlaylistView() {
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try{
        const info = await fetchApi(`https://api.spotify.com/v1/playlists/${playlistId}`)
        setPlaylistInfo(info);

        let tracks = [];
        let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks/?limit=50`

        while(nextUri) {
          const data = await fetchApi(nextUrl);
          tracks = tracks.concat(data.items);
          nextUrl = data.next;
        }

        setTracks(tracks);
      } catch (error) {
        console.error("Something went wrong and I don't know what", error);
      }
    }

    fetchAllData();
  }, []);

  return (
    <>
      <Header playlist={playlistInfo} />
      <Tracklist />
      <Tracks trackItems={tracks} />
    </>
  )
}

export default PlaylistView;
