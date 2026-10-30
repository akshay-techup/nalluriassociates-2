// Services: Banner, every loan the branch offers as a grid of photographs (each
// a link to its page), then the quote band with the branch's phone and email.
import { html, rel, img } from '../lib/html.mjs';
import { pageHead } from '../lib/blocks.mjs';
import { loans, locations, telHref } from '../data/site.mjs';

// The live site's line, 'Empowering Your Dreams with Tailored Loan Solutions.', keeps
// its own words and names the first and last loan on the branch's list.
const RANGE_NAMES = { 'home-loans': 'home loans', 'overdraft-loans': 'overdraft loans', 'personal-loans': 'personal loans' };

export default function services(route) {
  const page = route.path;
  const loc = locations[route.loc];
  const to = (p) => rel(page, `${loc.slug}/${p}`);
  const first = RANGE_NAMES[loc.loans[0]];
  const last = RANGE_NAMES[loc.loans.at(-1)];

  const head = pageHead(page, {
    crumbs: [[loc.name, `${loc.slug}/`], ['Services']],
    title: 'Our services',
    lead: `Tailored loan solutions, from ${first} to ${last}.`,
  });

  const grid = html`
<section class="services-loans" aria-labelledby="loans-title">
  <div class="container">
    <h2 id="loans-title" class="visually-hidden">Loans in ${loc.name}</h2>
    <ul class="services-grid">
      ${loc.loans.map((slug) => html`
      <li>
        <a class="services-card" href="${to(`services/${slug}/`)}">
          <span class="photo services-card__photo">${img(page, loans[slug].image, '', 'loading="lazy"')}</span>
          <h3 class="services-card__name">${loans[slug].name}</h3>
          <span class="services-card__line">${loans[slug].short}</span>
        </a>
      </li>`)}
    </ul>
  </div>
</section>`;

  const quote = html`
<section class="band section--s services-quote" aria-labelledby="quote-title">
  <div class="container services-quote__grid">
    <h2 id="quote-title">Ask for a personalized quote</h2>
    <div class="services-quote__side">
      <p class="lead">Fill out the form with your loan requirements, and one of our team members will get back to you with a personalized quote as soon as possible.</p>
      <div class="actions">
        <a class="btn btn--primary" href="${to('contact/')}">Request a quote</a>
        <a class="link" href="${telHref(loc.phone)}">Call ${loc.phone}</a>
      </div>
    </div>
  </div>
</section>`;

  return {
    title: `Our loan services | Nalluri Associates ${loc.name}`,
    // The live description names business and personal loans; Hyderabad does not offer them.
    description: `Nalluri Associates offers a variety of loan solutions including ${loc.loans.includes('personal-loans') ? 'home, business, personal loans' : 'home, LRD, mortgage loans'}, and more. Find the best financing option with expert advice, tailored to your needs.`,
    body: html`${head}${grid}${quote}`,
  };
}
