// src/components/Footer.js
import React from "react";
import './Footer.css'; // Import du CSS pour le style

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Task Manager. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
