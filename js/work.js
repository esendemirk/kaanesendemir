(function () {
  var PAGE_SIZE = 3;
  var list = document.querySelector("[data-work-list]");
  var pager = document.querySelector("[data-work-pager]");
  if (!list) return;

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function absUrl(href, base) {
    try {
      return new URL(href, base).pathname + (new URL(href, base).search || "");
    } catch (err) {
      return href;
    }
  }

  function parseProject(html, pageUrl) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var titleEl = doc.querySelector("h1");
    var summaryEl = doc.querySelector(".summary");
    var coverEl = doc.querySelector("img.cover");
    var title = titleEl ? titleEl.textContent.trim() : "Untitled";
    var description = summaryEl ? summaryEl.textContent.trim() : "";
    var image = coverEl
      ? absUrl(coverEl.getAttribute("src") || "", pageUrl)
      : "";

    return {
      url: pageUrl,
      title: title,
      description: description,
      image: image,
    };
  }

  function rowHtml(item) {
    var thumb = item.image
      ? '<a class="press-thumb" href="' +
        escapeHtml(item.url) +
        '" tabindex="-1" aria-hidden="true">' +
        '<img src="' +
        escapeHtml(item.image) +
        '" alt="" width="160" height="90" loading="lazy" />' +
        "</a>"
      : '<span class="press-thumb press-thumb-empty" aria-hidden="true"></span>';

    return (
      '<li class="press-row">' +
      thumb +
      '<div class="press-row-main">' +
      '<a class="press-row-title" href="' +
      escapeHtml(item.url) +
      '">' +
      escapeHtml(item.title) +
      "</a>" +
      (item.description
        ? '<p class="press-desc">' + escapeHtml(item.description) + "</p>"
        : "") +
      "</div></li>"
    );
  }

  function renderPager(pagerEl, page, totalPages, prevAttr, nextAttr) {
    if (!pagerEl) return;
    pagerEl.hidden = false;
    pagerEl.innerHTML =
      '<button type="button" class="press-page-btn press-page-arrow" ' +
      prevAttr +
      (page <= 1 ? " disabled" : "") +
      ' aria-label="Previous page">‹</button>' +
      '<span class="press-page-label">Page ' +
      page +
      " of " +
      totalPages +
      "</span>" +
      '<button type="button" class="press-page-btn press-page-arrow" ' +
      nextAttr +
      (page >= totalPages ? " disabled" : "") +
      ' aria-label="Next page">›</button>';
  }

  function setupList(items) {
    var pageSize =
      parseInt(list.getAttribute("data-work-page-size"), 10) || PAGE_SIZE;
    var page = 1;

    function render() {
      var totalPages = Math.max(1, Math.ceil(items.length / pageSize) || 1);
      if (page > totalPages) page = totalPages;
      if (page < 1) page = 1;

      var start = (page - 1) * pageSize;
      var slice = items.slice(start, start + pageSize);

      if (!items.length) {
        list.innerHTML =
          '<li class="press-empty muted">No work to show yet.</li>';
      } else {
        list.innerHTML = slice.map(rowHtml).join("");
      }

      renderPager(pager, page, totalPages, "data-work-prev", "data-work-next");
    }

    if (pager) {
      pager.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-work-prev], [data-work-next]");
        if (!btn || btn.disabled) return;
        if (btn.hasAttribute("data-work-prev")) page -= 1;
        if (btn.hasAttribute("data-work-next")) page += 1;
        render();
        list.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }

    render();
  }

  fetch("/data/work.json")
    .then(function (res) {
      if (!res.ok) throw new Error("work.json failed");
      return res.json();
    })
    .then(function (entries) {
      var jobs = (entries || []).map(function (entry) {
        var slug = typeof entry === "string" ? entry : entry.slug;
        var pageUrl = "/projects/" + slug + "/";
        return fetch(pageUrl)
          .then(function (res) {
            if (!res.ok) throw new Error("Failed " + pageUrl);
            return res.text();
          })
          .then(function (html) {
            return parseProject(html, pageUrl);
          });
      });
      return Promise.all(jobs);
    })
    .then(setupList)
    .catch(function () {
      list.innerHTML =
        '<li class="press-empty muted">Work will appear here shortly.</li>';
      if (pager) {
        renderPager(pager, 1, 1, "data-work-prev", "data-work-next");
      }
    });
})();
