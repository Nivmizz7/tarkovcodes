"""Build the raster favicons from the same shapes as public/favicon.svg:
a squared green C on dark green.

    python scripts/make_icons.py

Writes public/favicon.ico (16, 32, 48) and public/apple-touch-icon.png (180).
If you change favicon.svg, change the numbers here to match. Needs Pillow.
"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public"
BG, EDGE, GREEN = (10, 28, 10), (31, 74, 20), (140, 227, 57)
K = 16  # draw at 32 * 16 = 512px, then scale down
N = 32 * K


def icon():
    im = Image.new("RGBA", (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, N - 1, N - 1), radius=6 * K, fill=BG, outline=EDGE, width=K)
    # The SVG path is a 4.5-wide stroke along x=10..24, y=10..22 with 3px corners.
    sw = 4.5
    o = sw / 2
    d.rounded_rectangle(
        ((10 - o) * K, (10 - o) * K, (30 + o) * K, (22 + o) * K),
        radius=(3 + o) * K,
        outline=GREEN,
        width=round(sw * K),
    )
    # Open the right side: the bars stop at x=24, like the SVG.
    d.rectangle((24 * K, (10 - o) * K - 1, 31 * K - 1, (22 + o) * K + 1), fill=BG)
    return im


icon().resize((180, 180), Image.LANCZOS).convert("RGB").save(OUT / "apple-touch-icon.png", optimize=True)
icon().save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"wrote {OUT / 'favicon.ico'} and {OUT / 'apple-touch-icon.png'}")
