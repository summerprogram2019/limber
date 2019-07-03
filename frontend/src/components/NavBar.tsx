import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";

const NavBar: React.FC = () => {
  const { isAuthenticated, getTokenSilently, loginWithRedirect, logout } = useAuth0();
  const apiHost: string = "http://localhost:4000";

  const authRequest = async () => {
    let token: string;
    try {
      token = await getTokenSilently();
    } catch (error) {
      token = "";
    }
    console.log(token);
    let response: Response = await fetch(apiHost + "/api/v1/auth", {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    let json = await response.json();
    console.log(json);
  }

  return (
    <div>
      <button onClick={() => authRequest()}>
        Auth
      </button>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log in
        </button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;