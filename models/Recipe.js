const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  food: {
    type: String,
    required: true,
  },

  img: {
    type: Buffer,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "flavor",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("recipe", RecipeSchema);
