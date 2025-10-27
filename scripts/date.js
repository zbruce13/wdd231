document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModEl = document.getElementById("lastModified");
  if (lastModEl) lastModEl.textContent = "Last modified: " + document.lastModified;
});