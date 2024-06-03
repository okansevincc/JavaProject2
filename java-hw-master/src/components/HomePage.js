import React from "react";
import { Link } from "react-router-dom";
import img from "../imgs/homepage_bg.jpg";

const HomePage = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <Link to="/login">
          <button style={{ padding: "5px 10px", fontSize: "14px" }}>
            Login
          </button>
        </Link>
        <Link to="/register">
          <button style={{ padding: "5px 10px", fontSize: "14px" }}>
            Register
          </button>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h1>Welcome</h1>
      </div>
    </div>
  );
};

export default HomePage;
