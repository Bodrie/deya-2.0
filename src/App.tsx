import React from "react";
import { useAuth, useEmialVerification } from "./hooks";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth, UserProfile } from "./views";
import "./styles/App.css";

function App() {
  const userData = useAuth();
  useEmialVerification(userData)

  return (
    <div className="App">
      <Header userData={userData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Auth />} />
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
