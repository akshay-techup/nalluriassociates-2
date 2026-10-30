// The branch chooser: Index hero (the two branches set large, each with its
// offices, phone and email), then the firm's own words beside the handshake photo.
import { html, rel, img } from '../lib/html.mjs';
import { locations, telHref } from '../data/site.mjs';

// Every address on file opens with the firm's name; the row already says it.
const street = (address) => address.replace(/^Nalluri Associates, /, '');

export default function root(route) {
  const page = route.path;
  const branches = Object.values(locations);

  const hero = html`
<section class="chooser" aria-labelledby="hero-title">
  <div class="container">
    <div class="chooser__head">
      <h1 id="hero-title">Financing solutions in Hyderabad and Andhra Pradesh</h1>
      <p class="lead">Choose the branch nearest you: Hyderabad, Vijayawada or Guntur.</p>
    </div>
    <ul class="ruled chooser__list">
      ${branches.map((loc) => html`
      <li class="chooser__branch">
        <h2 class="chooser__name"><a href="${rel(page, `${loc.slug}/`)}">${loc.name}</a></h2>
        <div class="chooser__offices">
          ${loc.offices.map((o) => html`
          <div class="chooser__office">
            ${o.city !== loc.name ? html`<h3>${o.city}</h3>` : ''}
            <address>${street(o.address)}</address>
          </div>`)}
        </div>
        <p class="chooser__reach"><a class="link" href="${telHref(loc.phone)}">${loc.phone}</a><a class="link" href="mailto:${loc.email}">${loc.email}</a></p>
      </li>`)}
    </ul>
  </div>
</section>`;

  const belief = html`
<section class="section root-belief" aria-label="About Nalluri Associates">
  <div class="container root-belief__grid">
    <blockquote class="root-belief__quote">
      <p>“At Nalluri Associates, we believe that achieving your dreams starts with the right financial support. With over 20 years of industry expertise, we specialize in providing tailored loan solutions for every need, whether it’s a home, business, car, or personal financing.”</p>
    </blockquote>
    <figure class="photo root-belief__photo">
      ${img(page, 'images/media/main.a59eb6b4.jpg', 'Two people shake hands across a desk of printed charts, beside a third holding a tablet', 'loading="lazy"')}
    </figure>
  </div>
</section>`;

  return {
    title: 'Nalluri Associates - Financing Solutions',
    description: 'Discover effortless and elegant financing solutions with Nalluri Associates. Backed by over 20 years of expertise, we offer personalized loan options for homes, businesses, cars, and personal needs to help you achieve your dreams.',
    body: html`${hero}${belief}`,
  };
}
