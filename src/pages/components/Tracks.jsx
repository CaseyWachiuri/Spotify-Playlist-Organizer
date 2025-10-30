import React, { useEffect } from 'react';
import Tracklist from "./Tracklist.jsx";


function Tracks() {
  const [tracks, setTracks] = useEffect("");

  return (
    <>
      <div className="border m-5 p-1  text-black-800  flex justify-between " >
        <div className="border  ">
          Track
        </div>
        <div className="border  ">
          Artist
        </div>
        <div className="border  ">
          Album
        </div>
        <div className="border flex mr-15  ">
          Time
        </div>
      </div>
      <Tracklist />
    </>
  );
}

export default Tracks;
