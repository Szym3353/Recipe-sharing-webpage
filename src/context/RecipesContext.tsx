import React, { ReactNode, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { recipe } from "../types";

import { v4 as uuidv4 } from "uuid";

type valueType = {
  recipes: recipe[];
  addRecipe: (recipe: recipe) => void;
  favoriteToggle: (id: string) => void;
  deleteRecipe: (id: string) => void;
};

const RecipesContext = React.createContext<valueType>({} as valueType);

export function useRecipes() {
  return React.useContext(RecipesContext);
}

export function RecipesProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useLocalStorage<recipe[]>("recipes", []);

  let addRecipe = (recipe: recipe) => {
    let recipeIndex = recipes.findIndex((el: recipe) => el.id === recipe.id);
    if (recipeIndex >= 0) {
      let newArray = [...recipes];
      newArray[recipeIndex] = { ...recipe };
      setRecipes(newArray);
    } else {
      setRecipes((prev) => [...prev, { ...recipe, id: uuidv4() }]);
    }
  };

  let favoriteToggle = (id: string) => {
    let newArray = [...recipes];
    newArray[newArray.findIndex((el: recipe) => el.id === id)].favorite =
      !newArray[newArray.findIndex((el: recipe) => el.id === id)].favorite;
    setRecipes(newArray);
  };

  let deleteRecipe = (id: string) => {
    let newArray = recipes.filter((el: recipe) => el.id !== id);
    setRecipes(newArray);
  };

  let value = {
    recipes,
    addRecipe,
    favoriteToggle,
    deleteRecipe,
  };

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
}
