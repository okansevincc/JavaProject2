import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = "http://localhost:8080/api/v1/auth/register";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    axios
      .post(API_BASE_URL, data) // request to save user
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      <h1>Register</h1>
      <div className="card-body">
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>First Name: </label>
            <input
              className="form-control"
              placeholder="First Name"
              type="text"
              name="firstName"
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              className="form-control"
              placeholder="Last Name"
              type="text"
              name="lastName"
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Email: </label>
            <input
              className="form-control"
              placeholder="Email"
              type="text"
              name="email"
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Password: </label>
            <input
              className="form-control"
              placeholder="Password"
              type="text"
              name="password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
