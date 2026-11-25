// Make the AI Judge Laugh — make.fun entry.
//
// One joke about office life, a single line, under 200 characters.
// The narrator volunteers for the team-building trust fall, nobody
// catches him, and HR reframes the public failure as a corporate
// success: "a successful exercise in accountability."
//
// Design notes (from the winning-pattern playbook, humor-one-liner):
// - Twist in the final words: the quoted HR label reframes the fall.
// - Quote as punchline: someone else's words shaming the narrator.
// - Self-own narrator: the narrator is the victim, not an observer.
// - Two concrete images colliding at the end: the physical trust fall
//   + HR paperwork ("wrote it up", "accountability").
// - Tight: 131 characters, reads aloud in one breath; setup:quote ~3:1.
// - No stock lines: no "you're welcome", no "per my last email", no
//   "circle back"; no numbers, no pun, nothing that explains the joke.
// - Originality checked before build: 0 verbatim web hits for the line
//   or its punchline phrase (see CANDIDATES.md).
//
// Fully deterministic: one fixed string, no clock, no Math.random,
// no network, Node 22 standard library only. Same bytes every run.
import * as fs from "node:fs";

const LINE =
  "I did the trust fall at our team-building day and nobody caught me, so HR wrote it up as 'a successful exercise in accountability.'";

// Self-check against the competition gate before writing: the entry
// must be UTF-8 text of 1 to 200 characters, a single line, and not
// only whitespace. Fail loudly instead of shipping a bad artifact.
function assertValidLine(line: string): number {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} characters, gate needs 1-200`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("entry must be one non-blank line");
  }
  return chars.length;
}

assertValidLine(LINE);

function outputPath(): string {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return outDir + "/entry.txt";
}

const entryPath = outputPath();
fs.mkdirSync(entryPath.slice(0, entryPath.lastIndexOf("/")), { recursive: true });
fs.writeFileSync(entryPath, LINE, "utf8");
