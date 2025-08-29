import Link from "next/link";
import { Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";

/**
 * PUBLIC_INTERFACE
 * Global not-found page for the app. Provides a search input wrapped in Suspense
 * to satisfy CSR bailout requirements when useSearchParams is used by the SearchBar.
 */
export default function NotFound() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-fg mt-2 max-w-2xl">
        We couldn&apos;t find the page you were looking for. It may have been moved or the link is incorrect.
      </p>

      <div className="mt-6 max-w-lg">
        <Suspense fallback={<div className="h-11 rounded-xl border border-muted bg-white animate-pulse" />}>
          <SearchBar placeholder="Try searching for a recipe..." />
        </Suspense>
      </div>

      <div className="mt-6">
        <Link href="/" className="btn btn-ghost mr-2">Go home</Link>
        <Link href="/recipes" className="btn btn-primary">Browse recipes</Link>
      </div>
    </div>
  );
}
