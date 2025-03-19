import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import de Bootstrap
import { Fade } from "react-reveal"; // Pour l'animation

const Welcome = () => {
  const navigate = useNavigate();

  // Fonction pour rediriger vers la page d'inscription
  const handleClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh", // Prendre toute la hauteur de la fenêtre
          backgroundColor: "#212529", // Fond noir
          color: "white", // Texte en blanc
          margin: 0, // Retirer la marge par défaut
          padding: 0, // Retirer le padding par défaut
        }}
      >
        {/* Titre avec animation */}
        <Fade bottom>
          <h1 className="display-4 text-center text-primary">
            Bienvenue dans notre Application de Gestion de Tâches
          </h1>
        </Fade>

        {/* Description de l'application */}
        <Fade bottom delay={500}>
          <p className="lead text-center text-muted">
            Découvrez une application simple et efficace pour gérer vos tâches et améliorer votre productivité.
          </p>
        </Fade>

        {/* Illustration avec des icônes (utilisation de Bootstrap Icons ou FontAwesome) */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 text-center">
            <Fade left>
              <div className="card shadow-sm mb-3" style={{ backgroundColor: "#343a40", color: "white" }}>
                <div className="card-body">
                  <i className="fas fa-tasks fa-3x text-primary"></i>
                  <h5 className="card-title mt-3">Gestion des Tâches</h5>
                  <p className="card-text">Créez, gérez et suivez vos tâches de manière simple.</p>
                </div>
              </div>
            </Fade>
          </div>

          <div className="col-md-4 text-center">
            <Fade right>
              <div className="card shadow-sm mb-3" style={{ backgroundColor: "#343a40", color: "white" }}>
                <div className="card-body">
                  <i className="fas fa-clock fa-3x text-primary"></i>
                  <h5 className="card-title mt-3">Suivi du Temps</h5>
                  <p className="card-text">Suivez le temps que vous passez sur chaque tâche</p>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        {/* Bouton de découverte avec animation */}
        <Fade bottom delay={1000}>
          <button
            onClick={handleClick}
            className="btn btn-primary btn-lg mt-4"
            style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
          >
            Découvrir l'Application
          </button>
        </Fade>
      </div>

      {/* Footer simple avec icônes sociales */}
      <footer
        className="footer"
        style={{
          backgroundColor: "#343a40", // Fond du footer
          color: "white", // Texte en blanc
          textAlign: "center", // Texte centré
          padding: "10px", // Un peu d'espacement autour du texte
        }}
      >
        <p>&copy; 2025 Application de Gestion de Tâches. Tous droits réservés.</p>

        {/* Icônes sociales */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mr-3">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mr-3">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mr-3">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Welcome;
