// Blocks more than one page renders. Styles live in src/styles/components.css.
import { html, raw, rel, img } from './html.mjs';
import { lenders, locations, telHref } from '../data/site.mjs';

// Breadcrumbs: [[label, sitePath], ..., [currentLabel]]
export function crumbs(page, items) {
  return html`<nav aria-label="Breadcrumb"><ol class="crumbs">${items.map(([label, to]) =>
    to != null ? html`<li><a href="${rel(page, to)}">${label}</a></li>` : html`<li aria-current="page">${label}</li>`)}</ol></nav>`;
}

// The Banner head every inner page opens with. `extra` sits under the lead.
export function pageHead(page, { crumbs: trail, title, lead, extra = '' }) {
  return html`
<section class="page-head">
  <div class="container">
    ${trail ? crumbs(page, trail) : ''}
    <h1>${title}</h1>
    ${lead ? html`<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div>
</section>`;
}

// Contact details per office: city, address, phone and email.
export function offices(locSlugs, { headingLevel = 3 } = {}) {
  const h = (t) => raw(`<h${headingLevel}>${String(html`${t}`)}</h${headingLevel}>`);
  const rows = [].concat(...[].concat(locSlugs).map((slug) => {
    const loc = locations[slug];
    return loc.offices.map((o) => html`
    <li>
      ${h(o.city)}
      <address>${o.address}</address>
      <p class="offices__reach"><a class="link" href="${telHref(loc.phone)}">${loc.phone}</a><a class="link" href="mailto:${loc.email}">${loc.email}</a></p>
    </li>`);
  }));
  return html`<ul class="offices">${rows}</ul>`;
}

// The partner logos, as the live site shows them.
export function lenderLogos(page) {
  return html`<ul class="lenders">${lenders.map((l) => html`<li>${img(page, l.src, l.name, 'loading="lazy"')}</li>`)}</ul>`;
}
