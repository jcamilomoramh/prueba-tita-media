import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/login.css'


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="contenedor">
      <div className="text-content">
        <h1>Welcome to app by: <br></br> Camilo | Mora </h1>
      </div>
      <button className="button" onClick={() => loginWithRedirect({})}>Log In</button>
    </div>
  );
};

export default LoginButton;
