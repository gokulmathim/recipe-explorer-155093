import { Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">About</h1>
      <p className="text-muted-fg mt-2 max-w-2xl">
        Recipe Explorer is a minimal, modern interface to browse and discover
        recipes. This demo uses static data and showcases search, catalog
        browsing, and detailed recipe pages with a responsive layout.
      </p>

      <div className="mt-6 max-w-lg">
        <Suspense fallback={<div className="h-11 rounded-xl border border-muted bg-white animate-pulse" />}>
          <SearchBar placeholder="Search recipes..." />
        </Suspense>
      </div>
    </div>
  );
}
