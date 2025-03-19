import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );
        if (response.status === 201) {
          setIsRegistering(false);
        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );
        if (response.status === 200) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setFormData({ ...formData, error: error.response?.data.message || "Erreur" });
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#212529", color: "white" }}
    >
      <div className="card p-4" style={{ width: "1000px", backgroundColor: "#343a40", color: "white" }}>
        <h2 className="text-center">{isRegistering ? "Inscription" : "Connexion"}</h2>
        {formData.error && <p className="text-danger text-center">{formData.error}</p>}
        
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-3">
              <label style={{ color: "white" }}>Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
                style={{ backgroundColor: "#343a40", color: "white", borderColor: "white" }}
              />
            </div>
          )}

          <div className="mb-3">
            <label style={{ color: "white" }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
              style={{ backgroundColor: "#343a40", color: "white", borderColor: "white" }}
            />
          </div>

          <div className="mb-3">
            <label style={{ color: "white" }}>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
              style={{ backgroundColor: "#343a40", color: "white", borderColor: "white" }}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isRegistering ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            style={{ color: "white" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Vous avez déjà un compte ? Connectez-vous" : "Pas encore inscrit ? Créez un compte"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
