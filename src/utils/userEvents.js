export const userEvents = {
  // 🔁 Trigger a global reload event
  reload: () => window.dispatchEvent(new Event("users:reload")),

  // 👂 Start listening to the reload event
  listen: (callback) => window.addEventListener("users:reload", callback),

  // ❌ Stop listening to the reload event
  remove: (callback) => window.removeEventListener("users:reload", callback),
};
