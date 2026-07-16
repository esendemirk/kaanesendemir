/**
 * Kaan Esendemir — site config + panel router
 * Keep SITE_VERSION in sync with /VERSION (semver).
 */
const SITE_VERSION = "0.6.1";

const CONFIG = {
  linkedIn: "https://www.linkedin.com/in/kaanesendemir/",
};

const PANELS = ["home", "approach", "about"];

function panelFromHash() {
  const raw = (location.hash || "#home").replace(/^#/, "").toLowerCase();
  // Legacy hashes
  if (raw === "workshops" || raw === "join" || raw === "learn" || raw === "book") {
    return "approach";
  }
  return PANELS.includes(raw) ? raw : "home";
}

function setPanel(id, { pushHash = true } = {}) {
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
}

function wireNav() {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = el.getAttribute("data-nav");
      if (!id || !PANELS.includes(id)) return;
      e.preventDefault();
      setPanel(id);
    });
  });

  window.addEventListener("hashchange", () => {
    setPanel(panelFromHash(), { pushHash: false });
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
  setPanel(panelFromHash(), { pushHash: true });
});
