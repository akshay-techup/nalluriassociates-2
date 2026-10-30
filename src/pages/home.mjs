// A branch home: Ledge hero (the office photograph above, the head at its base),
// the loans as a ruled list, the LIC Housing record, the lenders, then the callback
// close with contact details per office.
import { html, rel, img } from '../lib/html.mjs';
import { offices, lenderLogos } from '../lib/blocks.mjs';
import { loans, locations, telHref } from '../data/site.mjs';

// How each loan reads inside a sentence.
const LIST_NAMES = { 'home-loans': 'Home', 'lrd-loans': 'LRD', 'mortgage-loans': 'mortgage', 'commercial-loans': 'commercial', 'site-loans': 'site', 'overdraft-loans': 'overdraft', 'business-loans': 'business', 'car-loans': 'car', 'personal-loans': 'personal' };

const LIC_YEARS = ['2020-21', '2021-22', '2022-23', '2023-24'];

// The lenders named on the About page, in its order.
const LENDER_NAMES = 'LIC Housing, Kotak Bank, HDFC Ltd, SBI, IDBI, HDFC Bank, Tata Capital, Yes Bank, PNB Housing, Union Bank of India, Bank of Maharashtra, Karur Vysya Bank, DCB, IDFC First, Aditya Birla, Fullerton, Magma and IndusInd Bank';

export default function home(route) {
  const page = route.path;
  const loc = locations[route.loc];
  const to = (p) => rel(page, `${loc.slug}/${p}`);
  const names = loc.loans.map((s) => LIST_NAMES[s]);
  const loanList = names.slice(0, -1).join(', ') + ' and ' + names.at(-1);

  const hero = html`
<section class="ledge" aria-labelledby="hero-title">
  <div class="container ledge__inner">
    <figure class="ledge__figure">
      <div class="photo ledge__photo">${img(page, loc.hero.image, loc.hero.alt, `fetchpriority="high" style="object-position: ${loc.hero.position}"`)}</div>
      <figcaption class="caption ledge__caption">${loc.hero.caption}</figcaption>
    </figure>
    <div class="ledge__text">
      <h1 id="hero-title">One stop solution for home loans</h1>
      <div class="ledge__side">
        <p class="lead">20+ years of trusted loan expertise: home, business, personal and more.</p>
        <div class="actions">
          <a class="btn btn--primary" href="${to('contact/')}">Contact us</a>
          <a class="link" href="${telHref(loc.phone)}">Call ${loc.phone}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const services = html`
<section class="section home-loans" aria-labelledby="services-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="services-title">Our services</h2>
      <p class="lead">${loanList} loans.</p>
    </div>
    <ul class="ruled loan-rows">
      ${loc.loans.map((slug) => html`
      <li>
        <a class="loan-row" href="${to(`services/${slug}/`)}">
          <span class="photo loan-row__photo">${img(page, loans[slug].image, '', 'loading="lazy"')}</span>
          <h3 class="loan-row__name">${loans[slug].name}</h3>
          <span class="loan-row__line">${loans[slug].short}</span>
          <span class="loan-row__more">Read more</span>
        </a>
      </li>`)}
    </ul>
  </div>
</section>`;

  const record = html`
<section class="section section--flush-top home-record" aria-labelledby="record-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="record-title">Top 1 pan India in LIC Housing</h2>
      <p class="lead">Four years in a row, from 2020-21 to 2023-24. <a class="link" href="${to('achievements/')}">See every award</a></p>
    </div>
    <figure class="photo home-record__photo">
      ${img(page, 'images/media/p25.1894a450.jpg', 'Trophies, plaques and framed certificates on the Nalluri Associates award shelf', 'loading="lazy"')}
    </figure>
    <ol class="home-record__years">
      ${LIC_YEARS.map((y) => html`<li><span class="home-record__year">${y}</span><span class="muted">Top 1 pan India position in LIC housing</span></li>`)}
    </ol>
  </div>
</section>`;

  const lenders = html`
<section class="band section--s home-lenders" aria-labelledby="lenders-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="lenders-title">The lenders behind your loan</h2>
      <p class="lead">Loans and investments through ${LENDER_NAMES}.</p>
    </div>
    ${lenderLogos(page)}
  </div>
</section>`;

  const close = html`
<section class="band band--ink section home-close" aria-labelledby="callback-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="callback-title">Request a callback.</h2>
      <div>
        <p class="lead">Would you like to speak to one of our financial advisers? Just submit your contact details and we’ll be in touch shortly. You can also email us if you prefer that type of communication.</p>
        <div class="actions home-close__actions"><a class="btn" href="${to('contact/')}">Send your details</a></div>
      </div>
    </div>
    ${offices(loc.slug)}
  </div>
</section>`;

  return {
    title: loc.title,
    description: loc.description,
    body: html`${hero}${services}${record}${lenders}${close}`,
  };
}
