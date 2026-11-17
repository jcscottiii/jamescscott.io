// Runs axe (WCAG 2.2 AA plus best practices) on every page of the built
// site, in light and dark mode, at desktop and phone width. Also fails if
// any page scrolls sideways at 320px. Run after `pnpm build`:
//   pnpm check:a11y                    every page
//   pnpm check:a11y /about/ /posts/x/   just these pages
// Uses Playwright's Chromium (`pnpm exec playwright install chromium`), or
// set CHROME_PATH to use an installed Chrome instead.
/* eslint-disable no-console */
import { createServer } from "node:http";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const PORT = Number(process.env.PORT ?? 4322);
const BASE = `http://127.0.0.1:${PORT}`;
const DIST = path.resolve("dist");
const TAGS = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"];
const THEMES = ["light", "dark"];
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "phone", width: 390, height: 844 },
];

async function listPages(dir, prefix = "/") {
  const pages = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (["_astro", "pagefind"].includes(entry.name)) continue;
      pages.push(
        ...(await listPages(path.join(dir, entry.name), `${prefix}${entry.name}/`))
      );
    } else if (entry.name === "index.html") {
      pages.push(prefix);
    }
  }
  return pages;
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
};

// A small static server for dist/, so the check doesn't depend on
// `astro preview` (which runs as a shared background process in Astro 7).
async function serveFile(res, file, status = 200) {
  const body = await readFile(file);
  res.writeHead(status, {
    "Content-Type":
      TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream",
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  const urlPath = decodeURI(new URL(req.url, BASE).pathname);
  let file = path.join(DIST, urlPath);
  if (!file.startsWith(DIST)) {
    res.writeHead(403).end();
    return;
  }
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    await serveFile(res, file);
  } catch {
    try {
      await serveFile(res, `${file}.html`);
    } catch {
      await serveFile(res, path.join(DIST, "404.html"), 404);
    }
  }
});
await new Promise(resolve => server.listen(PORT, "127.0.0.1", resolve));
const stopServer = () => server.close();

const failures = [];
try {
  const only = process.argv.slice(2);
  const pages = only.length
    ? only
    : [...(await listPages(DIST)), "/404.html"];
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
  );

  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      await context.addInitScript(t => {
        try {
          localStorage.setItem("theme", t);
        } catch {
          // storage unavailable
        }
      }, theme);
      const page = await context.newPage();
      for (const url of pages) {
        await page.goto(BASE + url, { waitUntil: "networkidle" });
        const { violations } = await new AxeBuilder({ page })
          .withTags(TAGS)
          .analyze();
        for (const v of violations) {
          failures.push(
            `${url} [${theme}, ${vp.name}] ${v.id} (${v.impact}): ${v.help}\n    ${v.nodes[0]?.target.join(" ")}`
          );
        }
      }
      await context.close();
    }
  }

  // Reflow: nothing should scroll sideways on the narrowest phones.
  const narrow = await browser.newContext({ viewport: { width: 320, height: 800 } });
  const page = await narrow.newPage();
  for (const url of pages) {
    await page.goto(BASE + url, { waitUntil: "networkidle" });
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    if (width > 320) {
      failures.push(`${url} [320px] page is ${width}px wide and scrolls sideways`);
    }
  }
  await browser.close();

  console.log(
    `Checked ${pages.length} pages x ${THEMES.length} themes x ${VIEWPORTS.length} widths, plus 320px reflow.`
  );
} finally {
  stopServer();
}

if (failures.length) {
  console.error(`\n${failures.length} accessibility problem(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log("No accessibility problems found.");
