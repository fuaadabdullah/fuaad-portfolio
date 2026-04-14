#!/usr/bin/env python3

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

WIDTH = 1200
HEIGHT = 630

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "og-default.png"


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        f"/System/Library/Fonts/Supplemental/{name}",
        f"/Library/Fonts/{name}",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


img = Image.new("RGB", (WIDTH, HEIGHT), "#050608")
draw = ImageDraw.Draw(img, "RGBA")

draw.ellipse((860, -70, 1250, 320), fill=(239, 68, 68, 48))
draw.ellipse((-120, 320, 430, 860), fill=(34, 197, 94, 42))
draw.rounded_rectangle((24, 24, WIDTH - 24, HEIGHT - 24), radius=30, fill=(18, 22, 29, 236), outline=(255, 255, 255, 24), width=2)

font_label = load_font("Arial.ttf", 22)
font_small = load_font("Arial.ttf", 18)
font_body = load_font("Arial.ttf", 24)
font_h1 = load_font("Arial Bold.ttf", 58)
font_h2 = load_font("Arial Bold.ttf", 52)

draw.ellipse((64, 72, 76, 84), fill="#ef4444")
draw.text((88, 58), "heyimfuaad.me", font=font_label, fill=(255, 255, 255, 188))

badge_box = (904, 54, 1138, 96)
draw.rounded_rectangle(badge_box, radius=24, fill=(239, 68, 68, 26), outline=(239, 68, 68, 86), width=1)
draw.text((929, 66), "Finance x Software", font=font_small, fill=(252, 165, 165, 255))

draw.text((64, 152), "BUILDER • TRADER • FINANCE MAJOR", font=font_small, fill=(255, 255, 255, 150))
draw.text((64, 206), "Fuaad Abdullah", font=font_h1, fill="white")
draw.text((64, 278), "Disciplined tools for traders", font=font_h2, fill=(229, 231, 235, 255))
draw.text((64, 338), "and operators.", font=font_h2, fill=(229, 231, 235, 255))

draw.text((64, 418), "Full-stack builds with a finance edge: trading tools, client sites,", font=font_body, fill=(255, 255, 255, 196))
draw.text((64, 452), "and numbers-first products that feel sharp, trustworthy, and production-ready.", font=font_body, fill=(255, 255, 255, 196))

chips = ["Next.js", "Python", "Trading Systems", "Client Builds"]
x = 64
for chip in chips:
    bbox = draw.textbbox((0, 0), chip, font=font_small)
    chip_w = (bbox[2] - bbox[0]) + 38
    draw.rounded_rectangle((x, 530, x + chip_w, 568), radius=19, fill=(255, 255, 255, 12), outline=(255, 255, 255, 42), width=1)
    draw.text((x + 19, 541), chip, font=font_small, fill=(255, 255, 255, 196))
    x += chip_w + 12

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUTPUT)
print(OUTPUT)
