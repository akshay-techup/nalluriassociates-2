// Gallery: the Banner head with an index of the sets, then each set of
// photographs. Thumbnails sit in justified rows (every photo whole, at its own
// shape), and only the 640px thumbnails load with the page. Each is a link to
// the full-size file, so the page works with no script. With script, a native
// <dialog> viewer opens instead: previous and next, arrow keys, Escape, and
// focus returned to the thumbnail.
import { html, raw, rel, img, imageSize } from '../lib/html.mjs';
import { pageHead } from '../lib/blocks.mjs';
import { locations } from '../data/site.mjs';
import { galleries } from '../data/gallery.mjs';

const plural = (n) => `${n} photograph${n === 1 ? '' : 's'}`;

export default function gallery(route) {
  const page = route.path;
  const loc = locations[route.loc];
  const sets = galleries[route.loc];
  const total = sets.reduce((n, s) => n + s.photos.length, 0);

  // One thumbnail: a link to the full-size file. `--r` is the photo's shape,
  // which the justified rows read.
  const thumb = (set, p, i) => {
    const { width, height } = imageSize(p.thumb);
    return html`
      <li class="gal__item" style="--r: ${(width / height).toFixed(4)}">
        <a class="gal__link photo" href="${rel(page, p.full)}" data-set="${set.title}" data-pos="${i + 1}" data-of="${set.photos.length}">${img(page, p.thumb, p.alt, 'loading="lazy" decoding="async"')}</a>
      </li>`;
  };

  const head = (set) => html`
    <div class="head-block head-block--split gal-set__head">
      <div class="gal-set__title">
        <h2 id="set-${set.id}-title">${set.title}</h2>
        <p class="gal-set__count muted">${plural(set.photos.length)}</p>
      </div>
      <p class="lead">${set.line}</p>
    </div>`;

  const grid = (set, photos, offset = 0, extra = '') =>
    html`<ul class="gal${extra}" role="list">${photos.map((p, i) => thumb(set, p, i + offset))}</ul>`;

  const section = (set) => {
    const cls = `gal-set gal-set--${set.layout}${set.layout === 'band' ? ' band' : ''}`;
    if (set.layout === 'lead') {
      // The first two photographs fill a taller first row; the rest follow.
      return html`
<section class="${cls}" id="set-${set.id}" aria-labelledby="set-${set.id}-title">
  <div class="container">
    ${head(set)}
    ${grid(set, set.photos.slice(0, 2), 0, ' gal--fill gal--lead')}
    ${grid(set, set.photos.slice(2), 2)}
  </div>
</section>`;
    }
    if (set.layout === 'aside') {
      return html`
<section class="${cls}" id="set-${set.id}" aria-labelledby="set-${set.id}-title">
  <div class="container gal-set__aside">
    <div class="gal-set__side">
      <h2 id="set-${set.id}-title">${set.title}</h2>
      <p class="gal-set__count muted">${plural(set.photos.length)}</p>
      <p class="gal-set__line">${set.line}</p>
    </div>
    ${grid(set, set.photos)}
  </div>
</section>`;
    }
    return html`
<section class="${cls}" id="set-${set.id}" aria-labelledby="set-${set.id}-title">
  <div class="container">
    ${head(set)}
    ${grid(set, set.photos, 0, set.layout === 'pair' ? ' gal--fill' : '')}
  </div>
</section>`;
  };

  const setIndex = html`
    <nav class="gal-index" aria-label="Sets in this gallery">
      <ol role="list">
        ${sets.map((s) => html`<li><a href="#set-${s.id}"><span class="gal-index__name">${s.title}</span><span class="gal-index__count muted">${plural(s.photos.length)}</span></a></li>`)}
      </ol>
    </nav>`;

  // The gallery is the firm's own photographs, so gate 83 (the photo wall) is
  // waived for this page only; the shared stamp in site.css stays as it is.
  const waiver = raw('<style>/* Hallmark · waive 83 · a gallery of the client’s own photographs · this gallery page exists to show the branch photographs themselves, set by set */</style>');

  const body = html`
${waiver}
${pageHead(page, {
    crumbs: [[loc.name, `${loc.slug}/`], ['Gallery']],
    title: 'Gallery',
    lead: `${plural(total)} from the ${loc.name} branch, in ${sets.length} sets.`,
    extra: setIndex,
  })}
${sets.map(section)}
<dialog class="viewer" aria-labelledby="viewer-caption">
  <div class="viewer__inner">
    <p class="viewer__count" id="viewer-count" aria-live="polite"></p>
    <figure class="viewer__figure">
      <figcaption class="viewer__caption" id="viewer-caption"></figcaption>
    </figure>
    <div class="viewer__controls">
      <button class="btn" type="button" data-step="-1">Previous</button>
      <button class="btn" type="button" data-step="1" autofocus>Next</button>
      <button class="btn viewer__close" type="button" data-close>Close</button>
    </div>
  </div>
</dialog>`;

  const scripts = html`<script>
(function () {
  var dialog = document.querySelector('.viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var links = Array.prototype.slice.call(document.querySelectorAll('.gal__link'));
  var figure = dialog.querySelector('.viewer__figure');
  var image = document.createElement('img');
  image.className = 'viewer__img';
  image.alt = '';
  figure.insertBefore(image, figure.firstChild);
  var caption = dialog.querySelector('.viewer__caption');
  var count = dialog.querySelector('.viewer__count');
  var current = 0;

  function show(i) {
    current = (i + links.length) % links.length;
    var link = links[current];
    var thumb = link.querySelector('img');
    var full = link.href;
    // The thumbnail is already loaded: show it at once, then swap in the full
    // size when it arrives. Nothing full size loads until a photo is opened.
    image.width = thumb.naturalWidth || thumb.width;
    image.height = thumb.naturalHeight || thumb.height;
    image.src = thumb.currentSrc || thumb.src;
    image.alt = thumb.alt;
    caption.textContent = thumb.alt;
    count.textContent = link.dataset.set + ', ' + link.dataset.pos + ' of ' + link.dataset.of;
    var loader = new Image();
    loader.onload = function () { if (links[current] === link) image.src = full; };
    loader.src = full;
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });

  dialog.addEventListener('click', function (e) {
    var step = e.target.closest('[data-step]');
    if (step) { show(current + Number(step.dataset.step)); return; }
    if (e.target.closest('[data-close]') || e.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
  });
  dialog.addEventListener('close', function () {
    var link = links[current];
    link.focus();
    link.scrollIntoView({ block: 'nearest' });
  });
})();
</script>`;

  return {
    title: `Gallery | Nalluri Associates, ${loc.name}`,
    description: `Photographs from Nalluri Associates’ ${loc.name} branch: ${sets.map((s) => s.title.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`,
    body,
    scripts,
  };
}
