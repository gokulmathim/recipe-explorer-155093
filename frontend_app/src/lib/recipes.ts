import recipesData from "@/data/recipes.json";

export type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  servings: string;
  category: string;
  ingredients: string[];
  steps: string[];
  featured?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * Returns all recipes.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  return recipesData as Recipe[];
}

/**
 * PUBLIC_INTERFACE
 * Returns featured recipes subset.
 */
export async function getFeaturedRecipes(): Promise<Recipe[]> {
  const all = await getAllRecipes();
  return all.filter((r) => r.featured);
}

/**
 * PUBLIC_INTERFACE
 * Case-insensitive search by title, category, and ingredients.
 */
export async function searchRecipes(query: string): Promise<Recipe[]> {
  const q = query.trim().toLowerCase();
  if (!q) return getAllRecipes();
  const all = await getAllRecipes();
  return all.filter((r) => {
    return (
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  });
}

/**
 * PUBLIC_INTERFACE
 * Fetch a single recipe by id.
 */
export async function getRecipeById(id: string | number): Promise<Recipe | undefined> {
  const all = await getAllRecipes();
  return all.find((r) => String(r.id) === String(id));
}
