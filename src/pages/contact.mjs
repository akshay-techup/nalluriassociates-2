// Contact: the Banner head; the offices, phone and email as ruled rows beside
// the map; then the enquiry form on a band. The live form has no handler and
// sends nothing, so this one says what it does: with no endpoint it opens the
// visitor's email app with the message addressed to the branch, and with an
// endpoint it posts FormData and reports what the server answered.
import { html, raw } from '../lib/html.mjs';
import { pageHead } from '../lib/blocks.mjs';
import { locations, telHref } from '../data/site.mjs';

// Where the form posts. Empty until the branch has a form endpoint.
const ENDPOINT = '';

export default function contact(route) {
  const page = route.path;
  const loc = locations[route.loc];
  const mapCity = loc.offices[0].city;

  const reach = html`
<section class="section contact-reach" aria-label="Offices, phone and email">
  <div class="container contact-reach__inner">
    <dl class="ruled contact-rows">
      ${loc.offices.map((o) => html`
      <div class="contact-row">
        <dt class="contact-row__head">${o.city}</dt>
        <dd class="contact-row__body"><address>${o.address}</address></dd>
      </div>`)}
      <div class="contact-row">
        <dt class="contact-row__head">Call Us</dt>
        <dd class="contact-row__body"><a class="link contact-row__big" href="${telHref(loc.phone)}">${loc.phone}</a></dd>
      </div>
      <div class="contact-row">
        <dt class="contact-row__head">Email Us</dt>
        <dd class="contact-row__body"><a class="link contact-row__big" href="mailto:${loc.email}">${loc.email}</a></dd>
      </div>
    </dl>
    <div class="contact-map">
      <iframe src="${loc.map}" title="Google map of the Nalluri Associates office in ${mapCity}" width="800" height="600" style="border:0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>`;

  const field = ({ id, label, type = 'text', autocomplete, required = false, textarea = false }) => html`
      <div class="field">
        <label class="field__label" for="${id}">${label}${required ? html` <span class="field__req">required</span>` : ''}</label>
        ${textarea
          ? html`<textarea class="field__input" id="${id}" name="${id}" rows="5" aria-describedby="${id}-help"></textarea>`
          : html`<input class="field__input" type="${type}" id="${id}" name="${id}"${autocomplete ? raw(` autocomplete="${autocomplete}"`) : ''}${required ? raw(' required aria-required="true"') : ''} aria-describedby="${id}-help">`}
        <p class="field__help" id="${id}-help"></p>
      </div>`;

  const form = html`
<section class="band section contact-form" aria-labelledby="form-title">
  <div class="container contact-form__inner">
    <div class="contact-form__text">
      <h2 id="form-title">Contact us</h2>
      <p class="lead">If you’re looking to get a home loan, business loan, personal loan, or need expert financial advice, we’re here to help.</p>
      <p>Fill out the form with your loan requirements, and one of our team members will get back to you with a personalized quote as soon as possible.</p>
    </div>
    <form class="enquiry" action="mailto:${loc.email}" method="post" enctype="text/plain" data-endpoint="${ENDPOINT}" data-email="${loc.email}" data-phone="${loc.phone}" data-branch="${loc.name}">
      ${field({ id: 'name', label: 'Name', autocomplete: 'name', required: true })}
      ${field({ id: 'email', label: 'Email', type: 'email', autocomplete: 'email', required: true })}
      ${field({ id: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' })}
      ${field({ id: 'message', label: 'Message', textarea: true })}
      <div class="enquiry__actions">
        <button class="btn btn--primary enquiry__submit" type="submit">Submit</button>
        ${ENDPOINT ? '' : html`<p class="enquiry__note">Submit opens your email app with the message addressed to <a class="link" href="mailto:${loc.email}">${loc.email}</a>.</p>`}
      </div>
      <p class="enquiry__status" id="enquiry-status" role="status"></p>
    </form>
  </div>
</section>`;

  const scripts = html`<script>
(function () {
  var form = document.querySelector('form.enquiry');
  if (!form) return;
  form.noValidate = true;
  var status = form.querySelector('.enquiry__status');
  var submit = form.querySelector('.enquiry__submit');
  var fields = Array.prototype.slice.call(form.querySelectorAll('.field__input'));
  var touched = {};

  function message(input) {
    var v = input.validity;
    if (v.valid) return '';
    if (input.name === 'name') return 'Enter your name, so the team knows who is writing.';
    if (input.name === 'email') {
      if (v.valueMissing) return 'Enter your email address, so the team can reply.';
      return 'That email address looks incomplete. Write it as name@example.com.';
    }
    return input.validationMessage;
  }

  function check(input) {
    var text = message(input);
    var help = document.getElementById(input.id + '-help');
    if (text) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    help.textContent = text;
    return !text;
  }

  fields.forEach(function (input) {
    input.addEventListener('input', function () {
      if (touched[input.name]) check(input);
      if (status.textContent) status.textContent = '';
    });
    input.addEventListener('blur', function () {
      if (input.value.trim() !== '' || touched[input.name]) { touched[input.name] = true; check(input); }
    });
  });

  function value(name) { return form.elements[name].value.trim(); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    fields.forEach(function (input) {
      if (input.name === 'name' || input.name === 'email') input.value = input.value.trim();
      touched[input.name] = true;
      if (!check(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) { status.textContent = ''; firstInvalid.focus(); return; }

    var to = form.dataset.email, phone = form.dataset.phone;
    if (!form.dataset.endpoint) {
      var nl = '\\r\\n';
      var subject = 'Enquiry from ' + value('name');
      var body = 'Name: ' + value('name') + nl + 'Email: ' + value('email') + nl + 'Phone: ' + (value('phone') || 'not given') + nl + nl + value('message');
      var link = document.createElement('a');
      link.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      link.hidden = true;
      form.appendChild(link);
      link.click();
      link.remove();
      status.textContent = 'Nothing has been sent yet. Your email app should open with your message addressed to ' + to + '; send it from there. If it does not open, call ' + phone + '.';
      return;
    }

    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message.';
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
      .then(function (r) {
        status.textContent = r.ok
          ? 'Sent. The ' + form.dataset.branch + ' team will reply to ' + value('email') + '.'
          : 'That did not go through, so nothing was sent. Try again in a minute, or call ' + phone + '.';
      })
      .catch(function () { status.textContent = 'That did not go through, so nothing was sent. Try again in a minute, or call ' + phone + '.'; })
      .then(function () { submit.disabled = false; submit.removeAttribute('aria-busy'); });
  });
})();
</script>`;

  return {
    title: `Contact | Nalluri Associates, ${loc.name}`,
    description: `Contact Nalluri Associates’ ${loc.name} branch: ${loc.offices.map((o) => o.city).join(' and ')} office${loc.offices.length > 1 ? 's' : ''}, call ${loc.phone} or email ${loc.email}.`,
    body: html`
${pageHead(page, {
    crumbs: [[loc.name, `${loc.slug}/`], ['Contact']],
    title: 'Contact',
    lead: 'Nalluri Associates is your trusted partner in securing personalized loan solutions.',
  })}
${reach}
${form}`,
    scripts,
  };
}
