import React, { useRef, useState, useContext } from "react";
import "../userSignin App/App.css";
import Navbar from "./components/Navbar";
import Player from "./components/player";
import "./components/board.css";
import Queuedsongs from "./components/Queuedsongs";
import ProfileDrop from "./ProfileDrop";
import { Tracks } from "./components/tracks/trackdata";

import { ProfilePicContext } from "./components/context/picContext";

const Audioplayer = () => {
  const audioref = useRef();
  const [queue, setQueue] = useState(Tracks);
  const [onsongend, setOnsongend] = useState(false);
  const [openQueue, setOpenQueue] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackid, setTrackid] = useState(0);
  const [drop, setDrop] = useState(true);

  // Accessing MyContext

  return (
    <div className="board">
      <div className="board-centered">
          <ProfilePicContext.Provider value={{ drop, setDrop }}>
            <Navbar />
            <ProfileDrop />
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
          </ProfilePicContext.Provider>
      </div>

      <div className={`q ${openQueue ? 'show' : 'hide'}`}>
        <Queuedsongs
          Tracks={queue}
          {...{ onsongend, setOnsongend, isPlaying, setIsPlaying, trackid }}
        />
      </div>
    </div>
  );
};

export default Audioplayer;
