import React, { useState, useEffect } from "react";
import "./App.css"

function Auth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status when the component mounts
    fetch("http://localhost:5000/status")
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.loggedIn);
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);

  return (
    <div>
      <div className="SigninBox">
        <h1>Welcome to the Front End</h1>
        <div className="Signinbuttons">
          <button
            className="discord"
            onClick={() =>
              (window.location.href =
                "http://localhost:5000/discordauth/api/auth/discord")
            }
          >
            Discord Login
          </button>
          <button
            className="google"
            onClick={() =>
              (window.location.href =
                "http://localhost:5000/googleauth/auth/google")
            }
          >
            Google Login
          </button>
        </div>
      </div>

      <div className={`SignOut_Prompt ${!loggedIn ? "show" : "hidden"}`}>
        You have been logged out, log back in.
      </div>
    </div>
  );
}

export default Auth;
