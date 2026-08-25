#!/usr/bin/env python3
"""
Stitches captured frame directories into animated GIFs using Pillow.
Usage: python3 scripts/make-gifs.py [rizzk|goblin|gradem8|all]
"""

import sys
import os
from pathlib import Path
from PIL import Image, ImageFilter

FRAMES_DIR = Path(__file__).parent / "demo-frames"
OUT_DIR = Path(__file__).parent.parent / "public/projects/demos"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Target output dimensions (width, height) for the GIF
TARGET_W = 1280
TARGET_H = 800

# Frame durations in ms per slug
CONFIGS = {
    "rizzk": {
        "output": "rizzk-calculator-demo.gif",
        "frame_ms": 900,   # ms each frame shows
        "first_ms": 1800,  # hold first frame longer
        "last_ms": 2200,   # hold last frame longer
        "colors": 128,
    },
    "goblin": {
        "output": "goblin-assistant-demo.gif",
        "frame_ms": 1200,
        "first_ms": 2000,
        "last_ms": 2500,
        "colors": 128,
    },
    "gradem8": {
        "output": "gradem8-demo.gif",
        "frame_ms": 1000,
        "first_ms": 2000,
        "last_ms": 2200,
        "colors": 128,
    },
}


def resize_frame(img: Image.Image, w: int, h: int) -> Image.Image:
    """Resize to fit within w×h, pad with black to exact dimensions."""
    img = img.convert("RGBA")
    img.thumbnail((w, h), Image.LANCZOS)
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 255))
    x = (w - img.width) // 2
    y = (h - img.height) // 2
    canvas.paste(img, (x, y), img)
    return canvas.convert("P", palette=Image.ADAPTIVE, colors=128)


def make_gif(slug: str, cfg: dict):
    src = FRAMES_DIR / slug
    if not src.exists():
        print(f"  skip {slug}: no frames dir at {src}")
        return

    frames_paths = sorted(src.glob("frame-*.png"))
    if not frames_paths:
        print(f"  skip {slug}: no frame-*.png files found")
        return

    print(f"  {slug}: {len(frames_paths)} frames → {cfg['output']}")

    frames = []
    durations = []
    for i, fp in enumerate(frames_paths):
        img = Image.open(fp)
        resized = resize_frame(img, TARGET_W, TARGET_H)
        frames.append(resized)
        if i == 0:
            durations.append(cfg["first_ms"])
        elif i == len(frames_paths) - 1:
            durations.append(cfg["last_ms"])
        else:
            durations.append(cfg["frame_ms"])

    out_path = OUT_DIR / cfg["output"]
    frames[0].save(
        out_path,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=True,
    )
    size_kb = out_path.stat().st_size // 1024
    print(f"  → {out_path.name} ({size_kb} KB)")


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "all"
    print(f"Building GIFs (target={target})...\n")
    for slug, cfg in CONFIGS.items():
        if target == "all" or target == slug:
            make_gif(slug, cfg)
    print("\nDone. GIFs are in public/projects/demos/")


if __name__ == "__main__":
    main()
