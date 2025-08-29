export type SearchParams = Record<string, string | string[] | undefined>;
export type Params = Record<string, string>;

// PUBLIC_INTERFACE
export type PagePropsSP =
  | { searchParams?: SearchParams }
  | { searchParams?: Promise<SearchParams> };

// PUBLIC_INTERFACE
export type PagePropsParams<P extends Params = Params> =
  | { params: P }
  | { params: Promise<P> };

/** Type guard to check if a value is a Promise. */
function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
