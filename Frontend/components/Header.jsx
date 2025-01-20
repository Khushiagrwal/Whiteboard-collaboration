import React, { useState, useEffect } from 'react';
import '../public/Css/Header.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate =useNavigate();

  const checkAuthToken = async() => {
    try {
      const response = await axios.get("http://localhost:8080/authenticate", {
        withCredentials: true, // Include cookies in the request
      });
      // console.log(response.data); // "yes you are authenticate"
      setIsAuthenticated(true)
    } catch (error) {
      // console.error("Error:", error);
      setIsAuthenticated(false)
    }
  };
  const handleLogout=async ()=>{
    try
    {
      await axios.post("http://localhost:8080/api/user/logout", {}, { withCredentials: true });
      localStorage.removeItem("persist:root");
      localStorage.removeItem("userEmail")
      setIsAuthenticated(false)
      // navigate("/signin")
      // Navigate and reload the page
      window.location.assign("/signin");
    }
    catch(error)
    {
      console.error("Error logging out:", error);
    }
  }
  useEffect(() => {
    checkAuthToken(); // Call the function here
  }, []);

  return (
    <header className="header">
      <div className="logo">Whiteboard Collaboration</div>
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="#" className="link">About</Link>
        {isAuthenticated ? (
          <Link to="#" className="link" onClick={handleLogout}>Logout</Link>
        ) : (
          <Link to="/signin" className="link">Sign In</Link>
        )}
        <Link to="/joinroom" className="link">Join</Link>
      </nav>
    </header>
  );
};

export default Header;
