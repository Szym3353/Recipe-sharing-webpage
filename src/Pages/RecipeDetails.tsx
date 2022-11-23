import React from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useRecipes } from "../context/RecipesContext";

//Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import SingleTag from "../components/SingleTag";
import { Box, Stack } from "@mui/system";

const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes } = useRecipes();
  const navigate = useNavigate();

  let recipeData = recipes.find((recipe) => recipe.id === id);
  return (
    <>
      {recipeData ? (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h1>{recipeData.title}</h1>
            <Box>
              <Button
                onClick={() => navigate("./edit")}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outlined"
                color="primary"
                sx={{ ml: 2 }}
              >
                Back
              </Button>
            </Box>
          </Stack>
          <Card sx={{ my: 5 }}>
            <CardContent>
              <Stack spacing={2}>
                <Stack spacing={2} direction={"row"}>
                  {recipeData.tags.map((tag) => (
                    <SingleTag key={tag.id} tag={tag} />
                  ))}
                </Stack>
                <Typography>{recipeData.description}</Typography>
              </Stack>
            </CardContent>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Card>
                <CardHeader title="Ingredients" />
                <CardContent>
                  <List>
                    {recipeData.ingredients.map((ingr) => (
                      <ListItem>{ingr.ingredientName}</ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Card>
                <CardHeader title="Steps" />
                <CardContent>
                  <List>
                    {recipeData.steps.map((step, index: number) => (
                      <ListItem>
                        {index + 1}. {step.value}
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RecipeDetails;
