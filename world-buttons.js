(function () {
  "use strict";

  function updateWorldButtons() {
    if (!window.esatUnlock) return;

    const sarah = document.querySelector(".world-sarah");
    const alina = document.querySelector(".world-alina");

    function updateButton(button, level, name) {
      if (!button) return;

      const unlocked = esatUnlock.released(level);

      button.textContent = unlocked ? name : "🔒 Gesperrt";
      button.setAttribute(
        "aria-label",
        unlocked ? name : "Gesperrt"
      );

      button.style.opacity = unlocked ? "1" : "0.65";
      button.style.cursor = unlocked ? "pointer" : "not-allowed";

      if (!unlocked) {
        button.setAttribute("aria-disabled", "true");
      } else {
        button.removeAttribute("aria-disabled");
      }
    }

    updateButton(sarah, "sarah", "Sarah");
    updateButton(alina, "alina", "Alina");
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest(".world-sarah, .world-alina");
    if (!link || !window.esatUnlock) return;

    const level = link.classList.contains("world-sarah")
      ? "sarah"
      : "alina";

    if (!esatUnlock.released(level)) {
      event.preventDefault();
      return;
    }

    if (level === "alina" && !esatUnlock.sarahCompleted()) {
      event.preventDefault();
      alert("🔒 Schließe zuerst Sarahs Level ab!");
    }
  }, true);

  updateWorldButtons();
  setInterval(updateWorldButtons, 1000);
})();
