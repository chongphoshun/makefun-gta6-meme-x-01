import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

// The entry's only job: hand the judges the X post address (POST.json) and
// the meme itself (meme.png). Validate the post address first so a bad
// POST.json fails loudly instead of shipping a broken entry.
const post = JSON.parse(readFileSync("POST.json", "utf8"));
if (typeof post.url !== "string" || !post.url.startsWith("https://x.com/")) {
  throw new Error("POST.json must name an https://x.com post URL");
}

mkdirSync("/output", { recursive: true });
copyFileSync("POST.json", "/output/POST.json");
if (existsSync("meme.png")) copyFileSync("meme.png", "/output/meme.png");
