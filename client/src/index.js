
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

// Lazy load the components
import Auth from "./userSignin App/Auth";
import AudioUpload from "./userUpload App/audioUpload";
import  Audioplayer from "./Radio App/Audioplayer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/audioplayer" element={<Audioplayer />} />
          <Route path="/Upload" element={<AudioUpload />} />
        </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
