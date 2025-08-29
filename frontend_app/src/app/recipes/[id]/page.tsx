import { getRecipeById, getAllRecipes } from "@/lib/recipes";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Params = { id: string };

export async function generateStaticParams() {
  const all = await getAllRecipes();
  // Pre-render all available IDs for static export
  return all.map((r) => ({ id: String(r.id) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) return { title: "Recipe not found" };
  return {
    title: `${recipe.title} • Recipe Explorer`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [{ url: recipe.image }],
    },
  };
}

export default async function RecipeDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) return notFound();

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6">
        <Link href="/recipes" className="link-muted hover:text-fg">&larr; Back to recipes</Link>
      </div>

      <article className="grid md:grid-cols-5 gap-6 md:gap-10">
        <div className="md:col-span-3">
          <div className="relative overflow-hidden rounded-2xl border border-muted bg-white">
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={1280}
              height={800}
              className="w-full aspect-[16/10] object-cover"
              priority
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-3xl font-semibold">{recipe.title}</h1>
          <p className="mt-2 text-muted-fg">{recipe.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="card">
              <p className="text-muted-fg">Time</p>
              <p className="font-medium">{recipe.time}</p>
            </div>
            <div className="card">
              <p className="text-muted-fg">Difficulty</p>
              <p className="font-medium">{recipe.difficulty}</p>
            </div>
            <div className="card">
              <p className="text-muted-fg">Servings</p>
              <p className="font-medium">{recipe.servings}</p>
            </div>
            <div className="card">
              <p className="text-muted-fg">Category</p>
              <p className="font-medium">{recipe.category}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-lg">Ingredients</h2>
            <ul className="mt-2 space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="h-2 w-2 mt-2 rounded-full bg-primary/60" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-lg">Steps</h2>
            <ol className="mt-2 space-y-3">
              {recipe.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="h-6 w-6 shrink-0 rounded-full bg-secondary/30 text-secondary grid place-items-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <p>{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </article>
    </div>
  );
}
