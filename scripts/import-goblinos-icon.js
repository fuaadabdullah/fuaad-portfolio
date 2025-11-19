#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Copy a GoblinOS icon from a source path (e.g., ~/Downloads) into the
 * portfolio app's public projects folder.
 *
 * Usage:
 *    node scripts/import-goblinos-icon.js /full/path/to/GoblinOSIcon.png
 *
 * Or set GOBLINOS_ICON_PATH env var:
 *    GOBLINOS_ICON_PATH=~/Downloads/GoblinOSIcon.png node scripts/import-goblinos-icon.js
 */

function expandHome(filepath) {
  if (!filepath) return filepath;
  if (filepath.startsWith('~')) return path.join(process.env.HOME, filepath.slice(1));
  return filepath;
}

const srcArg = process.argv[2] || process.env.GOBLINOS_ICON_PATH;
if (!srcArg) {
  console.error('Usage: node scripts/import-goblinos-icon.js /path/to/GoblinOSIcon.png');
  process.exit(2);
}

const srcPath = expandHome(srcArg);
if (!fs.existsSync(srcPath)) {
  console.error(`Icon not found at ${srcPath}`);
  process.exit(3);
}

const outDir = path.join(__dirname, '..', 'public', 'projects');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'goblinos-icon.png');

fs.copyFileSync(srcPath, outPath);
console.log(`✅ Copied ${srcPath} -> ${outPath}`);
console.log('You can now reference /projects/goblinos-icon.png in the portfolio site.');

process.exit(0);
