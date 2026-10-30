// Achievements (both branches, same content): Banner head, the sixteen
// achievements as an Index (year, the client's line, lender), then three of the
// framed awards from the shelf as a Grid on a paper band.
import { html, rel, img } from '../lib/html.mjs';
import { pageHead } from '../lib/blocks.mjs';
import { locations } from '../data/site.mjs';

// The live page's list, in its order and in its words ("postion" corrected to
// "position"; closing full stops dropped, as on every list in the site). `year`
// and `lender` repeat what the line itself says, so the record scans by column.
const RECORD = [
  { year: '2023-24', lender: 'LIC Housing', text: 'Top 1 pan India position in LIC housing for 2023-24' },
  { year: '2022-23', lender: 'LIC Housing', text: 'Top 1 pan India position in LIC housing for 2022-23' },
  { year: '2021-22', lender: 'LIC Housing', text: 'Top 1 pan India position in LIC housing for 2021-22' },
  { year: '2020-21', lender: 'LIC Housing', text: 'Top 1 pan India position in LIC housing for 2020-21' },
  { year: '', lender: 'Pearl Blue', text: 'Pearl Blue Award for Best Emerging Financial Consultant in AP. Received by Babji Nalluri from former cricketer Javagal Srinath' },
  { year: '2012-13', lender: 'LIC Housing', text: 'LIC HFL Griharatna Award winner 2012-13' },
  { year: 'Since 2011', lender: 'HDFC Ltd', text: 'Being the HDFC LTD platinum channel partner since 2011' },
  { year: 'Since 2011', lender: 'Reliance', text: 'Being the Reliance Maestro Club member since 2011' },
  { year: '2003', lender: 'ICICI Bank', text: 'Raised from 50L disbursement to 1 Crore disbursement per month in ICICI Bank Car Loans within a quarter in 2003' },
  { year: '2011', lender: 'HDFC Ltd', text: 'Achieved HDFC LTD Sterling Performer award in the year 2011' },
  { year: '2010', lender: 'IDBI Bank', text: 'Achieved IDBI Bank Home Loans best retailer award in South Zone in the year 2010' },
  { year: '2007', lender: 'ICICI Bank', text: 'Achieved five High Rise awards from ICICI Bank Home Loans in the year 2007' },
  { year: '2006', lender: 'ICICI Bank', text: 'Awarded as ICICI Bank Home Loans Rising Star for platinum tier in March 2006 (only firm in A.P)' },
  { year: '2005', lender: 'ICICI Bank', text: 'Awarded as ICICI Bank Home Loans Rising Star for platinum tier in March 2005 (only firm in A.P)' },
  { year: '', lender: 'ICICI Home Finance', text: 'Raised to Aim for the Sky level in ICICI Home Finance within a quarter' },
  { year: '2004', lender: 'ICICI Bank', text: 'Raised from 1 Crore disbursement to 4 Crores disbursement per month in ICICI Bank Home Loans within a span of 6 months in 2004' },
];

// The client's own photographs of the award shelf. Captions state only what the
// frame itself legibly says.
const SHELF = [
  {
    src: 'images/gallery/IMG-20241209-WA0033.jpg',
    title: 'Pearl Blue',
    alt: 'A framed Pearl Blue certificate of excellence made out to Nalluri Associates, standing on a shelf',
    caption: 'Certificate of excellence: Best Emerging Financial Consultants in Andhra Pradesh.',
    position: '50% 62%',
  },
  {
    src: 'images/gallery/IMG-20241209-WA0023.jpg',
    title: 'LIC HFL Griha Ratna',
    alt: 'A gold LIC HFL plaque on a dark wooden stand, conferring the Griha Ratna',
    caption: 'The Griha Ratna plaque for the financial year 2012-13.',
    position: '50% 66%',
  },
  {
    src: 'images/gallery/IMG-20241209-WA0028.jpg',
    title: 'IDBI Bank',
    alt: 'A framed IDBI Bank certificate of achievement, star performer, standing on a shelf',
    caption: 'Star performer certificate, Real Retail Contest, August 2010.',
    position: '50% 56%',
  },
];

export default function achievements(route) {
  const page = route.path;
  const loc = locations[route.loc];

  const head = pageHead(page, {
    crumbs: [[loc.name, `${loc.slug}/`], ['Achievements']],
    title: 'Nalluri achievements',
    lead: 'Over 20 years as a trusted partner in the home loan industry.',
  });

  const record = html`
<section class="section section--flush-top ach-record" aria-labelledby="record-title">
  <div class="container">
    <div class="head-block head-block--split">
      <h2 id="record-title">Sixteen milestones since 2003</h2>
      <p class="lead">Each one reflects our dedication to helping clients own a home.</p>
    </div>
    <table class="ach-index">
      <caption class="visually-hidden">Nalluri Associates achievements, as listed on the live site</caption>
      <thead>
        <tr><th scope="col" class="ach-index__year">Year</th><th scope="col">Achievement</th><th scope="col" class="ach-index__lender">Lender or award</th></tr>
      </thead>
      <tbody>
        ${RECORD.map((r) => html`
        <tr>
          <td class="ach-index__year">${r.year.split(' ').map((w, i) => html`${i ? ' ' : ''}<span>${w}</span>`)}</td>
          <td class="ach-index__text">${r.text}</td>
          <td class="ach-index__lender">${r.lender}</td>
        </tr>`)}
      </tbody>
    </table>
  </div>
</section>`;

  const shelf = html`
<section class="band section ach-shelf" aria-labelledby="shelf-title">
  <div class="container">
    <div class="head-block ach-shelf__head">
      <h2 id="shelf-title">Three of them, framed</h2>
      <p class="lead">Our awards and recognitions highlight the hard work behind our home loan services.</p>
    </div>
    <ul class="ach-shelf__grid">
      ${SHELF.map((s) => html`
      <li>
        <figure class="ach-shelf__item">
          <div class="photo ach-shelf__photo">${img(page, s.src, s.alt, `loading="lazy" style="object-position: ${s.position}"`)}</div>
          <figcaption>
            <h3 class="ach-shelf__title">${s.title}</h3>
            <p class="caption">${s.caption}</p>
          </figcaption>
        </figure>
      </li>`)}
    </ul>
    <p class="ach-shelf__more"><a class="link" href="${rel(page, `${loc.slug}/gallery/`)}">See the gallery</a></p>
  </div>
</section>`;

  return {
    title: `Achievements | Nalluri Associates, ${loc.name}`,
    description: 'Discover the milestones and achievements of Nalluri Associates in delivering customized loan solutions with transparency, expertise, and commitment. Over 20 years of success in the finance industry.',
    body: html`${head}${record}${shelf}`,
  };
}
