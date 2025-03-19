// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Fichier CSS pour le style de la barre de navigation

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">TâchesApp</Link>
        <div className="navbar-links">
          <Link to="/login" className="navbar-link">Se connecter</Link>
          <Link to="/register" className="navbar-link">S'inscrire</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
