// A loan page: Banner (the loan's name, its one line, the photograph beside the
// client's introduction), the points as ruled rows beside their head, then the
// close on ink: the closing line, the way to the branch and its other loans.
import { html, rel, img } from '../lib/html.mjs';
import { pageHead } from '../lib/blocks.mjs';
import { loans, locations, telHref } from '../data/site.mjs';
import { loanPages } from '../data/loan-pages.mjs';

// The site's **bold** marks become <strong>; everything else is escaped.
const marked = (text) => text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? html`<strong>${part}</strong>` : html`${part}`));

export default function loan(route) {
  const page = route.path;
  const loc = locations[route.loc];
  const item = loans[route.loan];
  const copy = loanPages[route.loan];
  const to = (p) => rel(page, `${loc.slug}/${p}`);
  const others = loc.loans.filter((slug) => slug !== route.loan);

  // The photograph (never shown wider than the file) beside the client's
  // introduction, inside the Banner: together they open the page.
  const intro = html`
    <div class="loan-intro">
      <figure class="photo loan-intro__photo">${img(page, item.image, '', 'fetchpriority="high"')}</figure>
      <p class="loan-intro__text">${copy.intro}</p>
    </div>`;

  const head = pageHead(page, {
    crumbs: [[loc.name, `${loc.slug}/`], ['Services', `${loc.slug}/services/`], [item.name]],
    title: copy.heading,
    lead: item.short,
    extra: intro,
  });

  const points = html`
<section class="section loan-points" aria-labelledby="points-title">
  <div class="container loan-points__grid">
    <h2 id="points-title" class="loan-points__head">What ${copy.one} includes</h2>
    <ul class="ruled loan-points__list">
      ${copy.points.map((p) => html`<li>${marked(p)}</li>`)}
    </ul>
  </div>
</section>`;

  const close = html`
<section class="band band--ink section loan-close" aria-labelledby="close-title">
  <div class="container loan-close__grid">
    <div class="loan-close__ask">
      <h2 id="close-title">Ask about ${copy.one}</h2>
      <p class="lead">${copy.close}</p>
      <div class="actions">
        <a class="btn btn--primary" href="${to('contact/')}">Request a quote</a>
        <a class="link" href="${telHref(loc.phone)}">Call ${loc.phone}</a>
      </div>
    </div>
    <nav class="loan-close__others" aria-labelledby="others-title">
      <h3 id="others-title">Other loans in ${loc.name}</h3>
      <ul>
        ${others.map((slug) => html`<li><a href="${to(`services/${slug}/`)}">${loans[slug].name}</a></li>`)}
      </ul>
    </nav>
  </div>
</section>`;

  return {
    title: `${copy.heading} | Nalluri Associates ${loc.name}`,
    description: item.short,
    image: item.image,
    body: html`${head}${points}${close}`,
  };
}
