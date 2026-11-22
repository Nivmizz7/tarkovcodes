// Runs after `astro build`. Hashes the inline <script> in each built page and
// writes dist/_headers with a Content-Security-Policy that allows exactly those.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const pages = ['dist/index.html', 'dist/fr/index.html'];
const hashes = new Set();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc\s*=/.test(m[1]) || !m[2].trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(m[2], 'utf8').digest('base64')}'`);
  }
}
if (hashes.size === 0) throw new Error('No inline scripts found in the built pages.');

const csp = [
  "default-src 'self'",
  `script-src ${[...hashes].join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://avatars.githubusercontent.com",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join('; ');

const lines = readFileSync('public/_headers', 'utf8').split('\n');
const root = lines.indexOf('/*');
if (root === -1) throw new Error('No /* block in public/_headers');
lines.splice(root + 1, 0, `  Content-Security-Policy: ${csp}`);
writeFileSync('dist/_headers', lines.join('\n'));
console.log(`dist/_headers: CSP with ${hashes.size} script hash${hashes.size === 1 ? '' : 'es'}`);
