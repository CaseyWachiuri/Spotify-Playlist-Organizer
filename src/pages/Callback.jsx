import React, { useEffect, useState } from 'react';
import { getAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Callback() {
  const [status, setStatus] = useState("Getting token");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if(code) {
      getAccessToken(code)
        .then(data => {
          localStorage.getItem('access_token', data.access_token);
          localStorage.getItem('refresh_token', data.refresh_token);
          localStorage.setItem('expires_at', Date.now() + data.expires_in * 1000);

          setStatus("Great success! I like!! Redirecting....");
          // Add use navigate to redirect to the playlist selector page (./selectplaylist)
        })
        .catch(error => {
          console.error(error);
          setStatus("Access Token failure");
        })
    }else{
      setStatus("Missing access token with URL failure");
      // Navigate back to Login (./)
    }
  }, [])

  return (
    // Remember to deactivate the navigate in case it interferes when you implement it so you can style the page
    <div className="border m-3 p-2" >
      {status}
    </div>
  );
}

export default Callback;
