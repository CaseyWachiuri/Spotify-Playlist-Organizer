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
    <nav >
        <div className="relative bg-gray-100 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      {/* <div className="flex> */}
        <button className="rounded-none bg-red-400 px-3 py-1 m-2 text-sm " onClick={handleLeaving} >Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
