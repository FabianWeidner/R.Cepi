import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeContext from "./recipeContext";
import recipeReducer from "./recipeReducer";
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  FILTER_RECIPES,
  CLEAR_FILTER,
} from "../types";

const RecipeState = (props) => {
  const initialState = {
    recipes: [
      {
        id: 1,
        food: "Lasagne",
        img: "img",
        description: "Recipe information",
        ingredients: "ShoppingList",
        type: "italien",
      },
      {
        id: 2,
        food: "Soup",
        img: "img",
        description: "Recipe information",
        ingredients: "ShoppingList",
        type: "Asian",
      },
      {
        id: 3,
        food: "Fish",
        img: "img",
        description: "Recipe information",
        ingredients: "ShoppingList",
        type: "peru",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Add Recipe
  const addRecipe = (recipe) => {
    recipe.id = uuidv4();
    dispatch({ type: ADD_RECIPE, payload: recipe });
  };

  // Delete Recipe
  const deleteRecipe = (id) => {
    dispatch({ type: DELETE_RECIPE, payload: id });
  };

  // Set Current Recipe
  const setCurrent = (recipe) => {
    dispatch({ type: SET_CURRENT, payload: recipe });
  };

  // Clear Current Recipe
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Recipe

  const updateRecipe = (recipe) => {
    dispatch({ type: UPDATE_RECIPE, payload: recipe });
  };

  // Filter Recipe

  const filterRecipes = (text) => {
    dispatch({ type: FILTER_RECIPES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        current: state.current,
        filtered: state.filtered,
        addRecipe,
        deleteRecipe,
        setCurrent,
        clearCurrent,
        updateRecipe,
        filterRecipes,
        clearFilter,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
