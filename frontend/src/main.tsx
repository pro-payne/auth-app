import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

if (!root) {
  throw new Error('Root element not found');
}

const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
