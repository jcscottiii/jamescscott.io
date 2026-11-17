// Applies a newer AstroPaper release on top of this site.
//
//   pnpm upgrade:theme v7.3.0
//
// The site started as a copy of AstroPaper (the README's --template setup),
// so there's no shared Git history to merge. Instead this applies the
// changes between the version we're on (.astropaper-version) and the new
// one as a 3-way patch. Clean changes are staged; conflicts get the usual
// <<<<<<< markers to resolve by hand. Nothing is committed.
/* eslint-disable no-console */
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const REMOTE = "astropaper";
const URL = "https://github.com/satnaing/astro-paper";
const VERSION_FILE = ".astropaper-version";

// AstroPaper files this site deleted or replaced on purpose. Upstream
// changes to them are skipped. The site owns its own CI, deploy, and
// Dependabot config, so those are skipped too.
const SKIP = [
  "src/content/posts",
  "src/assets/images",
  "README.md",
  "CHANGELOG.md",
  "AstroPaper-lighthouse-score.svg",
  "Dockerfile",
  "compose.yaml",
  ".dockerignore",
  "cz.yaml",
  ".github/workflows",
  ".github/dependabot.yml",
  ".github/FUNDING.yml",
  ".github/ISSUE_TEMPLATE",
  ".github/CODE_OF_CONDUCT.md",
  ".github/CONTRIBUTING.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  "public/default-og.jpg",
];

const git = (args, opts = {}) =>
  execFileSync("git", args, { encoding: "utf8", ...opts }).trim();

const to = process.argv[2];
if (!to || !/^v\d+\.\d+\.\d+$/.test(to)) {
  console.error("Usage: pnpm upgrade:theme <release tag, e.g. v7.3.0>");
  console.error(`Releases: ${URL}/releases`);
  process.exit(1);
}
const from = readFileSync(VERSION_FILE, "utf8").trim();
if (from === to) {
  console.log(`Already on AstroPaper ${to}.`);
  process.exit(0);
}
if (git(["status", "--porcelain"])) {
  console.error("Commit or stash your changes first, so the upgrade stands alone.");
  process.exit(1);
}

try {
  git(["remote", "get-url", REMOTE], { stdio: "pipe" });
} catch {
  git(["remote", "add", REMOTE, URL]);
}
console.log(`Fetching AstroPaper ${from} and ${to}...`);
git(["fetch", "--quiet", "--no-tags", REMOTE,
  `refs/tags/${from}:refs/tags/${from}`, `refs/tags/${to}:refs/tags/${to}`]);

// Format both releases with this repo's Prettier setup before comparing
// them. This site may run a newer formatter than AstroPaper, and without
// this every formatting difference would show up as a conflict.
// The copies live under node_modules so Prettier finds this repo's plugins.
const cache = resolve("node_modules/.cache");
mkdirSync(cache, { recursive: true });
const tmp = mkdtempSync(join(cache, "astropaper-"));
const prettier = resolve("node_modules/prettier/bin/prettier.cjs");
const formatted = tag => {
  const dir = join(tmp, tag);
  git(["worktree", "add", "--detach", "--quiet", dir, tag]);
  const run = spawnSync(
    process.execPath,
    [prettier, "--write", ".", "--log-level", "silent", "--with-node-modules",
      "--config", resolve(".prettierrc"),
      "--ignore-path", ".prettierignore"],
    { cwd: dir, encoding: "utf8" }
  );
  if (run.status !== 0) {
    console.log(`Note: Prettier couldn't format every file in ${tag}; those are compared as-is.`);
  }
  git(["add", "-A"], { cwd: dir });
  git(["-c", "user.name=upgrade-theme", "-c", "user.email=upgrade-theme@localhost",
    "commit", "--quiet", "--allow-empty", "--no-verify", "-m", `${tag}, formatted`],
    { cwd: dir });
  return git(["rev-parse", "HEAD"], { cwd: dir });
};

console.log("Formatting both releases the way this site does...");
let diff;
try {
  const fromRef = formatted(from);
  const toRef = formatted(to);
  diff = execFileSync(
    "git",
    ["diff", "--binary", fromRef, toRef, "--", ".", ...SKIP.map(p => `:!${p}`)],
    { encoding: "buffer", maxBuffer: 256 * 1024 * 1024 }
  );
} finally {
  for (const tag of [from, to]) {
    try {
      git(["worktree", "remove", "--force", join(tmp, tag)], { stdio: "pipe" });
    } catch {
      // Not created; nothing to remove.
    }
  }
  rmSync(tmp, { recursive: true, force: true });
}

if (diff.length) {
  const result = spawnSync("git", ["apply", "-3", "--index"], {
    input: diff,
    encoding: "utf8",
  });
  if (result.stderr) console.log(result.stderr.trim());
} else {
  console.log("Nothing in this release touches files the site uses.");
}

let conflicts = git(["diff", "--name-only", "--diff-filter=U"])
  .split("\n")
  .filter(Boolean);

// The lockfile is regenerated, never hand-merged.
if (conflicts.includes("pnpm-lock.yaml")) {
  git(["checkout", "--ours", "--", "pnpm-lock.yaml"]);
  git(["add", "pnpm-lock.yaml"]);
  conflicts = conflicts.filter(f => f !== "pnpm-lock.yaml");
}

writeFileSync(VERSION_FILE, `${to}\n`);
git(["add", VERSION_FILE]);

console.log(`\nApplied AstroPaper ${from} → ${to}. Nothing is committed yet.`);
if (conflicts.length) {
  console.log("\nResolve the <<<<<<< markers in:");
  for (const f of conflicts) console.log(`  ${f}`);
  console.log("then `git add` each file.");
}
console.log(`
Next:
  pnpm install        # updates the lockfile for any new versions
  pnpm build && pnpm check
  git commit -m "Upgrade AstroPaper to ${to}"

To abandon the upgrade: git reset --hard`);
