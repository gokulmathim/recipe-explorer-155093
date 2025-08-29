export type SearchParams = Record<string, string | string[] | undefined>;
export type Params = Record<string, string>;

// PUBLIC_INTERFACE
/**
 * Page props shape that is compatible with Next.js App Router in v15:
 * - searchParams may be the object itself or a Promise (depending on runtime),
 *   and we intersect with Next's PageProps to satisfy type constraints.
 */
export type PagePropsSP = { searchParams?: SearchParams | Promise<SearchParams> };

/**
 * PUBLIC_INTERFACE
 * Params props shape compatible with Next.js App Router in v15:
 * - params may be the object itself or a Promise (depending on runtime),
 *   and we intersect with Next's PageProps to satisfy type constraints.
 */
export type PagePropsParams<P extends Params = Params> =
  { params: P | Promise<P> };

/** Type guard to check if a value is a Promise. */
function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { then?: unknown }).then === "function"
  );
}

/**
 * Normalize a possibly Promise-wrapped value (as seen in some environments) to a plain object.
 */
export async function normalizeMaybePromise<T extends object>(
  value: T | Promise<T> | undefined
): Promise<T | undefined> {
  if (!value) return undefined;
  return isPromise<T>(value) ? await value : (value as T);
}
