# Shared partials injected into every page (build-time only; output is plain static HTML)
ICONS = '''<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></symbol>
<symbol id="i-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
<symbol id="i-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
<symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" fill="none"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></symbol>
<symbol id="i-instagram" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></symbol>
<symbol id="i-facebook" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></symbol>
<symbol id="i-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></symbol>
<symbol id="i-youtube" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></symbol>
<symbol id="i-bed" viewBox="0 0 24 24"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></symbol>
<symbol id="i-bath" viewBox="0 0 24 24"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="m10 5-2 2"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M17 19v2"/></symbol>
<symbol id="i-area" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><path d="M8 12h8"/></symbol>
<symbol id="i-home" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></symbol>
<symbol id="i-building" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></symbol>
<symbol id="i-key" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></symbol>
<symbol id="i-sliders" viewBox="0 0 24 24"><path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/></symbol>
<symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></symbol>
<symbol id="i-map" viewBox="0 0 24 24"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></symbol>
<symbol id="i-trend" viewBox="0 0 24 24"><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></symbol>
<symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></symbol>
<symbol id="i-file" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></symbol>
<symbol id="i-sofa" viewBox="0 0 24 24"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M4 18v2"/><path d="M20 18v2"/></symbol>
<symbol id="i-calendar" viewBox="0 0 24 24"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
<symbol id="i-rupee" viewBox="0 0 24 24"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></symbol>
<symbol id="i-image" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></symbol>
<symbol id="i-handshake" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></symbol>
<symbol id="i-percent" viewBox="0 0 24 24"><path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></symbol>
<symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></symbol>
<symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></symbol>
</defs></svg>'''

BRAND_MARK = '''<svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="#17181B"/><rect x="13" y="15" width="38" height="7" fill="#2F5BEA"/><rect x="13" y="28" width="26" height="7" fill="#F4F5F7"/><rect x="13" y="41" width="32" height="7" fill="#F4F5F7" opacity=".45"/></svg>'''

NAV_LINKS = [("index.html","Home"),("properties.html","Properties"),("projects.html","Projects"),("about.html","About"),("agents.html","Agents"),("contact.html","Contact")]

def header():
    links = "".join(f'<li><a href="{h}">{t}</a></li>' for h,t in NAV_LINKS)
    mlinks = "".join(f'<a href="{h}">{t}</a>' for h,t in NAV_LINKS)
    return f'''<a class="skip-link" href="#main">Skip to content</a>
{ICONS}
<header class="site-header" id="top">
  <div class="container--wide">
    <a class="brand" href="index.html" aria-label="UrbanNest Realty — home">{BRAND_MARK}<span>UrbanNest<small>Realty · Noida</small></span></a>
    <nav class="nav" aria-label="Primary">
      <ul class="nav__links">{links}</ul>
      <div class="nav__cta">
        <a class="nav__phone" data-href="tel" href="#"><svg class="ic"><use href="#i-phone"/></svg><span data-bind="phoneDisplay">+91 00000 00000</span></a>
        <a class="btn btn--primary" href="contact.html#consult">Book a Consultation</a>
        <button class="nav__toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><span></span></button>
      </div>
    </nav>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav">
  <nav class="mobile-nav__links" aria-label="Mobile">{mlinks}</nav>
  <a class="btn btn--primary btn--lg" href="contact.html#consult">Book a Consultation</a>
  <div class="mobile-nav__meta">
    <a data-href="tel" href="#"><svg class="ic"><use href="#i-phone"/></svg> <span data-bind="phoneDisplay">+91 00000 00000</span></a>
    <a data-href="whatsapp" href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> Chat on WhatsApp</a>
    <a data-href="mail" href="#"><svg class="ic"><use href="#i-mail"/></svg> <span data-bind="email">hello@urbannestrealty.example</span></a>
  </div>
</div>'''

SCRIPTS = '''<script src="js/config.js"></script>
<script src="js/properties-data.js"></script>
<script src="js/projects-data.js"></script>
<script src="js/agents-data.js"></script>
<script src="js/main.js"></script>'''

def footer(whatsapp_float=True):
    return f'''<!-- 12. FOOTER -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html">{BRAND_MARK}<span>UrbanNest<small>Realty · Noida</small></span></a>
        <p>Premium residential and commercial real estate advisory in Noida, Greater Noida and the wider NCR — verified listings, honest pricing and end-to-end support.</p>
        <div class="socials mt-3">
          <a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram"><svg class="ic"><use href="#i-instagram"/></svg></a>
          <a data-href="facebook" href="#" target="_blank" rel="noopener" aria-label="Facebook"><svg class="ic"><use href="#i-facebook"/></svg></a>
          <a data-href="linkedin" href="#" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="ic"><use href="#i-linkedin"/></svg></a>
          <a data-href="youtube" href="#" target="_blank" rel="noopener" aria-label="YouTube"><svg class="ic"><use href="#i-youtube"/></svg></a>
        </div>
      </div>
      <div><h4>Explore</h4><div class="footer-links"><a href="properties.html">All properties</a><a href="projects.html">New projects</a><a href="about.html">About us</a><a href="agents.html">Our agents</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy policy</a></div></div>
      <div><h4>Browse</h4><div class="footer-links"><a href="properties.html?type=apartment">Apartments for sale</a><a href="properties.html?type=villa">Villas</a><a href="properties.html?type=penthouse">Penthouses</a><a href="properties.html?type=plot">Plots</a><a href="properties.html?type=commercial">Commercial</a><a href="properties.html?purpose=rent">Homes for rent</a></div></div>
      <div><h4>Contact</h4><div class="footer-contact">
        <span><svg class="ic"><use href="#i-pin"/></svg><span><span data-bind="addressLine1">[Address]</span><br><span data-bind="addressLine2">Noida, Uttar Pradesh</span></span></span>
        <a data-href="tel" href="#"><svg class="ic"><use href="#i-phone"/></svg><span data-bind="phoneDisplay">+91 00000 00000</span></a>
        <a data-href="mail" href="#"><svg class="ic"><use href="#i-mail"/></svg><span data-bind="email">hello@urbannestrealty.example</span></a>
        <span><svg class="ic"><use href="#i-clock"/></svg><span>Mon – Sat 10 AM – 7 PM<br>Sun by appointment</span></span>
      </div></div>
    </div>
    <p class="footer-legal">RERA registration: <span data-bind="rera">[RERA registration no.]</span> · Prices shown are indicative and subject to change; verify all details, approvals and RERA registrations before transacting.</p>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> UrbanNest Realty. All rights reserved.</span>
      <span><a href="privacy.html">Privacy</a> · <a href="contact.html">Contact</a> · <a href="properties.html">Properties</a></span>
      <span class="made">Designed &amp; built by Nestrovix</span>
    </div>
  </div>
</footer>
{'<a class="whatsapp-float" data-href="whatsapp" href="#" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><svg class="ic"><use href="#i-whatsapp"/></svg></a>' if whatsapp_float else ''}
{SCRIPTS}'''

DOMAIN = "https://urbannest.vercel.app/"

def head(title, desc, canonical, extra="", og_img="assets/og-image.png", body_class=""):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{DOMAIN}{canonical}">
<meta property="og:type" content="website"><meta property="og:site_name" content="UrbanNest Realty">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">
<meta property="og:image" content="{DOMAIN}{og_img}"><meta property="og:url" content="{DOMAIN}{canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#17181B">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/schibsted-grotesk-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/newsreader-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/style.css">
<script>document.documentElement.classList.add("js")</script>
{extra}
</head>
<body{(' class="' + body_class + '"') if body_class else ''}>'''

# Alt text for the page-hero photographs (see CREDITS.md for the source of each shot).
HERO_ALT = {
    "assets/images/hero-properties.jpg": "Two tall contemporary residential buildings photographed from below against a clear blue sky",
    "assets/images/hero-projects.jpg": "A tower crane standing over a new development, its jib crossing an open blue sky",
    "assets/images/hero-about.jpg": "A long office corridor with glass partition walls, concrete columns and exposed ceiling ducts",
    "assets/images/hero-agents.jpg": "Four colleagues with open laptops around a meeting table, listening to a fifth person speaking",
    "assets/images/hero-contact.jpg": "A bright reception lobby with a marble front desk, pale stone floor and potted plants",
}

def page_hero(img, eyebrow, title, text, crumb, compact=False, img_alt=None):
    img_alt = HERO_ALT.get(img, "") if img_alt is None else img_alt
    return f'''<section class="page-hero{' page-hero--compact' if compact else ''}">
  <div class="hero__media"><img src="{img}" alt="{img_alt}" width="1600" height="667" fetchpriority="high"></div>
  <div class="hero__overlay"></div>
  <div class="container page-hero__content">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span aria-current="page">{crumb}</span></nav>
    <span class="eyebrow">{eyebrow}</span>
    <h1>{title}</h1>
    <p class="lead">{text}</p>
  </div>
</section>'''

LIGHTBOX = '''<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"><button class="lightbox__btn lightbox__close" aria-label="Close"><svg class="ic"><use href="#i-x"/></svg></button><button class="lightbox__btn lightbox__prev" aria-label="Previous image"><svg class="ic"><use href="#i-left"/></svg></button><img src="" alt=""><button class="lightbox__btn lightbox__next" aria-label="Next image"><svg class="ic"><use href="#i-right"/></svg></button><div class="lightbox__caption"></div></div>'''
