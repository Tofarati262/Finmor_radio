import React, { useRef, useState } from "react";
import "../App.css";
import Navbar from "./components/Navbar";
import Player from "./components/player";
import "./components/board.css";
import Queuedsongs from "./components/Queuedsongs";
import { Tracks } from "./components/tracks/trackdata";

const Audioplayer = () => {
  const audioref = useRef();
  const [queue, setQueue] = useState(Tracks);
  const [onsongend, setOnsongend] = useState(false);
  const [openQueue, setOpenQueue] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackid, setTrackid] = useState(0);

  return (
    <div className="board">
      <div className="board-centered">
        <Navbar />
        <Player
          {...{
            audioref,
            queue,
            setQueue,
            setOnsongend,
            onsongend,
            setOpenQueue,
            openQueue,
            isPlaying,
            setIsPlaying,
            trackid,
            setTrackid,
          }}
        />
      </div>
      {openQueue && (
        <div className="q">
          <Queuedsongs
            Tracks={queue}
            {...{ onsongend, setOnsongend, isPlaying, setIsPlaying, trackid }}
          />
        </div>
      )}
    </div>
  );
};

export default Audioplayer;
