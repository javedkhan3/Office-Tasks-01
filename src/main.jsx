import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./ThemeContext.jsx";
import { Toaster } from "react-hot-toast";
// import ThemeProvider from './ThemeContext.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" /> {/* ✅ Add this once globally */}
    </ThemeProvider>
  </StrictMode>
);
