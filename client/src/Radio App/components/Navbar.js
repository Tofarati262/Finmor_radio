import React from "react";
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Finmor-logo">Finmor</div>
      <div className="Settings">
        <IoMdSettings />
      </div>
    </div>
  );
};

export default Navbar;
