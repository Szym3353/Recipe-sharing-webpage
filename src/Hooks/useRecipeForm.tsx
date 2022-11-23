import { recipe } from "../types";
import { useState } from "react";
import { useRecipes } from "../context/RecipesContext";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

export default function useRecipeForm(id: string | undefined) {
  let { addRecipe, recipes } = useRecipes();
  let navigate = useNavigate();

  let [ingredientTextField, setIngredientTextField] = useState<string>("");
  let [stepTextField, setStepTextField] = useState<string>("");

  //Form elements
  const [formData, setFormData] = useState<recipe>(
    id
      ? recipes[recipes.findIndex((el: recipe) => el.id === id)]
      : {
          title: "",
          description: "",
          steps: [],
          ingredients: [],
          createdAt: "",
          tags: [],
          favorite: false,
          id: "",
        }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, createdAt: new Date().toISOString() }));
    addRecipe(formData);
    navigate("..");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id.split("-")[2]]: e.target.value,
    }));
  };

  const handleAddIngr = () => {
    if (ingredientTextField.trim() === "") {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { ingredientId: uuidv4(), ingredientName: ingredientTextField },
      ],
    }));
    setIngredientTextField("");
  };

  const handleAddStep = () => {
    if (stepTextField.trim() === "") {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, { value: stepTextField, checked: false }],
    }));
    setStepTextField("");
  };
  return {
    handleSubmit,
    handleChange,
    handleAddIngr,
    handleAddStep,
    formData,
    setFormData,
    setIngredientTextField,
    ingredientTextField,
    setStepTextField,
    stepTextField,
  };
}
