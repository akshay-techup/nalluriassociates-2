// About (both branches, same content): Banner head, the story beside the Pearl
// Blue award photo, the eighteen lenders, the four figures, vision and mission
// as rows, and the four steps as a real list with the page's one action.
import { html, rel, img } from '../lib/html.mjs';
import { pageHead } from '../lib/blocks.mjs';
import { locations } from '../data/site.mjs';

// The lenders the About page names, in its order.
const LENDERS = ['LIC Housing', 'Kotak Bank', 'HDFC Ltd', 'SBI', 'IDBI', 'HDFC Bank', 'Tata Capital', 'Yes Bank', 'PNB Housing', 'Union Bank of India', 'Bank of Maharashtra', 'Karur Vysya Bank', 'DCB', 'IDFC First', 'Aditya Birla', 'Fullerton', 'Magma', 'IndusInd Bank'];

// The client's own figures, exactly as the live page states them.
const FIGURES = [
  ['20', 'Years of experience'],
  ['10000+', 'Happy customers'],
  ['50+', 'Awards won'],
  ['100%', 'Customers satisfied'],
];

const AIMS = [
  ['Vision', 'Enable to realise your dreams of owning a home.'],
  ['Mission', 'Switching complex processing into simplified processing.'],
  ['Value', 'We are dedicated to delivering top-notch service.'],
];

const STEPS = [
  ['We understand', 'We find a budget-friendly product to cater to your needs.'],
  ['We search', 'We search through all lenders and find the best loan offers that are customized to fit your needs.'],
  ['We recommend', 'We recommend you the best suitable financing option with complete market analysis for better decision.'],
  ['We deliver', 'Delivering the timely & user-friendly services is one of our major USPs.'],
];

export default function about(route) {
  const page = route.path;
  const loc = locations[route.loc];

  const head = pageHead(page, {
    crumbs: [[loc.name, `${loc.slug}/`], ['About']],
    title: 'The Nalluri brothers, since 2008',
    lead: 'A one stop solution for all your housing loan needs.',
  });

  const story = html`
<section class="section about-story" aria-labelledby="story-title">
  <div class="container about-story__grid">
    <div class="about-story__text">
      <h2 id="story-title">Housing loans are long-term commitments</h2>
      <p>Nalluri Associates is the brainchild of the Nalluri brothers, initiated in the year 2008, with a vision to realize the dreams of people to have their dream abode. The company comprises both the Nalluri Brothers, Babji Nalluri &amp; Nagarjuna Nalluri.</p>
      <p>The company worked towards a hassle-free lending process, since a loan, especially a housing loan, is a long-term commitment, choosing a good finance company is essential. The company always focused on expert advice, quality of service, commitment, transparency right through the lending procedures, and legal verification with our vast domain knowledge.</p>
    </div>
    <figure class="about-story__figure">
      <div class="photo about-story__photo">${img(page, 'images/media/about.dd2dc9b4.jpg', 'Babji Nalluri and Javagal Srinath on stage, holding a framed Pearl Blue certificate of excellence between them', 'loading="lazy"')}</div>
      <figcaption class="caption">Babji Nalluri receives the Pearl Blue Award for Best Emerging Financial Consultant in AP from former cricketer Javagal Srinath.</figcaption>
    </figure>
  </div>
</section>`;

  const lenders = html`
<section class="section section--flush-top about-lenders" aria-labelledby="lenders-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="lenders-title">Eighteen lenders we work through</h2>
      <p class="lead">We provide solutions for loans and investments through each of them.</p>
    </div>
    <ul class="ruled about-lenders__list">
      ${LENDERS.map((name) => html`<li>${name}</li>`)}
    </ul>
  </div>
</section>`;

  const figures = html`
<section class="band section about-figures" aria-labelledby="figures-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="figures-title">Incredible Nalluri Associates</h2>
      <p class="lead">“At Nalluri Associates, we simplify the home loan process, offering tailored solutions to help you secure your dream home with ease. Our expert team is dedicated to guiding you every step of the way.”</p>
    </div>
    <ul class="about-figures__list">
      ${FIGURES.map(([value, label]) => html`
      <li><b class="figure">${value}</b> <span>${label}</span></li>`)}
    </ul>
  </div>
</section>`;

  const aims = html`
<section class="section about-aims" aria-labelledby="aims-title">
  <div class="container about-aims__grid">
    <div class="about-aims__head">
      <h2 id="aims-title">Our vision &amp; mission</h2>
      <p class="lead">“Our vision is to make homeownership accessible for everyone by offering transparent, flexible, and customer-centric home loan solutions that help individuals to achieve their dream of owning a home.”</p>
    </div>
    <dl class="ruled about-aims__rows">
      ${AIMS.map(([title, line]) => html`
      <div>
        <dt>${title}</dt>
        <dd>${line}</dd>
      </div>`)}
    </dl>
  </div>
</section>`;

  const steps = html`
<section class="section section--flush-top about-steps" aria-labelledby="steps-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="steps-title">Why choose us?</h2>
      <p class="lead">“Trust in our expertise and commitment to making home ownership simple and stress-free.”</p>
    </div>
    <ol class="about-steps__list">
      ${STEPS.map(([title, line]) => html`
      <li>
        <h3>${title}</h3>
        <p>${line}</p>
      </li>`)}
    </ol>
    <div class="actions about-steps__actions">
      <a class="btn btn--primary" href="${rel(page, `${loc.slug}/contact/`)}">Contact the ${loc.name} branch</a>
    </div>
  </div>
</section>`;

  return {
    title: 'About Nalluri Associates - Trusted Loan Experts with 20+ Years of Experience',
    description: 'Learn about Nalluri Associates, a trusted name in loan solutions since 2008. We specialize in home, business, and personal loans with a commitment to transparency, expert advice, and seamless service.',
    body: html`${head}${story}${lenders}${figures}${aims}${steps}`,
  };
}
