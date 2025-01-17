// import React from 'react';
// import '../public/Css/Header.css';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo">Whiteboard Collaboration</div>
//       <nav className="nav">
//         <a href="/" className="link">Home</a>
//         <a href="#" className="link">About</a>
//         <a href="/signin" className="link">Sign In</a>
//         <a href="#" className="link">Contact</a>
//       </nav>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import '../public/Css/Header.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate =useNavigate();
  // Function to check for the access_token in cookies
  const checkAuthToken = async() => {
    try {
      const response = await axios.get("http://localhost:8080/authenticate", {
        withCredentials: true, // Include cookies in the request
      });
      console.log(response.data); // "yes you are authenticate"
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Error:", error);
      setIsAuthenticated(false)
    }
  };
  
  const handleLogout=async ()=>{
    try
    {
      await axios.post("http://localhost:8080/api/user/logout", {}, { withCredentials: true });
      setIsAuthenticated(false)
      navigate("/signin")
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
        <a href="/" className="link">Home</a>
        <a href="#" className="link">About</a>
        {isAuthenticated ? (
          <a href="#" className="link" onClick={handleLogout}>Logout</a>
        ) : (
          <a href="/signin" className="link">Sign In</a>
        )}
        <a href="#" className="link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
