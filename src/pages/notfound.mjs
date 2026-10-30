// 404: served at any depth, so the layout sets <base href="/"> and every link resolves from the root.
import { html, rel } from '../lib/html.mjs';
import { locations } from '../data/site.mjs';
import { pageHead } from '../lib/blocks.mjs';

export default (route) => {
  const page = route.path;
  return {
    title: 'Page not found | Nalluri Associates',
    description: 'This page does not exist. Choose the Hyderabad or Andhra Pradesh branch.',
    base: '/',
    noindex: true,
    body: html`
${pageHead(page, { title: 'This page does not exist', lead: 'The address may have changed. Choose a branch to carry on.' })}
<section class="section section--flush-top">
  <div class="container">
    <ul class="notfound ruled">${Object.values(locations).map((l) => html`
      <li><a class="notfound__link" href="${rel(page, `${l.slug}/`)}">${l.name}</a></li>`)}
    </ul>
  </div>
</section>`,
  };
};
