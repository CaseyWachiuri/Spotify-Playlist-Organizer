import React from 'react';
// import data


function Tracklist({trackItem}) {
  const track = trackItem;
  // Possible issue if there are multiple artists. Fix that later
  const duration = (mil) => {
    const totalSeconds = Math.floor(mil /1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`;
  }

  return (
    <ul className="border-t-1 border-gray-100 text-black-800 m-5 p-1 flex justify-between ">
      <div>
        { track.name }
      </div>
      <div>
        { track.artists.name }
      </div>
      <div>
        { track.album.name }
      </div>
      <div>
        { duration(track.duration_ms) }
      </div>
    </ul>
  );
}

export default Tracklist;
