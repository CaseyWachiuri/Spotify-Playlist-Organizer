import React from 'react';

function Tracklist({trackItem}) {
  const tracks = trackItem;
  // Possible issue if there are multiple artists. Fix that later
  const duration = (mil) => {
    const totalSeconds = Math.floor(mil /1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`;
  }

  console.log(tracks.map((item, index) => console.log(item.track.artists?.[0]?.name)));

  /* const trackList = tracks.map((item, index) => {
    <ul className="border-t-1 border-gray-100 text-black-800 m-5 p-1 flex justify-between ">
      <div>
        { item.track.name }
      </div>
      <div>
        { item.track.artists.name }
      </div>
      <div>
        { item.track.album.name }
      </div>
      <div>
        { duration(item.track.duration_ms) }
      </div>
    </ul>
    })*/

  return (
   {/* trackList */}
  );
}

export default Tracklist;
