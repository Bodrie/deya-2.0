import React, { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingContext from "./context/LoadingContext";
import { useAuth, useEmialVerification, useRefreshDB } from "./hooks";
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
import { Box, CircularProgress } from "@mui/material";

function App() {
  const navigate = useNavigate();
  const { userData, isEmailVerified } = useAuth();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  useEmialVerification(userData, setIsLoading);
  useRefreshDB();
  const itsMe = process.env.REACT_APP_ADMIN?.toString().includes(
    userData?.email as string
  );
  
  const loaderStyles = {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    display: "flex",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
  };

  const mainContentStyles = {
    display: isLoading ? "initial" : "contents",
    filter: isLoading ? "blur(5px)" : "none",
  };

  return (
    <div className="App">
      {isLoading && (
        <Box sx={loaderStyles}>
          <CircularProgress size={100} />
        </Box>
      )}
      <Box sx={mainContentStyles}>
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
                <Route
                  path="/profile"
                  element={<UserProfile {...userData} />}
                />
                {itsMe && <Route path="/admin/new" element={<Admin />} />}
              </>
            )}
            {!isEmailVerified && (
              <Route path="/verification" element={<Verification />} />
            )}
          </Routes>
          <Footer />
        </ErrorBoundary>
      </Box>
    </div>
  );
}

export default App;
