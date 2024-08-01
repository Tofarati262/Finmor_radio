// Queue.js
import React from "react";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoVolumeLow } from "react-icons/io5";
import "./board.css";

const Queue = ({ volume, setVolume, setOpenQueue, openQueue }) => {
  function handleq() {
    setOpenQueue((prev) => !prev);
    console.log(false);
  }
  return (
    <div className="right-player">
      <div className="queue">
        <HiOutlineQueueList onClick={handleq} />
      </div>
      <div className="volume">
        <IoVolumeLow />
        <input
          className="Rangy"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value); // Correctly update the volume state
          }}
        />
      </div>
    </div>
  );
};

export default Queue;
