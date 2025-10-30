import React, { useState, useEffect } from 'react';
import { redirectToAuthCodeFlow } from "../utils/auth.js";

function Login() {

  function handleClick() {
    redirectToAuthCodeFlow();
  }

  // Style the div container into a card
  return (
    <>
        <div>
          <button onClick={handleClick} className="rounded-none bg-red-400 px-5 py-0.5 m-2 text-sm decoration-sky-50 ">Login</button>
        </div>
    </>
  )
}

export default Login;
