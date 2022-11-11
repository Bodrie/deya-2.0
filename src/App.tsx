import React from "react";
import { useAuth, useEmialVerification } from "./hooks";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import {
  Home,
  Calendar,
  Admin,
  Auth,
  UserProfile,
  Verification,
} from "./views";
import "./styles/App.css";

function App() {
  const { userData, isEmailVerified } = useAuth();
  useEmialVerification(userData);

  return (
    <div className="App">
      <Header userData={userData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {!userData && <Route path="/login" element={<Auth />} />}
        {userData && isEmailVerified && (
          <>
            <Route path="/calendar" element={<Calendar {...userData} />} />
            <Route path="/profile" element={<UserProfile {...userData} />} />
            {userData.email === process.env.REACT_APP_ADMIN && (
              <Route path="/admin/new" element={<Admin />} />
            )}
          </>
        )}
        {!isEmailVerified && (
          <Route path="/verification" element={<Verification />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
