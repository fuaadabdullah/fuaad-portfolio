import fs from "node:fs";
import path from "node:path";
const repoRoot = process.cwd();

function assetExists(src) {
  if (!src.startsWith("/")) {
    return false;
  }

  return fs.existsSync(path.join(repoRoot, "public", src));
}

const failures = [];
const projectSource = fs.readFileSync(path.join(repoRoot, "data/projects.ts"), "utf8");
const aboutPhotoSource = fs.readFileSync(path.join(repoRoot, "data/aboutPhotos.ts"), "utf8");

for (const match of projectSource.matchAll(/proofMedia:\s*\[(.*?)\]/gs)) {
  const block = match[1];

  for (const itemMatch of block.matchAll(/src:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"/g)) {
    const [, src, status] = itemMatch;
    if (status === "ready" && !assetExists(src)) {
      failures.push(`ready proof media missing ${src}`);
    }
  }
}

for (const match of projectSource.matchAll(/(?:image:\s*\{[\s\S]*?src:\s*"([^"]+)"|gallery:\s*\[(.*?)\])/g)) {
  const [fullMatch, imageSrc, galleryBlock] = match;

  if (imageSrc && !assetExists(imageSrc)) {
    failures.push(`image missing ${imageSrc}`);
  }

  if (galleryBlock) {
    for (const itemMatch of galleryBlock.matchAll(/src:\s*"([^"]+)"/g)) {
      const [, src] = itemMatch;
      if (!assetExists(src)) {
        failures.push(`gallery missing ${src}`);
      }
    }
  }
}

for (const match of aboutPhotoSource.matchAll(/src:\s*"([^"]+)"/g)) {
  const [, src] = match;
  if (!assetExists(src)) {
    failures.push(`about photo missing ${src}`);
  }
}

if (failures.length > 0) {
  console.error("Asset validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Asset validation passed.");
