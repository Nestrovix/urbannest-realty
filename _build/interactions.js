// Site-specific interaction tests for UrbanNest Realty — called by /home/claude/sites/_kit/qa.js
// module.exports = async (browser, BASE, report) => {...}  → writes results into report.checks
module.exports = async (browser, BASE, report) => {
  const C = report.checks;
  const fail = (k, e) => { C[k] = { error: String(e && e.message || e).slice(0, 160) }; report.errors.push(`interactions ${k}: ${String(e && e.message || e).slice(0, 120)}`); };
  const newPage = async (vp) => { const p = await browser.newPage({ viewport: vp || { width: 1440, height: 900 } }); await p.addInitScript(() => { window.open = () => null; }); p.on('pageerror', (e) => report.errors.push(`interactions pageerror: ${e.message.slice(0, 140)}`)); p.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) report.missingAssets.push(`interactions: ${r.status()} ${r.url().replace(BASE, '')}`); }); return p; };
  const fs = require('fs'), path = require('path'), ROOT = path.resolve(__dirname, '..');

  // 0. every image path referenced in the data files exists on disk
  try {
    const src = ['properties-data.js', 'projects-data.js', 'agents-data.js'].map((f) => fs.readFileSync(path.join(ROOT, 'js', f), 'utf8')).join('\n');
    const ids = [...src.matchAll(/\{ id: "([^"]+)", title:/g)].map((m) => m[1]);
    const missing = [];
    ids.forEach((id) => { for (let n = 1; n <= 4; n++) { const f = path.join(ROOT, 'assets/images/properties', `${id}-${n}.jpg`); if (!fs.existsSync(f)) missing.push(`${id}-${n}`); } });
    [...src.matchAll(/"(assets\/images\/[^"]+\.svg)"/g)].forEach((m) => { if (!fs.existsSync(path.join(ROOT, m[1]))) missing.push(m[1]); });
    C['data images exist'] = { properties: ids.length, missing };
    if (missing.length) report.missingAssets.push(...missing.map((m) => `data: ${m}`));
  } catch (e) { fail('data images exist', e); }

  // 1. Home hero query builder: live count from the real data → properties.html?type=villa
  try {
    const p = await newPage();
    await p.goto(BASE + 'index.html', { waitUntil: 'networkidle' });
    const read = () => p.$eval('[data-qb-count]', (e) => e.textContent.trim());
    const optionCounts = await p.evaluate(() => ({
      purpose: document.querySelectorAll('#qb-purpose option').length,
      what: document.querySelectorAll('#qb-what option').length,
      where: document.querySelectorAll('#qb-where option').length,
      budget: document.querySelectorAll('#qb-budget option').length
    }));
    const firstPaint = await read();                 // default: Buy · home · Noida & NCR · any price
    await p.selectOption('#qb-what', 'beds:3');
    const threeBhk = await read();
    await p.selectOption('#qb-where', 'Sector 150');
    const threeBhk150 = await read();
    await p.selectOption('#qb-purpose', 'rent');
    const rentBudgetOpts = await p.$$eval('#qb-budget option', (o) => o.map((x) => x.textContent));
    await p.selectOption('#qb-purpose', 'buy');
    await p.selectOption('#qb-where', '');
    await p.selectOption('#qb-what', 'type:villa');
    const villas = await read();
    const href = await p.$eval('[data-qb-link]', (a) => a.getAttribute('href'));
    await Promise.all([p.waitForNavigation({ waitUntil: 'networkidle' }), p.click('[data-qb-link]')]);
    const url = p.url();
    const cards = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => ({ type: x.dataset.type, purpose: x.dataset.purpose })));
    const typeSel = await p.$eval('#f-type', (s) => s.value);
    C['home query builder → properties'] = {
      optionCounts, firstPaint, threeBhk, threeBhk150, villas, rentBudgetOpts: rentBudgetOpts.slice(0, 3),
      href, url: url.replace(BASE, ''), results: cards.length,
      allVillaBuy: cards.length > 0 && cards.every((c) => c.type === 'villa' && c.purpose === 'buy'),
      formReflects: typeSel === 'villa'
    };
    await p.close();
  } catch (e) { fail('home query builder → properties', e); }

  // 2. Listing page: live filter counts, sort, buy/rent toggle, empty state, reset, URL sync, agent param
  try {
    const p = await newPage();
    await p.goto(BASE + 'properties.html', { waitUntil: 'networkidle' });
    const total = await p.$$eval('[data-results] .prop-card', (c) => c.length);
    const countText0 = await p.$eval('[data-count-text]', (e) => e.textContent.trim());
    await p.selectOption('#f-type', 'apartment'); await p.waitForTimeout(150);
    const apts = await p.$$eval('[data-results] .prop-card', (c) => c.length);
    const countText1 = await p.$eval('[data-count-text]', (e) => e.textContent.trim());
    const urlHasType = p.url().includes('type=apartment');
    await p.selectOption('#sort', 'price-asc'); await p.waitForTimeout(150);
    const asc = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => +x.dataset.price));
    await p.selectOption('#sort', 'price-desc'); await p.waitForTimeout(150);
    const desc = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => +x.dataset.price));
    await p.selectOption('#sort', 'newest'); await p.waitForTimeout(150);
    const newestFirst = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => x.dataset.id));
    // buy → rent toggle
    await p.click('[data-purpose-seg] button[data-purpose="rent"]'); await p.waitForTimeout(150);
    const rentCards = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => x.dataset.purpose));
    const rentPriceOpt = await p.$eval('#f-max option:nth-child(2)', (o) => o.textContent);
    await p.click('[data-purpose-seg] button[data-purpose="buy"]'); await p.waitForTimeout(100);
    // empty state
    await p.selectOption('#f-type', 'plot'); await p.selectOption('#f-beds', '5'); await p.waitForTimeout(150);
    const emptyVisible = await p.$eval('[data-empty]', (e) => !e.hidden && getComputedStyle(e).display !== 'none');
    const emptyCount = await p.$$eval('[data-results] .prop-card', (c) => c.length);
    await p.click('[data-empty] [data-reset]'); await p.waitForTimeout(150);
    const afterReset = await p.$$eval('[data-results] .prop-card', (c) => c.length);
    // keyword search
    await p.fill('#f-q', 'golf'); await p.waitForTimeout(350);
    const kw = await p.$$eval('[data-results] .prop-card h3', (h) => h.map((x) => x.textContent));
    await p.fill('#f-q', ''); await p.waitForTimeout(300);
    // price range
    await p.selectOption('#f-min', '10000000'); await p.selectOption('#f-max', '30000000'); await p.waitForTimeout(150);
    const priced = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => +x.dataset.price));
    // URL params direct load incl. agent + loc + purpose
    await p.goto(BASE + 'properties.html?purpose=rent&loc=Sector%20137&agent=a1', { waitUntil: 'networkidle' });
    const direct = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => x.dataset.id));
    const directChips = await p.$$eval('[data-active-chips] .chip', (c) => c.map((x) => x.textContent.trim()));
    C['listing filters/sort'] = {
      total, countText0, apartments: apts, countText1, liveCountChanged: apts !== total && apts > 0, urlHasType,
      sortAsc: asc.every((v, i) => i === 0 || asc[i - 1] <= v), sortDesc: desc.every((v, i) => i === 0 || desc[i - 1] >= v), newestFirst: newestFirst[0],
      rentOnly: rentCards.length > 0 && rentCards.every((x) => x === 'rent'), rentCount: rentCards.length, rentPriceOpt,
      emptyState: emptyVisible && emptyCount === 0, resetRestores: afterReset === total,
      keyword: kw, priceRangeOk: priced.length > 0 && priced.every((v) => v >= 1e7 && v <= 3e7),
      directParams: direct, directChips
    };
    await p.close();
  } catch (e) { fail('listing filters/sort', e); }

  // 3. Mobile: filter bottom-sheet opens / applies / closes; listing 1-col
  try {
    const p = await newPage({ width: 390, height: 844 });
    await p.goto(BASE + 'properties.html', { waitUntil: 'networkidle' });
    const toggleVisible = await p.$eval('[data-filters-open]', (b) => getComputedStyle(b).display !== 'none');
    const sheetHiddenBefore = await p.$eval('#filters', (s) => !s.classList.contains('is-open'));
    await p.click('[data-filters-open]'); await p.waitForTimeout(450);
    const open = await p.$eval('#filters', (s) => s.classList.contains('is-open') && getComputedStyle(s).visibility === 'visible');
    const sheetBox = await p.$eval('#filters', (s) => { const r = s.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight }; });
    await p.selectOption('#f-type', 'villa'); await p.waitForTimeout(150);
    const applyText = await p.$eval('[data-filters-apply]', (b) => b.textContent.trim());
    await p.click('[data-filters-apply]'); await p.waitForTimeout(450);
    const closed = await p.$eval('#filters', (s) => !s.classList.contains('is-open'));
    const villas = await p.$$eval('[data-results] .prop-card', (c) => c.map((x) => x.dataset.type));
    const cols = await p.$eval('[data-results]', (g) => getComputedStyle(g).gridTemplateColumns.split(' ').length);
    // Escape closes
    await p.click('[data-filters-open]'); await p.waitForTimeout(350); await p.keyboard.press('Escape'); await p.waitForTimeout(350);
    const escClosed = await p.$eval('#filters', (s) => !s.classList.contains('is-open'));
    C['mobile filter sheet'] = { toggleVisible, sheetHiddenBefore, opens: open, sheetBox, applyText, appliesAndCloses: closed && villas.length > 0 && villas.every((t) => t === 'villa'), mobileCols: cols, escCloses: escClosed };
    // tablet 2-col
    const t = await newPage({ width: 820, height: 1180 }); await t.goto(BASE + 'properties.html', { waitUntil: 'networkidle' });
    C['tablet listing cols'] = await t.$eval('[data-results]', (g) => getComputedStyle(g).gridTemplateColumns.split(' ').length); await t.close();
    await p.close();
  } catch (e) { fail('mobile filter sheet', e); }

  // 4. Property detail from ?id= : title/price/gallery/agent/facts/amenities/similar/map + lightbox + enquiry form
  try {
    const p = await newPage();
    await p.goto(BASE + 'property.html?id=skyline-3bhk-sector-150', { waitUntil: 'networkidle' });
    const title = await p.$eval('[data-p-title]', (e) => e.textContent.trim());
    const h1s = await p.$$eval('h1', (h) => h.length);
    const price = await p.$eval('[data-p-price]', (e) => e.textContent.trim());
    const docTitle = await p.title();
    const mainSrc = await p.$eval('[data-gallery-main] img', (i) => i.getAttribute('src'));
    const thumbs = await p.$$eval('[data-gallery-thumbs] button', (b) => b.length);
    await p.click('[data-gallery-thumbs] button:nth-child(3)'); await p.waitForTimeout(100);
    const mainAfterThumb = await p.$eval('[data-gallery-main] img', (i) => i.getAttribute('src'));
    const countTxt = await p.$eval('[data-gallery-count]', (e) => e.textContent.trim());
    const agent = await p.$eval('[data-p-agent] h3', (e) => e.textContent.trim());
    const agentWa = await p.$eval('[data-p-agent] a.btn--whatsapp', (a) => a.href);
    const facts = await p.$$eval('[data-p-facts] .fact', (f) => f.length);
    const amenities = await p.$$eval('[data-p-amenities] li', (l) => l.length);
    const fpHref = await p.$eval('[data-p-floorplan-link]', (a) => a.getAttribute('href'));
    const similar = await p.$$eval('[data-p-similar] .prop-card', (c) => c.map((x) => x.dataset.id));
    const crumb = await p.$eval('[data-p-crumb]', (e) => e.textContent.trim());
    const prefill = await p.$eval('#e-message', (t) => t.value);
    const ld = await p.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent)['@type']));
    // lightbox
    await p.click('[data-gallery-main]'); await p.waitForTimeout(200);
    const lbOpen = await p.$eval('.lightbox', (l) => l.classList.contains('is-open'));
    const lbSrc0 = await p.$eval('.lightbox img', (i) => i.getAttribute('src'));
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(100);
    const lbSrc1 = await p.$eval('.lightbox img', (i) => i.getAttribute('src'));
    const lbCap = await p.$eval('.lightbox__caption', (e) => e.textContent.trim());
    await p.keyboard.press('Escape'); await p.waitForTimeout(100);
    const lbClosed = await p.$eval('.lightbox', (l) => !l.classList.contains('is-open'));
    // enquiry form: blocked when invalid
    await p.fill('#e-message', ''); await p.click('#enquiry-form button[type=submit]'); await p.waitForTimeout(200);
    const invalid = await p.$$eval('#enquiry-form .field.is-invalid', (f) => f.map((x) => x.querySelector('input,textarea,select').id));
    const statusErr = await p.$eval('#enquiry-form .form__status', (s) => s.classList.contains('is-error') && s.textContent.trim());
    const successHiddenBefore = await p.$eval('#enquiry-success', (s) => !s.classList.contains('is-visible'));
    // bad phone
    await p.fill('#e-name', 'Test Buyer'); await p.fill('#e-phone', '12345'); await p.fill('#e-message', 'Interested in a site visit this weekend.');
    await p.click('#enquiry-form button[type=submit]'); await p.waitForTimeout(200);
    const phoneErr = await p.$eval('#e-phone', (i) => i.closest('.field').classList.contains('is-invalid') && i.closest('.field').querySelector('.field__error').textContent);
    // valid
    await p.fill('#e-phone', '98765 43210'); await p.fill('#e-email', 'buyer@example.com');
    await p.click('#enquiry-form button[type=submit]');
    const busy = await p.$eval('#enquiry-form button[type=submit]', (b) => b.getAttribute('aria-busy'));
    await p.waitForTimeout(1100);
    const success = await p.$eval('#enquiry-success', (s) => s.classList.contains('is-visible'));
    const formHidden = await p.$eval('#enquiry-form', (f) => f.hidden);
    const waAgain = await p.$eval('[data-wa-again]', (a) => a.href);
      lightbox: { opens: lbOpen, src0: lbSrc0, arrowAdvances: lbSrc1 !== lbSrc0, caption: lbCap, escCloses: lbClosed },
      enquiry: { blockedInvalid: invalid, statusErr, successHiddenBefore, phoneErr, busyState: busy, success, formHidden, waAgainHasDetails: decodeURIComponent(waAgain).includes('Test Buyer') && decodeURIComponent(waAgain).includes('Skyline') } };
    // not-found state
    await p.goto(BASE + 'property.html?id=does-not-exist', { waitUntil: 'networkidle' });
    C['property not found'] = { h1: await p.$eval('h1', (h) => h.textContent.trim()), h1Count: await p.$$eval('h1', (h) => h.length), suggestions: await p.$$eval('[data-nf-suggest] .prop-card', (c) => c.length) };
    await p.close();
  } catch (e) { fail('property detail', e); }

  // 5. Mobile detail: sticky Call/WhatsApp/Enquire bar visible; gallery thumbs ≥ 40px; home has no sticky bar
  try {
    const p = await newPage({ width: 390, height: 844 });
    await p.goto(BASE + 'property.html?id=pool-villa-sector-128', { waitUntil: 'networkidle' });
    const bar = await p.$eval('.sticky-prop', (b) => { const cs = getComputedStyle(b), r = b.getBoundingClientRect(); return { display: cs.display, position: cs.position, bottom: Math.round(innerHeight - r.bottom), height: Math.round(r.height), buttons: b.querySelectorAll('.btn').length, visible: cs.display !== 'none' && r.height > 0 }; });
    const btnSizes = await p.$$eval('.sticky-prop .btn', (bs) => bs.map((b) => Math.round(b.getBoundingClientRect().height)));
    const thumbH = await p.$$eval('[data-gallery-thumbs] button', (bs) => bs.map((b) => Math.round(b.getBoundingClientRect().height)));
    const floatHidden = await p.$eval('.whatsapp-float', (f) => getComputedStyle(f).display === 'none');
    const enquireHref = await p.$eval('.sticky-prop a[href="#enquiry"]', (a) => !!document.querySelector('#enquiry'));
    await p.goto(BASE + 'index.html', { waitUntil: 'networkidle' });
    const homeBar = await p.$('.sticky-prop');
    C['mobile detail sticky bar'] = { ...bar, btnSizes, thumbH, whatsappFloatHiddenOnDetail: floatHidden, enquireAnchorExists: enquireHref, homeHasNoStickyBar: !homeBar };
    await p.close();
  } catch (e) { fail('mobile detail sticky bar', e); }

  // 6. Home: featured/projects/categories/agents render, stats count-up, callback form, drawer nav
  try {
    const p = await newPage();
    await p.goto(BASE + 'index.html', { waitUntil: 'networkidle' });
    const featured = await p.$$eval('[data-featured] .prop-card', (c) => c.length);
    const projects = await p.$$eval('[data-home-projects] .project', (c) => c.length);
    const agents = await p.$$eval('[data-home-agents] .agent', (c) => c.length);
    const cats = await p.$$eval('[data-cat-count]', (c) => c.map((x) => x.textContent));
    const sectionOrder = await p.evaluate(() => [...document.querySelectorAll('main > section')].map((s) => s.id || s.className.split(' ')[0]));
    await p.evaluate(() => document.querySelector('#stats').scrollIntoView()); await p.waitForTimeout(2200);
    const stats = await p.$$eval('[data-count]', (c) => c.map((x) => x.textContent));
    // callback form
    await p.click('#callback-form button[type=submit]'); await p.waitForTimeout(150);
    const cbInvalid = await p.$$eval('#callback-form .field.is-invalid', (f) => f.length);
    await p.fill('#k-name', 'Priya Test'); await p.fill('#k-phone', '9876543210'); await p.selectOption('#k-interest', 'Buy a home');
    await p.click('#callback-form button[type=submit]'); await p.waitForTimeout(1100);
    const cbSuccess = await p.$eval('#callback-form .form__status', (s) => s.classList.contains('is-success'));
    const bound = await p.$$eval('[data-href]', (as) => as.filter((a) => a.getAttribute('href') === '#').length);
    const waFloat = await p.$eval('.whatsapp-float', (a) => a.href);
    await p.close();
  } catch (e) { fail('home render', e); }

  // 7. Contact form validation + success + ?topic= prefill; projects status filter; agents page
  try {
    const p = await newPage();
    await p.goto(BASE + 'contact.html?topic=Project%20brochure&ref=Verdant%20Heights', { waitUntil: 'networkidle' });
    const topic = await p.$eval('#c-topic', (s) => s.value), msg = await p.$eval('#c-message', (t) => t.value);
    await p.fill('#c-message', ''); await p.click('#contact-form button[type=submit]'); await p.waitForTimeout(150);
    const blocked = await p.$$eval('#contact-form .field.is-invalid', (f) => f.map((x) => x.querySelector('input,select,textarea').id));
    await p.fill('#c-name', 'Rahul Test'); await p.fill('#c-phone', '+91 00000 00000'); await p.fill('#c-email', 'bad-email'); await p.fill('#c-message', 'Please send the brochure and price list.');
    await p.click('#contact-form button[type=submit]'); await p.waitForTimeout(150);
    const emailErr = await p.$eval('#c-email', (i) => i.closest('.field').classList.contains('is-invalid'));
    await p.fill('#c-email', 'rahul@example.com'); await p.click('#contact-form button[type=submit]'); await p.waitForTimeout(1100);
    const success = await p.$eval('#contact-form .form__status', (s) => s.classList.contains('is-success'));
    C['contact form'] = { topicPrefill: topic, refPrefill: msg.includes('Verdant Heights'), blocked, emailErr, success };
    await p.goto(BASE + 'projects.html', { waitUntil: 'networkidle' });
    const all = await p.$$eval('[data-all-projects] .project', (c) => c.length);
    await p.click('[data-project-filters] .chip[data-status="Ready to move"]'); await p.waitForTimeout(150);
    const ready = await p.$$eval('[data-all-projects] .project', (c) => c.map((x) => x.dataset.status));
    C['projects filter'] = { all, ready, readyOnly: ready.length > 0 && ready.every((s) => s === 'Ready to move') };
    await p.goto(BASE + 'agents.html', { waitUntil: 'networkidle' });
    C['agents page'] = { agents: await p.$$eval('[data-all-agents] .agent', (c) => c.length), listingsLink: await p.$eval('[data-all-agents] .agent a[href*="agent="]', (a) => a.getAttribute('href')) };
    await p.close();
  } catch (e) { fail('contact/projects/agents', e); }

  // 8. Drawer nav on mobile (explicit): open → link focus, Escape closes, body scroll lock
  try {
    const p = await newPage({ width: 390, height: 844 });
    await p.goto(BASE + 'about.html', { waitUntil: 'networkidle' });
    await p.click('.nav__toggle'); await p.waitForTimeout(400);
    const open = await p.evaluate(() => ({ open: document.querySelector('.mobile-nav').classList.contains('is-open'), expanded: document.querySelector('.nav__toggle').getAttribute('aria-expanded'), lock: document.body.classList.contains('nav-open'), links: document.querySelectorAll('.mobile-nav__links a').length, current: document.querySelector('.mobile-nav__links a[aria-current]')?.textContent }));
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    const closed = await p.evaluate(() => !document.querySelector('.mobile-nav').classList.contains('is-open') && !document.body.classList.contains('nav-open'));
    C['drawer nav'] = { ...open, escCloses: closed };
    await p.close();
  } catch (e) { fail('drawer nav', e); }
};
