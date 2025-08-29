export default function NotFound() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-semibold">Recipe not found</h1>
      <p className="text-muted-fg mt-2">
        We couldn&apos;t find the recipe you were looking for. It may have been removed or the link is incorrect.
      </p>
      <a href="/recipes" className="btn btn-primary mt-6 inline-block">Back to recipes</a>
    </div>
  );
}
