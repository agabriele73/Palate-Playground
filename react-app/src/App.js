import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import RecipeHomePage from "./components/RecipeHomePage";
import CurrentRecipePage from "./components/CurrentRecipePage";
import RecipeFormPage from "./components/RecipeFormPage";
import UsersRecipesPage from "./components/UsersRecipes";
import AllRecipesPage from "./components/AllRecipesPage";
import ChickenRecipesPage from "./components/ChickenRecipesPage";
import BeefRecipesPage from "./components/BeefRecipesPage";
import SeafoodRecipesPage from "./components/SeafoodRecipesPage";
import VegetarianRecipesPage from "./components/VegetarianRecipesPage";
import UserRatings from "./components/UserRatings";
import Footer from "./components/Footer";
import * as ratingActions from "./store/rating";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(ratingActions.setRatingsThunk());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
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
            <Route exact path="/recipes">
              <AllRecipesPage />
            </Route>
            <Route exact path="/recipes/chicken"> 
              <ChickenRecipesPage />
            </Route>
            <Route exact path="/recipes/beef">
              <BeefRecipesPage />
            </Route>
            <Route exact path="/recipes/seafood">
              <SeafoodRecipesPage />
            </Route>
            <Route exact path="/recipes/vegetarian">
              <VegetarianRecipesPage />
            </Route>
            <Route exact path="/my-ratings">
              <UserRatings/>
            </Route>
            <Route exact path="/recipes/:recipe_id">
              <CurrentRecipePage />
            </Route>
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
