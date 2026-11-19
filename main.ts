import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// The entry's only job: hand the judges the X post address (POST.json) and
// the meme itself (meme.png). Validate the post address first so a bad
// POST.json fails loudly instead of shipping a broken entry.
//
// Paths resolve against this script's own directory, never the working
// directory: the grader runs `node /bot/main.ts` from an arbitrary cwd,
// where bare relative paths ("POST.json") resolve to nowhere.
const entryDir = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const post = JSON.parse(readFileSync(join(entryDir, "POST.json"), "utf8"));
if (typeof post.url !== "string" || !post.url.startsWith("https://x.com/")) {
  throw new Error("POST.json must name an https://x.com post URL");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(entryDir, "POST.json"), join(OUTPUT_DIR, "POST.json"));
if (existsSync(join(entryDir, "meme.png"))) copyFileSync(join(entryDir, "meme.png"), join(OUTPUT_DIR, "meme.png"));
