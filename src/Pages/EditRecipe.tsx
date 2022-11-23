import React from "react";
import { useParams } from "react-router";
import RecipeForm from "../components/RecipeForm";

const EditRecipe = () => {
  let { id } = useParams();
  return (
    <>
      <h1>Edit Recipe</h1>
      <RecipeForm id={id} />
    </>
  );
};

export default EditRecipe;
