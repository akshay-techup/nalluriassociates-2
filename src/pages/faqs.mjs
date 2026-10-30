// FAQs (both branches, same content): Banner head, the ten questions as Rows
// (a sticky head block on columns 1 to 4 beside a <details> accordion on 5 to
// 12, no script), then an ink band that sends the visitor to the branch's
// Contact page and phone.
import { html, rel } from '../lib/html.mjs';
import { pageHead } from '../lib/blocks.mjs';
import { locations, telHref } from '../data/site.mjs';

// The live page's questions and answers, in its order and in its words.
const FAQS = [
  ['Am I eligible for PMAY?', 'If you are buying the first house for the family and your annual income is less than 18 lakhs, then you will be eligible.'],
  ['What is the Rate of Interest?', 'Rate of interest depends on the bank that offers the loan.'],
  ['What are your charges?', 'We charge zero from the customer; the customer will pay everything to the bank.'],
  ['How many days will it take for processing?', 'It will take 7 working days, but if the project is huge, it may take more time.'],
  ['What is my eligibility for a loan based on my income?', 'Based on your finances, we will calculate your eligibility.'],
  ['What percentage of the loan will I get from the loan amount?', 'You can get 75% to 90% of the loan amount, depending on the loan.'],
  ['What are the required documents?', 'A list of required documents will be mailed to your ID.'],
  ['Do I get tax benefits on the loan?', 'Yes, as per government norms.'],
  ['Can I jointly apply with my spouse?', 'Yes, you need to submit documents for both applicants.'],
  ['If I apply under my wife’s name, will I get a loan at a lower interest rate?', 'This depends on the bank’s policies.'],
];

export default function faqs(route) {
  const page = route.path;
  const loc = locations[route.loc];

  const head = pageHead(page, {
    crumbs: [[loc.name, `${loc.slug}/`], ['FAQs']],
    title: 'Frequently asked questions about loans',
    lead: 'General information, from PMAY eligibility to the documents a loan needs.',
  });

  const rows = html`
<section class="section section--flush-top faq" aria-labelledby="faq-title">
  <div class="container faq__inner">
    <div class="faq__head">
      <h2 id="faq-title">Ten answers before you apply</h2>
    </div>
    <div class="faq__list">
      ${FAQS.map(([q, a], i) => html`
      <details class="faq__item"${i === 0 ? html` open` : ''}>
        <summary class="faq__q"><span class="faq__text">${q}</span><span class="faq__mark" aria-hidden="true"></span></summary>
        <p class="faq__a">${a}</p>
      </details>`)}
    </div>
  </div>
</section>`;

  const close = html`
<section class="band band--ink section--s faq-close" aria-labelledby="ask-title">
  <div class="container">
    <div class="head-block head-block--split faq-close__block">
      <h2 id="ask-title">Ask the ${loc.name} branch</h2>
      <div class="faq-close__side">
        <p class="lead">Just submit your contact details and we’ll be in touch shortly.</p>
        <div class="actions">
          <a class="btn btn--primary" href="${rel(page, `${loc.slug}/contact/`)}">Send your details</a>
          <a class="link" href="${telHref(loc.phone)}">Call ${loc.phone}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

  return {
    title: `FAQs | Nalluri Associates, ${loc.name}`,
    description: 'Find answers to frequently asked questions about home, business, personal loans, and more. Learn how Nalluri Associates can help you with expert advice and seamless loan processes.',
    body: html`${head}${rows}${close}`,
  };
}
