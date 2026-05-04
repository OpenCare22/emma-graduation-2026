// Shared header/footer + reveal observer
(function () {
  const PAGES = [
    { href: "index.html",        label: "Home",             key: "home" },
    { href: "memory-lane.html",  label: "Memory Lane",      key: "memory" },
    { href: "wishes.html",       label: "Letters & Wishes", key: "wishes" },
  ];

  function injectNav() {
    const host = document.querySelector("[data-nav]");
    if (!host) return;
    const active = host.getAttribute("data-nav");
    const links = PAGES.map(p =>
      `<a href="${p.href}" class="${p.key === active ? "active" : ""}">${p.label}</a>`
    ).join("");
    host.classList.add("nav");
    host.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-mark">Emma <span class="amp">·</span> 2026</a>
        <nav class="nav-links">${links}</nav>
        <div class="nav-meta">A keepsake</div>
        <button class="nav-toggle" aria-label="Menu">Menu</button>
      </div>
    `;
    const toggle = host.querySelector(".nav-toggle");
    toggle && toggle.addEventListener("click", () => host.classList.toggle("open"));
  }

  function injectFooter() {
    const host = document.querySelector("[data-footer]");
    if (!host) return;
    host.classList.add("footer");
    host.innerHTML = `
      <div class="footer-inner">
        <div>
          <div class="footer-mark">Emma<span>,</span> with love</div>
          <div class="footer-meta" style="margin-top:14px">A keepsake from the people who raised her</div>
        </div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="memory-lane.html">Memory Lane</a>
          <a href="wishes.html">Letters & Wishes</a>
        </div>
      </div>
      <div class="footer-inner" style="margin-top:48px">
        <div class="footer-meta">Class of 2026 · Pozarnicka 441, Nebusice</div>
        <div class="footer-meta">Hand-set with care · April 2026</div>
      </div>
    `;
  }

  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(e => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 });
    els.forEach(el => io.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectNav();
    injectFooter();
    setupReveal();
  });
})();
