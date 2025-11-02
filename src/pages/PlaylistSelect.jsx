import React, { useState, useEffect  } from 'react';
import { fetchApi } from "../utils/auth";
import { useNavigate } from "react-router-dom";


function PlaylistSelect() {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null); // Add error handling later

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await fetchApi("https://api.spotify.com/v1/me/playlists?limit=10");
        setPlaylists(data.item);
      } catch(error) {
        console.error("failed to fetch playlists", error);
        setError("Couldn't load the playlists");
      }
    }

    fetchPlaylists();
  },[]);

  function handleSelect(e) {
    const playlistId = e.target.value;
    if (playlistId) {
      navigate(`/playlist/${playlistId}`);
    }
  }

  if(!playlists) {
    return <div className="border m-3 p-2">Loading...</div>
  }

  return (
    // Test out with a form to see how it works without immediate redirect upon select
    <select id="playlist-dropdown" name="playlist" onChange={ handleSelect }>
      {playlists.map(p => (
        <option key={p.id} value={p.id} >{p.name}</option>
      ))}
    </select>
  )
}

export default PlaylistSelect;
