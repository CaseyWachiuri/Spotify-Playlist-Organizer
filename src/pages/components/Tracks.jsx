import React, { useEffect } from 'react';

function Tracks() {

  return (
    <>
      <div className="border m-5 p-1  text-black-800  flex justify-between " >
        <div className="border w-5/12 font-medium truncate pr-4">
          Track
        </div>
        <div className="border w-3/12 font-medium truncate pr-4 ">
          Artist
        </div>
        <div className="border w-3/12 font-medium truncate pr-4 ">
          Album
        </div>
        <div className="border w-1/12 font-medium truncate pr-4 text-right ">
          Time
        </div>
      </div>
    </>
  );
}

export default Tracks;
