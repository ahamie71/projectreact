import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Appel à l'API de connexion du backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data); // Affiche la réponse du serveur
      if (response.status === 200 && response.data.token) {
        // Sauvegarder le token dans le localStorage
        localStorage.setItem("token", response.data.token);

        // Redirection vers la page des tâches après une connexion réussie
        navigate("/tasks"); // Utilisation de navigate au lieu de history.push()
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setFormData({
        ...formData,
        error: error.response ? error.response.data.message : "Erreur inconnue",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Connexion</h2>
      {formData.error && <div className="alert alert-danger">{formData.error}</div>}
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
