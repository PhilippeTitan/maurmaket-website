import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.dirname(root);
const dist = path.join(siteRoot, 'dist');

let failed = false;
const fail = (msg) => {
  console.error(`check:built FAIL — ${msg}`);
  failed = true;
};

if (!existsSync(dist)) {
  console.error('check:built FAILED — dist/ not found (run astro build first)');
  process.exit(1);
}

const routes = [
  'index.html',
  'about/index.html',
  'legal/terms/index.html',
  'legal/privacy/index.html',
  'fr/index.html',
  'fr/about/index.html',
  'fr/legal/terms/index.html',
  'fr/legal/privacy/index.html',
  'ht/index.html',
  'ht/about/index.html',
  'ht/legal/terms/index.html',
  'ht/legal/privacy/index.html',
  '404.html',
];

for (const r of routes) {
  const p = path.join(dist, r);
  if (!existsSync(p)) fail(`missing route file ${r}`);
  else {
    const html = readFileSync(p, 'utf8');
    const langMatch = html.match(/<html[^>]*\slang="([^"]+)"/);
    if (!langMatch) fail(`${r} has no <html lang>`);
    else {
      const lang = langMatch[1];
      const expected = r.startsWith('fr/') || r === 'fr/index.html' ? 'fr' : r.startsWith('ht/') || r === 'ht/index.html' ? 'ht' : 'en';
      if (lang !== expected) fail(`${r} lang="${lang}" expected "${expected}"`);
    }
    if (/\bundefined\b/.test(html.replace(/\s+/g, ' '))) fail(`${r} contains "undefined" in output`);
    if (/\[object Object\]/.test(html)) fail(`${r} contains "[object Object]"`);
    if (r !== '404.html' && !/<title>[^<]+<\/title>/.test(html)) fail(`${r} has empty/missing <title>`);
  }
}

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(dist);

const internalHref = /href="(\/[^"#?]*)/g;
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  let m;
  while ((m = internalHref.exec(html)) !== null) {
    let target = m[1];
    if (target === '/' || target.endsWith('/')) target = target + 'index.html';
    else if (!path.extname(target)) target = target + '/index.html';
    const abs = path.join(dist, target);
    if (!existsSync(abs)) {
      fail(`${path.relative(dist, f)} links to missing ${m[1]}`);
    }
  }
}

if (failed) process.exit(1);
console.log(`check:built OK — ${routes.length} routes present, lang correct, internal links resolve`);
