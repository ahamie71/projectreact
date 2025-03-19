const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");
const auth = require("../middlewares/auth");

// Créer une tâche
router.post("/tasks", auth, TaskController.createTask);
router.get("/tasks", auth, TaskController.getTasks);
router.put("/tasks/:id", auth, TaskController.updateTask);
router.delete("/tasks/:id", auth, TaskController.deleteTask);

module.exports = router;
