# Nalluri Associates

The website of Nalluri Associates, home-loan consultants with branches in Hyderabad (Miyapur) and Andhra Pradesh (Vijayawada and Guntur). It rebuilds https://nalluriassociates.com/ page for page: the same content, photographs and logo, with a new design.

## Build

Node 18 or newer. No dependencies.

```sh
npm run build   # renders every page into www/
npm run serve   # serves www/ on http://localhost:4173/
npm run dev     # both
```

Deploy the contents of `www/` to any static host. On Vercel, `vercel.json` sets the build command and the `www` output folder. Every link is relative, so the site works from a sub-folder too. `www/404.html` is the not-found page; point the host's error page at it.

## Layout

- `src/routes.mjs`: every page. The root chooser, then for each branch its home, About, Achievements, Services, Gallery, FAQs, Contact and one page per loan.
- `src/pages/<name>.mjs`: one module per page type, returning `{ title, description, body, scripts? }`.
- `src/layout.mjs`: the head, the navigation and the footer.
- `src/data/`: the facts. `site.mjs` holds the branches, phones, emails, offices and loans; `loan-pages.mjs` the loan page text; `gallery.mjs` the photo sets.
- `src/styles/`: `tokens.css` (colour, type, spacing), `components.css` (shared), `pages/<name>.css` (one per page). The build bundles them into `www/assets/site.css`.
- `public/`: images and the favicon, copied as they are.
- `design.md`: the design system. Read it before changing a page.

## The contact form

The old site's form sent nothing. This one validates the fields, then opens the visitor's email app with the message addressed to the branch. To receive submissions directly, set `data-endpoint` on the form in `src/pages/contact.mjs` to a form-handling URL; the script then posts the fields there and reports success or failure.
