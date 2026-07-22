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
})();
