import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../../utils/auth";

function Navbar() {
  const navigate = useNavigate();

  function handleLeaving() {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-red-400 p-4 mb-3 ">
      <div className="max-w-10xl h-15 flex justify-end pr-5 items-center m-auto">
        <button onClick={handleLeaving}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
