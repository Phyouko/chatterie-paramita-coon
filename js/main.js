document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const navByHash = new Map();
  if (navLinks) {
    navLinks.querySelectorAll("a[href^='#']").forEach((a) => {
      navByHash.set(a.getAttribute("href").slice(1), a);
    });
  }
  if (sections.length && navByHash.size && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = navByHash.get(entry.target.id);
        if (!link || !entry.isIntersecting) return;
        navByHash.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => observer.observe(s));
  }

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const successBox = document.querySelector("#form-success");
  const errorBox = document.querySelector("#form-error");
  const submitBtn = form.querySelector("button[type=submit]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (errorBox) errorBox.classList.remove("visible");
    if (successBox) successBox.classList.remove("visible");
    const body = new URLSearchParams(new FormData(form)).toString();

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Envoi en cours…"; }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
      .then(() => {
        form.reset();
        if (successBox) successBox.classList.add("visible");
      })
      .catch(() => {
        if (errorBox) errorBox.classList.add("visible");
      })
      .finally(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Envoyer"; }
      });
  });
});
