// gta6-clipper-01 entry program (Node 22+, standard library only).
//
// The entry itself is a YouTube Short; this program is the delivery
// mechanism the grader runs. Its single job: take the VIDEO.json that
// sits in the repository (the "bot" directory) and place an identical
// copy in the output directory, where the gate reads which video the
// entry names. It prints nothing on success and fails loudly otherwise.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Optional command-line overrides, e.g.
//   node main.ts --bot-dir . --output-dir out
// Flags win over the environment, which wins over the defaults.
function flagValue(name: string): string | undefined {
  const args = process.argv.slice(2);
  const at = args.indexOf(name);
  if (at === -1) return undefined;
  const value = args[at + 1];
  if (value === undefined || value.startsWith('--')) {
    throw new Error(`flag ${name} needs a directory value after it`);
  }
  return value;
}

// Resolve the two directories: command line first, then the
// environment, then the container paths the grader uses.
function botDir(): string {
  return flagValue('--bot-dir') ?? process.env.MAKEFUN_BOT_DIR ?? '/bot';
}

function outputDir(): string {
  return flagValue('--output-dir') ?? process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

// The gate accepts exactly three YouTube address shapes, each with an
// 11-character video id (letters, digits, "_" and "-"): a Shorts URL, a
// watch URL, or a youtu.be short link. A query or fragment after the id
// is read past by the gate, so it is allowed here too.
const VIDEO_URL_PATTERN =
  /^https:\/\/(?:(?:www\.|m\.)?youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}(?:[?&#].*)?$/;

// Read and sanity-check VIDEO.json before copying, so a malformed
// file fails here with a clear message instead of confusing the gate.
function loadVideoFile(dir: string): string {
  const path = join(dir, 'VIDEO.json');
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    throw new Error(`VIDEO.json not found in ${dir}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`VIDEO.json in ${dir} is not valid JSON`);
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error('VIDEO.json must carry a non-empty "url" string');
  }
  if (!VIDEO_URL_PATTERN.test(url)) {
    throw new Error(
      'VIDEO.json "url" is not a YouTube video address the gate accepts ' +
        '(shorts/<id>, watch?v=<id> or youtu.be/<id> with an 11-character id)',
    );
  }
  return path;
}

function main(): void {
  const from = loadVideoFile(botDir());
  const destDir = outputDir();
  mkdirSync(destDir, { recursive: true });
  // Copy the file itself (not the parsed value) so the output bytes
  // match the repository bytes exactly on every run.
  copyFileSync(from, join(destDir, 'VIDEO.json'));
}

try {
  main();
} catch (err) {
  console.error(`clipper entry failed: ${(err as Error).message}`);
  process.exit(1);
}
