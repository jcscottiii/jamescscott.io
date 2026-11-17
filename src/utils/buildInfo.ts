// The commit this build came from, for the <meta name="build"> tag.
// CI sets BUILD_SHA; local builds ask git and add "-dirty" when there are
// uncommitted changes to tracked files (untracked files don't count).
import { execSync } from "node:child_process";

const git = (args: string) =>
  execSync(`git ${args}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();

function commit(): string | undefined {
  if (process.env.BUILD_SHA) return process.env.BUILD_SHA;
  try {
    const sha = git("rev-parse HEAD");
    return git("status --porcelain --untracked-files=no")
      ? `${sha}-dirty`
      : sha;
  } catch {
    return undefined;
  }
}

export const buildCommit = commit();
