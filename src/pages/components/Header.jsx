import React, { useEffect } from 'react';

function Header({playlist}) {
  if(!playlist) return <div>Loading Playlists...</div> // add centering later

  return (
    <div className="border  m-5 text-black-800 mb-4 flex justify-around " >
      <img className="border rounded-2xl flex"src={playlist.images?.[1]?.url} alt={`${playlist.name} Cover`} />
      <div>
        <div className="border flex m-3 p-2">
          {playlist.name}
        </div>
        <div className="border flex m-3 p-2">
          {playlist.description}
        </div>
        {/* Configure this later. Sth aint right
        <div className="border flex">
          Playlist owner and duration info
        </div> */}
        <div className="rounded-none bg-red-400 px-10 py-4 m-2 text-center text-sm ">
          Delete Duplicate Songs
        </div>
      </div>
    </div>
  );
}

export default Header;
