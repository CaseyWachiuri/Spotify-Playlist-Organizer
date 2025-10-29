import React from 'react';
import { Link } from 'react-router-dom'; 

export default function FailedLogin() {

  return (
    <>
      <div>Login failed. Try again!!!</div>
      <Link to="/">Go back to Login</Link>
    </>
  );
}
