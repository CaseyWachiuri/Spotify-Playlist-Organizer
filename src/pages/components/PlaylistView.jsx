import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Tracklist from "./Tracklist";
import Tracks from "./Tracks";
import { fetchApi } from "../../utils/auth";
import { useParams, useNavigate } from 'react-router-dom';

function PlaylistView() {
  const navigate = useNavigate();
  const params = useParams();
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { playlistId } = params;

  useEffect(() => {

    const fetchAllData = async () => {
      try{
        const info = await fetchApi(`https://api.spotify.com/v1/playlists/${playlistId}`)
        setPlaylistInfo(info);

        let tracks = [];
        let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks/?limit=10`

        while(nextUrl) {
          const data = await fetchApi(nextUrl);
          tracks = tracks.concat(data.items);
          nextUrl = data.next;
        }

        setTracks(tracks);

        const seenUrl = new Set();
        const duplicates = [];
        tracks.forEach((item, index) => {
          const trackUrl = item.track?.uri;
          if (!trackUrl) return;

          if (seenUrl.has(trackUrl)) {
            let duplicateEntry = duplicates.find(d => d.Uri === trackUrl);

            if(!duplicateEntry) {
              duplicateEntry = {Uri: trackUrl, positions: [] };
              duplicates.push(duplicateEntry);
            }
            duplicateEntry.position.push(index);
          } else {
            seenUrl.add(trackUrl);
          }
        })

      } catch (error) {
        console.error("Something went wrong and I don't know what", error);
      }
    }

    fetchAllData();
  }, [playlistId, navigate]);

  // Function to handle duplicates
  function handleDups() {
    const seenUrl = new Set();
    const duplicates = [];
    tracks.forEach((item, index) => {
      const trackUrl = item.track?.uri;
      if (!trackUrl) return;

      if (seenUrl.has(trackUrl)) {
        let duplicateEntry = duplicates.find(d => d.Uri === trackUrl);

        if(!duplicateEntry) {
          duplicateEntry = {Uri: trackUrl, positions: [] };
          duplicates.push(duplicateEntry);
        }
        duplicateEntry.position.push(index);
      } else {
        seenUrl.add(trackUrl);
      }
    })
  }

  if(!playlistInfo) {
    return <div>Loading Playlists...</div>
  }
  //console.log(tracks);
  //const artistName = tracks.artists?.[0]?.name;
  console.log(tracks.map((item, index) => console.log(item.track.artists?.[0]?.name)));

  const duration = (mil) => {
    const totalSeconds = Math.floor(mil /1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`;
  }

  const trackList = tracks.map((item, index) => {
    return (
      <li className="border-t-1 border-gray-100 text-black-800 m-5 p-1 flex justify-between ">
        <div className="w-5/12 truncate pr-4 ">
          { item.track.name }
        </div>
        <div className="w-3/12 truncate pr-4">
          { item.track.artists?.[0]?.name }
        </div >
        <div className="w-3/12 truncate pr-4">
          { item.track.album.name }
        </div>
        <div className="w-1/12 text-right truncate pr-4">
          { duration(item.track.duration_ms) }
        </div>
      </li>
    )
  })

  return (
    <>
      <Header playlist={playlistInfo} />
      <Tracks />
      <ul > { trackList }</ul>
    </>
  )
}

export default PlaylistView;
