# jamescscott.net

Personal site and blog of James C. Scott, built with [Astro](https://astro.build/) on the [AstroPaper](https://github.com/satnaing/astro-paper) theme and hosted on Firebase Hosting.

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

## Deploying

Pushing to `main` builds and deploys to Firebase Hosting, using the Node version in `.nvmrc`. Every pull request gets a Firebase preview link and runs the checks above. The workflows are in `.github/workflows/`.

## What's customized

AstroPaper was merged in with its full history, so updates can be pulled in later:

```sh
git remote add astropaper https://github.com/satnaing/astro-paper   # once
git fetch astropaper --tags
git merge <new tag, e.g. v7.3.0>
```

Our changes to AstroPaper's own files are kept small so merges stay easy:

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

Files that are ours alone (no merge conflicts): `src/components/ArtCard.astro`, `src/components/OutdatedNotice.astro`, `scripts/`, `.github/workflows/site-checks.yml`, `src/data/`, `src/utils/getSeriesParts.ts`, `src/utils/ogCard.ts`, and everything in `src/custom/`.

## License

Theme code is MIT licensed by Sat Naing (see `LICENSE`). Posts and images are © James C. Scott.
