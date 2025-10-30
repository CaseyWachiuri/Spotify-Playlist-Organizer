import React, { useNavigate, useState, useEffect } from "react-router-dom";
import { fetchApi } from "../utils/auth";

function PlaylistSelect() {
  // Subject to change
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

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

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <select name="playlist">
        {playlists.map(p => (
          <option key={p.id} value={p.id} >p.name</option>
        ))}
      </select>
    </Form>
  )
}

export default PlaylistSelect;
