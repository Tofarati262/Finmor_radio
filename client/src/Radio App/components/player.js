import React, { useRef, useState, useEffect } from "react";
import Displaytrack from "./Displaytrack";

import Queue from "./Queue";
import "./board.css";
import { FaPlay, FaPause } from "react-icons/fa";

const Player = ({
  audioref,
  queue,
  setQueue,
  setOnsongend,
  setOpenQueue,
  openQueue,
  isPlaying,
  setIsPlaying,
  trackid,
  setTrackid,
}) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(queue[trackIndex]);
  const [totalDuration, setTotalDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const calculateTotalDuration = async () => {
      let totalDuration = 0;
      for (let i = 0; i < queue.length; i++) {
        const track = queue[i];
        const audio = new Audio(track.src);
        const duration = await new Promise((resolve) => {
          audio.addEventListener("loadedmetadata", () => {
            resolve(Math.floor(audio.duration));
          });
          audio.load();
        });
        totalDuration += duration;
      }
      setTotalDuration(totalDuration);
      console.log("Total Duration:", totalDuration);
    };
    calculateTotalDuration();
  }, [queue]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    setTrackIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % queue.length;
      setCurrentTrack(queue[nextIndex]);

      // Increment the track ID
      return nextIndex;
    });
    setTrackid((prev) => prev + 1);

    if (trackIndex === queue.length - 1) {
      // Optionally, pause the audio or stop the playback
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = currentTrack.src;

      setTotalDuration(audio.duration);
      if (isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  return (
    <div className="player">
      <audio ref={audioRef} onEnded={handleNext} />
      <Displaytrack {...{ currentTrack }} />
      <div className="center-player">
        <div className="Icons" onClick={togglePlay}>
          {isPlaying ? (
            <FaPause transform="scale(1.5)" color="black" />
          ) : (
            <FaPlay transform="scale(1.5)" color="black" />
          )}
        </div>
      </div>
      <Queue
        {...{
          currentTrack,
          audioref: audioRef,
          volume: audioRef.current ? audioRef.current.volume : 0.5,
          setVolume: (volume) => {
            if (audioRef.current) {
              audioRef.current.volume = volume;
            }
          },
          setOpenQueue,
          openQueue,
        }}
      />
    </div>
  );
};

export default Player;
