/**
 * Utility function for conditionally joining classNames
 * @param classes - Array of class names (can include false, null, or undefined)
 * @returns Joined class string
 */
export function clsx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Alias for clsx - common naming convention
 */
export const cn = clsx;
