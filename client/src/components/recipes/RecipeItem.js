import { useContext } from "react";
import PropTypes from "prop-types";
import RecipeContext from "../../context/recipe/recipeContext";

const RecipeItem = ({ recipe }) => {
  const recipeContext = useContext(RecipeContext);
  const { deleteRecipe, setCurrent, clearCurrent } = recipeContext;

  const { id, food, img, description, ingredients, type } = recipe;

  const onDelete = () => {
    deleteRecipe(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {food && (
          <li>
            <i className="fas fa-concierge-bell"></i> {food}
          </li>
        )}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (type === "falvor" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {img && (
          <li>
            <i className="fas fa-image"></i> {img}
          </li>
        )}
        {description && (
          <li>
            <i className="fas fa-shopping-basket">fdwdwdd</i> {description}
          </li>
        )}
        {ingredients && (
          <li>
            <i className="fas fa-shopping-basket"></i> {ingredients}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(recipe)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
