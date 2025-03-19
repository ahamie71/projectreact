const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    console.log("Token reçu:", token); // Ajoute cette ligne pour vérifier si tu reçois bien le token
    
    if (!token) return res.status(401).json({ message: "Accès refusé" });
  
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Prends la deuxième partie après "Bearer"
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error("Erreur de validation du token:", error);
      res.status(400).json({ message: "Token invalide" });
    }
  };
  
