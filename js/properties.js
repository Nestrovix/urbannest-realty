/* ============================================================
   URBANNEST REALTY — Properties listing page
   URL params → filters · live filtering · sort · count · active chips ·
   empty state · Buy/Rent toggle · mobile bottom-sheet filters with Apply
   Params: purpose, loc, type, min, max, beds, area, q, agent, sort
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const UN = window.UN, P = window.PROPERTIES || [];
  const form = $("#filter-form"); if (!form || !UN) return;
  const results = $("[data-results]"), empty = $("[data-empty]"), countEl = $("[data-count-text]"), titleEl = $("[data-results-title]");
  const sortSel = $("#sort"), seg = $("[data-purpose-seg]"), chipsBox = $("[data-active-chips]");
  const sheet = $("#filters"), backdrop = $("[data-filters-backdrop]"), openBtn = $("[data-filters-open]"), closeBtn = $("[data-filters-close]"), applyBtn = $("[data-filters-apply]"), badge = $("[data-filters-badge]");
  const F = { loc: $("#f-loc"), type: $("#f-type"), min: $("#f-min"), max: $("#f-max"), beds: $("#f-beds"), area: $("#f-area"), q: $("#f-q") };
  const DEFAULT = { purpose: "buy", loc: "", type: "", min: "", max: "", beds: "", area: "", q: "", agent: "", sort: "recommended" };
  const state = { ...DEFAULT };

  /* --- init from URL --- */
  const sp = new URLSearchParams(location.search);
  Object.keys(DEFAULT).forEach((k) => { if (sp.has(k)) state[k] = sp.get(k); });
  if (!["buy", "rent"].includes(state.purpose)) state.purpose = "buy";
  if (state.type && !(window.PROPERTY_TYPES || []).some((t) => t.id === state.type)) state.type = "";
  if (state.agent && !(window.AGENTS || []).some((a) => a.id === state.agent)) state.agent = "";

  UN.buildLocationOptions(F.loc); UN.buildTypeOptions(F.type);
  const setPurposeUI = () => {
    $$("button", seg).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.purpose === state.purpose)));
    UN.buildPriceOptions(F.min, state.purpose, "min"); UN.buildPriceOptions(F.max, state.purpose, "max");
    // drop price values that don't exist for this purpose
    if (state.min && ![...F.min.options].some((o) => o.value === state.min)) state.min = "";
    if (state.max && ![...F.max.options].some((o) => o.value === state.max)) state.max = "";
    F.min.value = state.min; F.max.value = state.max;
  };
  const writeForm = () => { F.loc.value = state.loc; F.type.value = state.type; F.beds.value = state.beds; F.area.value = state.area; F.q.value = state.q; setPurposeUI(); sortSel.value = state.sort; if (!sortSel.value) { state.sort = "recommended"; sortSel.value = state.sort; } };
  const readForm = () => { state.loc = F.loc.value; state.type = F.type.value; state.min = F.min.value; state.max = F.max.value; state.beds = F.beds.value; state.area = F.area.value; state.q = F.q.value.trim(); };

  /* --- filter + sort --- */
  const norm = (s) => String(s).toLowerCase();
  function filtered() {
    const q = norm(state.q);
    let list = P.filter((p) => {
      if (p.purpose !== state.purpose) return false;
      if (state.loc && p.location !== state.loc) return false;
      if (state.type && p.type !== state.type) return false;
      if (state.min && p.price < +state.min) return false;
      if (state.max && p.price > +state.max) return false;
      if (state.beds) { const b = +state.beds; if (b >= 5 ? p.beds < 5 : p.beds !== b) return false; }
      if (state.area && p.area < +state.area) return false;
      if (state.agent && p.agentId !== state.agent) return false;
      if (q && !norm(`${p.title} ${p.locality} ${p.location} ${UN.typeLabel(p.type)} ${p.description} ${p.furnishing}`).includes(q)) return false;
      return true;
    });
    const by = {
      recommended: (a, b) => (b.featured - a.featured) || (a.listed < b.listed ? 1 : -1),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      newest: (a, b) => (a.listed < b.listed ? 1 : a.listed > b.listed ? -1 : 0),
      "area-desc": (a, b) => b.area - a.area
    };
    return list.sort(by[state.sort] || by.recommended);
  }

  const activeCount = () => ["loc", "type", "min", "max", "beds", "area", "q", "agent"].filter((k) => state[k]).length;
  function chips() {
    const c = [];
    const add = (k, label) => c.push(`<button class="chip" type="button" data-remove="${k}" aria-label="Remove filter: ${UN.esc(label)}">${UN.esc(label)} <svg class="ic" aria-hidden="true"><use href="#i-x"/></svg></button>`);
    if (state.loc) add("loc", state.loc);
    if (state.type) add("type", UN.typeLabel(state.type));
    if (state.min) add("min", `Min ${UN.fmtPriceLabel(+state.min)}`);
    if (state.max) add("max", `Max ${UN.fmtPriceLabel(+state.max)}`);
    if (state.beds) add("beds", `${state.beds}${state.beds === "5" ? "+" : ""} BHK`);
    if (state.area) add("area", `${(+state.area).toLocaleString("en-IN")}+ sq ft`);
    if (state.q) add("q", `“${state.q}”`);
    if (state.agent) add("agent", `Listed by ${UN.agent(state.agent).name} (${UN.agent(state.agent).role})`);
    chipsBox.innerHTML = c.join("");
    if (badge) { badge.textContent = activeCount(); badge.classList.toggle("is-on", activeCount() > 0); }
  }

  function render() {
    const list = filtered();
    results.innerHTML = list.map((p, i) => UN.propCard(p, `d${i % 3}`)).join("");
    empty.hidden = list.length > 0;
    results.hidden = list.length === 0;
    const what = state.type ? UN.typeLabel(state.type) + (list.length === 1 ? "" : "s") : `propert${list.length === 1 ? "y" : "ies"}`;
    const where = state.loc ? ` in ${state.loc}` : " in Noida & NCR";
    countEl.innerHTML = `<b>${list.length}</b> result${list.length === 1 ? "" : "s"}`;
    if (titleEl) titleEl.textContent = `${list.length} ${what} ${state.purpose === "rent" ? "for rent" : "for sale"}${where}`;
    if (applyBtn) applyBtn.textContent = `Show ${list.length} propert${list.length === 1 ? "y" : "ies"}`;
    chips();
    // URL (shareable / refresh-safe)
    const q = new URLSearchParams();
    Object.keys(DEFAULT).forEach((k) => { if (state[k] && state[k] !== DEFAULT[k]) q.set(k, state[k]); });
    if (state.purpose === "rent") q.set("purpose", "rent");
    history.replaceState(null, "", q.toString() ? `?${q}` : location.pathname);
  }

  /* --- events --- */
  form.addEventListener("change", () => { readForm(); render(); });
  let t; F.q.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { readForm(); render(); }, 160); });
  form.addEventListener("submit", (e) => { e.preventDefault(); readForm(); render(); closeSheet(); });
  seg.addEventListener("click", (e) => { const b = e.target.closest("button[data-purpose]"); if (!b) return; state.purpose = b.dataset.purpose; setPurposeUI(); render(); });
  sortSel.addEventListener("change", () => { state.sort = sortSel.value; render(); });
  $$("[data-reset]").forEach((b) => b.addEventListener("click", () => { Object.assign(state, { ...DEFAULT, purpose: state.purpose, sort: state.sort }); writeForm(); render(); }));
  chipsBox.addEventListener("click", (e) => { const b = e.target.closest("[data-remove]"); if (!b) return; state[b.dataset.remove] = ""; writeForm(); render(); });

  /* --- mobile bottom sheet --- */
  const openSheet = () => { sheet.classList.add("is-open"); backdrop.classList.add("is-open"); document.body.classList.add("sheet-open"); openBtn?.setAttribute("aria-expanded", "true"); closeBtn?.focus(); };
  function closeSheet() { if (!sheet.classList.contains("is-open")) return; sheet.classList.remove("is-open"); backdrop.classList.remove("is-open"); document.body.classList.remove("sheet-open"); openBtn?.setAttribute("aria-expanded", "false"); openBtn?.focus({ preventScroll: true }); }
  openBtn?.addEventListener("click", openSheet);
  closeBtn?.addEventListener("click", closeSheet);
  backdrop?.addEventListener("click", closeSheet);
  applyBtn?.addEventListener("click", () => { readForm(); render(); closeSheet(); $("[data-results-top]")?.scrollIntoView({ behavior: "smooth", block: "start" }); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });
  matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) closeSheet(); });

  writeForm();
  render();
  window.UN.listing = { state, render };
})();
