import React, { useState, useEffect } from 'react';
import { codeChallenge, codeVerifier } from "./utils/auth.js";

function Login({Clicked}) {
  // Possibly pass the refresh token as a prop

  console.log(codeChallenge());
  console.log(codeVerifier);

  // Style the div container into a card
  return (
    <>
        <div>
          <button onClick={Clicked} className="rounded-none bg-red-400 px-5 py-0.5 m-2 text-sm decoration-sky-50 ">Login</button>
        </div>
    </>
  )
}

export default Login;
