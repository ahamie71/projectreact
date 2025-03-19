const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

dotenv.config();
const app = express();

// Configuration de CORS pour permettre les requêtes provenant de http://localhost:3000
const corsOptions = {
  origin: "http://localhost:3000", // Permettre uniquement les requêtes depuis http://localhost:3000
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
};

app.use(cors(corsOptions)); // Appliquer la configuration CORS

app.use(express.json());
connectDB();

// Définir les routes
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", categoryRoutes);

const port = process.env.PORT || 5001; // Ton backend écoute sur le port 5001

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
