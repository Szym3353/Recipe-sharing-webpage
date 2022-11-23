import React from "react";
import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router";

//Page components
import EditRecipe from "./Pages/EditRecipe";
import Homepage from "./Pages/HomePage";
import NewRecipe from "./Pages/NewRecipe";
import RecipeDetails from "./Pages/RecipeDetails";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/new" element={<NewRecipe />} />
        <Route path="/:id">
          <Route index element={<RecipeDetails />} />
          <Route path="edit" element={<EditRecipe />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
