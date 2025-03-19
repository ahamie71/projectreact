const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const auth = require("../middlewares/auth");  // Assure-toi que l'utilisateur est authentifié

router.post("/categories", auth, CategoryController.createCategory);
router.get("/categories", auth, CategoryController.getCategories);

module.exports = router;
