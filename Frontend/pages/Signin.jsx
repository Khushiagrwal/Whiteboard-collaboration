import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../public/Css/Auth.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../src/redux/user/userSlice";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignin = () => {
    console.log("Google Sign-In clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("http://localhost:8080/api/user/signin", formData, { withCredentials: true });
      dispatch(signInSuccess(res.data));
      navigate("/");
      console.log(res.data);
    } catch (error) {
      dispatch(signInFailure(error.response?.data || { msg: "An unknown error occurred" }));
      console.error(error.response?.data || "An error occurred");
    }
  };

  const handleSignupRedirect = () => {
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
        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error.msg || "An error occurred"}</p>}
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
