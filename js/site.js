(function () {
  function setStatus(el, message) {
    if (el) el.textContent = message;
  }

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
  if (!toolsRoot) return;

  var searchInput = document.querySelector("[data-tool-search]");
  var categoryBtns = Array.prototype.slice.call(document.querySelectorAll("[data-tool-category]"));
  var tools = Array.prototype.slice.call(document.querySelectorAll("[data-tool]"));
  var empty = document.querySelector("[data-tools-empty]");
  var activeCategory = "all";

  function tokens(str) {
    return String(str || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  }

  function applyFilters() {
    var qTokens = tokens(searchInput ? searchInput.value : "");
    var visible = 0;

    tools.forEach(function (tool) {
      var cat = (tool.getAttribute("data-category") || "").toLowerCase();
      var titleEl = tool.querySelector("h2");
      var title = titleEl ? titleEl.textContent : "";
      var hay = tokens(
        [title, cat, tool.getAttribute("data-search") || ""].join(" ")
      ).join(" ");

      var catOk = activeCategory === "all" || cat === activeCategory;
      var qOk =
        qTokens.length === 0 ||
        qTokens.every(function (t) {
          return hay.indexOf(t) !== -1;
        });

      var show = catOk && qOk;
      tool.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    if (empty) {
      empty.classList.toggle("is-hidden", visible > 0);
      empty.setAttribute("aria-hidden", visible > 0 ? "true" : "false");
    }
  }

  categoryBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeCategory = (btn.getAttribute("data-tool-category") || "all").toLowerCase();
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
    searchInput.addEventListener("search", applyFilters);
  }

  applyFilters();
})();
