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
  if (toolsRoot) {
    var searchInput = document.querySelector("[data-tool-search]");
    var categoryBtns = Array.prototype.slice.call(document.querySelectorAll("[data-tool-category]"));
    var tools = Array.prototype.slice.call(document.querySelectorAll("[data-tool]"));
    var empty = document.querySelector("[data-tools-empty]");
    var activeCategory = "all";

    function applyFilters() {
      var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
      var visible = 0;
      tools.forEach(function (tool) {
        var cat = tool.getAttribute("data-category") || "";
        var hay = (tool.getAttribute("data-search") || "") + " " + (tool.textContent || "");
        hay = hay.toLowerCase();
        var catOk = activeCategory === "all" || cat === activeCategory;
        var qOk = !q || hay.indexOf(q) !== -1;
        var show = catOk && qOk;
        tool.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    }

    categoryBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.getAttribute("data-tool-category") || "all";
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
    }
  }
})();
