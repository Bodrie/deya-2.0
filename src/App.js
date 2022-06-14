import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar } from "./views";
import { Box } from "@mui/material";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Box minHeight={"70vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
