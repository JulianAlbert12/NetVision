import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-nav">
        <li className="footer-item">
          <Link to="/" className="footer-link">Home</Link>
        </li>
        <li className="footer-item">
          <Link to="/tools" className="footer-link">Tools</Link>
        </li>
        <li className="footer-item">
          <Link to="/about" className="footer-link">About</Link>
        </li>
        <li className="footer-item">
          <Link to="/contact" className="footer-link">Contact</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
