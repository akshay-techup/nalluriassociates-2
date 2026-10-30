// Tiny templating helpers. Every page module renders strings with `html`, which
// escapes interpolated values unless they are already `raw` (or nested `html`).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');

class Raw { constructor(s) { this.s = s; } toString() { return this.s; } }
export const raw = (s) => new Raw(String(s));

const esc = (v) => String(v)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const flat = (v) => {
  if (v == null || v === false) return '';
  if (v instanceof Raw) return v.s;
  if (Array.isArray(v)) return v.map(flat).join('');
  return esc(v);
};

export const html = (strings, ...values) =>
  raw(strings.reduce((out, s, i) => out + s + (i < values.length ? flat(values[i]) : ''), ''));

// Relative URL from the current page directory (`from`, e.g. "hyderabad/about/")
// to a site path (`to`, e.g. "hyderabad/services/" or "images/x.jpg" or "").
// Relative links keep the site working from any folder and from file://.
export function rel(from, to) {
  const depth = from.split('/').filter(Boolean).length;
  const out = '../'.repeat(depth) + to;
  return out === '' ? './' : out;
}

// Intrinsic size of a PNG or JPEG under public/, for width/height attributes.
const sizeCache = new Map();
export function imageSize(sitePath) {
  if (sizeCache.has(sitePath)) return sizeCache.get(sitePath);
  const buf = fs.readFileSync(path.join(ROOT, 'public', sitePath));
  let size = null;
  if (buf.readUInt32BE(0) === 0x89504e47) {
    size = { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } else if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        size = { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
        break;
      }
      i += 2 + len;
    }
  }
  if (!size) throw new Error(`imageSize: cannot read ${sitePath}`);
  sizeCache.set(sitePath, size);
  return size;
}

// <img> with intrinsic width/height and a relative src. `attrs` is a raw string.
export function img(page, sitePath, alt, attrs = '') {
  const { width, height } = imageSize(sitePath);
  return html`<img src="${rel(page, sitePath)}" width="${width}" height="${height}" alt="${alt}" ${raw(attrs)}>`;
}
