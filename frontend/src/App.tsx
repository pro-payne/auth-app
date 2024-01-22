import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import SignUpPage from "./components/SingUpPage/SignUpPage";
import LogInPage from "./components/LogInPage/LogInPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./components/HomePage/HomePage";
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route path="*" element={<h3>Page not found</h3>} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
