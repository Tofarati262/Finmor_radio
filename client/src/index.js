import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth from "./userSignin App/Auth";
import audioUpload from "./userUpload App/audioUpload";
import Audioplayer from "./Radio App/Audioplayer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/audioplayer" element={<Audioplayer />} />
        <Route path="/Upload" element={<audioUpload/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
