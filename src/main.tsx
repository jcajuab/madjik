import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: The non-null assertion is safe here because we know the "root" element exists at runtime.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
