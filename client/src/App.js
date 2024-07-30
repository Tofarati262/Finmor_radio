import React from "react";

function App() {
  return (
    <div>
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
  );
}

export default App;
