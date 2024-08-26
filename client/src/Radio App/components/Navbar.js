import React from "react";
import "./Navbar.css";
import { useContext } from "react";
import { ProfilePicContext } from "./context/picContext";
import profile from "./pictures/Pic1.jpg"
const Navbar = () => {
  const {drop,setDrop}=useContext(ProfilePicContext);
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
        <img className="profilePicture" src={profile} onClick={()=>setDrop((prev) =>!prev)} alt="/"/>
      </div>
    </div>
  );
  
};

export default Navbar;
