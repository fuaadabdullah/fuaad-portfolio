/**
 * Shared constants for blog posts
 */

export const categoryColors = {
  essay: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "release-note": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  tutorial: "bg-green-500/20 text-green-300 border-green-500/30",
} as const;

export type BlogCategory = keyof typeof categoryColors;

/**
 * Format a category slug to a display name
 */
export function formatCategoryName(category: BlogCategory): string {
  return category === "release-note" 
    ? "Release Note" 
    : category.charAt(0).toUpperCase() + category.slice(1);
}
