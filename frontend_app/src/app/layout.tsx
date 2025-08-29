import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Recipe Explorer",
  description: "Explore and discover delicious recipes.",
};

/**
 * Root layout rendering app shell with header navigation and footer.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-white focus:text-fg focus:px-3 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-primary/50 shadow"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-muted">
          <div className="container">
            <div className="flex items-center justify-between gap-4 py-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 rounded-lg bg-primary/15 grid place-items-center">
                  <div className="h-3.5 w-3.5 rounded-[6px] bg-primary group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-lg font-semibold tracking-tight">
                  Recipe Explorer
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="link-muted hover:text-fg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/recipes"
                  className="link-muted hover:text-fg transition-colors"
                >
                  Browse
                </Link>
                <Link
                  href="/about"
                  className="link-muted hover:text-fg transition-colors"
                >
                  About
                </Link>
              </nav>
            </div>
            <div className="pb-4 md:hidden">
              <SearchBar placeholder="Search recipes..." />
            </div>
          </div>
        </header>
        <main id="content">{children}</main>
        <footer className="mt-20 border-t border-muted">
          <div className="container py-10 text-sm text-muted-fg flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Recipe Explorer. Crafted with{" "}
              <span className="text-accent">taste</span>.
            </p>
            <p>
              Colors:{" "}
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary inline-block" />
                <span className="h-3 w-3 rounded-full bg-secondary inline-block" />
                <span className="h-3 w-3 rounded-full bg-accent inline-block" />
              </span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
