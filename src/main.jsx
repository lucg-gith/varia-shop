import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterApp } from "./router/RouterApp";
import { UserProvider } from "./context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterApp />
    </UserProvider>
  </StrictMode>
);
