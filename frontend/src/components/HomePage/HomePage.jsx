import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  const [storedData, setStoredData] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setStoredData(userData);
    }
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <div className="home-wrapper">
        <div className="welcome-message">
          Welcome Back {storedData.fullName}
        </div>
        <div className="logout-button" onClick={logout}>
          <button type="button">Log Out</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
