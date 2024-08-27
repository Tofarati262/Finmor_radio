import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth from "./userSignin App/Auth";
import AudioUpload from "./userUpload App/audioUpload";
import Audioplayer from "./Radio App/Audioplayer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createContext, useContext } from 'react';
import { log } from "console";

export const MyContext = createContext({});


const root = ReactDOM.createRoot(document.getElementById("root"));
const [logout,setLogout] = useState(false);
root.render(

  <React.StrictMode>
    <Router>
      <Routes>
        <MyContext.Provider value={{logout,setLogout}}>
          <Route path="/" element={<Auth />} />
          <Route path="/audioplayer" element={<Audioplayer />} />
          <Route path="/Upload" element={<AudioUpload/>}/>
        </MyContext.Provider>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
