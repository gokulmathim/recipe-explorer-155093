"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * SearchBar component which syncs query with URL and navigates.
 */
export function SearchBar({
  placeholder = "Search...",
  initialQuery = "",
}: {
  placeholder?: string;
  initialQuery?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(initialQuery || params.get("q") || "");

  useEffect(() => {
    const urlQ = params.get("q") || "";
    if (initialQuery !== undefined && initialQuery !== q && initialQuery !== urlQ) {
      setQ(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const usp = new URLSearchParams(Array.from(params.entries()));
    if (q) usp.set("q", q);
    else usp.delete("q");
    router.push(`${pathname}?${usp.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 w-full">
      <div className="flex-1 flex items-center gap-3 rounded-xl border border-muted bg-white px-3 h-11">
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-muted-fg">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5l1.5-1.5l-5-5m-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-sm"
          aria-label="Search"
        />
      </div>
      <button type="submit" className="btn btn-primary h-11 px-4">Search</button>
    </form>
  );
}
