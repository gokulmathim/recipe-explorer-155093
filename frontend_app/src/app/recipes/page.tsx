import { getAllRecipes, searchRecipes } from "@/lib/recipes";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SearchBar } from "@/components/SearchBar";
import { Suspense } from "react";

export const dynamic = "force-static";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const qParam = (await searchParams)?.["q"];
  const q =
    typeof qParam === "string"
      ? qParam
      : Array.isArray(qParam)
      ? qParam[0] ?? ""
      : "";
  const data = q ? await searchRecipes(q) : await getAllRecipes();

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Browse Recipes</h1>
          <p className="text-muted-fg mt-1">Search the full catalog of dishes.</p>
        </div>
        <div className="w-full md:max-w-md">
          <Suspense fallback={<div className="h-11 rounded-xl border border-muted bg-white animate-pulse" />}>
            <SearchBar placeholder="Search recipes..." initialQuery={q} />
          </Suspense>
        </div>
      </div>
      <div className="mt-6">
        <RecipeGrid recipes={data} emptyMessage={q ? `No recipes match "${q}".` : "No recipes found."} />
      </div>
    </div>
  );
}
