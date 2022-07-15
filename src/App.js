import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth, UserProfile } from "./views";
import { Box } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./styles/App.css";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });
    navigate("/");
  }, [auth]);

  return (
    <div className="App">
      <Header user={userData} />
      <Box minHeight={"70vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar user={userData} />} />
          <Route path="/profile" element={<UserProfile user={userData} />} />
          <Route path="/login" element={<Auth user={userData} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
