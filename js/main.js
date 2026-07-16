/**
 * Kaan Esendemir — site config + panel router
 * Paste real Buttondown (or similar) endpoint when ready.
 * Keep SITE_VERSION in sync with /VERSION (semver).
 */
const SITE_VERSION = "0.3.0";

const CONFIG = {
  /** e.g. https://buttondown.com/api/emails/embed-subscribe/YOUR_USER */
  fieldNotesEndpoint: null,
};

const PANELS = ["home", "approach", "book", "about"];

function panelFromHash() {
  const raw = (location.hash || "#home").replace(/^#/, "").toLowerCase();
  // Legacy hashes from earlier site versions
  if (raw === "workshops" || raw === "join" || raw === "learn") return "approach";
  return PANELS.includes(raw) ? raw : "home";
}

function setPanel(id, { pushHash = true, focusEmail = false } = {}) {
  if (!PANELS.includes(id)) id = "home";

  document.querySelectorAll("[data-panel]").forEach((el) => {
    const active = el.getAttribute("data-panel") === id;
    el.classList.toggle("is-active", active);
    if (active) {
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "");
    }
  });

  document.querySelectorAll("[data-nav]").forEach((el) => {
    const match = el.getAttribute("data-nav") === id;
    if (
      el.hasAttribute("aria-current") ||
      el.classList.contains("nav-btn") ||
      el.classList.contains("tab")
    ) {
      if (match) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    }
  });

  if (pushHash) {
    const next = `#${id}`;
    if (location.hash !== next) {
      history.replaceState(null, "", next);
    }
  }

  const active = document.querySelector(`[data-panel="${id}"]`);
  if (active) active.scrollTop = 0;

  if (focusEmail) {
    requestAnimationFrame(() => {
      document.getElementById("field-notes-email")?.focus();
    });
  }
}

function wireNav() {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = el.getAttribute("data-nav");
      if (!id || !PANELS.includes(id)) return;
      e.preventDefault();
      const focusEmail = el.hasAttribute("data-focus-email");
      setPanel(id, { focusEmail });
    });
  });

  window.addEventListener("hashchange", () => {
    setPanel(panelFromHash(), { pushHash: false });
  });
}

function wireFieldNotes() {
  const form = document.getElementById("field-notes-form");
  if (!form) return;
  const status = document.getElementById("field-notes-status");
  const input = document.getElementById("field-notes-email");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (input?.value || "").trim();
    if (!email || !input.checkValidity()) {
      form.dataset.state = "err";
      if (status) status.textContent = "Enter a valid email to join the list.";
      input?.focus();
      return;
    }

    if (!CONFIG.fieldNotesEndpoint) {
      form.dataset.state = "ok";
      if (status) {
        status.textContent = "Thanks — list signup will go live with the email provider soon.";
      }
      form.reset();
      return;
    }

    try {
      const body = new FormData();
      body.append("email", email);
      const res = await fetch(CONFIG.fieldNotesEndpoint, {
        method: "POST",
        body,
        mode: "cors",
      });
      if (!res.ok) throw new Error("subscribe failed");
      form.dataset.state = "ok";
      if (status) status.textContent = "You’re on the list. Talk soon.";
      form.reset();
    } catch {
      form.dataset.state = "err";
      if (status) status.textContent = "Couldn’t subscribe right now. Try again later.";
    }
  });
}

function paintVersion() {
  document.querySelectorAll("[data-site-version]").forEach((el) => {
    el.textContent = `v${SITE_VERSION}`;
  });
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  paintVersion();
  wireNav();
  wireFieldNotes();
  setPanel(panelFromHash(), { pushHash: true });
});
