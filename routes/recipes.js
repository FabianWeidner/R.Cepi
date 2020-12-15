const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const Recipe = require("../models/Recipe");

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private
router.post(
  "/",
  [auth, [check("food", "Food is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { food, ingredients, img, type, description } = req.body;

    try {
      const newRecipe = new Recipe({
        food,
        ingredients,
        img,
        type,
        description,
        user: req.user.id,
      });

      const recipe = await newRecipe.save();

      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put("/:id", auth, async (req, res) => {
  const { food, ingredients, img, type, description } = req.body;

  // Buld contact object
  const recipeFields = {};
  if (food) recipeFields.food = food;
  if (img) recipeFields.img = img;
  if (description) recipeFields.description = description;
  if (type) recipeFields.type = type;
  if (ingredients) recipeFields.ingredients = ingredients;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: "Recipe not found" });

    // Make sure user owns contact
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: recipeFields },
      { new: true }
    );

    res.json(recipe);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/contacts/:id
// @desc        DELETE contact
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: "Recipe not found" });

    // Make sure user owns contact
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({ msg: "Recipe removed" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
