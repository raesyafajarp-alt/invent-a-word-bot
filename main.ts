// invent-a-word-bot
// Coins one new English word and defines it in a single clear line,
// written to /output/entry.txt. Deterministic, no network, no dependencies.
//
// The word: cancelight — the quiet relief when a plan you were dreading
// gets cancelled. English has words for dreading a plan (dread, anxiety)
// and words for cancelling one, but no word at all for the small, guilty
// lift that follows when the dreaded plan falls through on its own.
// Everyone has felt it; nobody has had a name for it. The word is built
// the way English grows words — cancel + delight, echoing candlelight —
// so it is sayable, spellable and memorable at first hearing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Cancelight (n.): the secret relief when a plan you were dreading gets cancelled.";

// The gate: 1 to 140 characters, counted as Unicode code points.
const length = [...ENTRY].length;
if (length < 1 || length > 140 || ENTRY.trim().length === 0) {
  throw new Error(`Entry is ${length} characters; must be 1-140 and non-blank.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
let outPath = join(outDir, "entry.txt");
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
} catch {
  // Fall back to a local output directory when /output is not writable.
  mkdirSync("output", { recursive: true });
  outPath = join("output", "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
}

console.log(`Wrote ${[...ENTRY].length} characters to ${outPath}`);
