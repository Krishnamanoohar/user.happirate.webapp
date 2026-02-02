import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingApp from "./App.tsx";
import "./assets/Fonts/Denton-Regular.otf";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LandingApp />
  </StrictMode>,
);
