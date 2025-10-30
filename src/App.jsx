import { useState, useEffect } from 'react'
import './App.css'
import Header from "./pages/components/Header.jsx";
import Tracks from "./pages/components/Tracks.jsx";
import Login from "./pages/Login.jsx";

function App() {
  // Implement logic for the refresh token here and login check here
  const [isLoggedIn, setisLoggedIn] = useState(false);

  function handleOnClick() {
    console.log("You clicked me");
  }

  return (
    <>
      <Login Clicked={handleOnClick}/>
    </>
  )
}

export default App
