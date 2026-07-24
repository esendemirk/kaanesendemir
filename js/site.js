(function () {
  function setStatus(el, message) {
    if (el) el.textContent = message;
  }

  var navToggle = document.querySelector("[data-nav-toggle]");
  var navBackdrop = document.querySelector("[data-nav-backdrop]");
  var siteNav = document.querySelector("[data-site-nav]");

  function setNavOpen(open) {
    document.body.classList.toggle("nav-open", open);
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (navBackdrop) {
      if (open) navBackdrop.removeAttribute("hidden");
      else navBackdrop.setAttribute("hidden", "");
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!document.body.classList.contains("nav-open"));
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", function () {
      setNavOpen(false);
    });
  }

  if (siteNav) {
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNavOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 900px)").matches) setNavOpen(false);
  });

  document.querySelectorAll("[data-copy-link]").forEach(function (btn) {
    btn.addEventListener("click", async function () {
      var url = btn.getAttribute("data-url") || location.href;
      var root = btn.closest("[data-share-tools]") || btn.parentElement;
      var status = root && root.querySelector("[data-copy-status]");
      try {
        await navigator.clipboard.writeText(url);
        setStatus(status, "Link copied");
      } catch (err) {
        setStatus(status, "Could not copy");
      }
    });
  });

})();
