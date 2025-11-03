import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({playlist, handleDups, handleNavigation}) {
  if(!playlist) return <div>Loading Playlists...</div> // add centering later

  return (
    <div className="  m-5 text-black-800 mb-4 flex justify-around " >
      <button class="absolute top-2 left-2 bg-red-400  flex items-center p-2 rounded-3xl"onClick={handleNavigation}>Back</button>
      <img className="shadow-lg rounded-2xl flex"src={playlist.images?.[1]?.url} alt={`${playlist.name} Cover`} />
      <div className="m-3 p-2">
        <div className=" flex justify-left font-bold text-2xl m-3 p-2">
          {playlist.name}
        </div>
        <div className=" flex jusitfy-left m-3 p-2 italic">
          {playlist.description}
        </div>
        {/* Configure this later. Sth aint right
        <div className="border flex">
          Playlist owner and duration info
        </div> */}
        <div className="flex justify-left">
        <button className="rounded-xl bg-red-400 px-4 py-2 m-2 text-center text-sm " onClick={handleDups}>
          Delete Duplicate Songs
        </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
