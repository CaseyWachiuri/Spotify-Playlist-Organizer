import React, { useEffect } from 'react';

function Header() {

  return (
    <div className="border m-5 text-black-800 mb-4 flex justify-around " >
      <img className="border flex"src="null" alt="Playlist Name" />
      <div>
        <div className="border flex ">
          Playlist Title
        </div>
        <div className="border flex ">
          Playlist Description
        </div>
        <div className="border flex">
          Playlist owner and duration info
        </div>
        <div className="border flex">
          Button to Delete redundant Playlists
        </div>
      </div>
    </div>
  );
}

export default Header;
