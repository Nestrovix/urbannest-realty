/* ============================================================
   URBANNEST REALTY — Forms: property enquiry · contact · call-back
   Validation · error/success/loading states · honeypot
   Submit = opens WhatsApp with a pre-filled message (works with no backend)
   + optional POST to a backend endpoint (see README → "Connect a backend")
   ============================================================ */
(function () {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxx" or your API route — leave "" to use WhatsApp-only

  const rules = {
    required: (v) => v.trim() !== "" || "This field is required.",
    name: (v) => /^[\p{L} .'-]{2,60}$/u.test(v.trim()) || "Enter a valid name.",
    phone: (v) => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/\s|-/g, "")) || "Enter a valid 10-digit Indian mobile number.",
    email: (v) => v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a valid email address.",
    select: (v) => v !== "" || "Please choose an option.",
    min10: (v) => v.trim().length >= 10 || "Please write at least 10 characters."
  };
  function validateField(field) {
    const input = $("input,select,textarea", field); if (!input) return true;
    const list = (input.dataset.validate || "").split(" ").filter(Boolean);
    let err = "";
    for (const r of list) { const res = rules[r] ? rules[r](input.value) : true; if (res !== true) { err = res; break; } }
    field.classList.toggle("is-invalid", !!err);
    const e = $(".field__error", field); if (e) e.textContent = err;
    input.setAttribute("aria-invalid", err ? "true" : "false");
    return !err;
  }
  function wire(form) {
    $$(".field", form).forEach((f) => {
      const i = $("input,select,textarea", f);
      i?.addEventListener("blur", () => validateField(f));
      i?.addEventListener("input", () => { if (f.classList.contains("is-invalid")) validateField(f); });
    });
  }
  function validateForm(form) {
    let ok = true, first = null;
    $$(".field", form).forEach((f) => { if (!validateField(f)) { ok = false; first = first || f; } });
    if (first) $("input,select,textarea", first).focus();
    return ok;
  }
  async function post(payload) {
    if (!ENDPOINT) return { ok: true, skipped: true };
    try { const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) }); return { ok: r.ok }; }
    catch (e) { return { ok: false }; }
  }
  const busy = (btn, on, label) => { btn.setAttribute("aria-busy", String(on)); btn.disabled = on; btn.innerHTML = on ? `<span class="spinner"></span> ${label}` : btn.dataset.label; };
  const wa = (text, num) => `https://wa.me/${num || S.whatsapp}?text=${encodeURIComponent(text)}`;

  /* ================= PROPERTY ENQUIRY (property.html) ================= */
  const ef = $("#enquiry-form");
  if (ef) {
    wire(ef);
    ef.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form__status", ef); status.className = "form__status";
      if ($("#e-company").value) return; // honeypot
      if (!validateForm(ef)) { status.textContent = "Please fix the highlighted fields."; status.classList.add("is-error"); return; }
      const btn = $("button[type=submit]", ef); btn.dataset.label = btn.dataset.label || btn.innerHTML; busy(btn, true, "Sending…");
      const d = Object.fromEntries(new FormData(ef).entries());
      const res = await post({ type: "property-enquiry", ...d });
      await new Promise((r) => setTimeout(r, 600));
      busy(btn, false);
      if (!res.ok) { status.textContent = "Couldn't send right now — please call or WhatsApp us."; status.classList.add("is-error"); return; }
      const msg = `🏠 Property enquiry — ${S.name}\n\nProperty: ${d.property}\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || "—"}\nVisit preference: ${d.visit || "—"}\n\n${d.message}`;
      const link = wa(msg, d.wa && /^\d{10,15}$/.test(d.wa) ? d.wa : "");
      const panel = $("#enquiry-success");
      $("[data-wa-again]", panel).href = link;
      $("[data-success-name]", panel).textContent = d.name.split(" ")[0];
      ef.hidden = true; panel.classList.add("is-visible"); panel.scrollIntoView({ behavior: "smooth", block: "center" });
      $("[data-edit]", panel).onclick = () => { panel.classList.remove("is-visible"); ef.hidden = false; ef.scrollIntoView({ behavior: "smooth", block: "start" }); };
      window.open(link, "_blank", "noopener");
    });
  }

  /* ================= CONTACT (contact.html) ================= */
  const cf = $("#contact-form");
  if (cf) {
    wire(cf);
    // prefill from URL: ?topic=…&ref=… (used by "Request brochure" / consultation links)
    const sp = new URLSearchParams(location.search);
    const topic = $("#c-topic");
    if (sp.get("topic") && topic) { const want = sp.get("topic").toLowerCase(); const opt = [...topic.options].find((o) => o.value.toLowerCase() === want || o.text.toLowerCase().includes(want)); if (opt) topic.value = opt.value; }
    if (sp.get("ref") && $("#c-message")) $("#c-message").value = `Hi, please send me details about ${sp.get("ref")}.`;
    cf.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form__status", cf); status.className = "form__status";
      if ($("#c-company").value) return;
      if (!validateForm(cf)) { status.textContent = "Please fix the highlighted fields."; status.classList.add("is-error"); return; }
      const btn = $("button[type=submit]", cf); btn.dataset.label = btn.dataset.label || btn.innerHTML; busy(btn, true, "Sending…");
      const d = Object.fromEntries(new FormData(cf).entries());
      const res = await post({ type: "contact", ...d });
      await new Promise((r) => setTimeout(r, 600));
      busy(btn, false);
      if (!res.ok) { status.textContent = "Couldn't send right now — please WhatsApp or call us."; status.classList.add("is-error"); return; }
      const msg = `✉️ Website enquiry — ${S.name}\n\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || "—"}\nTopic: ${d.topic}\nBudget: ${d.budget || "—"}\n\n${d.message}`;
      const link = wa(msg);
      cf.reset(); status.innerHTML = `Thanks, ${d.name.split(" ")[0]}! We've opened WhatsApp with your message — hit send and a consultant will reply within working hours. <a href="${link}" target="_blank" rel="noopener" style="text-decoration:underline">Open WhatsApp again</a>`; status.classList.add("is-success");
      window.open(link, "_blank", "noopener");
    });
  }

  /* ================= CALL-BACK (home consultation CTA) ================= */
  const kf = $("#callback-form");
  if (kf) {
    wire(kf);
    kf.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form__status", kf); status.className = "form__status";
      if ($("#k-company").value) return;
      if (!validateForm(kf)) { status.textContent = "Please fix the highlighted fields."; status.classList.add("is-error"); return; }
      const btn = $("button[type=submit]", kf); btn.dataset.label = btn.dataset.label || btn.innerHTML; busy(btn, true, "Requesting…");
      const d = Object.fromEntries(new FormData(kf).entries());
      const res = await post({ type: "callback", ...d });
      await new Promise((r) => setTimeout(r, 600));
      busy(btn, false);
      if (!res.ok) { status.textContent = "Couldn't send right now — please call us directly."; status.classList.add("is-error"); return; }
      const msg = `📞 Call-back request — ${S.name}\n\nName: ${d.name}\nPhone: ${d.phone}\nLooking to: ${d.interest}\nPreferred time: ${d.time || "Any time"}`;
      const link = wa(msg);
      kf.reset(); status.innerHTML = `Thanks, ${d.name.split(" ")[0]}! We've opened WhatsApp with your request — hit send and we'll call you back. <a href="${link}" target="_blank" rel="noopener" style="text-decoration:underline">Open WhatsApp again</a>`; status.classList.add("is-success");
      window.open(link, "_blank", "noopener");
    });
  }
})();
