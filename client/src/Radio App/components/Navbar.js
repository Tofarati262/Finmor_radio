import React from "react";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const handleLogout = async () => {
    console.log("trying");
    try {
      const response = await fetch("http://localhost:5000/logout/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Successfully logged out");
        window.location.href = "http://localhost:3000/";
        // Perform any additional actions on successful logout, like redirecting the user
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Navbar">
      <div className="Finmor-logo">Finmor</div>
      <div className="Settings">
        <CiLogout onClick={handleLogout} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Navbar;
