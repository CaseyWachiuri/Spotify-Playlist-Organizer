import React, { useEffect } from 'react';

function Tracks() {

  return (
    <>
      <div className=" m-5 p-1  text-gray-400  flex justify-between " >
        <div className=" w-5/12 font-medium truncate pr-4">
          Track
        </div>
        <div className=" w-3/12 font-medium truncate pr-4 ">
          Artist
        </div>
        <div className=" w-3/12 font-medium truncate pr-4 ">
          Album
        </div>
        <div className=" w-1/12 font-medium truncate pr-4 text-right ">
          Time
        </div>
      </div>
    </>
  );
}

export default Tracks;
