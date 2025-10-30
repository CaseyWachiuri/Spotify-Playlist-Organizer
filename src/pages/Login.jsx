import React, { useState, useEffect } from 'react';
import { redirectToAuthCodeFlow } from "../utils/auth.js";

function Login() {

  function handleClick() {
    redirectToAuthCodeFlow();
  }

  // Style the div container into a card
  return (
    <>
        <div className="h-screen flex flex-col items-center justify-center ">
          <p className="flex justify-center ">Welcome to the Spotify Playlist Organizer!!!</p>
          <button onClick={handleClick} className="rounded-none bg-red-400 px-10 py-4 m-2 text-sm decoration-sky-50 ">Login</button>
        </div>
    </>
  )
}

export default Login;
