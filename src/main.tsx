import "./index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"

import { Dashboard } from "./routes/dashboard"
import { Demo } from "./routes/demo"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
