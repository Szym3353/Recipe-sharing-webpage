import { ingredient, step } from "../types";
import { v4 as uuidv4 } from "uuid";

//Hooks
import useRecipeForm from "../Hooks/useRecipeForm";
import { useTags } from "../context/TagsContext";
import { useNavigate, useParams } from "react-router-dom";

//Components
import ClearIcon from "@mui/icons-material/Clear";
import CreatableReactSelect from "react-select/creatable";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";

const RecipeForm = ({ id }: { id: string | undefined }) => {
  let { tags, addTag } = useTags();
  let navigate = useNavigate();
  let {
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    setIngredientTextField,
    ingredientTextField,
    setStepTextField,
    stepTextField,
    handleAddIngr,
    handleAddStep,
  } = useRecipeForm(id);

  return (
    <Box autoComplete="off" component="form" onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        <Grid item xs={6}>
          <TextField
            id="recipe-form-title"
            label="Title"
            onChange={handleChange}
            fullWidth
            required
            multiline
            size={"small"}
            value={formData.title}
          />
        </Grid>
        <Grid item xs={6}>
          <CreatableReactSelect
            onCreateOption={(label) => {
              addTag(label);
              setFormData((prev) => ({
                ...prev,
                tags: prev.tags
                  ? [...prev.tags, { label, id: uuidv4() }]
                  : [{ label, id: uuidv4() }],
              }));
            }}
            isMulti={true}
            options={tags}
            value={formData.tags}
            onChange={(tags) => {
              setFormData((prev) => ({
                ...prev,
                tags: tags.map((tag) => {
                  return { label: tag.label, id: tag.id };
                }),
              }));
            }}
          />
        </Grid>
      </Grid>
      <TextField
        id="recipe-form-description"
        label="Description"
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={5}
        value={formData.description}
      />
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={5}>
          <Typography variant="h5">Ingredients</Typography>
          <List>
            {formData?.ingredients?.map((el: ingredient) => (
              <ListItem
                key={el.ingredientId}
                sx={{
                  transition: "0.25s",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#dedede" },
                }}
                secondaryAction={
                  <IconButton
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        ingredients: prev.ingredients.filter(
                          (ingredients: ingredient) =>
                            ingredients.ingredientId !== el.ingredientId
                        ),
                      }))
                    }
                  >
                    <ClearIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={el.ingredientName} />
              </ListItem>
            ))}
          </List>
          <Stack spacing={2} direction={"row"}>
            <TextField
              label={"Ingredient Name"}
              id="recipe-form-ingredient-name"
              size="small"
              fullWidth
              onChange={(e) => setIngredientTextField(e.target.value)}
              value={ingredientTextField}
            />
            <Button onClick={handleAddIngr} variant="contained">
              Add
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h5">Steps</Typography>
          <List>
            {formData?.steps?.map((el: step, index: number) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        steps: prev.steps.filter(
                          (step: step, index: number) => step.value !== el.value
                        ),
                      }))
                    }
                  >
                    <ClearIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${index + 1}. ${el.value}`} />
              </ListItem>
            ))}
          </List>
          <Stack spacing={2} direction={"row"}>
            <TextField
              id={"recipe-form-step"}
              label={"Step"}
              size="small"
              fullWidth
              multiline
              value={stepTextField}
              onChange={(e) => setStepTextField(e.target.value)}
            />
            <Button onClick={handleAddStep} variant="contained">
              Add
            </Button>
          </Stack>
        </Grid>
        <Stack mt={10} direction="row" spacing={2} sx={{ ml: "auto" }}>
          <Button type="submit" variant="contained">
            Publish
          </Button>
          <Button onClick={() => navigate("..")} variant="outlined">
            Back
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
};

export default RecipeForm;
