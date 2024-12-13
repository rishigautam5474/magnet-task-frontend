import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import authModel from "../models/auth.model";
import { showErrorAlert, showToast } from "../lib/helper";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email !== "" && formData.password !== "") {
        await authModel
          .loginUser(formData)
          .then((result) => {
            if (result) {
              sessionStorage.setItem("token", result?.token);
              sessionStorage.setItem("userInfo", JSON.stringify(result?.user));
              showToast("success", result?.message);
              window.location.assign('/index'); 
            }
          })
          .catch((error) => {
            console.log(error?.response?.data?.message);
            showToast("error", error?.response?.data?.message);
          });
      } else {
        showToast("error", "Enter both email and password");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      showErrorAlert("error", error?.response?.data?.message);
    }
  };
  

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="col-md-5">
        <div className="card shadow-lg border-0 rounded">
          <div className="card-header bg-primary text-white text-center">
            <h4>Login</h4>
            <p>Access your account</p>
          </div>
          <div className="card-body p-4">
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center py-3">
            <small className="text-muted">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary fw-bold">
                Sign up
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
