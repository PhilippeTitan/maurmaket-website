import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.dirname(root);
const localesDir = path.join(siteRoot, 'src', 'i18n', 'locales');
const files = ['en', 'fr', 'ht'].map((l) => path.join(localesDir, `${l}.json`));

function flatten(obj, prefix, out) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

const parsed = [];
let failed = false;
for (const f of files) {
  let raw;
  try {
    raw = JSON.parse(readFileSync(f, 'utf8'));
  } catch (err) {
    console.error(`check:locales FAILED — cannot parse ${f}`);
    console.error(String(err));
    failed = true;
    continue;
  }
  parsed.push({ file: f, flat: flatten(raw, '', {}) });
}
if (failed) process.exit(1);

const [en, fr, ht] = parsed;
const enKeys = Object.keys(en.flat).sort();

for (const other of [fr, ht]) {
  const otherKeys = new Set(Object.keys(other.flat));
  const missing = enKeys.filter((k) => !otherKeys.has(k));
  const extra = [...otherKeys].filter((k) => !en.flat[k] && !(k in en.flat));
  if (missing.length) {
    console.error(`check:locales FAILED — ${path.basename(other.file)} missing keys (first 20):`);
    for (const k of missing.slice(0, 20)) console.error(`  - ${k}`);
    console.error(`  (${missing.length} total missing)`);
    failed = true;
  }
  if (extra.length) {
    console.error(`check:locales FAILED — ${path.basename(other.file)} has extra keys (first 20):`);
    for (const k of extra.slice(0, 20)) console.error(`  + ${k}`);
    console.error(`  (${extra.length} total extra)`);
    failed = true;
  }
}

for (const p of parsed) {
  const empties = Object.entries(p.flat).filter(([, v]) => typeof v === 'string' && v.trim() === '');
  if (empties.length) {
    console.error(`check:locales FAILED — ${path.basename(p.file)} has empty strings:`);
    for (const [k] of empties.slice(0, 20)) console.error(`  - ${k}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`check:locales OK — ${enKeys.length} keys in sync across en/fr/ht`);
