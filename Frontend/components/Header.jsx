import React from 'react';
import '../public/Css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Whiteboard Collaboration</div>
      <nav className="nav">
        <a href="/" className="link">Home</a>
        <a href="#" className="link">About</a>
        <a href="/signin" className="link">Sign In</a>
        <a href="#" className="link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
