export type BlogCategoryVariant = "default" | "success" | "outline";

export function getBlogCategoryLabel(category: string): string {
  if (category === "release-note") return "Release Note";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function getBlogCategoryVariant(category: string): BlogCategoryVariant {
  if (category === "tutorial") return "success";
  if (category === "release-note") return "default";
  return "outline";
}
