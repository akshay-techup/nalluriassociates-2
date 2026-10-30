// Static build: renders every route to www/<route>/index.html, bundles the CSS
// into www/assets/site.css and copies public/ into www/. No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { routes } from './src/routes.mjs';
import { layout } from './src/layout.mjs';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, 'www');

// Inline @import url("./x.css") lines (recursively) so the site ships one stylesheet.
function bundleCss(file, seen = new Set()) {
  if (seen.has(file)) return '';
  seen.add(file);
  return fs.readFileSync(file, 'utf8').replace(/^@import url\("(\.[^"]+)"\);\s*$/gm,
    (_, rel) => bundleCss(path.resolve(path.dirname(file), rel), seen));
}

fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(ROOT, 'public'), OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'assets/site.css'), bundleCss(path.join(ROOT, 'src/styles/site.css')));

let count = 0;
for (const route of routes) {
  const mod = await import(`./src/pages/${route.page}.mjs`);
  const page = mod.default(route);
  const file = path.join(OUT, route.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, String(layout(route, page)));
  count++;
}
console.log(`built ${count} pages into www/`);
