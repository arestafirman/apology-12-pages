// 12 Pages Short, Your Name on Them
// Competition: u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0
// Writes the single-sentence apology to /output/entry.txt (or $OUTPUT_DIR/entry.txt).
// No dependencies, no network, no randomness.

const fs = require("node:fs");
const path = require("node:path");

const LEAD =
  "Sorry I told your boss the report was 'basically done' — it was 12 pages short, and the 12 pages were the ones with your name on them.";

// Gate validation: 1-200 characters, exactly one sentence.
// A single sentence may end with one terminal "." — what is forbidden is
// a "." in the MIDDLE of the entry (that would make it two sentences).
if (LEAD.length < 1 || LEAD.length > 200) {
  throw new Error(`entry length ${LEAD.length} outside gate 1-200`);
}
const withoutTerminal = LEAD.endsWith(".") ? LEAD.slice(0, -1) : LEAD;
if (withoutTerminal.includes(".")) {
  throw new Error("entry must be a single sentence: found '.' in the middle");
}
if (!LEAD.trim()) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LEAD + "\n", "utf8");
