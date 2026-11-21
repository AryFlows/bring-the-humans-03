// main.ts — entry program for the bring-the-humans-03 bounty.
//
// The video itself is the entry: the house reads it from VIDEO.json.
// All this program does is copy that file, byte for byte, from the
// repository into the output directory. It uses only the Node standard
// library, reaches no network, reads no clock, and never removes the
// output directory itself — it only creates it if it is missing and
// writes VIDEO.json inside it.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Read the file first so a broken VIDEO.json fails loudly instead of
// being copied silently: the entry must name a real TikTok video.
const videoPath = join(botDir, "VIDEO.json");
const parsed = JSON.parse(readFileSync(videoPath, "utf8")) as unknown;
if (typeof parsed !== "object" || parsed === null || typeof (parsed as { url?: unknown }).url !== "string") {
  throw new Error("VIDEO.json must be a JSON object with a string url");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(videoPath, join(outDir, "VIDEO.json"));
