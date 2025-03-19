const Task = require("../models/Task");
const Category = require("../models/Category");


exports.createTask = async (req, res) => {
    const { title, description, categoryId } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Le titre de la tâche est requis" });
    }
    try {
      console.log(`Requête reçue pour créer une tâche:`);
      console.log(`Titre: ${title}, Description: ${description}, Catégorie ID: ${categoryId}`);
        if (categoryId) {
        console.log(`Vérification de la catégorie avec l'ID: ${categoryId}`);
        const category = await Category.findOne({ _id: categoryId, userId: req.userId });
        
        if (!category) {
          console.log(`Catégorie avec l'ID ${categoryId} non trouvée ou inaccessible pour l'utilisateur ${req.userId}`);
          return res.status(400).json({ message: "Catégorie invalide ou non accessible" });
        }
        console.log(`Catégorie valide trouvée: ${category.name}`);
      }
  
      // Créer la tâche avec la catégorie
      const task = new Task({ 
        userId: req.userId, 
        title, 
        description, 
        category: categoryId || null 
      });
      
      await task.save();
      console.log(`Tâche créée avec succès: ${task.title}`);
      res.status(201).json(task);
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error);
      res.status(500).json({ message: "Erreur serveur lors de la création de la tâche", error });
    }
  };

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const { title, description, categoryId } = req.body;
  
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      if (task.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Vous ne pouvez pas mettre à jour cette tâche" });
      }
  
      // Vérifier si la catégorie existe et appartient à l'utilisateur
      if (categoryId) {
        const category = await Category.findOne({ _id: categoryId, userId: req.userId });
        if (!category) {
          return res.status(400).json({ message: "Catégorie invalide" });
        }
      }
  
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, categoryId }, { new: true });
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur lors de la mise à jour de la tâche" });
    }
  };
  
  

  exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      if (task.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Vous ne pouvez pas supprimer cette tâche" });
      }
  
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Tâche supprimée" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur lors de la suppression de la tâche" });
    }
  };
  
