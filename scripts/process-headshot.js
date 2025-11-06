/*
  Process headshot asset for the hero card.
  - Input: public/fuaad-headshot-original.png (existing)
  - Output: public/fuaad-headshot-2025.jpg (square, top-biased crop)
  - Ops: cover to 960x960, position north (object-top), slightly lower saturation to match earth-tone UI

  Usage:
    pnpm add sharp --save-dev  # if not installed
    pnpm process-headshot
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

async function main() {
  const input = path.resolve(__dirname, "../public/fuaad-headshot-original.png");
  const outputSquare = path.resolve(__dirname, "../public/fuaad-headshot-2025.jpg");
  const outputRoomy = path.resolve(__dirname, "../public/fuaad-headshot-2025-roomy.jpg");

  if (!fs.existsSync(input)) {
    console.error("Input not found:", input);
    process.exit(1);
  }

  let sharp;
  try {
    sharp = require("sharp");
  } catch (e) {
    console.error("Missing dependency: sharp. Install with: pnpm add sharp --save-dev");
    process.exit(1);
  }

  const size = 960; // square for crisp renders in a 320px card
  try {
    // Square export (legacy)
    await sharp(input)
      .resize({
        width: size,
        height: size,
        fit: "cover",
        position: "north", // top-biased crop similar to object-top
      })
      .modulate({ saturation: 0.92 })
      .jpeg({ quality: 92, progressive: true })
      .toFile(outputSquare);

    console.log("Headshot processed (square):", outputSquare);

    // Taller portrait with more breathing room (4:5)
    await sharp(input)
      .resize({
        width: 960,
        height: 1200,
        fit: "cover",
        position: "north", // keep more content below the face
      })
      .modulate({ saturation: 0.92 })
      .jpeg({ quality: 92, progressive: true })
      .toFile(outputRoomy);

    console.log("Headshot processed (roomy):", outputRoomy);
  } catch (err) {
    console.error("Failed to process headshot:", err);
    process.exit(1);
  }
}

main();
