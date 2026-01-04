// Exemplo JS (será minificado para /dist/js/main.min.js)
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = document.getElementById("btnHello");
  if (btn) {
    btn.addEventListener("click", function () {
      alert("Olá! JS minificado com Gulp 😀");
    });
  }
})();
