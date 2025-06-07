import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { Dashboard } from "@/pages/Dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
