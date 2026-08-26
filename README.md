# Back Country Land Trust website

This repository contains the public, static website for Back Country Land Trust. It is designed to be simple to maintain: HTML pages, one shared stylesheet, one small JavaScript file, and GitHub Pages hosting.

> Do not put private land-management information, donor data, Google Form responses, sensitive species locations, gate codes, or other confidential material in this public repository.

## What is in this repository

```text
index.html                 Home page, including Alpine weather
about/index.html           Mission, history, partnerships
what-we-do/index.html      Programs and projects
get-involved/index.html    Volunteer information and Google Form link
donate/index.html          External donation-provider link
events/index.html          Upcoming event cards and registration links
news/index.html            Simple announcements page
contact/index.html         Contact information and Google Form link
assets/css/site.css        Shared visual design and responsive layout
assets/js/site.js          Mobile menu and weather forecast code
assets/images/             Logo and approved site photography
CNAME                      Production custom domain
```

## Routine editing

### Change page text

1. In GitHub, open the desired file, such as `about/index.html`.
2. Select the pencil icon to edit.
3. Change only the text between HTML tags. For example, change the wording between `<p>` and `</p>`.
4. Use **Preview** if it is available.
5. Enter a short commit message such as `Update volunteer workday details`.
6. Select **Commit changes**.

GitHub Pages normally republishes changes after its build cycle. Check the live site after every substantive update.

### Add an event

1. Open `events/index.html`.
2. Copy the complete upcoming-event `<article class="event-card"> ... </article>` block.
3. Paste it before the existing card or replace the existing card.
4. Update the title, date/time, location, preparation details, and Google Form URL.
5. Remove old events or move a short recap to `news/index.html`.

### Add a news item

1. Open `news/index.html`.
2. Copy one existing announcement `<article>` block.
3. Add the newest update first.
4. Use a real publication date, a concise title, and one short paragraph.
5. Link to a page, PDF, event, or form only if the destination has been checked.

### Update contact details

Search the repository for the current email address, phone number, or mailing address. Update every matching instance so the footer and contact page remain consistent.

## Google Forms

GitHub Pages is static hosting. Google Forms handles contact, volunteer, event-registration, and newsletter-interest submissions without needing a server.

Create forms while signed in to the organization-controlled `backcountrylandtrust@gmail.com` Google account. Recommended forms:

- General contact form: name, email, phone optional, topic, message, permission to reply.
- Volunteer interest form: name, email, availability, interest area, experience optional, permission to reply.
- Event registration form: event name, attendee name, email, number attending, any requested waiver/acknowledgment fields reviewed by the organization.
- Newsletter interest form: email, consent to receive updates, optional topic interest.

After publishing each form, use its public **Send** link and replace the placeholders throughout the site:

```text
https://forms.gle/REPLACE-WITH-CONTACT-FORM
https://forms.gle/REPLACE-WITH-VOLUNTEER-FORM
https://forms.gle/REPLACE-WITH-EVENT-REGISTRATION
https://forms.gle/REPLACE-WITH-NEWSLETTER-FORM
```

Keep form responses in the organization’s Google account. Do not publish response spreadsheets in this repository.

## Donations

The Donate page links out to a payment provider. Before launch, replace:

```text
https://REPLACE-WITH-APPROVED-DONATION-PAGE.example
```

with the organization’s verified donation page. Use an established provider or fiscal sponsor. Never add payment-card fields, bank-account fields, or donation-processing code to this static site.

## Images and logo

Read `assets/images/README.md` before uploading images. Only use material that Back Country Land Trust owns or is licensed to publish. Do not use Wix screenshots as production artwork; Wix branding, page text, and low-resolution visual content are embedded in them.

Use meaningful alternative text for content images. Avoid putting essential text into images.

## Alpine weather module

The home page fetches current conditions and a seven-day forecast using Open-Meteo in `assets/js/site.js`.

- The location is set to Alpine, California using latitude `32.8351` and longitude `-116.7664`.
- The code requests Fahrenheit, mph wind, current weather, daily highs/lows, weather conditions, and precipitation probability.
- If the service cannot be reached, the site shows a link to the National Weather Service forecast for Alpine.
- Weather must be treated as informational. Visitors should check official forecasts and current field conditions before visiting.

To update the location, change `latitude` and `longitude` in `assets/js/site.js`. Do not add an API key to this public repository.

## Preview locally

For a quick check, open `index.html` in a browser. For more reliable behavior, especially for relative links and JavaScript, run a small local web server from the repository folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Stop the server with `Ctrl+C`.

## GitHub Pages publishing

1. In the GitHub repository, go to **Settings** → **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the `main` branch and the `/ (root)` folder.
4. Save the setting.
5. GitHub will show the temporary GitHub Pages address after deployment.

Before pointing the public domain at the site, review the temporary Pages site on desktop and mobile. Confirm navigation, form links, text, images, weather, and donation link.

## GoDaddy domain handoff

The production domain is `backcountrylandtrust.org`.

1. In GitHub repository **Settings** → **Pages**, enter `backcountrylandtrust.org` under **Custom domain** and save.
2. In GoDaddy DNS management, add the DNS records GitHub Pages requests for the apex domain and the `www` subdomain. GitHub’s domain setup screen is the source of truth for the current record values.
3. Avoid leaving conflicting old Wix records in place. Do not remove unrelated email records such as MX, SPF, or DKIM records used by the organization’s email service.
4. Wait for GitHub domain verification and certificate provisioning.
5. Turn on **Enforce HTTPS** in GitHub Pages once the option becomes available.
6. Test both `https://backcountrylandtrust.org` and `https://www.backcountrylandtrust.org`, then choose one canonical address and redirect the other if GitHub Pages provides that configuration.

The repository includes a `CNAME` file containing `backcountrylandtrust.org`. Keep that file consistent with the custom domain configured in GitHub Pages.

## Accessibility checklist

Before publishing a major change:

- Verify headings are in order: one page `h1`, then `h2` and `h3` sections.
- Ensure links describe their destination; avoid “click here.”
- Provide alternative text for meaningful images.
- Ensure text remains readable over hero images; use an overlay if needed.
- Test keyboard navigation: Tab should visibly reach every menu item, button, and form link.
- Check the page at a narrow mobile width; text should not be clipped or require horizontal scrolling.
- Do not rely on color alone to convey meaning.

## Organization continuity

Maintain at least two organization owners in GitHub and at least two trusted administrators for the domain registrar and Google account. Store account recovery information and the list of services in an organization-controlled, secure location.

When a land manager changes, transfer access before their departure and review: GitHub organization ownership, GoDaddy domain access, Google Forms ownership, donation provider access, email access, and social-media access.

## Pre-launch checklist

- [ ] Add the approved logo and original photography
- [ ] Verify all organization history, acreage, statistics, address, email, and phone claims
- [ ] Replace every Google Form placeholder
- [ ] Replace the donation-provider placeholder
- [ ] Add verified social-media URLs
- [ ] Add actual upcoming events or a no-events message
- [ ] Configure GitHub Pages and review the staging site
- [ ] Configure GoDaddy DNS after staging approval
- [ ] Enable HTTPS
- [ ] Ask a second person to test on desktop, phone, keyboard, and screen reader if possible
