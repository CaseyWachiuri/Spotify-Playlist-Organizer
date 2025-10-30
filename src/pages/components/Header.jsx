import React, { useEffect } from 'react';

function Header({playlist}) {
  if(!playlist) return <div>Loading Playlists...</div> // add centering later

  return (
    <div className="border m-5 text-black-800 mb-4 flex justify-around " >
      <img className="border flex"src={playlist.image?.[0]?.url} alt={`${playlist.name} Cover`} />
      <div>
        <div className="border flex ">
          ${playlist.name}
        </div>
        <div className="border flex ">
          ${playlist.description}
        </div>
        {/* Configure this later. Sth aint right
        <div className="border flex">
          Playlist owner and duration info
        </div> */}
        <div className="border flex">
          Button to Delete redundant Playlists
        </div>
      </div>
    </div>
  );
}

export default Header;
