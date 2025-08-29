# Recipe Explorer Frontend

A modern, minimalistic light-themed Next.js app for browsing and discovering recipes.

## Features
- Recipe catalog browsing with responsive grid
- Search by title, category, and ingredients
- Recipe detail view with ingredients and steps
- Responsive navigation and layout
- Homepage with featured recipes and hero section
- Clean UI with provided color palette:
  - primary: `#00A86B`
  - secondary: `#FFD700`
  - accent: `#FF6347`

## Getting Started
Install dependencies and run dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

> Dev note: If port 3000 is already in use, Next.js will start on the next available port (e.g., 3001) and log the URL in the terminal. If your preview tool is pinned to port 3000, update it to the port shown by Next.js (e.g., http://localhost:3001).

## Structure
- `src/app/` Next.js App Router pages
  - `/` Home with search and featured feed
  - `/recipes` Catalog with search
  - `/recipes/[id]` Recipe detail
  - `/about` Static about page
- `src/components/` Reusable UI (SearchBar, RecipeCard, RecipeGrid)
- `src/lib/recipes.ts` Lightweight data-access functions
- `src/data/recipes.json` Mock dataset

## Notes
- This demo uses static data and static export friendly routes.
- Styling uses Tailwind v4 base with custom CSS tokens for the theme.

