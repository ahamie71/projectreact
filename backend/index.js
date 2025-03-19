const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes"); 
const taskRoutes = require("./routes/taskRoutes"); 
const categoryRoutes = require("./routes/categoryRoutes");  // Importer les routes de catégories


dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json()); 
connectDB();
// Définir les routes
app.use("/api/auth", authRoutes); 
app.use("/api", taskRoutes);
app.use("/api", categoryRoutes);

const port = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
