// Fails if any committed image still carries GPS location data, or is too
// large to commit. Runs on source images, not the build:  pnpm check:images
// Fix a failure with:  pnpm images <post-slug> <that file>
/* eslint-disable no-console */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOTS = ["src/assets", "public"];
const TYPES = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
const MAX_BYTES = 3 * 1024 * 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (TYPES.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

// Looks for the GPS pointer tag (0x8825) in the EXIF block's first IFD.
function hasGps(exif) {
  if (!exif || exif.length < 14) return false;
  const tiff = exif.subarray(0, 6).toString("latin1") === "Exif\0\0" ? 6 : 0;
  const le = exif.toString("latin1", tiff, tiff + 2) === "II";
  const u16 = o => (le ? exif.readUInt16LE(o) : exif.readUInt16BE(o));
  const u32 = o => (le ? exif.readUInt32LE(o) : exif.readUInt32BE(o));
  try {
    const ifd = tiff + u32(tiff + 4);
    const count = u16(ifd);
    for (let i = 0; i < count; i++) {
      if (u16(ifd + 2 + i * 12) === 0x8825) return true;
    }
  } catch {
    return true; // unreadable EXIF: treat as suspicious
  }
  return false;
}

const problems = [];
let checked = 0;
for (const root of ROOTS) {
  for await (const file of walk(root)) {
    checked++;
    const { size } = await stat(file);
    if (size > MAX_BYTES) {
      problems.push(`${file}: ${(size / 1048576).toFixed(1)} MB (limit 3 MB)`);
    }
    try {
      const { exif } = await sharp(file).metadata();
      if (hasGps(exif)) problems.push(`${file}: contains GPS location data`);
    } catch (err) {
      problems.push(`${file}: could not read (${err.message})`);
    }
  }
}

console.log(`Checked ${checked} images.`);
if (problems.length) {
  console.error(`\n${problems.length} image problem(s):`);
  for (const p of problems) console.error(`  ${p}`);
  console.error("\nFix with: pnpm images <post-slug> <file>");
  process.exit(1);
}
console.log("No location data, nothing oversized.");
