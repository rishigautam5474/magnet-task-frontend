import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authModel from "../models/auth.model";
import { showSuccessAlert } from "../lib/helper";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (
        formData.name !== "" ||
        formData.email !== "" ||
        formData.password !== ""
      ) {
        await authModel.register(formData).then((result) => {
          if (result) {
            // console.log(result);
            showSuccessAlert("success", result?.message);
            navigate("/");
          }
        });
      } else {
        console.log("All fields are required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-header bg-primary text-white text-center">
              <h3>Signup</h3>
              <p>Create your account</p>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              {success && (
                <div className="alert alert-success text-center">{success}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Signup
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small className="text-muted">
                Already have an account?{" "}
                <Link to="/" className="text-primary fw-bold">
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
