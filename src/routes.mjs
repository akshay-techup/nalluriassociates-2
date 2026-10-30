// Every page on the site. `page` names the module in src/pages/ that renders it.
import { locations, sections } from './data/site.mjs';

export const routes = [{ path: '', page: 'root' }];

for (const loc of Object.values(locations)) {
  routes.push({ path: `${loc.slug}/`, page: 'home', loc: loc.slug, key: 'home' });
  for (const s of sections) routes.push({ path: `${loc.slug}/${s.slug}/`, page: s.slug, loc: loc.slug, key: s.slug });
  for (const loan of loc.loans) routes.push({ path: `${loc.slug}/services/${loan}/`, page: 'loan', loc: loc.slug, key: 'services', loan });
}
