# UrbanNest Realty — Premium Real Estate Website (Noida)

Static, dependency-free website · 7 pages + privacy · Vercel-ready · built by Nestrovix.

```
urbannest/
├── index.html              Home (12 sections in the brief's order: hero → search → featured → projects → categories → why us → agents → stats → testimonials → consultation CTA → location → footer)
├── properties.html         Listing — search + filters (location, type, price, beds, area, keyword), Buy/Rent toggle, sort, counts, active chips, empty state, URL params, mobile bottom-sheet filters with "Apply"
├── property.html           Property details (?id=…) — gallery + thumbs + lightbox, price (₹ Cr/L), key facts, amenities, floor plan + download, map embed, agent card, enquiry form, similar properties, breadcrumb, mobile sticky Call/WhatsApp/Enquire bar
├── projects.html           New launches — status filter chips, RERA placeholders, enquire/brochure CTAs
├── about.html              Story, timeline, values, team
├── agents.html             6 agent profiles (call / WhatsApp / "view listings")
├── contact.html            Consultation & contact form, info cards, map
├── privacy.html            Privacy policy template (noindex)
├── css/style.css           Design system + all styles (tokens at top)
├── js/config.js            ⚠️ BUSINESS DETAILS — edit this first
├── js/properties-data.js   ⚠️ PROPERTY LISTINGS (22 samples) — edit here
├── js/projects-data.js     ⚠️ NEW PROJECTS (6 samples)
├── js/agents-data.js       ⚠️ AGENTS (6 placeholders)
├── js/main.js              Header, nav, data-binding, reveal, lightbox, card renderers, home search → properties.html, count-up stats
├── js/properties.js        Listing page: filters / sort / URL params / bottom sheet
├── js/property.js          Detail page: renders a listing from ?id=
├── js/forms.js             Enquiry, contact and call-back forms (validation + WhatsApp hand-off)
├── assets/images/          Demo photography from Unsplash (see CREDITS.md) + one hand-drawn floor plan
├── assets/fonts/           Self-hosted Familjen Grotesk + Spectral (woff2)
├── assets/og-image.png     Social share card (1200×630)
├── assets/favicon.svg
├── vercel.json · robots.txt · sitemap.xml
└── _build/                 Page generator, image-spec generator, OG renderer, QA interactions (not deployed; safe to delete)
```

## 1 · Before launch — replace these
| Where | What |
|---|---|
| `js/config.js` | Phone, WhatsApp number (digits with country code, e.g. `919876543210`), email, **office address**, RERA registration no., map embed `q=`, social URLs, final domain |
| `js/properties-data.js` | Real listings: title, type, buy/rent, location/locality, price (number in ₹; rent = per month), area, beds/baths, furnishing, possession, `featured`, 4 image paths, 8 amenities, description, `agentId`, `listed` date, `floorPlan` image and `floorPlanPdf` URL |
| `js/projects-data.js` | Project names, **developer names**, `[RERA no.]`, prices, possession, highlights, images |
| `js/agents-data.js` | Agent names (`[Agent name]`), roles, specialisations, languages, phone + WhatsApp (`91XXXXXXXXXX`), emails, photos |
| `assets/images/**/*.jpg` | Every photo is a free Unsplash demo shot standing in for your own photography — see `CREDITS.md` for the source of each one. Replace them **keeping the same filename** (or update the path in the data file), and rewrite the matching alt text (`imageAlts` in `properties-data.js`, `imageAlt` / `photoAlt` in the project and agent data, the `alt` attribute in the HTML). Sizes in use: home hero 1600×900, page heroes and the CTA band 1600×667, property photos 1000×625 (4 per listing), projects 1000×563, agents 600×750, category tiles 600×375, about 1000×750 and 600×800. Use WebP/JPG ≤ 300 KB. |
| `assets/images/floor-plans/*.svg` | The floor plan is a schematic drawing, not a photo — replace it with the sanctioned plan (1600×1200) and link the PDF via `floorPlanPdf`. |
| `index.html` → **Statistics** (section 8) | `data-count` values (850+ properties, 12 years, 98 %, 40+ partners) are **placeholders** — replace with real, verifiable figures (also in `_build/build.py` if you regenerate), and remove the "placeholders" note. |
| `index.html` → **Testimonials** | Sample reviews — replace with real, attributed client reviews and delete the "Sample" caption |
| `about.html` | Founder story, timeline milestones |
| `privacy.html` | Complete and review with your legal advisor |
| `head` URLs | Replace `https://urbannest.vercel.app/` with the final domain in all pages + `sitemap.xml` + `robots.txt` (`DOMAIN` in `_build/partials.py` if regenerating) |
| Schema (`index.html`, `contact.html`) | Update address/phone/sameAs in the RealEstateAgent JSON-LD block; `property.html` emits a RealEstateListing block automatically from the data |

## 2 · How the features work
- **Search (home)** — the hero panel is a GET form: submitting goes to `properties.html?purpose=buy&type=villa&beds=4…` (empty fields are dropped). Buy/Rent toggle switches the price ranges (₹ lakh/crore vs ₹/month).
- **Listing** — `properties.js` reads the URL params, fills the sidebar form and filters `PROPERTIES` live on every change; the URL is kept in sync (`history.replaceState`) so results are shareable. Supported params: `purpose, loc, type, min, max, beds, area, q, agent, sort`. Bedrooms match exactly (5 = 5+). On screens ≤ 900 px the sidebar becomes a bottom sheet with an **Apply** button.
- **Property details** — `property.html?id=<id>` renders from the data file (title, ₹ price formatting, facts, gallery, amenities, floor plan, Google Maps embed using the listing's `locality`, agent card, similar listings, JSON-LD). Unknown ids show a "Property not found" state with suggestions.
- **Price formatting** — `UN.fmtPrice(18500000)` → `₹1.85 Cr`, `9200000` → `₹92 L`, rent `42000` → `₹42,000/mo`.
- **Maps** — Google Maps iframe embeds need no API key. Office map: `mapEmbed` in config; property map: built from `locality`.
- **WhatsApp** — every CTA deep-links to `wa.me/<number>` with a context message (property title + URL for enquiries; agent-specific numbers from `agents-data.js`).
- **Count-up stats** — values animate from 0 when scrolled into view (respects reduced motion); the HTML contains the final values so they read correctly without JS.

## 3 · Forms — how they work
No backend needed: on submit each form validates (name, 10-digit Indian mobile, email format, required fields), shows a loading state, then **opens WhatsApp** with a pre-filled message and shows a success state. Forms: property enquiry (`property.html`, goes to the listing agent's WhatsApp or the office number), contact/consultation (`contact.html`, supports `?topic=…&ref=…` prefill), call-back request (home CTA). All have a honeypot field.

**Optional backend / CRM:** in `js/forms.js` set `ENDPOINT` to a Formspree URL (`https://formspree.io/f/xxxx`), Web3Forms, or your own API/CRM webhook. Each form will POST JSON `{type, ...fields}` there **and** open WhatsApp. Server-side validation and spam filtering remain the backend's responsibility.

## 4 · Deploy to Vercel
1. vercel.com/new → drag this folder (or import a Git repo) → Deploy. No build step.
2. Or CLI: `npm i -g vercel && vercel --prod` from this folder.
`vercel.json` enables clean URLs (`/properties` → properties.html, `/property?id=…` works), cache headers and security headers. Analytics are not included — add your GA4/Meta snippet before `</head>` if wanted.

## 5 · Customising
- Colours/typography: top of `css/style.css` (`:root` tokens). Ink is graphite `--ink` (#17181B) on paper `--paper` (#F4F5F7); `--blue` (#2F5BEA) is the single accent for links, actions and markers (use `--blue-lt` for blue text on graphite). Display type is Familjen Grotesk (`--font-head`), body copy is Spectral (`--font-body`).
- Add a location: append to `LOCATIONS` in `properties-data.js`. Add a property type: `PROPERTY_TYPES` + a category card on the home page.
- Price range options: `UN.PRICE_STEPS` in `js/main.js`.
- Pages are generated by `_build/build.py` (`python3 _build/build.py`) from `_build/partials.py` (header/footer/head) — **or** edit the `.html` files directly. Regenerate placeholders with `python3 _build/gen_spec.py`; re-render the OG image with `node _build/og.js`.

## 6 · QA performed
Tested on Chromium at 1440 / 1024 / 820 / 390 / 360 px with `_kit/qa.js` + `_build/interactions.js`: 0 console errors, 0 broken links/anchors, 0 horizontal overflow, all assets load (all 116 data images verified), header transparent→sticky, mobile drawer (open/Esc/scroll-lock), home search → `properties.html?type=villa&beds=4` applies filters, live counts, sort (price asc/desc, newest, area), Buy/Rent toggle with rent price ranges, empty state + reset, keyword search, price range, `?agent=`/`?loc=`/`?purpose=` deep links, mobile filter sheet (open → Apply → closes, Esc), 1-col mobile / 2-col tablet cards, property detail from `?id=` (title, ₹ price, 4-image gallery + thumbs + lightbox keys/Esc/swipe, facts, amenities, map with locality, floor-plan download, agent card, prefilled enquiry → validation blocks → loading → success panel + WhatsApp link, similar properties, not-found state), mobile sticky Call/WhatsApp/Enquire bar (detail page only), stats count-up, callback + contact form validation/success, projects status filter, agents page, tap targets ≥ 40 px, one H1 per page, all images alt, all inputs labelled, titles/metas/OG/schema present.
