const AUTHOR_FLAG =
  process.env.NEXT_PUBLIC_ENABLE_MAP_CALIBRATION === "true" ||
  process.env.NEXT_PUBLIC_ENABLE_AUTHOR_MODE === "true";

export function isAuthorModeEnabled(
  searchParams: Pick<URLSearchParams, "get">,
): boolean {
  if (!AUTHOR_FLAG) return false;

  const author = searchParams.get("author");
  const calibrate = searchParams.get("calibrate");
  return author === "true" || calibrate === "true";
}

/** Canonical Author Mode URL param for history.replaceState. */
export const AUTHOR_MODE_URL = "/explore?author=true";
