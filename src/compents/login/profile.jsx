import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout";
import PostList from "../principal/postlist";
import "../styles/profile.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: "read:current_user",
      });
      const userDetailsByIdUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;
      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { user_metadata } = await metadataResponse.json();
      console.log(user_metadata);
    };

    if (isAuthenticated) {
      getUserMetadata();
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="profile-header">
          {user.picture && <img src={user.picture} alt={user.name} className="profile-header-image" />}
          <div className="profile-header-info">
            <h2 className="profile-header-name">{user.name}</h2>
            <p className="profile-header-email">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
        <PostList />
      </div>
    )
  );
};

export default Profile;
