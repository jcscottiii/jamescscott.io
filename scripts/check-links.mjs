// Checks that every internal link and image in the built site points at a
// file that exists. Run after `pnpm build`:  pnpm check:links
/* eslint-disable no-console */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist");

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function resolves(url) {
  const clean = decodeURI(url.split(/[?#]/)[0]);
  const target = path.join(DIST, clean);
  if (!target.startsWith(DIST)) return false;
  if (clean.endsWith("/")) return exists(path.join(target, "index.html"));
  return (
    (await exists(target)) ||
    (await exists(`${target}.html`)) ||
    (await exists(path.join(target, "index.html")))
  );
}

const ATTR = /\s(?:href|src)="(\/[^"/][^"]*|\/)"/g;
const broken = [];
const checked = new Map();
let pages = 0;

for await (const file of htmlFiles(DIST)) {
  pages++;
  const html = await readFile(file, "utf8");
  const page = "/" + path.relative(DIST, file).replace(/index\.html$/, "");
  for (const [, url] of html.matchAll(ATTR)) {
    if (!checked.has(url)) checked.set(url, await resolves(url));
    if (!checked.get(url)) broken.push(`${page} -> ${url}`);
  }
}

console.log(`Checked ${checked.size} internal URLs across ${pages} pages.`);
if (broken.length) {
  console.error(`\n${broken.length} broken internal link(s):`);
  for (const b of broken) console.error(`  ${b}`);
  process.exit(1);
}
console.log("No broken internal links.");
