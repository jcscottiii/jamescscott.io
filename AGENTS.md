# AGENTS.md

Instructions for AI coding agents (and people) working on jamescscott.net. Read this before changing anything. `README.md` has the human-facing overview.

## What this is

The personal site and blog of James C. Scott. Astro + the AstroPaper v7 theme, Tailwind v4, Markdown posts, hosted on Firebase Hosting. Pushes to `main` deploy; pull requests get a Firebase preview.

The audience is two groups at once: recruiters (who skim the homepage) and engineers (who read posts). Keep the homepage plain-language and the posts technical.

## Commands

Use **pnpm 11** (CI pins 11.3.0). The repo refuses packages published in the last day (`minimumReleaseAge`), so if an install fails with that error, wait or pin an older version. Don't loosen the policy.

```sh
pnpm install
pnpm dev                  # local server with drafts
pnpm lint                 # ESLint
pnpm format               # Prettier, write
pnpm format:check         # Prettier, check (CI)
pnpm build                # astro check + build + search index
pnpm check:links          # every internal link resolves (after build)
pnpm check:a11y           # axe on every page, light/dark, desktop/phone, 320px reflow (after build)
pnpm check:a11y /about/   # just the pages you name
```

`check:a11y` needs Chromium: `pnpm exec playwright install chromium`, or set `CHROME_PATH` to an installed Chrome.

## Definition of done

Before calling any change finished, run all of these and make sure they pass:

1. `pnpm lint`
2. `pnpm format:check` (run `pnpm format` to fix)
3. `pnpm build`
4. `pnpm check:links`
5. `pnpm check:a11y`, or at least the pages you touched, in both themes

CI runs the same checks on every pull request (`.github/workflows/ci.yml` and `site-checks.yml`).

## Writing or editing a post

Posts live in `src/content/posts/<slug>.md`. The slug is the URL: `/posts/<slug>/`.

```md
---
title: "Post title"
description: "One or two sentences for search results and link previews."
pubDatetime: 2026-12-01T12:00:00Z
modDatetime: 2027-03-01T12:00:00Z # only when meaningfully updated
draft: true # remove to publish
tutorial: true # how-to posts; shows an out-of-date notice after 3 years
series: dgx-spark # optional; see src/data/series.ts
seriesPart: 2 # required with series
tags:
  - homelab
ogImage: ../../assets/images/posts/my-image.jpg # optional
---
```

Rules:

- **Every image needs alt text** that says what it shows, e.g. `![Terminal running go version](...)`. Decorative images aren't used in posts.
- **Images for a post** go in `src/assets/images/posts/`. `ogImage` is both the homepage card art and the social preview. Without it, the card shows a gradient and a preview image is generated.
- **Headings start at `##`** and don't skip levels. No "Table of contents" heading; the theme builds one.
- **Code** goes in fenced blocks with a language (` ```go `), never raw `<pre>`.
- **Internal links** use `/posts/<slug>/`.
- **Tags**: reuse existing ones (`go`, `devops`, `app-engine`, `android`, `docker`, `career`, `reviews`, `gaming`, `dgx-spark`, `homelab`, `local-ai`). Don't create one-off tags.
- **New series**: add it to `src/data/series.ts` with a title, description, and planned part titles.

## Content rules

James works at Google. Nothing on this site may:

- Include confidential or internal information, internal tool names, or anything learned only through work
- Imply it speaks for Google, or compare products with Google's (TPUs, Google Cloud) using inside knowledge
- Add affiliate links, ads, or sponsorships without James confirming it's allowed

Keep the footer disclaimer. When in doubt, flag it to James rather than writing it.

## Changing the theme (keep upgrades easy)

AstroPaper is merged in with full history so new releases can be merged (`git fetch astropaper --tags && git merge <tag>`). To keep those merges easy:

- **Put new code in files that are ours**: `src/custom/` (Head, BodyEnd, PostEnd hooks), `src/components/ArtCard.astro`, `src/components/OutdatedNotice.astro`, `src/data/`, `src/utils/ogCard.ts`, `src/utils/getSeriesParts.ts`, `scripts/`.
- **Edit AstroPaper's own files only when there's no hook**, keep the change small, and mark it with a `// jamescscott.net:` comment. The current list of edited theme files is in `README.md`; update it when you add one.
- **Colors and fonts** live in `src/styles/theme.css`. Use the tokens (`bg-surface`, `text-muted-foreground`, `text-accent`, …), never hard-coded colors. Every text color pair must meet 4.5:1 contrast in both light and dark.
- **Fonts** are self-hosted from `@fontsource`. Don't add Google Fonts or other network fonts; builds must work offline.

## Design

Clean and readable, with AI-style art only inside framed cards, never behind text. Inter for text, JetBrains Mono for small labels. Pages must work at 320px wide with no sideways scrolling, and every control needs a visible focus ring and a 44px touch target.
