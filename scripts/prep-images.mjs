// Shrinks phone photos for a post and strips their metadata (including the
// GPS location of where they were taken) BEFORE they go into the repo.
//
//   pnpm images <post-slug> [files or folders...]
//
// With no files given, it reads everything in photos-inbox/ (git-ignored).
// Output goes to src/assets/images/posts/<post-slug>/ as JPEG (or PNG for
// images with transparency), max 2400px on the long side. Astro then makes
// the smaller, modern-format copies that visitors actually download.
/* eslint-disable no-console */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_EDGE = 2400;
const INPUT_TYPES = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);

const [slug, ...inputs] = process.argv.slice(2);
if (!slug || slug.startsWith("-")) {
  console.error("Usage: pnpm images <post-slug> [files or folders...]");
  process.exit(1);
}

async function collect(p) {
  const info = await stat(p);
  if (!info.isDirectory()) return [p];
  const files = [];
  for (const entry of await readdir(p)) {
    if (entry.startsWith(".")) continue;
    files.push(...(await collect(path.join(p, entry))));
  }
  return files;
}

function outputName(file, ext) {
  const base = path
    .basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "image"}${ext}`;
}

const kb = bytes => `${Math.round(bytes / 1024).toLocaleString()} KB`;

const files = (
  await Promise.all((inputs.length ? inputs : ["photos-inbox"]).map(collect))
).flat();
const outDir = path.join("src/assets/images/posts", slug);
await mkdir(outDir, { recursive: true });

const snippets = [];
let failed = false;
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".heic" || ext === ".heif") {
    console.error(
      `✗ ${file}: HEIC isn't supported. Export it as JPEG first (see AGENTS.md, "Photos").`
    );
    failed = true;
    continue;
  }
  if (!INPUT_TYPES.has(ext)) {
    console.warn(`- skipping ${file} (not an image this tool handles)`);
    continue;
  }

  // rotate() applies the camera's orientation before the metadata is dropped.
  const image = sharp(file).rotate();
  const { hasAlpha } = await image.metadata();
  const resized = image.resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });
  const outExt = hasAlpha ? ".png" : ".jpg";
  const out = path.join(outDir, outputName(file, outExt));
  // sharp drops EXIF/GPS/XMP metadata unless asked to keep it.
  const result = await (hasAlpha
    ? resized.png({ compressionLevel: 9, palette: true })
    : resized.jpeg({ quality: 82, mozjpeg: true })
  ).toFile(out);

  const before = (await stat(file)).size;
  console.log(
    `✓ ${path.basename(file)} → ${out}  (${kb(before)} → ${kb(result.size)}, ${result.width}×${result.height})`
  );
  snippets.push(`![DESCRIBE WHAT THIS SHOWS](../../assets/images/posts/${slug}/${path.basename(out)})`);
}

if (snippets.length) {
  console.log("\nPaste into the post and replace the alt text:\n");
  console.log(snippets.join("\n\n"));
}
if (failed) process.exit(1);
