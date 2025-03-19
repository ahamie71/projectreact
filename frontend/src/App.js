import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";  // Import de la page de connexion
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />  {/* Route vers la page de connexion */}
      </Routes>
    </Router>
  );
};

export default App;
