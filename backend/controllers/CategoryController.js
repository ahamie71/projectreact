const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Le nom de la catégorie est requis" });
  }

  try {
    // Vérifier si la catégorie existe déjà pour cet utilisateur
    const existingCategory = await Category.findOne({ name, userId: req.userId });
    if (existingCategory) {
      return res.status(400).json({ message: "Cette catégorie existe déjà" });
    }

    // Créer la catégorie
    const category = new Category({ userId: req.userId, name });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la création de la catégorie" });
  }
};
exports.getCategories = async (req, res) => {
    try {
      // Récupérer toutes les catégories de l'utilisateur connecté
      const categories = await Category.find({ userId: req.userId });
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories" });
    }
  };
  