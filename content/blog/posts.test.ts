import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "./posts";

const POSTS_DIR = path.dirname(fileURLToPath(import.meta.url));

function extractFrontmatterBlock(source: string, fileLabel: string): string {
  const match = source.match(
    /^\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
  );
  if (!match) {
    const start = JSON.stringify(source.slice(0, 80));
    throw new Error(
      `Missing frontmatter block (--- ... ---) at top of file: ${fileLabel}. Starts with: ${start}`
    );
  }
  return match[1];
}

function parseFrontmatter(source: string, fileLabel: string): Record<string, unknown> {
  const block = extractFrontmatterBlock(source, fileLabel);
  const out: Record<string, unknown> = {};

  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    const rawValue = line.slice(idx + 1).trim();
    if (!key) continue;

    // Our blog posts use JSON-like values (quoted strings / arrays) inside YAML.
    if (
      rawValue.startsWith("\"") ||
      rawValue.startsWith("[") ||
      rawValue.startsWith("{")
    ) {
      out[key] = JSON.parse(rawValue);
    } else {
      out[key] = rawValue;
    }
  }

  return out;
}

function mustBeString(v: unknown, field: string): string {
  if (typeof v !== "string" || v.trim().length === 0) {
    throw new Error(`Frontmatter field "${field}" must be a non-empty string`);
  }
  return v;
}

describe("Blog registry", () => {
  it("has unique slugs", () => {
    const slugs = blogPosts.map((p) => p.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("all registry slugs point at existing .mdx files with required frontmatter", () => {
    expect(POSTS_DIR.replace(/\\\\/g, "/")).toContain("/content/blog");

    for (const entry of blogPosts) {
      const file = path.join(POSTS_DIR, `${entry.slug}.mdx`);
      expect(existsSync(file)).toBe(true);

      const source = readFileSync(file, "utf8");
      const fm = parseFrontmatter(source, file);

      const title = mustBeString(fm.title, "title");
      const date = mustBeString(fm.date, "date");
      const excerpt = mustBeString(fm.excerpt, "excerpt");
      const category = mustBeString(fm.category, "category");

      expect(title.length).toBeGreaterThan(2);
      expect(excerpt.length).toBeGreaterThan(10);
      expect(["essay", "release-note", "tutorial"]).toContain(category);
      expect(Number.isNaN(Date.parse(date))).toBe(false);

      if (fm.tags !== undefined) {
        expect(Array.isArray(fm.tags)).toBe(true);
        for (const t of fm.tags as unknown[]) {
          expect(typeof t).toBe("string");
        }
      }
    }
  });

  it("ISO dates sort correctly using string compare (desc)", () => {
    const meta = blogPosts.map((p) => {
      const file = path.join(POSTS_DIR, `${p.slug}.mdx`);
      const source = readFileSync(file, "utf8");
      const fm = parseFrontmatter(source, file);
      return { slug: p.slug, date: mustBeString(fm.date, "date") };
    });

    const byStringDesc = meta
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((m) => m.slug);

    const byDateDesc = meta
      .slice()
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .map((m) => m.slug);

    expect(byStringDesc).toEqual(byDateDesc);
  });
});
