import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//Context
import { TagProvider } from "./context/TagsContext";
import { RecipesProvider } from "./context/RecipesContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TagProvider>
      <RecipesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipesProvider>
    </TagProvider>
  </React.StrictMode>
);
