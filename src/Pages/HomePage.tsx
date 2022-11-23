import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { recipe, tag } from "../types";

//Context
import { useRecipes } from "../context/RecipesContext";
import { useTags } from "../context/TagsContext";

//Components
import { Button, Grid, Typography, TextField } from "@mui/material";
import ReactSelect from "react-select";
import SingleRecipe from "../components/SingleRecipe";
import { Stack, Box } from "@mui/system";

const HomePage = () => {
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const { tags } = useTags();
  const [searchField, setSearchField] = useState<string>("");
  const [searchTags, setSearchTags] = useState<tag[]>([] as tag[]);

  let filteredRecipes = useMemo(
    () => filterRecipes(),
    [searchField, searchTags]
  );

  function filterRecipes() {
    let value = [...recipes];
    if (searchTags.length !== 0) {
      value = value.filter((recipe: recipe) =>
        searchTags.every(
          (tag) => recipe.tags.findIndex((el) => el.label === tag.label) > -1
        )
      );
    }
    if (searchField.trim() === "") return value;
    return value.filter((recipe: recipe) =>
      recipe.title.toUpperCase().includes(searchField.toUpperCase())
    );
  }

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h4" component="h2">
          Share your recipe
        </Typography>
        <Button onClick={() => navigate("/new")} variant="contained">
          Create
        </Button>
      </Stack>
      <Grid sx={{ mt: 5, mb: 7 }} container spacing={2}>
        <Grid item xs={12} sm={7}>
          <TextField
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            label={"Search"}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <ReactSelect
            options={tags}
            value={searchTags}
            onChange={(tags) => {
              setSearchTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.id };
                })
              );
            }}
            isMulti
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {filteredRecipes.map((recipe: recipe) => (
          <Grid key={`recipe-${recipe.id}`} item xs={12} sm={6}>
            <SingleRecipe recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
