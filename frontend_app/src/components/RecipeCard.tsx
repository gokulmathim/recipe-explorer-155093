import Link from "next/link";
import Image from "next/image";

export type Recipe = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
  servings: string;
  category: string;
};

/**
 * PUBLIC_INTERFACE
 * Card component to preview a recipe.
 */
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group rounded-xl overflow-hidden border border-muted bg-white hover:shadow-sm transition-shadow"
    >
      <div className="relative">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={800}
          height={600}
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-fg">
          {recipe.category}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium leading-snug group-hover:underline">
          {recipe.title}
        </h3>
        <p className="text-sm text-muted-fg line-clamp-2 mt-1">{recipe.description}</p>
        <div className="mt-3 text-xs text-muted-fg flex items-center gap-3">
          <span>{recipe.time}</span>
          <span>•</span>
          <span>{recipe.difficulty}</span>
          <span>•</span>
          <span>{recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}
