import React from "react";
import { useAuth, useRefreshDB } from "./hooks";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth, UserProfile } from "./views";
import "./styles/App.css";
import { User } from "firebase/auth";

function App() {
  // useRefreshDB();
  const userData = useAuth();

  return (
    <div className="App">
      <Header {...(userData as User)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        {userData && (
          <>
            <Route
              path="/calendar"
              element={<Calendar {...userData} />}
            />
            <Route
              path="/profile"
              element={<UserProfile {...userData} />}
            />
            <Route path="/admin/new" element={<Admin />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
