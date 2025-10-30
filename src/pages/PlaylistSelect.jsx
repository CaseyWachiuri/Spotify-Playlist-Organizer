import React, { useNavigate, useState, useEffect } from "react-router-dom";
import { fetchApi } from "../utils/auth";

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
  },[navigate]);

  function handleSelect(e) {
    const playlistId = e.target.value;
    if (playlistId) {
      navigate(`/playlist/${playlistId}`);
    }
  }

  return (
    <Form onSubmit={handleSelect}>
      <select name="playlist">
        {playlists.map(p => (
          <option key={p.id} value={p.id} >{p.name}</option>
        ))}
      </select>
    </Form>
  )
}

export default PlaylistSelect;
