# Tarkov Codes

Escape from Tarkov promo codes in one place: click to copy, see what each code gives, and filter by the mode you play.

**Live site: [tarkovcodes.pages.dev](https://tarkovcodes.pages.dev)**

- One-click copy for every code
- A screenshot of the rewards for most codes (click to enlarge)
- "I play" picker for PvP, PvP-S (seasonal) and PvE
- Expired codes kept at the bottom so you can see what they gave

## Know a code? Found one that stopped working?

[Open an issue](https://github.com/Wilsman/tarkovcodes/issues/new/choose) and pick a form:

- **New code**: a code that isn't on the site yet
- **Code expired**: a code on the site that no longer works
- **Fix code info**: wrong mode, reward, note or screenshot

A screenshot of the rewards (the "Showcase" window after you claim the gift) helps a lot. Pull requests are welcome too, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Redeeming a code

1. Copy a code from the site
2. In the launcher, click your name, then **Activate code**
3. If it doesn't work, update or reinstall the launcher, then try again

Codes are case sensitive and often expire quickly.

## Running it locally

Needs Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## How it's built

A static [Astro](https://astro.build) site with no framework JavaScript. The only script on the page is a small inline one for copying, the mode picker and the screenshot viewer. Reward screenshots go through Astro's image pipeline (AVIF and WebP, lazy loaded). It's hosted on Cloudflare Pages.

| Path | What's there |
|---|---|
| `src/codes.ts` | Every code: status, modes, date, note and reward screenshot |
| `src/assets/rewards/` | Reward screenshots, one per code |
| `src/pages/index.astro` | The page, its styles and its script |
| `src/components/CodeCard.astro` | One code card |
| `public/` | Favicons, link preview image (`og.png`) and Cloudflare headers |
| `scripts/` | Python scripts that rebuild `og.png` and the favicons |

## Disclaimer

Fan site, not affiliated with or endorsed by Battlestate Games. Escape from Tarkov and its in-game imagery, including the reward screenshots, belong to Battlestate Games. The MIT license covers this project's code only.
