import * as fs from "node:fs";
import * as path from "node:path";

const joke =
  "I asked my AI agent to automate my job. It did — then emailed HR to ask why I'm still on the payroll.";

// The gate: 1–280 UTF-8 characters, a single line, not only whitespace.
const chars = [...joke].length;
if (chars < 1 || chars > 280 || joke.trim().length === 0 || joke.includes("\n")) {
  throw new Error(`joke fails the gate: ${chars} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = path.join(outDir, "entry.txt");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(entryPath, joke + "\n", "utf8");
fs.chmodSync(entryPath, 0o644);
