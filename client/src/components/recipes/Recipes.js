import { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RecipeItem from "./RecipeItem";
import RecipeContext from "../../context/recipe/recipeContext";

const Recipes = () => {
  const recipeContext = useContext(RecipeContext);

  const { recipes, filtered } = recipeContext;

  if (recipes.length === 0) {
    return <h4>Pleas add a recipe</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((recipe) => (
              <CSSTransition key={recipe.id} timeout={500} classNames="item">
                <RecipeItem recipe={recipe} />
              </CSSTransition>
            ))
          : recipes.map((recipe) => (
              <CSSTransition key={recipe.id} timeout={500} classNames="item">
                <RecipeItem recipe={recipe} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Recipes;
