import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load the components
const Auth = lazy(() => import("./userSignin App/Auth"));
const AudioUpload = lazy(() => import("./userUpload App/audioUpload"));
const Audioplayer = lazy(() => import("./Radio App/Audioplayer"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/audioplayer" element={<Audioplayer />} />
          <Route path="/Upload" element={<AudioUpload />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
