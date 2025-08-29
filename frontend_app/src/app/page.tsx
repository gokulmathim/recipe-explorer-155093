import { getFeaturedRecipes, searchRecipes } from "@/lib/recipes";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

export const dynamic = "force-static";

export default async function Home({
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
  const featured = await getFeaturedRecipes();
  const results = q ? await searchRecipes(q) : featured;

  return (
    <div className="container">
      <section className="py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Discover
            </span>
            <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
              Explore delicious recipes with a modern, minimal experience
            </h1>
            <p className="mt-4 text-muted-fg">
              Browse curated dishes across categories. Search by ingredients or
              title and view clean, visual recipe details.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/recipes"
                className="btn btn-primary"
              >
                Browse Recipes
              </Link>
              <a
                href="#feed"
                className="btn btn-ghost"
              >
                Explore Feed
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="p-1 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
              <div className="rounded-2xl bg-white p-6">
                <Suspense fallback={<div className="h-11 rounded-xl border border-muted bg-white animate-pulse" />}>
                  <SearchBar placeholder="Search recipes, e.g. pasta, curry, salad..." initialQuery={q} />
                </Suspense>
                <ul className="mt-6 grid grid-cols-2 gap-4">
                  {featured.slice(0, 4).map((r) => (
                    <li key={r.id} className="rounded-xl border border-muted p-3 hover:shadow-sm transition-shadow">
                      <Link href={`/recipes/${r.id}`} className="flex gap-3">
                        <Image
                          src={r.image}
                          alt={r.title}
                          width={96}
                          height={96}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{r.title}</p>
                          <p className="text-xs text-muted-fg">{r.time} • {r.difficulty}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="feed" className="py-4 md:py-8">
        <div className="hidden md:block mb-6">
          <Suspense fallback={<div className="h-11 rounded-xl border border-muted bg-white animate-pulse" />}>
            <SearchBar placeholder="Search recipes..." initialQuery={q} />
          </Suspense>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">Featured Recipes</h2>
          <Link href="/recipes" className="text-sm link-primary">
            View all
          </Link>
        </div>
        <RecipeGrid recipes={results} emptyMessage={q ? `No recipes found for "${q}".` : "No recipes available."} />
      </section>
    </div>
  );
}
