// The shared chrome: <head>, the floating pill nav and the colophon footer.
import { html, raw, rel, img } from './lib/html.mjs';
import { brand, loans, locations, sections, telHref } from './data/site.mjs';

const SITE_URL = 'https://nalluriassociates.com/';

// The same page in the other branch, where it exists; otherwise that branch's home.
function counterpart(route, otherSlug) {
  const other = locations[otherSlug];
  if (route.loan) return other.loans.includes(route.loan) ? `${otherSlug}/services/${route.loan}/` : `${otherSlug}/services/`;
  return route.key && route.key !== 'home' ? `${otherSlug}/${route.key}/` : `${otherSlug}/`;
}

function nav(route) {
  const page = route.path;
  const loc = route.loc ? locations[route.loc] : null;
  const branches = Object.values(locations).map((l) => {
    const href = loc ? (l.slug === loc.slug ? `${l.slug}/` : counterpart(route, l.slug)) : `${l.slug}/`;
    return html`<a href="${rel(page, href)}"${loc && l.slug === loc.slug ? raw(' aria-current="true"') : ''}>${l.name}</a>`;
  });
  const links = loc ? sections.map((s) => {
    const current = route.key === s.slug || (s.slug === 'services' && route.loan);
    return html`<li><a href="${rel(page, `${loc.slug}/${s.slug}/`)}"${current ? raw(` aria-current="${route.key === s.slug ? 'page' : 'true'}"`) : ''}>${s.label}</a></li>`;
  }) : [];

  return html`
<a class="skip" href="#main">Skip to content</a>
<header class="site-nav">
  <div class="container">
    <nav class="pill" aria-label="Main">
      <a class="pill__brand" href="${rel(page, '')}" aria-label="Nalluri Associates, choose a branch">${img(page, brand.logoNav, '', 'class="pill__logo"')}</a>
      <div class="pill__branch" role="group" aria-label="Branch">${branches}</div>
      ${loc ? html`<ul class="pill__links">${links}</ul>` : ''}
      ${loc ? html`<a class="btn pill__call" href="${telHref(loc.phone)}">Call ${loc.phone.replace('+91 ', '')}</a>` : ''}
      ${loc ? html`
      <details class="pill__menu">
        <summary>Menu</summary>
        <div class="pill__sheet">
          <ul>${links}</ul>
          <div class="pill__sheet-branch" role="group" aria-label="Branch">${branches}</div>
          <a class="pill__sheet-call" href="${telHref(loc.phone)}">Call ${loc.phone}</a>
        </div>
      </details>` : ''}
    </nav>
  </div>
</header>`;
}

function footer(route) {
  const page = route.path;
  const loc = route.loc ? locations[route.loc] : null;
  const list = (title, items) => html`
      <div class="foot__col">
        <h2 class="foot__head">${title}</h2>
        <ul>${items.map(([label, href]) => html`<li><a href="${href}">${label}</a></li>`)}</ul>
      </div>`;

  const colophon = loc
    ? html`<p class="foot__colophon">${loc.offices.map((o) => html`<span class="foot__office">${o.address}.</span> `)}Call <a href="${telHref(loc.phone)}">${loc.phone}</a> or write to <a href="mailto:${loc.email}">${loc.email}</a>.</p>`
    : html`<p class="foot__colophon">Offices in ${Object.values(locations).flatMap((l) => l.offices.map((o) => o.city)).join(', ').replace(/, ([^,]*)$/, ' and $1')}. Call Hyderabad on <a href="${telHref(locations.hyderabad.phone)}">${locations.hyderabad.phone}</a> or Andhra Pradesh on <a href="${telHref(locations.andhrapradesh.phone)}">${locations.andhrapradesh.phone}</a>.</p>`;

  return html`
<footer class="site-footer">
  <div class="container">
    <div class="foot__top">
      <a class="foot__brand" href="${rel(page, '')}" aria-label="Nalluri Associates, choose a branch">${img(page, brand.logo, '', 'class="foot__logo" loading="lazy"')}</a>
      ${colophon}
    </div>
    <div class="foot__cols">
      ${loc ? list('Services', loc.loans.map((slug) => [loans[slug].footer, rel(page, `${loc.slug}/services/${slug}/`)])) : ''}
      ${loc ? list('Company', [['About us', 'about'], ['Contact', 'contact'], ['Achievements', 'achievements'], ['Gallery', 'gallery'], ['FAQs', 'faqs']].map(([l, s]) => [l, rel(page, `${loc.slug}/${s}/`)])) : ''}
      ${list('Branches', Object.values(locations).map((l) => [l.name, rel(page, `${l.slug}/`)]))}
      ${list('Follow', brand.social.map((s) => [s.label, s.href]))}
    </div>
    <p class="foot__legal">© ${new Date().getFullYear()} Nalluri Associates. All rights reserved.</p>
  </div>
</footer>`;
}

// route: { path, loc?, key?, loan? } · page: { title, description, body, scripts?, image? }
export function layout(route, page) {
  const p = route.path;
  const ogImage = page.image || (route.loc ? locations[route.loc].hero.image : 'images/media/main.a59eb6b4.jpg');
  return html`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<meta name="author" content="Nalluri Associates">
<link rel="canonical" href="${SITE_URL}${p}">
<meta property="og:type" content="website">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:image" content="${SITE_URL}${ogImage}">
<meta name="theme-color" content="#fdfdfb">
<link rel="icon" href="${rel(p, 'favicon.ico')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700&display=swap">
<link rel="stylesheet" href="${rel(p, 'assets/site.css')}">
<script>document.documentElement.classList.add('js');</script>
</head>
<body class="${page.bodyClass || ''}">
${nav(route)}
<main id="main">
${page.body}
</main>
${footer(route)}
${page.scripts || ''}
</body>
</html>
`;
}
