(function () {
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

  function renderList(list, items) {
    var sorted = sortNewest(items);
    var limit = list.getAttribute("data-press-limit");
    if (limit) sorted = sorted.slice(0, parseInt(limit, 10) || sorted.length);
    list.innerHTML = sorted.map(listRowHtml).join("");
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

    // Duplicate for a seamless CSS marquee loop
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
        renderList(list, items);
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
