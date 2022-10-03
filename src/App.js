import { useAuth } from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth, UserProfile } from "./views";
import { Box } from "@mui/material";
import "./styles/App.css";

function App() {
  const { userData } = useAuth();
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
