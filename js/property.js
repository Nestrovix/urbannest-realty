/* ============================================================
   URBANNEST REALTY — Property detail page (property.html?id=<id>)
   Renders everything from js/properties-data.js: breadcrumb, title, price,
   gallery (main + thumbs + lightbox), key facts, overview, amenities,
   floor plan + download, agent card,
   enquiry form prefill, similar properties, sticky mobile bar, JSON-LD.
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const UN = window.UN, S = window.SITE || {}, P = window.PROPERTIES || [];
  const page = $("[data-prop-page]"), nf = $("[data-prop-notfound]"); if (!page || !UN) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = P.find((x) => x.id === id);
  if (!p) {
    page.remove(); nf.hidden = false;
    document.title = "Property not found — UrbanNest Realty";
    const sug = $("[data-nf-suggest]"); if (sug) sug.innerHTML = P.filter((x) => x.featured).slice(0, 3).map((x) => UN.propCard(x)).join("");
    return;
  }
  nf.remove();
  const esc = UN.esc, agent = UN.agent(p.agentId), price = UN.fmtPrice(p.price, p.purpose), typeLabel = UN.typeLabel(p.type);
  const pageUrl = `${S.domain || ""}property.html?id=${encodeURIComponent(p.id)}`;

  /* --- head / meta --- */
  document.title = `${p.title} — ${price} · ${p.locality} | UrbanNest Realty`;
  const desc = `${typeLabel} ${p.purpose === "rent" ? "for rent" : "for sale"} in ${p.locality}: ${p.beds ? p.beds + " BHK, " : ""}${p.area.toLocaleString("en-IN")} sq ft, ${price}. ${p.description.slice(0, 120)}…`;
  $('meta[name="description"]')?.setAttribute("content", desc);
  $('meta[property="og:title"]')?.setAttribute("content", document.title);
  $('meta[property="og:description"]')?.setAttribute("content", desc);
  $('meta[property="og:image"]')?.setAttribute("content", (S.domain || "") + p.images[0]);
  $('link[rel="canonical"]')?.setAttribute("href", pageUrl);

  /* --- header block --- */
  $("[data-p-crumb]").textContent = p.title;
  $("[data-p-tags]").innerHTML = `${p.featured ? `<span class="tag tag--key">Featured</span>` : ""}<span class="tag tag--dark">${p.purpose === "rent" ? "For Rent" : "For Sale"}</span><span class="tag tag--outline">${typeLabel}</span>`;
  $("[data-p-title]").textContent = p.title;
  $("[data-p-loc]").innerHTML = `<svg class="ic" aria-hidden="true"><use href="#i-pin"/></svg>${esc(p.locality)}`;
  $("[data-p-price]").textContent = price;
  $("[data-p-persqft]").textContent = p.purpose === "rent" ? `${p.furnishing} · ${p.possession}` : `₹${Math.round(p.price / p.area).toLocaleString("en-IN")} per sq ft · ${p.possession}`;
  const waText = `Hi ${agent.name}, I'm interested in "${p.title}" (${p.locality}, ${price}). Please share more details and a site-visit slot.\n${pageUrl}`;
  const waLink = UN.waUrl(waText, agent.whatsapp);
  $$("[data-p-wa]").forEach((a) => (a.href = waLink));
  $$("[data-p-tel]").forEach((a) => (a.href = `tel:${agent.phoneTel}`));

  /* --- gallery --- */
  const items = p.images.map((src, i) => ({ src, alt: (p.imageAlts && p.imageAlts[i]) || `${p.title} — photo ${i + 1} of ${p.images.length}`, caption: p.title }));
  const mainImg = $("[data-gallery-main]"), thumbs = $("[data-gallery-thumbs]"), countEl = $("[data-gallery-count]");
  let cur = 0;
  const setMain = (i) => {
    cur = (i + items.length) % items.length;
    mainImg.innerHTML = `<img src="${items[cur].src}" alt="${esc(items[cur].alt)}" width="1000" height="625" ${cur === 0 ? 'fetchpriority="high"' : ""}>`;
    countEl.innerHTML = `<svg class="ic" aria-hidden="true"><use href="#i-image"/></svg>${cur + 1} / ${items.length}`;
    $$("button", thumbs).forEach((b, j) => b.setAttribute("aria-current", String(j === cur)));
  };
  thumbs.innerHTML = items.map((it, i) => `<button type="button" aria-label="Show photo ${i + 1}: ${esc(it.alt)}" aria-current="${i === 0}"><img src="${it.src}" alt="" loading="lazy" width="400" height="250"></button>`).join("");
  thumbs.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setMain($$("button", thumbs).indexOf(b)); });
  mainImg.addEventListener("click", () => UN.lightbox && UN.lightbox.open(items, cur));
  // swipe on main image (mobile)
  let x0 = null;
  mainImg.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  mainImg.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) setMain(cur + (dx < 0 ? 1 : -1)); x0 = null; });
  setMain(0);

  /* --- key facts --- */
  const facts = [
    ["i-area", "Area", `${p.area.toLocaleString("en-IN")} sq ft`],
    p.beds ? ["i-bed", "Bedrooms", `${p.beds} BHK`] : ["i-building", "Type", typeLabel],
    p.baths ? ["i-bath", "Bathrooms", String(p.baths)] : ["i-key", "Purpose", p.purpose === "rent" ? "For rent" : "For sale"],
    ["i-sofa", "Furnishing", p.furnishing],
    ["i-calendar", "Possession", p.possession],
    ["i-pin", "Location", p.location],
    ["i-home", "Property type", typeLabel],
    ["i-rupee", p.purpose === "rent" ? "Deposit" : "Price / sq ft", p.purpose === "rent" ? "As per agreement" : `₹${Math.round(p.price / p.area).toLocaleString("en-IN")}`]
  ];
  $("[data-p-facts]").innerHTML = facts.map(([ic, k, v]) => `<div class="fact"><span><svg class="ic" aria-hidden="true"><use href="#${ic}"/></svg>${k}</span><b>${esc(v)}</b></div>`).join("");

  /* --- overview / amenities / floor plan --- */
  $("[data-p-desc]").innerHTML = `<p>${esc(p.description)}</p><p>Listing ID: <b>${esc(p.id)}</b> · Listed on ${new Date(p.listed + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}. Prices are indicative and exclusive of registration, stamp duty and applicable taxes; final terms on confirmation with the owner/developer.</p>`;
  $("[data-p-amenities]").innerHTML = p.amenities.map((a) => `<li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>${esc(a)}</li>`).join("");
  const fpImg = $("[data-p-floorplan]"); fpImg.src = p.floorPlan; fpImg.alt = `Indicative floor plan — ${p.title}: living and dining, kitchen, balcony, bedrooms and bathrooms`;
  const fpLink = $("[data-p-floorplan-link]"); fpLink.href = p.floorPlanPdf || p.floorPlan; if (!p.floorPlanPdf) { fpLink.setAttribute("download", `${p.id}-floor-plan`); } else fpLink.removeAttribute("download");

  /* --- agent card --- */
  $("[data-p-agent]").innerHTML = `
    <img src="${agent.photo}" alt="${esc(agent.photoAlt || `Portrait — ${agent.name}`)}" width="72" height="72" loading="lazy">
    <div><span class="agent-card__label">Listed by</span><h3>${esc(agent.name)}</h3><p>${esc(agent.role)}<br>Speaks ${agent.languages.join(", ")}</p></div>
    <div class="agent-card__actions"><a class="btn btn--outline-dark btn--sm" href="tel:${agent.phoneTel}"><svg class="ic" aria-hidden="true"><use href="#i-phone"/></svg> ${esc(agent.phoneDisplay)}</a><a class="btn btn--whatsapp btn--sm" href="${waLink}" target="_blank" rel="noopener"><svg class="ic" aria-hidden="true"><use href="#i-whatsapp"/></svg> WhatsApp</a></div>`;

  /* --- enquiry form prefill (forms.js handles submit) --- */
  const msg = $("#e-message"); if (msg) msg.value = `Hi, I'm interested in "${p.title}" in ${p.locality} (${price}). Please share more details and available site-visit slots.`;
  const ref = $("#e-property"); if (ref) ref.value = `${p.title} (${p.id})`;
  const wa = $("#e-wa"); if (wa) wa.value = agent.whatsapp || "";
  const an = $("#e-agent"); if (an) an.value = agent.name;

  /* --- similar properties: same type or same location, same purpose first --- */
  const score = (x) => (x.purpose === p.purpose ? 2 : 0) + (x.type === p.type ? 2 : 0) + (x.location === p.location ? 1 : 0);
  const similar = P.filter((x) => x.id !== p.id && (x.type === p.type || x.location === p.location)).sort((a, b) => score(b) - score(a)).slice(0, 3);
  const simBox = $("[data-p-similar]");
  if (similar.length) simBox.innerHTML = similar.map((x, i) => UN.propCard(x, `d${i}`)).join("");
  else $("#similar").hidden = true;

  /* --- JSON-LD (listing) --- */
  const ld = { "@context": "https://schema.org", "@type": "RealEstateListing", name: p.title, url: pageUrl, description: p.description, image: p.images.map((i) => (S.domain || "") + i), datePosted: p.listed,
    offers: { "@type": "Offer", price: p.price, priceCurrency: "INR", businessFunction: p.purpose === "rent" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell", availability: "https://schema.org/InStock" },
    about: { "@type": p.type === "commercial" ? "Place" : "Accommodation", name: p.title, floorSize: { "@type": "QuantitativeValue", value: p.area, unitText: "sq ft" }, numberOfBedrooms: p.beds || undefined, numberOfBathroomsTotal: p.baths || undefined, address: { "@type": "PostalAddress", addressLocality: p.locality, addressRegion: "Uttar Pradesh", addressCountry: "IN" } },
    provider: { "@type": "RealEstateAgent", name: S.name, telephone: S.phoneDisplay } };
  const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

  document.body.classList.add("has-sticky");
})();
