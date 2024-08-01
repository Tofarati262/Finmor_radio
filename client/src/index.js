import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Audioplayer from "./Radio App/Audioplayer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/audioplayer" element={<Audioplayer />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
