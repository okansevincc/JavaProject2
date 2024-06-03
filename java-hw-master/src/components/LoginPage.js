import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = "http://localhost:8080/api/v1/auth/login";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    axios
      .post(API_BASE_URL, data) // request to login
      .then((res) => {
        localStorage.setItem("tokenKey", res.data.message); // set items to local storage to use in other components
        localStorage.setItem("userEmail", res.data.email);
        navigate("/product"); // route to main page
        window.location.reload();
      })
      .catch(() => console.log("Invalid Email or Password!")); // error message
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <label>
          Email:
          <input
            type="text"
            name="email"
            style={{ marginBottom: "10px", padding: "8px", fontSize: "16px" }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            style={{ marginBottom: "10px", padding: "8px", fontSize: "16px" }}
          />
        </label>
        <button type="submit" style={{ padding: "10px", fontSize: "16px" }}>
          Login
        </button>
      </form>
      <a
        href="/forgot-password"
        style={{ marginTop: "10px", fontSize: "14px" }}
      >
        Forgot Password?
      </a>
    </div>
  );
};

export default LoginPage;
