export type tag = {
  id: string;
  label: string;
};

export type step = {
  value: string;
  checked: boolean;
};

export type ingredient = {
  ingredientId: string;
  ingredientName: string;
};

export type recipe = {
  id: string;
  title: string;
  tags: tag[];
  createdAt: string;
  ingredients: ingredient[];
  steps: step[];
  description: string;
  favorite: boolean;
};
