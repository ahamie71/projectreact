const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "pending" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }  // Référence à la catégorie
});

module.exports = mongoose.model("Task", TaskSchema);
