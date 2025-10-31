import React, { useEffect } from 'react';
import { logout } from '../utils/auth';

function Logout() {
  useEffect(() => {
    logout();
  },[]);

  return(<div className="border m-3 p-2 ">Logout successfull!!!!</div>);
}

export default Logout;
