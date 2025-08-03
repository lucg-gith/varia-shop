import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "./components/Footer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Footer></Footer>
  </StrictMode>
);
