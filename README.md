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

## Running locally

```sh
pnpm install
pnpm dev       # http://localhost:4321, shows drafts
pnpm build     # type check, build, and search index
pnpm preview   # serve the production build
pnpm images <slug>  # shrink phone photos and strip GPS data (see AGENTS.md)
pnpm check     # images, internal links, and accessibility (after build)
```

AI agents: see `AGENTS.md` (also loaded by `CLAUDE.md` and `GEMINI.md`).

## Deploying

Pushing to `main` builds and deploys to Firebase Hosting. Pull requests get a preview link. Both workflows are in `.github/workflows/`.

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

Files that are ours alone: `src/components/ArtCard.astro`, `src/components/OutdatedNotice.astro`, `scripts/`, `src/data/`, `src/utils/getSeriesParts.ts`, `src/utils/ogCard.ts`, and everything in `src/custom/`.

## License

Theme code is MIT licensed by Sat Naing (see `LICENSE`). Posts and images are © James C. Scott.
