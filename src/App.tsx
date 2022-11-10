import React, { useEffect } from "react";
import { useAuth, useEmialVerification } from "./hooks";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Calendar, Admin, Auth, UserProfile } from "./views";
import "./styles/App.css";

function App() {
  const test = () => {
    // @ts-ignore
    let standalone = window.navigator.standalone;
    
    let userAgent = window.navigator.userAgent.toLowerCase();
    let safari = /safari/.test(userAgent);
    let ios = /iphone|ipod|ipad/.test(userAgent);

    if (ios) {
      if (!standalone && safari) {
        document.getElementById("where-am-i")!.textContent = "browser";
      } else if (standalone && !safari) {
        document.getElementById("where-am-i")!.textContent = "standalone";
      } else if (!standalone && !safari) {
        document.getElementById("where-am-i")!.textContent = "uiwebview";
      }
    } else {
      document.getElementById("where-am-i")!.textContent = "not iOS";
    }
  };

  useEffect(() => {
    test();
  }, []);
  const userData = useAuth();
  useEmialVerification(userData);

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
