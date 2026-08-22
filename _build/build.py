import os, sys, re
sys.path.insert(0, os.path.dirname(__file__))
from partials import head, header, footer, page_hero, LIGHTBOX, DOMAIN
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def write(name, html): open(os.path.join(ROOT, name), "w", encoding="utf-8").write(html); print("wrote", name)

LD = '''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"RealEstateAgent","name":"UrbanNest Realty","image":"https://urbannest.vercel.app/assets/og-image.png","url":"https://urbannest.vercel.app/","telephone":"+91-98XXX-XXXXX","email":"hello@urbannestrealty.example","priceRange":"₹₹₹","areaServed":["Noida","Greater Noida","Gurgaon","Ghaziabad","Delhi NCR"],"address":{"@type":"PostalAddress","streetAddress":"[Replace with office address]","addressLocality":"Noida","addressRegion":"Uttar Pradesh","postalCode":"201309","addressCountry":"IN"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"10:00","closes":"19:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":["Sunday"],"opens":"11:00","closes":"17:00"}],"sameAs":["https://example.com/","https://example.com/","https://example.com/"]}
</script>'''

# The home hero's first-paint match count is read straight out of the listings file so a
# regenerate can never leave a stale number on screen before main.js takes over.
BUY_COUNT = len(re.findall(r'purpose: "buy"', open(os.path.join(ROOT, "js/properties-data.js"), encoding="utf-8").read()))

# ============================ HOME ============================
home = head("UrbanNest Realty — Premium Real Estate in Noida | Apartments, Villas, Penthouses, Plots & Commercial",
            "UrbanNest Realty is a premium real estate company in Noida. Search verified apartments, villas, penthouses, plots and commercial spaces across Sector 150, 137, 128, 76, 62, the Expressway and Greater Noida West. Book a free consultation.",
            "", LD) + header() + '''
<main id="main">
<!-- 1. HERO — "the query builder": the first screen IS the search -->
<section class="qhero" aria-labelledby="qhero-title">
  <div class="qhero__media"><img src="assets/images/hero-home.jpg" alt="Two modern high-rise apartment towers with pale facades rising against a blue sky scattered with white cloud" width="1600" height="900" fetchpriority="high"></div>
  <div class="container qhero__inner">
    <span class="eyebrow reveal">Premium real estate &middot; Noida &amp; NCR</span>
    <h1 class="qhero__title reveal d1" id="qhero-title">Find a home that feels <em>made for you.</em></h1>
    <form class="qhero__builder" action="properties.html" method="get" role="search" aria-label="Build your property search" data-query-builder>
      <input type="hidden" name="beds" value="" data-qb-beds>
      <input type="hidden" name="type" value="" data-qb-type>
      <p class="qhero__sentence">
        <span class="qb-txt">I&rsquo;m looking to</span>
        <span class="qb-slot"><label class="sr-only" for="qb-purpose">Buy or rent</label><select id="qb-purpose" name="purpose" data-qb-purpose><option value="buy">Buy</option></select><span class="qb-ghost" aria-hidden="true">Buy</span></span>
        <span class="qb-txt" data-qb-article>a</span>
        <span class="qb-slot"><label class="sr-only" for="qb-what">Size or property type</label><select id="qb-what" data-qb-what><option value="">home</option></select><span class="qb-ghost" aria-hidden="true">home</span></span>
        <span class="qb-txt">in</span>
        <span class="qb-slot"><label class="sr-only" for="qb-where">Location</label><select id="qb-where" name="loc" data-qb-loc><option value="">Noida &amp; NCR</option></select><span class="qb-ghost" aria-hidden="true">Noida &amp; NCR</span></span>
        <span class="qb-txt" data-qb-prep>at</span>
        <span class="qb-slot"><label class="sr-only" for="qb-budget">Budget</label><select id="qb-budget" name="max" data-qb-max><option value="">any price</option></select><span class="qb-ghost" aria-hidden="true">any price</span></span><span class="qb-stop">.</span>
      </p>
      <p class="qhero__result">
        <span class="qhero__count" data-qb-count aria-live="polite" aria-atomic="true"><b>''' + str(BUY_COUNT) + ''' homes</b> match</span>
        <a class="qhero__go" href="properties.html?purpose=buy" data-qb-link>see them <svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <button class="qhero__go qhero__go--nojs" type="submit">see them <svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg></button>
      </p>
    </form>
    <div class="hero__actions reveal d3">
      <a class="btn btn--primary btn--lg" href="properties.html">Browse Properties</a>
      <a class="btn btn--outline-light btn--lg" href="contact.html#consult">Book a Consultation</a>
    </div>
  </div>
</section>

<!-- 3. FEATURED PROPERTIES -->
<section class="section section--white" id="featured">
  <div class="container">
    <div class="section-head split reveal">
      <div><span class="eyebrow">Featured properties</span><h2>Hand-picked homes &amp; spaces</h2><p>A selection of our most sought-after listings this month — each one visited and verified by our team.</p></div>
      <a class="link-arrow" href="properties.html">View all properties <svg class="ic"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="prop-grid" data-featured></div>
  </div>
</section>

<!-- 4. NEW PROJECTS -->
<section class="section section--off" id="projects">
  <div class="container">
    <div class="section-head split reveal">
      <div><span class="eyebrow">New launches</span><h2>Projects worth an early look</h2><p>New and under-construction developments with pre-launch pricing, payment plans and RERA details on request.</p></div>
      <a class="link-arrow" href="projects.html">All new projects <svg class="ic"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="project-grid" data-home-projects></div>
  </div>
</section>

<!-- 5. PROPERTY CATEGORIES -->
<section class="section section--white" id="categories">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">Browse by category</span><h2>What are you looking for?</h2></div>
    <div class="cat-grid">
      <a class="cat reveal" href="properties.html?type=apartment"><img src="assets/images/categories/apartments.jpg" alt="A cluster of tall apartment towers in the foreground of a city skyline" loading="lazy" width="600" height="375"><div class="cat__body"><h3>Apartments</h3><span><b data-cat-count="apartment">—</b> <svg class="ic"><use href="#i-arrow"/></svg></span></div></a>
      <a class="cat reveal d1" href="properties.html?type=villa"><img src="assets/images/categories/villas.jpg" alt="A white flat-roofed villa with a rectangular swimming pool and an outdoor lounge area" loading="lazy" width="600" height="375"><div class="cat__body"><h3>Villas</h3><span><b data-cat-count="villa">—</b> <svg class="ic"><use href="#i-arrow"/></svg></span></div></a>
      <a class="cat reveal d2" href="properties.html?type=penthouse"><img src="assets/images/categories/penthouses.jpg" alt="A sunlit city skyline seen from a high roof terrace" loading="lazy" width="600" height="375"><div class="cat__body"><h3>Penthouses</h3><span><b data-cat-count="penthouse">—</b> <svg class="ic"><use href="#i-arrow"/></svg></span></div></a>
      <a class="cat reveal d3" href="properties.html?type=plot"><img src="assets/images/categories/plots.jpg" alt="An aerial view of surveyed housing lots divided by new roads" loading="lazy" width="600" height="375"><div class="cat__body"><h3>Plots</h3><span><b data-cat-count="plot">—</b> <svg class="ic"><use href="#i-arrow"/></svg></span></div></a>
      <a class="cat reveal d3" href="properties.html?type=commercial"><img src="assets/images/categories/commercial.jpg" alt="Two teal-and-white glass office towers seen from street level" loading="lazy" width="600" height="375"><div class="cat__body"><h3>Commercial</h3><span><b data-cat-count="commercial">—</b> <svg class="ic"><use href="#i-arrow"/></svg></span></div></a>
    </div>
  </div>
</section>

<!-- 6. WHY CHOOSE US -->
<section class="section section--off" id="why">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">Why UrbanNest</span><h2>Advice first, listings second</h2><p>We're a boutique advisory, not a listing farm — fewer properties, each one checked, priced honestly and presented with the paperwork ready.</p></div>
    <div class="why-grid">
      <div class="why reveal"><div class="why__icon"><svg class="ic"><use href="#i-shield"/></svg></div><h3>Verified listings</h3><p>Every property is visited by our team; title, approvals and dues are checked before it goes live.</p></div>
      <div class="why reveal d1"><div class="why__icon"><svg class="ic"><use href="#i-compass"/></svg></div><h3>Local expertise</h3><p>Sector-by-sector knowledge of Noida, the Expressway and Greater Noida West — which towers, which floors, which views.</p></div>
      <div class="why reveal d2"><div class="why__icon"><svg class="ic"><use href="#i-handshake"/></svg></div><h3>End-to-end support</h3><p>Negotiation, home-loan tie-ups, legal due diligence, registration and handover — handled with you, not for you.</p></div>
      <div class="why reveal d3"><div class="why__icon"><svg class="ic"><use href="#i-percent"/></svg></div><h3>Transparent pricing</h3><p>Clear brokerage terms and no hidden fees. You'll always know what you're paying and why.</p></div>
    </div>
  </div>
</section>

<!-- 7. OUR AGENTS -->
<section class="section section--white" id="agents">
  <div class="container">
    <div class="section-head split reveal">
      <div><span class="eyebrow">Our agents</span><h2>People who know the ground</h2><p>Specialist consultants for luxury homes, first homes, villas, plots and commercial — pick the one who matches your search.</p></div>
      <a class="link-arrow" href="agents.html">Meet the whole team <svg class="ic"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="agent-grid" data-home-agents></div>
  </div>
</section>

<!-- 8. STATISTICS -->
<!-- PLACEHOLDER FIGURES — replace data-count values with real, verifiable numbers before launch (see README) -->
<section class="section section--dark" id="stats" aria-label="UrbanNest in numbers">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">UrbanNest in numbers</span><h2>Trusted across Noida &amp; NCR</h2></div>
    <div class="stats reveal">
      <div class="stat"><b class="tnum" data-count="850" data-suffix="+">850+</b><span>Properties sold &amp; leased</span></div>
      <div class="stat"><b class="tnum" data-count="12">12</b><span>Years in Noida real estate</span></div>
      <div class="stat"><b class="tnum" data-count="98" data-suffix="%">98%</b><span>Clients who'd recommend us</span></div>
      <div class="stat"><b class="tnum" data-count="40" data-suffix="+">40+</b><span>Developer &amp; project partnerships</span></div>
    </div>
    <p class="stats-note">Figures shown are placeholders for layout — to be replaced with verified numbers before launch.</p>
  </div>
</section>

<!-- 9. TESTIMONIALS -->
<section class="section section--off" id="testimonials">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">Client stories</span><h2>What our clients say</h2></div>
    <div class="reviews-grid">
      <article class="review reveal"><div class="review__mark" aria-hidden="true">“</div><div class="review__stars" aria-label="5 out of 5 stars">★★★★★</div><p>“They shortlisted three towers in Sector 150 that actually matched our brief, and negotiated a better floor than we'd hoped for. Registration was done in a fortnight.”</p><footer><span class="review__avatar" aria-hidden="true">RS</span><div><b>R. Sharma</b>Bought a 3 BHK, Sector 150 · sample</div></footer></article>
      <article class="review reveal d1"><div class="review__mark" aria-hidden="true">“</div><div class="review__stars" aria-label="5 out of 5 stars">★★★★★</div><p>“Moving from Bengaluru, we needed a furnished rental near the Expressway within a week. Two video walkthroughs later we'd signed — zero surprises on move-in.”</p><footer><span class="review__avatar" aria-hidden="true">AK</span><div><b>A. &amp; K. Menon</b>Rented, Sector 137 · sample</div></footer></article>
      <article class="review reveal d2"><div class="review__mark" aria-hidden="true">“</div><div class="review__stars" aria-label="5 out of 5 stars">★★★★★</div><p>“Honest about which pre-launches to avoid. We went with their recommendation in Sector 128 and the paperwork was cleaner than anything we'd seen before.”</p><footer><span class="review__avatar" aria-hidden="true">VG</span><div><b>V. Gupta</b>Villa buyer, Sector 128 · sample</div></footer></article>
    </div>
    <p class="sample-note center">Sample testimonials for layout — replace with real, attributed client reviews before launch.</p>
  </div>
</section>

<!-- 10. CONSULTATION CTA -->
<section class="cta-band" id="consultation">
  <img src="assets/images/cta-consult.jpg" alt="A dense city skyline seen across open water in clear daylight" loading="lazy" width="1600" height="667">
  <div class="container">
    <div class="cta-layout">
      <div class="reveal">
        <span class="eyebrow">Free consultation</span>
        <h2>Talk to a consultant <em>before</em> you shortlist</h2>
        <p class="lead">A 30-minute call to understand your budget, commute and timeline — then a shortlist of properties that genuinely fit, with site visits arranged around your schedule.</p>
        <ul class="cta-points">
          <li><svg class="ic"><use href="#i-check"/></svg>No-obligation, no-pressure advice on buying, renting or investing</li>
          <li><svg class="ic"><use href="#i-check"/></svg>Home-loan eligibility check and developer payment-plan comparison</li>
          <li><svg class="ic"><use href="#i-check"/></svg>Site visits across Noida &amp; NCR — pick-up available on request</li>
        </ul>
        <div class="hero__actions"><a class="btn btn--primary btn--lg" href="contact.html#consult">Book a Consultation</a><a class="btn btn--outline-light btn--lg" data-href="whatsapp" data-wa-text="Hi UrbanNest Realty! I'd like to book a free consultation." href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> WhatsApp us</a></div>
      </div>
      <div class="callback-card reveal d1">
        <h3>Request a call back</h3>
        <p>Leave your number and a consultant will call you during working hours.</p>
        <form id="callback-form" class="form" novalidate>
          <div class="honeypot" aria-hidden="true"><label for="k-company">Company</label><input id="k-company" name="company" tabindex="-1" autocomplete="off"></div>
          <div class="field"><label for="k-name">Your name <span class="req">*</span></label><input id="k-name" name="name" type="text" autocomplete="name" placeholder="Full name" data-validate="required name"><span class="field__error" role="alert"></span></div>
          <div class="field"><label for="k-phone">Mobile number <span class="req">*</span></label><input id="k-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="98765 43210" data-validate="required phone"><span class="field__error" role="alert"></span></div>
          <div class="form__row">
            <div class="field"><label for="k-interest">I'm looking to <span class="req">*</span></label><select id="k-interest" name="interest" data-validate="select"><option value="">Choose…</option><option>Buy a home</option><option>Rent a home</option><option>Invest</option><option>Sell or lease my property</option><option>Commercial space</option></select><span class="field__error" role="alert"></span></div>
            <div class="field"><label for="k-time">Preferred time</label><select id="k-time" name="time"><option value="">Any time</option><option>Morning (10–1)</option><option>Afternoon (1–4)</option><option>Evening (4–7)</option></select></div>
          </div>
          <div class="form__status" role="status" aria-live="polite"></div>
          <button class="btn btn--dark btn--block" type="submit">Request call back</button>
          <p class="field__hint">Submitting opens WhatsApp with your request pre-filled — just hit send.</p>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- 11. LOCATION -->
<section class="section section--white" id="location">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Visit our office</span><h2>Find us in Sector 62, Noida</h2></div>
    <div class="location reveal">
      <div class="location__info">
        <div class="info-row"><div class="why__icon"><svg class="ic"><use href="#i-pin"/></svg></div><div><h3>Office address</h3><address><span data-bind="addressLine1">[Address]</span><br><span data-bind="addressLine2">Noida, Uttar Pradesh</span></address><a class="link-arrow mt-1" data-href="map" href="#" target="_blank" rel="noopener">Get directions <svg class="ic"><use href="#i-arrow"/></svg></a></div></div>
        <div class="info-row"><div class="why__icon"><svg class="ic"><use href="#i-clock"/></svg></div><div><h3>Office hours</h3><div class="hours mt-1" data-hours></div></div></div>
        <div class="info-row"><div class="why__icon"><svg class="ic"><use href="#i-phone"/></svg></div><div><h3>Call or WhatsApp</h3><p><a data-href="tel" href="#"><span data-bind="phoneDisplay">+91 00000 00000</span></a> · <a data-href="mail" href="#"><span data-bind="email">hello@urbannestrealty.example</span></a></p><a class="btn btn--whatsapp mt-2" data-href="whatsapp" href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> Chat on WhatsApp</a></div></div>
      </div>
    </div>
  </div>
</section>
</main>
''' + footer() + '''<script src="js/forms.js"></script>
</body></html>'''
write("index.html", home)

# ============================ PROPERTIES (listing) ============================
props = head("Properties for Sale & Rent in Noida — Search Apartments, Villas, Penthouses, Plots | UrbanNest Realty",
             "Search verified properties in Noida & NCR. Filter by location, type, budget, bedrooms and area — apartments, villas, penthouses, plots and commercial spaces for sale or rent.",
             "properties.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-properties.jpg", "Properties", "Find your next <em>address</em>", "Filter by location, budget, type, bedrooms and area. Every listing is verified by our team before it goes live.", "Properties", compact=True) + '''
<div class="listing-bar">
  <div class="container--wide listing-bar__inner">
    <button class="filters-toggle" type="button" data-filters-open aria-controls="filters" aria-expanded="false"><svg class="ic"><use href="#i-sliders"/></svg> Filters <span class="badge" data-filters-badge>0</span></button>
    <div class="seg" role="group" aria-label="Buy or rent" data-purpose-seg><button type="button" data-purpose="buy" aria-pressed="true">Buy</button><button type="button" data-purpose="rent" aria-pressed="false">Rent</button></div>
    <p class="listing-bar__count" data-count-text aria-live="polite"><b>…</b> properties</p>
    <div class="listing-bar__sort"><label for="sort">Sort by</label><select id="sort"><option value="recommended">Recommended</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="newest">Newest first</option><option value="area-desc">Largest area</option></select></div>
  </div>
</div>
<div class="container--wide listing">
  <aside class="filters" id="filters" aria-label="Filter properties">
    <div class="filters__head"><h2>Filters</h2><div style="display:flex;gap:.5rem;align-items:center"><button class="link-reset" type="button" data-reset>Reset</button><button class="filters__close" type="button" data-filters-close aria-label="Close filters"><svg class="ic"><use href="#i-x"/></svg></button></div></div>
    <form id="filter-form" class="filters__body" novalidate>
      <div class="sfield"><label for="f-q">Keyword</label><input id="f-q" name="q" type="search" placeholder="e.g. golf, furnished, metro" autocomplete="off"></div>
      <div class="sfield"><label for="f-loc">Location</label><select id="f-loc" name="loc"><option value="">All locations</option></select></div>
      <div class="sfield"><label for="f-type">Property type</label><select id="f-type" name="type"><option value="">All types</option></select></div>
      <div class="filters__row">
        <div class="sfield"><label for="f-min">Min price</label><select id="f-min" name="min"><option value="">No min</option></select></div>
        <div class="sfield"><label for="f-max">Max price</label><select id="f-max" name="max"><option value="">No max</option></select></div>
      </div>
      <div class="filters__row">
        <div class="sfield"><label for="f-beds">Bedrooms</label><select id="f-beds" name="beds"><option value="">Any</option><option value="1">1 BHK</option><option value="2">2 BHK</option><option value="3">3 BHK</option><option value="4">4 BHK</option><option value="5">5+ BHK</option></select></div>
        <div class="sfield"><label for="f-area">Min area</label><select id="f-area" name="area"><option value="">Any</option><option value="500">500+ sq ft</option><option value="1000">1,000+ sq ft</option><option value="1500">1,500+ sq ft</option><option value="2000">2,000+ sq ft</option><option value="3000">3,000+ sq ft</option><option value="5000">5,000+ sq ft</option></select></div>
      </div>
      <p class="field__hint">Results update as you change filters. Prices in ₹ (rent per month).</p>
    </form>
    <div class="filters__foot"><button class="btn btn--dark btn--block" type="button" data-filters-apply>Show properties</button></div>
  </aside>
  <div class="filters__backdrop" data-filters-backdrop></div>
  <section class="results" aria-label="Search results" data-results-top>
    <div class="results__head"><h2 class="results__title" data-results-title>Properties for sale in Noida &amp; NCR</h2></div>
    <div class="active-chips" data-active-chips></div>
    <div class="prop-grid" data-results aria-live="polite"></div>
    <div class="empty" data-empty hidden><h3>No properties match these filters</h3><p>Try widening your budget, removing the bedroom filter or choosing “All locations”. New listings are added every week — tell us what you're after and we'll find it.</p><div class="hero__actions" style="justify-content:center"><button class="btn btn--outline-dark" type="button" data-reset>Reset filters</button><a class="btn btn--dark" href="contact.html#consult">Tell us your brief</a></div></div>
  </section>
</div>
<section class="cta-band cta-band--center"><img src="assets/images/cta-consult.jpg" alt="A dense city skyline seen across open water in clear daylight" loading="lazy" width="1600" height="667"><div class="container"><span class="eyebrow">Can't find it?</span><h2>Tell us your brief — we'll find it</h2><p class="lead">Off-market homes, builder-floor options and pre-launch inventory don't always make it to the website.</p><div class="hero__actions"><a class="btn btn--primary btn--lg" href="contact.html#consult">Book a Consultation</a><a class="btn btn--outline-light btn--lg" data-href="whatsapp" data-wa-text="Hi UrbanNest Realty! I'm looking for a property — here's my brief:" href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> WhatsApp your brief</a></div></div></section>
</main>
''' + footer() + '''<script src="js/properties.js"></script></body></html>'''
write("properties.html", props)

# ============================ PROPERTY DETAIL ============================
detail = head("Property details — UrbanNest Realty, Noida", "Photos, price, floor plan, amenities, location map and agent contact for this UrbanNest Realty listing in Noida.", "property.html", "", body_class="header-solid") + header() + '''
<main id="main">
<div data-prop-page>
  <div class="container prop-top">
    <nav class="crumbs crumbs--light" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="properties.html">Properties</a><span>/</span><span aria-current="page" data-p-crumb>Property</span></nav>
    <div class="prop-head">
      <div><div class="prop-head__tags" data-p-tags></div><h1 data-p-title>Property</h1><p class="prop-loc" data-p-loc></p></div>
      <div class="prop-price-box"><div class="prop-price tnum" data-p-price></div><small data-p-persqft></small><div class="prop-head__actions"><a class="btn btn--outline-dark btn--sm" data-p-tel href="#"><svg class="ic"><use href="#i-phone"/></svg> Call agent</a><a class="btn btn--whatsapp btn--sm" data-p-wa href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> WhatsApp</a></div></div>
    </div>
  </div>
  <section class="container gallery" id="gallery" aria-label="Photo gallery">
    <div class="gallery-main"><button type="button" data-gallery-main aria-label="Open photo in full screen"></button><span class="gallery-main__count" data-gallery-count></span></div>
    <div class="gallery-thumbs" data-gallery-thumbs role="group" aria-label="Photo thumbnails"></div>
  </section>
  <div class="container prop-layout">
    <div class="prop-main">
      <section class="facts" id="details" aria-label="Key facts" data-p-facts></section>
      <section class="prop-section" id="overview"><h2>Overview</h2><div data-p-desc></div></section>
      <section class="prop-section" id="amenities"><h2>Amenities</h2><ul class="amenities" data-p-amenities></ul></section>
      <section class="prop-section" id="floor-plan"><h2>Floor plan</h2><figure class="floor-plan"><img data-p-floorplan src="assets/images/floor-plans/floor-plan-placeholder.svg" alt="Indicative floor plan: living and dining, kitchen, balcony, three bedrooms and two bathrooms" loading="lazy" width="1600" height="1200"><figcaption class="floor-plan__bar"><span>Indicative layout — dimensions to be confirmed on site.</span><a class="btn btn--outline-dark btn--sm" data-p-floorplan-link href="assets/images/floor-plans/floor-plan-placeholder.svg" download><svg class="ic"><use href="#i-download"/></svg> Download floor plan</a></figcaption></figure></section>
    </div>
    <aside class="prop-side">
      <div class="agent-card" data-p-agent></div>
      <div class="enquiry-card" id="enquiry">
        <h2>Enquire about this property</h2>
        <p>We'll reply within working hours with details, pricing and site-visit slots.</p>
        <form id="enquiry-form" class="form" novalidate>
          <div class="honeypot" aria-hidden="true"><label for="e-company">Company</label><input id="e-company" name="company" tabindex="-1" autocomplete="off"></div>
          <input type="hidden" id="e-property" name="property" value=""><input type="hidden" id="e-wa" name="wa" value=""><input type="hidden" id="e-agent" name="agent" value="">
          <div class="field"><label for="e-name">Name <span class="req">*</span></label><input id="e-name" name="name" type="text" autocomplete="name" placeholder="Your name" data-validate="required name"><span class="field__error" role="alert"></span></div>
          <div class="field"><label for="e-phone">Mobile <span class="req">*</span></label><input id="e-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="98765 43210" data-validate="required phone"><span class="field__error" role="alert"></span></div>
          <div class="field"><label for="e-email">Email</label><input id="e-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" data-validate="email"><span class="field__error" role="alert"></span></div>
          <div class="field"><label for="e-visit">Site visit preference</label><select id="e-visit" name="visit"><option value="">No preference</option><option>This weekend</option><option>Weekday evening</option><option>Video walkthrough first</option></select></div>
          <div class="field"><label for="e-message">Message <span class="req">*</span></label><textarea id="e-message" name="message" data-validate="required min10"></textarea><span class="field__error" role="alert"></span></div>
          <div class="form__status" role="status" aria-live="polite"></div>
          <button class="btn btn--primary btn--block" type="submit">Send enquiry</button>
          <p class="field__hint">Submitting opens WhatsApp with your enquiry pre-filled — just hit send.</p>
        </form>
        <div id="enquiry-success" class="success-panel" role="status" aria-live="polite">
          <div class="check"><svg class="ic"><use href="#i-check"/></svg></div>
          <h3>Thanks, <span data-success-name>there</span>!</h3>
          <p>We've opened WhatsApp with your enquiry. Send the message and the listing agent will get back to you shortly.</p>
          <div class="hero__actions"><a class="btn btn--whatsapp" data-wa-again href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> Open WhatsApp</a><button class="btn btn--outline-dark" type="button" data-edit>Edit enquiry</button></div>
        </div>
      </div>
    </aside>
  </div>
  <section class="section section--off" id="similar">
    <div class="container">
      <div class="section-head split reveal"><div><span class="eyebrow">You may also like</span><h2>Similar properties</h2></div><a class="link-arrow" href="properties.html">Browse all <svg class="ic"><use href="#i-arrow"/></svg></a></div>
      <div class="prop-grid" data-p-similar></div>
    </div>
  </section>
</div>
<div class="container prop-notfound" data-prop-notfound hidden>
  <span class="eyebrow">Listing unavailable</span>
  <h1>Property not found</h1>
  <p class="lead">This listing may have been sold, rented or removed. Browse our current properties or ask a consultant for similar options.</p>
  <div class="hero__actions"><a class="btn btn--dark" href="properties.html">Browse properties</a><a class="btn btn--outline-dark" href="contact.html#consult">Ask a consultant</a></div>
  <div class="prop-grid mt-6" data-nf-suggest></div>
</div>
</main>
''' + LIGHTBOX + '''
<div class="sticky-prop" aria-label="Quick actions"><a class="btn btn--outline-dark" data-p-tel href="#"><svg class="ic"><use href="#i-phone"/></svg> Call</a><a class="btn btn--whatsapp" data-p-wa href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> WhatsApp</a><a class="btn btn--primary" href="#enquiry"><svg class="ic"><use href="#i-mail"/></svg> Enquire</a></div>
''' + footer() + '''<script src="js/property.js"></script><script src="js/forms.js"></script></body></html>'''
write("property.html", detail)

# ============================ PROJECTS ============================
projects = head("New Projects & Launches in Noida — UrbanNest Realty", "New launches and under-construction projects in Noida, Greater Noida West and the Expressway — configurations, price from, possession and RERA details. Request brochures and payment plans.", "projects.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-projects.jpg", "New launches", "Projects worth an <em>early look</em>", "Pre-launch pricing, construction-linked plans and ready-to-move phases — with RERA details, bank approvals and payment schedules shared on request.", "Projects") + '''
<section class="section section--white">
  <div class="container">
    <div class="section-head split reveal"><div><span class="eyebrow">New &amp; upcoming</span><h2>Current projects</h2><p>Filter by construction status. All details are indicative — verify with the developer's RERA filing before booking.</p></div>
      <div class="chips" data-project-filters aria-label="Filter by status"><button class="chip" data-status="all" aria-pressed="true">All</button><button class="chip" data-status="New launch" aria-pressed="false">New launch</button><button class="chip" data-status="Under construction" aria-pressed="false">Under construction</button><button class="chip" data-status="Ready to move" aria-pressed="false">Ready to move</button></div></div>
    <div class="project-grid project-grid--2" data-all-projects></div>
    <div class="empty mt-4" data-projects-empty hidden><h3>No projects in this category right now</h3><p>Tell us what you're after and we'll alert you when a matching launch opens.</p></div>
  </div>
</section>
<section class="section section--off">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">How we help</span><h2>Buying in a new launch, done carefully</h2></div>
    <div class="steps">
      <div class="step reveal"><div class="num">01</div><h3>Diligence first</h3><p>We check the RERA registration, land title, approvals and the developer's delivery record before we recommend a project.</p></div>
      <div class="step reveal d1"><div class="num">02</div><h3>Inventory &amp; pricing</h3><p>Tower, floor and unit selection with live availability, early-bird pricing and a comparison of payment plans.</p></div>
      <div class="step reveal d2"><div class="num">03</div><h3>Booking to possession</h3><p>Allotment, bank loan, builder-buyer agreement, construction updates and handover — we stay with you throughout.</p></div>
    </div>
  </div>
</section>
<section class="cta-band cta-band--center"><img src="assets/images/cta-consult.jpg" alt="A dense city skyline seen across open water in clear daylight" loading="lazy" width="1600" height="667"><div class="container"><span class="eyebrow">Pre-launch alerts</span><h2>Hear about launches before they open</h2><p class="lead">Share your budget and preferred sectors — we'll message you when a matching project opens for booking.</p><div class="hero__actions"><a class="btn btn--primary btn--lg" href="contact.html?topic=New%20project%20enquiry#contact-form">Register interest</a><a class="btn btn--outline-light btn--lg" data-href="whatsapp" data-wa-text="Hi UrbanNest Realty! Please add me to your new-launch alerts. My budget and preferred sectors:" href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> WhatsApp</a></div></div></section>
</main>
''' + footer() + '''<script>
(function(){var g=document.querySelector("[data-all-projects]"),e=document.querySelector("[data-projects-empty]"),f=document.querySelector("[data-project-filters]");if(!g||!window.PROJECTS)return;
function render(s){var list=window.PROJECTS.filter(function(p){return s==="all"||p.status===s});g.innerHTML=list.map(function(p,i){return window.UN.projectCard(p,"d"+(i%2))}).join("");e.hidden=list.length>0;g.hidden=list.length===0}
f.addEventListener("click",function(ev){var b=ev.target.closest(".chip");if(!b)return;f.querySelectorAll(".chip").forEach(function(c){c.setAttribute("aria-pressed",String(c===b))});render(b.dataset.status)});render("all");})();
</script></body></html>'''
write("projects.html", projects)

# ============================ ABOUT ============================
about = head("About UrbanNest Realty — Premium Real Estate Advisory in Noida", "The story, values and team behind UrbanNest Realty — a boutique real estate advisory in Noida focused on verified listings, honest pricing and end-to-end support.", "about.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-about.jpg", "About us", "A boutique advisory, <em>not</em> a listing farm", "Fewer properties, each one checked. Clear advice, clear pricing and consultants who stay with you from the first site visit to the keys.", "About") + '''
<section class="section section--white">
  <div class="container">
    <div class="split">
      <div class="split__body reveal"><span class="eyebrow">Our story</span><h2>Built on the ground in Noida</h2>
        <p>UrbanNest Realty started with a simple frustration: too many listings, too little honest advice. We began as a two-person advisory working the Expressway sectors, visiting every flat before recommending it and saying no to projects we wouldn't buy ourselves.</p>
        <p>Today we're a small team of specialists covering luxury homes, first homes, villas, plots and commercial space across Noida, Greater Noida West and the wider NCR — still visiting every property, still saying no when it's warranted.</p>
        <p class="muted" style="font-size:.92rem">[Founder name, founding year and origin story — replace with the real version.]</p>
        <blockquote class="quote">"We'd rather lose a deal than recommend the wrong tower."<cite>Founder, UrbanNest Realty</cite></blockquote></div>
      <div class="split__media reveal d1"><div class="frame"><img src="assets/images/about-office.jpg" alt="A glass-walled meeting room with a long table and stacking chairs, seen from the office floor" loading="lazy" width="1000" height="750"></div><div class="frame frame--tall"><img src="assets/images/about-site-visit.jpg" alt="A consultant in a dark suit holding a set of keys and a clipboard during a site visit" loading="lazy" width="600" height="800"></div></div>
    </div>
    <div class="timeline reveal">
      <div><b>Year 1</b><p>Two consultants, one sector belt: the Noida Expressway. Every property visited in person.</p></div>
      <div><b>Year 3</b><p>Expanded to Sector 150, 137 and Greater Noida West; first developer partnerships for new launches.</p></div>
      <div><b>Year 6</b><p>Commercial leasing and plots desk opened; legal and home-loan partners onboarded.</p></div>
      <div><b>Today</b><p>A specialist team across residential, luxury, commercial and NCR investments. <span class="muted">[Replace with real milestones]</span></p></div>
    </div>
  </div>
</section>
<section class="section section--dark">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">What we believe</span><h2>Three rules we don't break</h2></div>
    <div class="values-grid">
      <div class="value reveal"><div class="num">01</div><h3>Verify before we recommend</h3><p>Title, approvals, dues and the developer's track record — checked before a listing goes live or a project is suggested.</p></div>
      <div class="value reveal d1"><div class="num">02</div><h3>Say the uncomfortable thing</h3><p>If a floor is overpriced or a launch looks risky, you'll hear it from us first — even if it costs us the deal.</p></div>
      <div class="value reveal d2"><div class="num">03</div><h3>Stay until the keys</h3><p>Negotiation, loan, agreement, registration and handover. Our job ends when you move in, not when you book.</p></div>
    </div>
  </div>
</section>
<section class="section section--off">
  <div class="container">
    <div class="section-head split reveal"><div><span class="eyebrow">The team</span><h2>Specialists, by property type</h2><p>Each consultant owns a segment and a set of sectors — so you always talk to the person who knows the answer.</p></div><a class="link-arrow" href="agents.html">Meet all agents <svg class="ic"><use href="#i-arrow"/></svg></a></div>
    <div class="agent-grid" data-home-agents></div>
  </div>
</section>
<section class="cta-band cta-band--center"><img src="assets/images/cta-consult.jpg" alt="A dense city skyline seen across open water in clear daylight" loading="lazy" width="1600" height="667"><div class="container"><span class="eyebrow">Work with us</span><h2>Start with a conversation</h2><p class="lead">Tell us what you're looking for and we'll tell you honestly whether — and where — we can help.</p><div class="hero__actions"><a class="btn btn--primary btn--lg" href="contact.html#consult">Book a Consultation</a><a class="btn btn--outline-light btn--lg" href="properties.html">Browse properties</a></div></div></section>
</main>
''' + footer() + '''</body></html>'''
write("about.html", about)

# ============================ AGENTS ============================
agents = head("Our Agents — Real Estate Consultants in Noida | UrbanNest Realty", "Meet UrbanNest Realty's consultants — specialists in luxury apartments, first homes, villas, plots and commercial space across Noida & NCR. Call or WhatsApp the right agent for your search.", "agents.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-agents.jpg", "Our agents", "People who know <em>the ground</em>", "Specialist consultants by property type and sector. Call or WhatsApp the one who matches your search — or tell us your brief and we'll route it.", "Agents") + '''
<section class="section section--white">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The team</span><h2>Meet your consultants</h2><p>Names, photos and numbers below are placeholders — replace them in <code>js/agents-data.js</code>.</p></div>
    <div class="agent-grid" data-all-agents></div>
  </div>
</section>
<section class="section section--off">
  <div class="container">
    <div class="split">
      <div class="split__body reveal"><span class="eyebrow">Join UrbanNest</span><h2>Consultants who'd rather advise than push</h2><p>We're always looking for experienced residential and commercial consultants in Noida and Greater Noida who believe in verified listings and honest advice. Share your profile and the segments you work in.</p><a class="btn btn--dark" data-href="mail" href="#">Email your profile</a></div>
      <div class="split__media reveal d1"><div class="frame"><img src="assets/images/about-office.jpg" alt="A glass-walled meeting room with a long table and stacking chairs, seen from the office floor" loading="lazy" width="1000" height="750"></div></div>
    </div>
  </div>
</section>
<section class="cta-band cta-band--center"><img src="assets/images/cta-consult.jpg" alt="A dense city skyline seen across open water in clear daylight" loading="lazy" width="1600" height="667"><div class="container"><span class="eyebrow">Not sure who to call?</span><h2>Tell us your brief, we'll route it</h2><div class="hero__actions"><a class="btn btn--primary btn--lg" href="contact.html#consult">Book a Consultation</a><a class="btn btn--outline-light btn--lg" data-href="whatsapp" href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> WhatsApp us</a></div></div></section>
</main>
''' + footer() + '''</body></html>'''
write("agents.html", agents)

# ============================ CONTACT ============================
contact = head("Contact UrbanNest Realty — Book a Consultation | Noida", "Get in touch with UrbanNest Realty in Noida — book a free consultation, call, WhatsApp or send a message. Office address, hours and map.", "contact.html", LD) + header() + '''
<main id="main">''' + page_hero("assets/images/hero-contact.jpg", "Contact", "Let's find your <em>next address</em>", "Book a free consultation, ask about a listing, or tell us what you'd like to sell or lease.", "Contact") + '''
<section class="section section--white" id="consult">
  <div class="container">
    <div class="contact-layout">
      <div class="reveal">
        <span class="eyebrow">Reach us</span><h2 class="mt-2">Visit, call or write</h2>
        <div class="contact-cards mt-4">
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-pin"/></svg></div><div><h3>Office</h3><p><span data-bind="addressLine1">[Address]</span><br><span data-bind="addressLine2">Noida, Uttar Pradesh</span></p><a class="link-arrow mt-1" data-href="map" href="#" target="_blank" rel="noopener">Get directions <svg class="ic"><use href="#i-arrow"/></svg></a></div></div>
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-phone"/></svg></div><div><h3>Phone &amp; WhatsApp</h3><a class="val" data-href="tel" href="#"><span data-bind="phoneDisplay">+91 00000 00000</span></a><a class="val" data-href="whatsapp" href="#" target="_blank" rel="noopener">Chat on WhatsApp →</a></div></div>
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-mail"/></svg></div><div><h3>Email</h3><a class="val" data-href="mail" href="#"><span data-bind="email">hello@urbannestrealty.example</span></a><p>For listings, partnerships &amp; careers</p></div></div>
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-clock"/></svg></div><div><h3>Office hours</h3><div class="hours mt-1" data-hours style="max-width:340px"></div></div></div>
        </div>
        <div class="socials mt-4"><a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram"><svg class="ic"><use href="#i-instagram"/></svg></a><a data-href="facebook" href="#" target="_blank" rel="noopener" aria-label="Facebook"><svg class="ic"><use href="#i-facebook"/></svg></a><a data-href="linkedin" href="#" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="ic"><use href="#i-linkedin"/></svg></a><a data-href="youtube" href="#" target="_blank" rel="noopener" aria-label="YouTube"><svg class="ic"><use href="#i-youtube"/></svg></a></div>
      </div>
      <div class="form-card reveal d1" id="contact-form-card">
        <h2>Book a consultation or send a message</h2><p>Fields marked <span style="color:var(--error)">*</span> are required. We reply within working hours.</p>
        <form id="contact-form" class="form" novalidate>
          <div class="honeypot" aria-hidden="true"><label for="c-company">Company</label><input id="c-company" name="company" tabindex="-1" autocomplete="off"></div>
          <div class="form__row">
            <div class="field"><label for="c-name">Name <span class="req">*</span></label><input id="c-name" name="name" type="text" autocomplete="name" placeholder="Your name" data-validate="required name"><span class="field__error" role="alert"></span></div>
            <div class="field"><label for="c-phone">Mobile <span class="req">*</span></label><input id="c-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="98765 43210" data-validate="required phone"><span class="field__error" role="alert"></span></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" data-validate="email"><span class="field__error" role="alert"></span></div>
            <div class="field"><label for="c-topic">I'd like to <span class="req">*</span></label><select id="c-topic" name="topic" data-validate="select"><option value="">Choose…</option><option value="Consultation">Book a free consultation</option><option value="Buy">Buy a property</option><option value="Rent">Rent a property</option><option value="Sell">Sell or lease my property</option><option value="New project enquiry">Ask about a new project</option><option value="Project brochure">Request a project brochure</option><option value="Commercial">Commercial space</option><option value="Other">Something else</option></select><span class="field__error" role="alert"></span></div>
          </div>
          <div class="field"><label for="c-budget">Budget (optional)</label><select id="c-budget" name="budget"><option value="">Prefer not to say</option><option>Under ₹50 L</option><option>₹50 L – ₹1 Cr</option><option>₹1 – 2 Cr</option><option>₹2 – 5 Cr</option><option>Above ₹5 Cr</option><option>Rental budget</option></select></div>
          <div class="field"><label for="c-message">Message <span class="req">*</span></label><textarea id="c-message" name="message" placeholder="Tell us what you're looking for — sectors, configuration, timeline…" data-validate="required min10"></textarea><span class="field__error" role="alert"></span></div>
          <div class="form__status" role="status" aria-live="polite"></div>
          <button class="btn btn--primary btn--lg btn--block" type="submit">Send message</button>
          <p class="field__hint center">Submitting opens WhatsApp with your message pre-filled — just hit send.</p>
        </form>
      </div>
    </div>
  </div>
</section>
</main>
''' + footer() + '''<script src="js/forms.js"></script></body></html>'''
write("contact.html", contact)

# ============================ PRIVACY (minimal, noindex) ============================
priv = head("Privacy Policy — UrbanNest Realty", "How UrbanNest Realty handles the information you share through this website.", "privacy.html", '<meta name="robots" content="noindex">') + header() + '''
<main id="main">''' + page_hero("assets/images/hero-contact.jpg", "Legal", "Privacy policy", "Plain-English summary of how we handle your information.", "Privacy", compact=True) + '''
<section class="section section--white"><div class="container prose" style="max-width:760px">
<p class="muted" style="font-size:.92rem">[Template — have this reviewed and completed by your legal advisor before launch.]</p>
<h2>What we collect</h2><p>When you enquire about a property, request a call back or contact us, you share your name, phone number and optionally your email, budget and message. Submissions are sent to us via WhatsApp (and, if configured, our CRM or email) so we can respond to you.</p>
<h2>How we use it</h2><p>Only to respond to your enquiry, arrange site visits and share relevant listings or project details. We don't sell your details to third parties. With your consent we may share your requirement with a developer or owner to arrange a visit.</p>
<h2>Cookies &amp; analytics</h2><p>This site does not set tracking cookies by default. If analytics are enabled, they are anonymised. Embedded maps are served by Google and subject to Google's privacy policy.</p>
<h2>Your choices</h2><p>Ask us at any time to update or delete your details, or to stop contacting you, by emailing <a data-href="mail" href="#"><span data-bind="email">hello@urbannestrealty.example</span></a>.</p>
</div></section></main>
''' + footer() + '''</body></html>'''
write("privacy.html", priv)

# ============================ sitemap / robots ============================
ids = re.findall(r'\{ id: "([^"]+)", title:', open(os.path.join(ROOT, "js", "properties-data.js"), encoding="utf-8").read())
urls = [("", "weekly", "1.0"), ("properties", "daily", "0.9"), ("projects", "weekly", "0.8"), ("about", "monthly", "0.6"), ("agents", "monthly", "0.6"), ("contact", "monthly", "0.7")]
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u, f, p in urls: sm.append(f"  <url><loc>{DOMAIN}{u}</loc><changefreq>{f}</changefreq><priority>{p}</priority></url>")
for i in ids: sm.append(f"  <url><loc>{DOMAIN}property?id={i}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>")
sm.append("</urlset>")
write("sitemap.xml", "\n".join(sm) + "\n")
write("robots.txt", f"User-agent: *\nAllow: /\nDisallow: /privacy\nSitemap: {DOMAIN}sitemap.xml\n")
print("done")
