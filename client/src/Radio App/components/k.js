import React, { useRef, useState, useEffect } from "react";
import Displaytrack from "./Displaytrack";
import { Tracks } from "./tracks/trackdata";
import Queue from "./Queue";
import "./board.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { throttle } from "lodash";

const Player = ({ audioref, progressbarRef }) => {
  const [trackindex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(Tracks[trackindex]);
  const [isplaying, setIsplaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let total = 0;
    const promises = [];

    Tracks.forEach((track) => {
      const audio = new Audio(track.src);
      const promise = new Promise((resolve) => {
        audio.addEventListener("loadedmetadata", function () {
          const durationInSeconds = Math.floor(audio.duration);
          total += durationInSeconds;
          resolve();
        });
      });

      promises.push(promise);
      audio.load();
    });

    Promise.all(promises).then(() => {
      setTotalDuration(total);
    });
  }, []);

  const play = () => {
    setIsplaying((prev) => !prev);
  };

  const handleProgressChange = (value) => {
    const newTime = (value / 100) * totalDuration;
    const audio = audioref.current;

    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleNext = () => {
    setTrackIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex < Tracks.length ? nextIndex : prev;
    });
  };

  useEffect(() => {
    setCurrentTrack(Tracks[trackindex]);
  }, [trackindex]);

  useEffect(() => {
    const audio = audioref.current;

    const handleTrackEnd = () => {
      if (trackindex < Tracks.length - 1) {
        handleNext();
      } else {
        setIsplaying(false);
      }
    };

    const handleTimeUpdate = () => {
      if (audio) {
        const progressPercentage = (audio.currentTime / totalDuration) * 100;
        setCurrentTime(audio.currentTime);
        progressbarRef.current.value = progressPercentage;
      }
    };

    const throttledHandleTimeUpdate = throttle(handleTimeUpdate, 100);

    if (audio) {
      audio.addEventListener("ended", handleTrackEnd);
      audio.addEventListener("timeupdate", throttledHandleTimeUpdate);

      if (audio.src !== currentTrack.src) {
        audio.src = currentTrack.src;
        audio.load();
        audio.currentTime = currentTime;
      }

      if (isplaying) {
        audio
          .play()
          .catch((error) => console.error("Failed to play audio:", error));
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener("ended", handleTrackEnd);
        audio.removeEventListener("timeupdate", throttledHandleTimeUpdate);
      };
    }
  }, [
    currentTrack,
    isplaying,
    audioref,
    trackindex,
    currentTime,
    totalDuration,
    progressbarRef,
  ]);

  return (
    <div className="player">
      <audio ref={audioref} />
      <Displaytrack currentTrack={currentTrack} />
      <div className="center-player">
        <div className="Icons" onClick={play}>
          {isplaying ? (
            <FaPause transform="scale(1.5)" color="black" />
          ) : (
            <FaPlay transform="scale(1.5)" color="black" />
          )}
        </div>
        <input
          className="range"
          type="range"
          min="0"
          max={totalDuration}
          value={currentTime}
          onChange={(e) => handleProgressChange(e.target.value)}
          ref={progressbarRef}
        />
      </div>
      <Queue currentTrack={currentTrack} />
    </div>
  );
};

export default Player;
