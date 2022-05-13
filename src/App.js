import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar } from "./views";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
