import React, { useEffect, useState } from "react";
import { useAuth, useRefreshDB } from "./hooks";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth, UserProfile } from "./views";
import "./styles/App.css";
import { Box } from "@mui/material";

function App() {
  // useRefreshDB();
  const userData = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Header userData={userData} loading={loading} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Auth setLoading={setLoading} />} />
          {userData && (
            <>
              <Route path="/calendar" element={<Calendar {...userData} />} />
              <Route path="/profile" element={<UserProfile {...userData} />} />
              {userData.email === process.env.REACT_APP_ADMIN && (
                <Route path="/admin/new" element={<Admin />} />
              )}
            </>
          )}
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
