/* ============================================================
   URBANNEST REALTY — shared behaviours
   data-binding from config · header · mobile nav · reveal · lightbox ·
   price formatting · property/project/agent card renderers ·
   home: search panel → properties.html, featured, projects, categories, agents ·
   stats count-up · footer year
   ============================================================ */
(function () {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Helpers shared with other scripts ---------- */
  const UN = (window.UN = window.UN || {});
  UN.esc = esc;
  UN.waUrl = (text, num) => `https://wa.me/${num || S.whatsapp}?text=${encodeURIComponent(text || `Hi ${S.name}! I'd like to know more about your properties.`)}`;
  /* ₹ formatting: 18500000 → ₹1.85 Cr · 9200000 → ₹92 L · rent 42000 → ₹42,000/mo */
  UN.fmtPrice = (n, purpose) => {
    let s;
    if (n >= 1e7) s = `₹${(n / 1e7).toFixed(2).replace(/\.?0+$/, "")} Cr`;
    else if (n >= 1e5) s = `₹${(n / 1e5).toFixed(2).replace(/\.?0+$/, "")} L`;
    else s = `₹${n.toLocaleString("en-IN")}`;
    return purpose === "rent" ? `${s}/mo` : s;
  };
  UN.fmtPriceLabel = (n) => (n >= 1e7 ? `₹${(n / 1e7).toFixed(2).replace(/\.?0+$/, "")} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2).replace(/\.?0+$/, "")} L` : `₹${n.toLocaleString("en-IN")}`);
  UN.typeLabel = (id) => (window.PROPERTY_TYPES || []).find((t) => t.id === id)?.label || id;
  UN.agent = (id) => (window.AGENTS || []).find((a) => a.id === id) || (window.AGENTS || [])[0];
  UN.PRICE_STEPS = {
    buy: [2500000, 5000000, 7500000, 10000000, 15000000, 20000000, 30000000, 50000000, 100000000],
    rent: [10000, 20000, 30000, 50000, 75000, 100000, 200000, 300000]
  };
  /* (re)build min/max price <select>s for a purpose, keeping a valid current value */
  UN.buildPriceOptions = (select, purpose, kind) => {
    if (!select) return;
    const prev = select.value;
    const opts = [`<option value="">${kind === "min" ? "No min" : "No max"}</option>`].concat(UN.PRICE_STEPS[purpose].map((v) => `<option value="${v}">${UN.fmtPriceLabel(v)}${purpose === "rent" ? "/mo" : ""}</option>`));
    select.innerHTML = opts.join("");
    if (prev && [...select.options].some((o) => o.value === prev)) select.value = prev;
  };
  UN.buildLocationOptions = (select) => {
    if (!select) return;
    const prev = select.value;
    select.innerHTML = `<option value="">All locations</option>` + (window.LOCATIONS || []).map((l) => `<option value="${esc(l)}">${esc(l)}</option>`).join("");
    if (prev) select.value = prev;
  };
  UN.buildTypeOptions = (select) => {
    if (!select) return;
    const prev = select.value;
    select.innerHTML = `<option value="">All types</option>` + (window.PROPERTY_TYPES || []).map((t) => `<option value="${t.id}">${t.label}</option>`).join("");
    if (prev) select.value = prev;
  };

  /* ---------- Bind business data from config.js ---------- */
  UN.bind = (root = document) => {
    $$("[data-bind]", root).forEach((el) => { const k = el.dataset.bind; if (k in S && typeof S[k] === "string") el.textContent = S[k]; });
    $$("[data-href]", root).forEach((el) => {
      const k = el.dataset.href;
      if (k === "tel") el.href = `tel:${S.phoneTel}`;
      else if (k === "mail") el.href = `mailto:${S.email}`;
      else if (k === "whatsapp") el.href = UN.waUrl(el.dataset.waText);
      else if (k === "instagram") el.href = S.instagram;
      else if (k === "facebook") el.href = S.facebook;
      else if (k === "linkedin") el.href = S.linkedin;
      else if (k === "youtube") el.href = S.youtube;
    });
    $$("[data-hours]", root).forEach((box) => { box.innerHTML = (S.hoursLabel || []).map(([d, h]) => `<div><span>${d}</span><b>${h}</b></div>`).join(""); });
  };
  UN.bind();

  /* ---------- Header: transparent → solid on scroll ---------- */
  const header = $(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", scrollY > 40);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = $(".nav__toggle"), drawer = $(".mobile-nav");
  if (toggle && drawer) {
    const setOpen = (open) => {
      drawer.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
      if (open) { header.classList.add("is-scrolled"); $("a", drawer)?.focus({ preventScroll: true }); }
      else { onScroll(); toggle.focus({ preventScroll: true }); }
    };
    toggle.addEventListener("click", () => setOpen(!drawer.classList.contains("is-open")));
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) setOpen(false); });
    matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Current page in nav ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  $$(".nav__links a, .mobile-nav__links a").forEach((a) => {
    const target = (a.getAttribute("href") || "").split(/[#?]/)[0] || "index.html";
    if (target === here || (here === "property.html" && target === "properties.html")) a.setAttribute("aria-current", "page");
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add("in"));

  /* ---------- Card renderers (shared) ---------- */
  UN.propCard = (p, cls = "") => {
    const url = `property.html?id=${encodeURIComponent(p.id)}`;
    const alt = (p.imageAlts && p.imageAlts[0]) || `${p.title} — ${p.locality}`;
    const cfg = p.beds ? `${p.beds} BHK${p.baths ? ` · ${p.baths} Bath` : ""}` : UN.typeLabel(p.type);
    return `
    <article class="prow reveal in ${cls}" data-id="${esc(p.id)}" data-price="${p.price}" data-type="${p.type}" data-purpose="${p.purpose}" data-beds="${p.beds}">
      <span class="prow__n tnum" aria-hidden="true"></span>
      <div class="prow__name">
        <h3><a href="${url}">${esc(p.title)}</a></h3>
        <p class="prow__flags">${p.featured ? `<span class="is-key">Featured</span>` : ""}<span>${p.purpose === "rent" ? "For rent" : "For sale"}</span><span>${UN.typeLabel(p.type)}</span><span>${esc(p.possession)}</span></p>
      </div>
      <p class="prow__loc">${esc(p.locality)}</p>
      <p class="prow__cfg">${esc(cfg)}</p>
      <p class="prow__area tnum">${p.area.toLocaleString("en-IN")}<u>sq ft</u></p>
      <p class="prow__price tnum">${UN.fmtPrice(p.price, p.purpose)}</p>
      <span class="prow__thumb"><img src="${p.images[0]}" alt="${esc(alt)}" loading="lazy" width="1000" height="625"></span>
    </article>`;
  };
  UN.projectCard = (pr, cls = "") => {
    const statusCls = pr.status === "Ready to move" ? "tag--success" : pr.status === "New launch" ? "tag--key" : "tag--light";
    const wa = UN.waUrl(`Hi ${S.name}! I'm interested in ${pr.name} (${pr.locality}). Please share the brochure and price list.`);
    return `
    <article class="project reveal in ${cls}" data-status="${esc(pr.status)}">
      <div class="project__media"><img src="${pr.image}" alt="${esc(pr.imageAlt || `${pr.name} — ${pr.locality}`)}" loading="lazy" width="1000" height="563"><span class="tag ${statusCls}">${esc(pr.status)}</span><span class="project__rera">RERA: ${esc(pr.rera)}</span></div>
      <div class="project__body">
        <h3>${esc(pr.name)}</h3>
        <p class="project__dev">by ${esc(pr.developer)}</p>
        <p class="project__loc"><svg class="ic" aria-hidden="true"><use href="#i-pin"/></svg>${esc(pr.locality)}</p>
        <div class="project__facts"><div><span>Configuration</span><b>${esc(pr.config)}</b></div><div><span>Price from</span><b class="tnum">${UN.fmtPriceLabel(pr.priceFrom)}</b></div><div><span>Possession</span><b>${esc(pr.possession)}</b></div></div>
        <ul class="project__hl">${pr.highlights.map((h) => `<li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>${esc(h)}</li>`).join("")}</ul>
        <div class="project__actions"><a class="btn btn--dark btn--sm" href="${wa}" target="_blank" rel="noopener"><svg class="ic" aria-hidden="true"><use href="#i-whatsapp"/></svg> Enquire</a><a class="btn btn--outline-dark btn--sm" href="contact.html?topic=Project%20brochure&ref=${encodeURIComponent(pr.name)}#contact-form">Request brochure</a></div>
      </div>
    </article>`;
  };
  UN.agentCard = (a, cls = "") => `
    <article class="agent reveal in ${cls}" data-id="${a.id}">
      <div class="frame"><img src="${a.photo}" alt="${esc(a.photoAlt || `Portrait — ${a.name}, ${a.role}`)}" loading="lazy" width="600" height="750"></div>
      <div class="agent__body">
        <span class="agent__role">${esc(a.role)}</span>
        <h3>${esc(a.name)}</h3>
        <p class="agent__spec">${esc(a.specialisation)}</p>
        <p class="agent__langs"><svg class="ic" aria-hidden="true"><use href="#i-globe"/></svg>${a.languages.join(" · ")}</p>
        <div class="agent__actions"><a class="btn btn--outline-dark btn--sm" href="tel:${a.phoneTel}"><svg class="ic" aria-hidden="true"><use href="#i-phone"/></svg> Call</a><a class="btn btn--whatsapp btn--sm" href="${UN.waUrl(`Hi ${a.name}, I found you on ${S.name}'s website and would like some help finding a property.`, a.whatsapp)}" target="_blank" rel="noopener"><svg class="ic" aria-hidden="true"><use href="#i-whatsapp"/></svg> WhatsApp</a></div>
        <div class="agent__links"><a class="link-arrow" href="properties.html?agent=${a.id}">View listings <svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg></a><a class="muted" href="mailto:${a.email}">${esc(a.email)}</a></div>
      </div>
    </article>`;

  /* ---------- Search panels (home hero + anywhere with [data-search-panel]) ---------- */
  $$("[data-search-panel]").forEach((form) => {
    const seg = $(".seg", form), purposeIn = $("input[name=purpose]", form);
    const min = $("select[name=min]", form), max = $("select[name=max]", form);
    UN.buildLocationOptions($("select[name=loc]", form));
    UN.buildTypeOptions($("select[name=type]", form));
    const setPurpose = (p) => { purposeIn.value = p; $$("button", seg).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.purpose === p))); UN.buildPriceOptions(min, p, "min"); UN.buildPriceOptions(max, p, "max"); };
    setPurpose(purposeIn.value || "buy");
    seg?.addEventListener("click", (e) => { const b = e.target.closest("button[data-purpose]"); if (b) setPurpose(b.dataset.purpose); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const sp = new URLSearchParams();
      new FormData(form).forEach((v, k) => { if (String(v).trim() !== "") sp.set(k, v); });
      location.href = `properties.html?${sp.toString()}`;
    });
    const hint = $("[data-search-hint]", form);
    if (hint && window.PROPERTIES) hint.textContent = `${window.PROPERTIES.length} listings across Noida & NCR`;
  });

  /* ---------- Home: featured, projects, categories, agents ---------- */
  const P = window.PROPERTIES || [];
  const feat = $("[data-featured]");
  if (feat) feat.innerHTML = P.filter((p) => p.featured).slice(0, 6).map((p, i) => UN.propCard(p, `d${i % 3}`)).join("");
  const homeProjects = $("[data-home-projects]");
  if (homeProjects && window.PROJECTS) homeProjects.innerHTML = window.PROJECTS.slice(0, 3).map((pr, i) => UN.projectCard(pr, `d${i}`)).join("");
  $$("[data-cat-count]").forEach((el) => { const n = P.filter((p) => p.type === el.dataset.catCount).length; el.textContent = `${n} listing${n === 1 ? "" : "s"}`; });
  const homeAgents = $("[data-home-agents]");
  if (homeAgents && window.AGENTS) homeAgents.innerHTML = window.AGENTS.slice(0, 3).map((a, i) => UN.agentCard(a, `d${i}`)).join("");
  const allAgents = $("[data-all-agents]");
  if (allAgents && window.AGENTS) allAgents.innerHTML = window.AGENTS.map((a, i) => UN.agentCard(a, `d${i % 3}`)).join("");
  const recent = $("[data-recent]");
  if (recent) recent.innerHTML = P.slice().sort((a, b) => (a.listed < b.listed ? 1 : -1)).slice(0, 3).map((p, i) => UN.propCard(p, `d${i}`)).join("");

  /* ---------- Statistics count-up (values are placeholders — see README) ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length, suf = el.dataset.suffix || "", pre = el.dataset.prefix || "";
      if (reduceMotion) { el.textContent = pre + target.toFixed(dec) + suf; return; }
      const t0 = performance.now(), dur = 1600;
      const tick = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + (target * e).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(tick); else el.dataset.done = "true"; };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.4 });
      counters.forEach((c) => io.observe(c));
    } else counters.forEach(run);
  }

  /* ---------- Lightbox (generic): UN.lightbox.open(items, index) or click on .g-item ---------- */
  const lb = $(".lightbox");
  if (lb) {
    const img = $("img", lb), cap = $(".lightbox__caption", lb);
    let items = [], idx = 0, lastFocus = null;
    const show = (i) => {
      if (!items.length) return;
      idx = (i + items.length) % items.length;
      img.src = items[idx].src; img.alt = items[idx].alt || "";
      cap.textContent = `${idx + 1} / ${items.length}${items[idx].caption ? " · " + items[idx].caption : ""}`;
    };
    const open = (list, i) => { items = list; lastFocus = document.activeElement; show(i || 0); lb.classList.add("is-open"); document.body.classList.add("nav-open"); $(".lightbox__close", lb).focus(); };
    const close = () => { lb.classList.remove("is-open"); document.body.classList.remove("nav-open"); lastFocus?.focus?.({ preventScroll: true }); };
    UN.lightbox = { open, close, show, get index() { return idx; }, get isOpen() { return lb.classList.contains("is-open"); } };
    document.addEventListener("click", (e) => {
      const it = e.target.closest(".g-item"); if (!it) return;
      const all = $$(".g-item:not([hidden])");
      open(all.map((g) => ({ src: g.dataset.full || $("img", g).src, alt: $("img", g).alt, caption: $("figcaption", g)?.textContent || "" })), all.indexOf(it));
    });
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__prev", lb).addEventListener("click", () => show(idx - 1));
    $(".lightbox__next", lb).addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(idx - 1); if (e.key === "ArrowRight") show(idx + 1);
    });
    let x0 = null;
    lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
