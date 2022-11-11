import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth, useEmialVerification } from "./hooks";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header, Footer, ErrorBoundaryFallback } from "./components";
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
  const navigate = useNavigate();
  const { userData, isEmailVerified } = useAuth();
  useEmialVerification(userData);

  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => navigate("/")}
      >
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
      </ErrorBoundary>
    </div>
  );
}

export default App;
