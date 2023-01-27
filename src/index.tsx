import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import rootTheme from "./styles/mui/rootTheme";
import { BrowserRouter } from "react-router-dom";
import LoadingProvider from "./context/LoadingProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={rootTheme}>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
