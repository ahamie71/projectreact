const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  // Vérification des champs obligatoires
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }
  
  // Vérification si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }
  
  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Création de l'utilisateur
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  
  try {
    await user.save();
    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Vérification des champs
  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  // Vérification si l'utilisateur existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Identifiants incorrects" });
  }

  // Vérification du mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Identifiants incorrects" });
  }

  // Création du token JWT
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Envoi du token
  res.json({ token });
};
