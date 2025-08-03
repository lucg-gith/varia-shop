import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RouterApp } from "./router/RouterApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>
);
