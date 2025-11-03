import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Tracks from "./Tracks";
import Navbar from "../components/Navbar";
import { fetchApi } from "../../utils/auth";
import { useParams, useNavigate } from 'react-router-dom';

// Add a back button later for easy navigation
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

      } catch (error) {
        console.error("Something went wrong and I don't know what", error);
      }
    }

    fetchAllData();
  }, [playlistId, navigate]);

  // Function to handle duplicates
  async function handleDups() {
    const seenUrl = new Set();
    const duplicates = [];
    const snapshotId = playlistInfo?.snapshot_id;

    tracks.forEach((item) => {
      const trackUrl = item.track?.uri;
      if (!trackUrl) return;

      if (seenUrl.has(trackUrl)) {
        let duplicateEntry = duplicates.find(d => d.Uri === trackUrl);

        if(!duplicateEntry) {
          duplicateEntry = {uri: trackUrl};
          duplicates.push(duplicateEntry);
        }
      } else {
        seenUrl.add(trackUrl);
      }
    })

    await fetchApi(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      'DELETE',
      {
        tracks: duplicates,
        snapshot_id: snapshotId
      }
    );
  }

  if(!playlistInfo) {
    return <div>Loading Playlists...</div>
  }

  const duration = (mil) => {
    const totalSeconds = Math.floor(mil /1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`;
  }

  const trackList = tracks.map((item, index) => {
    return (
      <li className="border-t-1 border-gray-100 text-black-600 m-5 p-1 flex justify-between ">
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
      <Navbar />
      <div className="rounded-2xl shadow-lg m-3 p-2">
        <Header playlist={playlistInfo} handleDups={handleDups} />
        <Tracks />
        <ul > { trackList }</ul>
      </div>
    </>
  )
}

export default PlaylistView;
