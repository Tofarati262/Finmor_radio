import React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./Display.css";
import { useState } from "react";

const Displaytrack = ({ currentTrack }) => {
  // Initialize ishearted as a boolean
  const [ishearted, setIshearted] = useState("false");
  // New state to manage the scaling effect

  // Updated function to toggle both hearted and scaled states
  function hearted() {
    setIshearted(!ishearted);
    // Toggle the scaling effect

    console.log(ishearted);
  }

  return (
    <div className="left-player">
      {currentTrack.thumbnail ? (
        <img src={currentTrack.thumbnail} alt="audio avatar" />
      ) : (
        <div className="icon-wrapper">
          <span className="audio-icon">
            <BsMusicNoteBeamed />
          </span>
        </div>
      )}
      <div className="text">
        <p className="title">{currentTrack.title}</p>
        <p className="author">{currentTrack.author}</p>
      </div>
      {/* Apply conditional class for scaling */}
      <div className="heart" onClick={hearted}>
        {ishearted ? <FaRegHeart color="red" /> : <FaHeart color="red" />}
      </div>
    </div>
  );
};

export default Displaytrack;
