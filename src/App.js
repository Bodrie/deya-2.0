import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth } from "./views";
import { Box } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./styles/App.css";

function App() {
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
  }, [auth]);
  console.log(userData);
  return (
    <div className="App">
      <Header user={userData} />
      <Box minHeight={"70vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
