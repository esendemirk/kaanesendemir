(function () {
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cardHtml(item, compact) {
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
      .join("");

    return (
      '<article class="press-card' +
      (compact ? " press-card-compact" : "") +
      '">' +
      '<a class="press-card-media" href="' +
      escapeHtml(item.url) +
      '" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">' +
      '<img src="' +
      escapeHtml(item.image) +
      '" alt="" width="1200" height="675" loading="lazy" />' +
      "</a>" +
      '<div class="press-card-body">' +
      '<p class="press-meta"><span class="press-outlet">' +
      escapeHtml(item.outlet) +
      '</span><span class="press-dot" aria-hidden="true">·</span><time datetime="' +
      escapeHtml(item.date) +
      '">' +
      escapeHtml(item.dateLabel) +
      "</time></p>" +
      '<h3 class="press-title"><a href="' +
      escapeHtml(item.url) +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(item.title) +
      "</a></h3>" +
      (compact
        ? ""
        : '<p class="press-desc">' + escapeHtml(item.description) + "</p>") +
      (also ? '<p class="press-also-row">' + also + "</p>" : "") +
      "</div></article>"
    );
  }

  function render(list, items, compact) {
    if (!list) return;
    var sorted = items.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
    var limit = list.getAttribute("data-press-limit");
    if (limit) sorted = sorted.slice(0, parseInt(limit, 10) || sorted.length);
    list.innerHTML = sorted.map(function (item) {
      return cardHtml(item, compact);
    }).join("");
  }

  var targets = document.querySelectorAll("[data-press-list]");
  if (!targets.length) return;

  fetch("/data/press.json")
    .then(function (res) {
      if (!res.ok) throw new Error("press.json failed");
      return res.json();
    })
    .then(function (items) {
      targets.forEach(function (list) {
        var compact = list.getAttribute("data-press-compact") === "true";
        render(list, items, compact);
      });
    })
    .catch(function () {
      targets.forEach(function (list) {
        list.innerHTML =
          '<p class="muted">Press coverage will appear here shortly.</p>';
      });
    });
})();
