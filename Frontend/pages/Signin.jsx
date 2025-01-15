import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import "../public/Css/Auth.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignin = () => {
    // Handle Google sign-in logic here
    console.log("Google Sign-In clicked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in form submission logic
    console.log("Sign-in form submitted", formData);
  };

  const handleSignupRedirect = () => {
    // Redirect to the signup page using useNavigate
    navigate("/signup");
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="heading">Sign In</h2>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submitButton">Sign In</button>
      </form>
      <button className="googleButton" onClick={handleGoogleSignin}>
        Sign In with Google
      </button>
      <button className="signupRedirectButton" onClick={handleSignupRedirect}>
        Sign Up
      </button>
    </>
  );
};

export default Signin;
