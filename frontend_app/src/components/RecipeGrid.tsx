import { RecipeCard, type Recipe } from "./RecipeCard";

/**
 * PUBLIC_INTERFACE
 * Grid to layout recipes with empty state handling.
 */
export function RecipeGrid({
  recipes,
  emptyMessage = "No items found.",
}: {
  recipes: Recipe[];
  emptyMessage?: string;
}) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-muted p-10 text-center text-muted-fg">
        {emptyMessage}
      </div>
    );
  }
  return (
    <div className="grid-auto-fill">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
