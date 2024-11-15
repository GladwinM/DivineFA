// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UserMaster from "./components/UserMaster";
import BannerMaster from "./components/BannerMaster";
import CalendarMaster from "./components/CalenderMaster";
import QAMaster from "./components/QAMaster";
import UpdateManager from "./components/UpdateManager";
import { AWS_REGION } from "./config";

const App = () => {

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/users" element={<UserMaster />} />
            <Route path="/banners" element={<BannerMaster />} />
            <Route path="/calendars" element={<CalendarMaster />} />
            <Route path="/qa" element={<QAMaster />} />
            <Route path="/updates" element={<UpdateManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
