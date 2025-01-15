// Footer.js
import React from 'react';
import '../public/Css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} MyCompany. All rights reserved.
    </footer>
  );
};

export default Footer;
