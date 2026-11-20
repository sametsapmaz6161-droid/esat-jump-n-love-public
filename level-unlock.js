(function () {
  "use strict";

  const RELEASES = {
    sarah: Date.parse("2026-11-24T18:00:00+01:00"),
    alina: Date.parse("2026-11-27T18:00:00+01:00")
  };

  const SARAH_COMPLETED_KEY = "esat-sarah-completed-v1";

  function released(level) {
    return Date.now() >= RELEASES[level];
  }

  function sarahCompleted() {
    try {
      return localStorage.getItem(SARAH_COMPLETED_KEY) === "true";
    } catch {
      return false;
    }
  }

  function completeSarah() {
    try {
      localStorage.setItem(SARAH_COMPLETED_KEY, "true");
    } catch {
      console.warn("Spielfortschritt konnte nicht gespeichert werden.");
    }
  }

  function message(level) {
    return level === "sarah"
      ? "🔒 Gesperrt bis 24.11.2026, 18:00 Uhr"
      : "🔒 Gesperrt bis 27.11.2026, 18:00 Uhr";
  }

  window.esatUnlock = {
    released,
    sarahCompleted,
    completeSarah,
    message,
    canEnterAlina: () => released("alina") && sarahCompleted()
  };
})();
