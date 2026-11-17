# jamescscott.net

Personal site and blog of James C. Scott, built with [Astro](https://astro.build/) on the [AstroPaper](https://github.com/satnaing/astro-paper) theme and hosted on Cloudflare.

## Writing a post

Add a Markdown file to `src/content/posts/`:

```md
---
title: "Post title"
description: "One or two sentences. Used in search results and link previews."
pubDatetime: 2026-12-01T12:00:00Z
tags:
  - homelab
ogImage: ../../assets/images/posts/my-image.jpg # optional
draft: true # remove to publish
---
```

- **`ogImage`** is used for both the homepage card and the LinkedIn preview. Without one, the card shows a soft gradient and a preview image is generated from the title.
- **Series:** add `series: dgx-spark` and `seriesPart: 2`. Series titles and planned parts live in `src/data/series.ts`.
- **Tutorials:** add `tutorial: true` to how-to posts. Three years after the post (or its last `modDatetime` update), a notice appears at the top saying it may be out of date. Set `modDatetime` when you refresh one, and the clock resets.
- **Drafts** (`draft: true`) never appear on the live site.
- **Images** need alt text describing what they show. See Adding photos below.

## Running locally

You need Node 26, the current LTS (`.nvmrc` pins it; `nvm use` picks it up), and pnpm 11 (`npm install -g pnpm@11`). Astro also runs on Node 22.23.4 or later, but not on odd-numbered versions like 25.

```sh
pnpm install
pnpm dev            # http://localhost:4321, shows drafts
pnpm build          # type check, build, and search index
pnpm preview        # serve the production build
```

## Adding photos

Don't commit photos straight from your phone. They're large, and they record the GPS location where they were taken.

1. Copy the photos into `photos-inbox/` (Git ignores this folder). They need to be JPEG: on an iPhone, set Settings → Camera → Formats → Most Compatible, or export from Photos as JPEG.
2. Run `pnpm images <post-slug>`. It turns each photo upright, shrinks it to 2400px, strips all hidden data, and saves it to `src/assets/images/posts/<post-slug>/`.
3. Paste the Markdown it prints into your post and replace the placeholder with a description of the photo (the alt text).
4. Delete the originals from `photos-inbox/`.

The site then serves smaller WebP versions in several sizes, so phones download a small one.

## Checking your work

Run these before opening a pull request. CI runs the same ones.

```sh
pnpm lint           # code style errors
pnpm format         # fix formatting
pnpm build
pnpm check          # images, internal links, and accessibility on every page
```

`pnpm check` includes:

- `pnpm check:images`: no photo has GPS data or is over 3 MB
- `pnpm check:links`: every internal link and image exists
- `pnpm check:a11y`: an accessibility scan of every page in light and dark mode, on desktop and phone (about 3 minutes). Add page paths to check just those, e.g. `pnpm check:a11y /about/`. The first time, install its browser with `pnpm exec playwright install chromium`.

AI agents working on the site follow `AGENTS.md` (Claude Code and Gemini CLI load it through `CLAUDE.md` and `GEMINI.md`). It also has the full rules for posts, which apply to people too.

## Hosting and deploying

The site is a Cloudflare Worker that serves the static files in `dist/` (config in `wrangler.jsonc`, response headers in `public/_headers`). The free plan has no bandwidth limit.

- **Push to `main`:** builds and deploys to https://jamescscott.net.
- **Pull request:** deploys a preview to https://jamescscott-net-preview.jcscott-iii.workers.dev and comments the link on the PR. Each PR replaces the last preview. Previews tell search engines not to index them.

Both are in `.github/workflows/deploy.yml`, and pull requests also run the checks above.

### One-time setup

1. **API token.** In the Cloudflare dashboard, go to My Profile → API Tokens → Create Token, and use the **Edit Cloudflare Workers** template. Limit it to your account and the `jamescscott.net` zone.
2. **GitHub secrets.** In the repo, go to Settings → Secrets and variables → Actions, and add:
   - `CLOUDFLARE_API_TOKEN`: the token from step 1
   - `CLOUDFLARE_ACCOUNT_ID`: shown on the right of your Cloudflare account's home page
3. **workers.dev subdomain.** If you've never used Workers, open Workers & Pages in the dashboard once so Cloudflare assigns your workers.dev name (this account's is `jcscott-iii.workers.dev`). Previews need it.
4. **Redirects.** The first production deploy creates the `jamescscott.net` DNS record and certificate. Add these in the dashboard:
   - **www:** on the `jamescscott.net` zone, Rules → Redirect Rules → the "Redirect from WWW to root" template. It needs a proxied DNS record for `www` (an `AAAA` record to `100::` works).
   - **jamesscott.dev:** if it's on Cloudflare, a Redirect Rule on its zone sending every request to `https://jamescscott.net` with the path kept, status 301. Otherwise, use your registrar's URL forwarding.
5. **Remove the old Firebase secret** (`FIREBASE_SERVICE_ACCOUNT_JAMESCSCOTTIO`), and delete the Firebase project if nothing else uses it.

To deploy by hand: `pnpm build`, then `pnpm exec wrangler login` once and `pnpm exec wrangler deploy --env=""`.

## What's customized

The site started from AstroPaper v7.2.0 the way its README describes (`pnpm create astro@latest --template satnaing/astro-paper`): a copy of its files, without its Git history. `.astropaper-version` records which release it's on.

To take a newer AstroPaper release (see [its releases](https://github.com/satnaing/astro-paper/releases)), start from a clean branch and run:

```sh
pnpm upgrade:theme v7.3.0
```

It applies the changes between the two releases as a 3-way patch. Clean changes are staged, conflicts get `<<<<<<<` markers to resolve by hand, and nothing is committed. It skips AstroPaper's sample posts and other files this site removed. Then run `pnpm install`, `pnpm build`, and `pnpm check`, and commit.

Our changes to AstroPaper's own files are kept small so upgrades stay easy:

| File                                                            | Change                                    |
| --------------------------------------------------------------- | ----------------------------------------- |
| `astro-paper.config.ts`, `astro.config.ts`                      | Site settings, fonts, code colors         |
| `src/styles/theme.css`                                          | Colors and fonts                          |
| `src/pages/index.astro`                                         | Custom homepage                           |
| `src/pages/og.png.ts`, `src/pages/posts/[...slug]/index.png.ts` | Use `src/utils/ogCard.ts`                 |
| `src/layouts/Layout.astro`                                      | Font tags                                 |
| `src/components/Footer.astro`                                   | Disclaimer line                           |
| `src/pages/posts/[...slug]/index.astro`                         | Out-of-date notice, section link names    |
| `src/pages/posts/[...slug]/_components/BackButton.astro`        | Back link in a nav landmark               |
| `src/pages/search.astro`                                        | Search box label                          |
| `src/scripts/theme.ts`, `src/components/Header.astro`           | Theme toggle says what it will do         |
| `src/content.config.ts`                                         | `series`, `seriesPart`, `tutorial` fields |

Files that are ours alone (theme upgrades never touch them): `src/components/ArtCard.astro`, `src/components/OutdatedNotice.astro`, `scripts/`, `.astropaper-version`, `wrangler.jsonc`, `public/_headers`, `.github/workflows/site-checks.yml` and `deploy.yml`, `src/data/`, `src/utils/getSeriesParts.ts`, `src/utils/ogCard.ts`, and everything in `src/custom/`.

## License

Theme code is MIT licensed by Sat Naing (see `LICENSE`). Posts and images are © James C. Scott.
