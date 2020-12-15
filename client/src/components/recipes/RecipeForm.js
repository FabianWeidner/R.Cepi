import { useState, useContext, useEffect } from "react";
import RecipeContext from "../../context/recipe/recipeContext";

const RecipeForm = () => {
  const recipeContext = useContext(RecipeContext);

  const { addRecipe, updateRecipe, clearCurrent, current } = recipeContext;

  useEffect(() => {
    if (current !== null) {
      setRecipe(current);
    } else {
      setRecipe({
        food: "",
        img: "",
        description: "",
        ingredients: "",
        type: "flavor",
      });
    }
  }, [recipeContext, current]);

  const [recipe, setRecipe] = useState({
    food: "",
    img: "",
    description: "",
    ingredients: "",
    type: "flavor",
  });

  const { food, img, description, ingredients, type } = recipe;

  const onChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addRecipe(recipe);
    } else {
      updateRecipe(recipe);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Modify Recipe" : "Add Recipe"}
      </h2>
      <input
        type="text"
        placeholder="Recipe Name"
        name="food"
        value={food}
        onChange={onChange}
      />
      <img src={img} alt="" />
      <p>Add your Image</p>
      <input
        type="text"
        placeholder="Recipe information"
        name="description"
        value={description}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Shopping List"
        name="ingredients"
        value={ingredients}
        onChange={onChange}
      />
      <h5>Rezept Type</h5>
      <input
        type="radio"
        name="type"
        value="hearty"
        checked={type === "hearty"}
        onChange={onChange}
      />{" "}
      Hearty{" "}
      <input
        type="radio"
        name="type"
        value="sweet"
        checked={type === "sweet"}
        onChange={onChange}
      />{" "}
      Sweet
      <div>
        <input
          type="submit"
          value={current ? "Modify Recipe" : "Add Recipe"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default RecipeForm;
