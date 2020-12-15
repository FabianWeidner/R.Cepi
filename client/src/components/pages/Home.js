import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Recipes from "../recipes/Recipes";
import RecipeForm from "../recipes/RecipeForm";
import RecipeFilter from "../recipes/RecipeFilter";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <RecipeForm />
      </div>
      <div>
        <RecipeFilter />
        <Recipes />
      </div>
    </div>
  );
};

export default Home;
