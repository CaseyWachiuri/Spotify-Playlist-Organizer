import React, { useState, useEffect } from 'react';

function Login({Clicked}) {
  // Possibly pass the refresh token as a prop
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const codeVerifier  = generateRandomString(64);

  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

  const hashed = async() => {await sha256(codeVerifier)};
  const codeChallenge = base64encode(hashed);
  console.log(codeChallenge);
  console.log("Hello there");

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
