import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.dirname(root);
const baselinePath = path.join(siteRoot, '..', 'MaurMaket', 'src', 'utils', 'policyBaseline.js');
const outDir = path.join(siteRoot, 'src', 'generated');
const outFile = path.join(outDir, 'policy-meta.json');

let policies;
try {
  const mod = await import(pathToFileURL(baselinePath).href);
  policies = mod.BASELINE_POLICY_VERSIONS;
} catch (err) {
  console.error(`sync:policy FAILED — cannot import app policy baseline at ${baselinePath}`);
  console.error(String(err));
  process.exit(1);
}
if (!Array.isArray(policies) || policies.length === 0) {
  console.error('sync:policy FAILED — BASELINE_POLICY_VERSIONS missing or empty');
  process.exit(1);
}

const locales = ['en', 'fr', 'ht'];
const kinds = ['terms', 'privacy'];
const out = { generatedAt: new Date().toISOString(), policies: {} };

for (const kind of kinds) {
  const entry = policies.find((p) => p.kind === kind);
  if (!entry) {
    console.error(`sync:policy FAILED — no baseline policy of kind "${kind}"`);
    process.exit(1);
  }
  if (typeof entry.version !== 'string' || !entry.version) {
    console.error(`sync:policy FAILED — policy "${kind}" has no version`);
    process.exit(1);
  }
  const outLocales = {};
  for (const loc of locales) {
    const s = entry.summaries && entry.summaries[loc];
    if (!s || typeof s.title !== 'string' || !s.title || typeof s.summary !== 'string' || !s.summary) {
      console.error(`sync:policy FAILED — policy "${kind}" missing ${loc} title/summary`);
      process.exit(1);
    }
    outLocales[loc] = { title: s.title, summary: s.summary, url: s.url || '' };
  }
  out.policies[kind] = {
    version: String(entry.version),
    isMaterial: Boolean(entry.isMaterial),
    locales: outLocales,
  };
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`sync:policy OK → ${path.relative(siteRoot, outFile)} (terms ${out.policies.terms.version}, privacy ${out.policies.privacy.version})`);
