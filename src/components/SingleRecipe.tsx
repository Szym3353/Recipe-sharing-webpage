import React from "react";
import { useNavigate } from "react-router";
import { recipe, tag } from "../types";

import { useRecipes } from "../context/RecipesContext";

//Components
import SingleTag from "./SingleTag";
import { Stack } from "@mui/system";
import {
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Typography,
} from "@mui/material";

//Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleRecipe = ({ recipe }: { recipe: recipe }) => {
  const navigate = useNavigate();
  const { favoriteToggle, deleteRecipe } = useRecipes();

  return (
    <Card sx={{ boxShadow: "2px 3px 8px rgba(0,0,0,0.34)", p: 2 }}>
      <CardHeader
        onClick={() => navigate(`/${recipe.id}`)}
        sx={{ p: 0, mb: 2, cursor: "pointer" }}
        title={recipe.title}
        subheader={recipe.createdAt.split("T")[0]}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Typography>{recipe.description}</Typography>
      <Stack direction={"row"} sx={{ mt: 2 }}>
        {recipe.tags.map((tag: tag) => (
          <SingleTag key={tag.id} tag={tag} />
        ))}
      </Stack>
      <CardActions sx={{ mt: 2, justifyContent: "flex-end" }}>
        <IconButton onClick={() => favoriteToggle(recipe.id)}>
          {recipe.favorite ? (
            <FavoriteIcon sx={{ color: "#d8263e" }} />
          ) : (
            <FavoriteBorderOutlinedIcon
              color="primary"
              sx={{
                transition: "0.25s",
                "&:hover": {
                  color: "#d8263e",
                },
              }}
            />
          )}
        </IconButton>
        <IconButton
          onClick={() => navigate(`/${recipe.id}/edit`)}
          sx={{ ml: 1 }}
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={() => deleteRecipe(recipe.id)}>
          <DeleteIcon sx={{ cursor: "pointer" }} color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SingleRecipe;
