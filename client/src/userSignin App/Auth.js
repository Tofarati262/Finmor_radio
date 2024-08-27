import React, { useContext } from "react";
import { MyContext } from "../index.js";
function Auth() {

  const {logout} = useContext(MyContext);
  return (
    <div>
      <div className="Sign in buttons">
      <h1>Welcome to the Front End</h1>
      <button
        onClick={() =>
          (window.location.href =
            "http://localhost:5000/discordauth/api/auth/discord")
        }
      >
        Discord login
      </button>
      <button
        onClick={() =>
          (window.location.href =
            "http://localhost:5000/googleauth/auth/google")
        }
      >
        Google Login
      </button>
      </div>
      <div className={`SignOut_Prompt ${logout ? "show":"hidden"}`}>

      </div>

    </div>
  );
}

export default Auth;
