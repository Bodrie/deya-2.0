import { useAuth } from "./hooks/useAuth";
import { refreshDatabase } from "./firebase";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth, UserProfile } from "./views";
import { Box } from "@mui/material";
import "./styles/App.css";

function App() {
  refreshDatabase();
  const userData = useAuth();

  return (
    <div className="App">
      <Header user={userData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar user={userData} />} />
        <Route path="/profile" element={<UserProfile user={userData} />} />
        <Route path="/login" element={<Auth user={userData} />} />
        <Route path="/admin/new" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
