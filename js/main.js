/**
 * Kaan Esendemir — landing page
 * Keep SITE_VERSION in sync with /VERSION (semver).
 */
const SITE_VERSION = "1.1.0";

function paintVersion() {
  document.querySelectorAll("[data-site-version]").forEach((el) => {
    el.textContent = `v${SITE_VERSION}`;
  });
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", paintVersion);
