(function () {
  var PAGE_SIZE = 4;

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sortNewest(items) {
    return items.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
  }

  function normalize(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function collectOutlets(items) {
    var seen = Object.create(null);
    var outlets = [];

    sortNewest(items).forEach(function (item) {
      var names = [item.outlet].concat(
        (item.alsoOn || []).map(function (a) {
          return a.outlet;
        })
      );
      names.forEach(function (name) {
        var key = String(name || "").trim().toLowerCase();
        if (!key || seen[key]) return;
        seen[key] = true;
        outlets.push(String(name).trim());
      });
    });

    return outlets;
  }

  function itemMatches(item, query) {
    if (!query) return true;
    var parts = normalize(query).split(" ").filter(Boolean);
    if (!parts.length) return true;
    var also = (item.alsoOn || [])
      .map(function (a) {
        return a.outlet + " " + a.url;
      })
      .join(" ");
    var hay = normalize(
      [item.outlet, item.title, item.description, item.dateLabel, also].join(" ")
    );
    return parts.every(function (part) {
      return hay.indexOf(part) !== -1;
    });
  }

  function listRowHtml(item) {
    var also = (item.alsoOn || [])
      .map(function (a) {
        return (
          '<a class="press-also" href="' +
          escapeHtml(a.url) +
          '" target="_blank" rel="noopener noreferrer">Also on ' +
          escapeHtml(a.outlet) +
          "</a>"
        );
      })
      .join('<span class="press-dot" aria-hidden="true">·</span>');

    var thumb = item.image
      ? '<a class="press-thumb" href="' +
        escapeHtml(item.url) +
        '" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">' +
        '<img src="' +
        escapeHtml(item.image) +
        '" alt="" width="160" height="90" loading="lazy" />' +
        "</a>"
      : '<span class="press-thumb press-thumb-empty" aria-hidden="true"></span>';

    return (
      '<li class="press-row">' +
      thumb +
      '<div class="press-row-main">' +
      '<p class="press-meta"><span class="press-outlet">' +
      escapeHtml(item.outlet) +
      '</span><span class="press-dot" aria-hidden="true">·</span><time datetime="' +
      escapeHtml(item.date) +
      '">' +
      escapeHtml(item.dateLabel) +
      "</time></p>" +
      '<a class="press-row-title" href="' +
      escapeHtml(item.url) +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(item.title) +
      "</a>" +
      (item.description
        ? '<p class="press-desc">' + escapeHtml(item.description) + "</p>"
        : "") +
      (also ? '<p class="press-also-row">' + also + "</p>" : "") +
      "</div></li>"
    );
  }

  function renderBanner(banner, items) {
    var outlets = collectOutlets(items);
    if (!outlets.length) {
      banner.hidden = true;
      return;
    }

    var track = outlets
      .map(function (name) {
        return '<span class="featured-item">' + escapeHtml(name) + "</span>";
      })
      .join('<span class="featured-sep" aria-hidden="true">·</span>');

    banner.innerHTML =
      '<div class="featured-banner-inner">' +
      '<span class="featured-label">Featured in</span>' +
      '<div class="featured-viewport" aria-label="Featured outlets">' +
      '<div class="featured-track">' +
      '<div class="featured-group">' +
      track +
      "</div>" +
      '<div class="featured-group" aria-hidden="true">' +
      track +
      "</div>" +
      "</div></div></div>";
    banner.hidden = false;
  }

  function setupPressList(list, allItems) {
    var pageSize =
      parseInt(list.getAttribute("data-press-page-size"), 10) || PAGE_SIZE;
    var searchInput = document.querySelector("[data-press-search]");
    var pager = document.querySelector("[data-press-pager]");
    var status = document.querySelector("[data-press-status]");
    var page = 1;

    function filtered() {
      var q = searchInput ? searchInput.value : "";
      return sortNewest(allItems).filter(function (item) {
        return itemMatches(item, q);
      });
    }

    function render() {
      var items = filtered();
      var totalPages = Math.max(1, Math.ceil(items.length / pageSize));
      if (page > totalPages) page = totalPages;
      if (page < 1) page = 1;

      var start = (page - 1) * pageSize;
      var slice = items.slice(start, start + pageSize);

      if (!items.length) {
        list.innerHTML =
          '<li class="press-empty muted">No coverage matches that search.</li>';
      } else {
        list.innerHTML = slice.map(listRowHtml).join("");
      }

      if (status) {
        if (!items.length) {
          status.textContent = "0 results";
        } else {
          var from = start + 1;
          var to = start + slice.length;
          status.textContent =
            "Showing " + from + "–" + to + " of " + items.length;
        }
      }

      if (pager) {
        if (totalPages <= 1) {
          pager.innerHTML = "";
          pager.hidden = true;
        } else {
          pager.hidden = false;
          pager.innerHTML =
            '<button type="button" class="press-page-btn" data-press-prev' +
            (page <= 1 ? " disabled" : "") +
            ">Previous</button>" +
            '<span class="press-page-label">Page ' +
            page +
            " of " +
            totalPages +
            "</span>" +
            '<button type="button" class="press-page-btn" data-press-next' +
            (page >= totalPages ? " disabled" : "") +
            ">Next</button>";
        }
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        page = 1;
        render();
      });
      searchInput.addEventListener("search", function () {
        page = 1;
        render();
      });
    }

    if (pager) {
      pager.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-press-prev], [data-press-next]");
        if (!btn || btn.disabled) return;
        if (btn.hasAttribute("data-press-prev")) page -= 1;
        if (btn.hasAttribute("data-press-next")) page += 1;
        render();
        list.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }

    render();
  }

  var lists = document.querySelectorAll("[data-press-list]");
  var banners = document.querySelectorAll("[data-featured-banner]");
  if (!lists.length && !banners.length) return;

  fetch("/data/press.json")
    .then(function (res) {
      if (!res.ok) throw new Error("press.json failed");
      return res.json();
    })
    .then(function (items) {
      lists.forEach(function (list) {
        if (list.hasAttribute("data-press-paginate")) {
          setupPressList(list, items);
        } else {
          var sorted = sortNewest(items);
          var limit = list.getAttribute("data-press-limit");
          if (limit) {
            sorted = sorted.slice(0, parseInt(limit, 10) || sorted.length);
          }
          list.innerHTML = sorted.map(listRowHtml).join("");
        }
      });
      banners.forEach(function (banner) {
        renderBanner(banner, items);
      });
    })
    .catch(function () {
      lists.forEach(function (list) {
        if (!list.children.length) {
          list.innerHTML =
            '<li class="muted">Press coverage will appear here shortly.</li>';
        }
      });
    });
})();
