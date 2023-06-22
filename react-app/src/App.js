import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import RecipeHomePage from "./components/RecipeHomePage";
import CurrentRecipePage from "./components/CurrentRecipePage";
import RecipeFormPage from "./components/RecipeFormPage";
import UsersRecipesPage from "./components/UsersRecipes";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <RecipeHomePage />
          </Route>
          <Route exact path="/recipes/new">
            <RecipeFormPage />
          </Route>
          <Route exact path="/recipes/my-recipes">
            <UsersRecipesPage />
          </Route>
          <Route exact path="/recipes/:recipe_id">
            <CurrentRecipePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
