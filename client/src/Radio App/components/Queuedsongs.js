import React, { useEffect, useState } from "react";
import "./Queuedsongs.css";

const Queuedsongs = ({
  Tracks,
  trackid,
  onsongend,
  setOnsongend,
  isPlaying,
}) => {
  const [iTracks, setTracks] = useState(Tracks);
  const [currentTrackId, setCurrentTrackId] = useState(null);

  const ntrackid = 0;

  useEffect(() => {
    // Update currentTrackId whenever iTracks change
    setCurrentTrackId(iTracks[0]?.id || null);
  }, [iTracks]);

  useEffect(() => {
    // Logic to check if trackid has changed significantly
    console.log(trackid);
    if (trackid > currentTrackId) {
      // Create a new array without the first element
      const updatedTracks = iTracks.slice(1);
      // Update the iTracks state with the modified array
      setTracks(updatedTracks);
      setOnsongend(false);
    }
  }, [trackid, onsongend, setOnsongend, currentTrackId]);

  return (
    <div className="queued_box">
      {iTracks.map((track, index) => (
        <div
          key={index}
          className={`queued_song ${index === ntrackid ? "highlighted" : ""}`}
        >
          <img
            src={track.thumbnail}
            alt={track.title}
            className="cover_image"
          />
          <div className="song_info">
            <p
              style={{
                color: index === ntrackid ? "green" : "initial",
              }}
            >
              {track.title}
            </p>
            <p>{track.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Queuedsongs;
