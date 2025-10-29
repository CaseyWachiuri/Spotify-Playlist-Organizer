import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import Tracks from "./components/Tracks.jsx";
import Login from "./components/Login.jsx";



function App() {
  // Implement logic for the refresh token here and login check here
  const [isLoggedIn, setisLoggedIn] = useState(false);

  function handleOnClick() {
    console.log("You clicked me");
  }

  return (
    <>
      {/* <Header />
      <Tracks /> */}
      <Login Clicked={handleOnClick}/>
    </>
  )
}

export default App
