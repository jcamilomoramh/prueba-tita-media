import React, { useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import LoginButton from './compents/login/login';
import Profile from './compents/login/profile';

function App() {
  const { isAuthenticated } = useAuth0();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  const onLogin = () => setIsLoggedIn(true);
  const onLogout = () => setIsLoggedIn(false);
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onLogin}
    >
      {isLoggedIn ? <Profile onLogout={onLogout} /> : <LoginButton />}
    </Auth0Provider>
  );
}

export default App;
