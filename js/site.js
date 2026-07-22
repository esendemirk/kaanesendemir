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
      var status = btn.parentElement && btn.parentElement.querySelector("[data-copy-status]");
      try {
        await navigator.clipboard.writeText(url);
        setStatus(status, "Link copied");
      } catch (err) {
        setStatus(status, "Could not copy");
      }
    });
  });

  document.querySelectorAll("[data-copy-prompt]").forEach(function (btn) {
    btn.addEventListener("click", async function () {
      var prompt = btn.getAttribute("data-prompt") || "";
      var status = document.querySelector("[data-copy-status]");
      try {
        await navigator.clipboard.writeText(prompt);
        setStatus(status, "Copied");
      } catch (err) {
        setStatus(status, "Could not copy");
      }
    });
  });

  var toolsRoot = document.querySelector("[data-tool-list]");
  if (toolsRoot) {
    var searchInput = document.querySelector("[data-tool-search]");
    var categoryBtns = Array.prototype.slice.call(
      document.querySelectorAll("[data-tool-category]")
    );
    var tools = Array.prototype.slice.call(document.querySelectorAll("[data-tool]"));
    var empty = document.querySelector("[data-tools-empty]");
    var activeCategory = "all";

    function normalize(str) {
      return String(str || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    function applyFilters() {
      var q = normalize(searchInput ? searchInput.value : "");
      var qParts = q ? q.split(" ") : [];
      var visible = 0;

      tools.forEach(function (tool) {
        var cat = normalize(tool.getAttribute("data-category") || "");
        var titleEl = tool.querySelector("h2");
        var title = normalize(titleEl ? titleEl.textContent : "");
        var tags = normalize(tool.getAttribute("data-search") || "");
        var hay = (title + " " + cat + " " + tags).trim();

        var catOk = activeCategory === "all" || cat === activeCategory;
        var qOk =
          qParts.length === 0 ||
          qParts.every(function (part) {
            return hay.indexOf(part) !== -1;
          });

        var show = catOk && qOk;
        if (show) {
          tool.classList.remove("is-hidden");
          tool.removeAttribute("hidden");
          visible += 1;
        } else {
          tool.classList.add("is-hidden");
          tool.setAttribute("hidden", "");
        }
      });

      if (empty) {
        if (visible > 0) {
          empty.classList.add("is-hidden");
          empty.setAttribute("aria-hidden", "true");
        } else {
          empty.classList.remove("is-hidden");
          empty.setAttribute("aria-hidden", "false");
        }
      }
    }

    categoryBtns.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        activeCategory = normalize(btn.getAttribute("data-tool-category") || "all");
        categoryBtns.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
      searchInput.addEventListener("keyup", applyFilters);
      searchInput.addEventListener("search", applyFilters);
    }

    applyFilters();
  }
})();
