/* Shared UI behaviour: theme, bottom nav, reveals, helpers. */

export const EASE = "cubic-bezier(0.16,1,0.3,1)";

/* ---------- helpers ---------- */
export function h(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  return tpl.content;
}

export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function icon(name, cls = "icon") {
  return `<svg data-lucide="${esc(name)}" class="${cls}" aria-hidden="true"></svg>`;
}

export function paintIcons(root = document) {
  if (window.lucide?.createIcons) window.lucide.createIcons({ nameAttr: "data-lucide", root });
}

export function formatDate(value) {
  if (!value) return "Draft";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function readingTime(content) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/* ---------- theme ---------- */
const STORAGE_KEY = "rk-theme";

export function getTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function paintToggle() {
  const dark = getTheme() === "dark";
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.innerHTML = icon(dark ? "sun" : "moon", "icon-lg");
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    paintIcons(button);
  });
}

export function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }
  paintToggle();
}

function initTheme() {
  paintToggle();
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    setTheme(getTheme() === "dark" ? "light" : "dark");
  });
}

/* ---------- reveal on scroll ---------- */
let observer;

export function observeReveals(root = document) {
  const nodes = root.querySelectorAll(".reveal:not(.is-visible)");
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const delay = Number(node.dataset.delay ?? 0);
          window.setTimeout(() => node.classList.add("is-visible"), delay);
          observer.unobserve(node);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
  }
  nodes.forEach((node) => observer.observe(node));
}

/* ---------- scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.querySelector("[data-scroll-progress] > i");
  if (!bar) return;
  onScroll(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.transform = `scaleX(${value})`;
  });
}

/** rAF-throttled scroll/resize listener that fires immediately once. */
export function onScroll(update) {
  let frame = 0;
  const run = () => {
    frame = 0;
    update();
  };
  const handler = () => {
    if (!frame) frame = requestAnimationFrame(run);
  };
  update();
  window.addEventListener("scroll", handler, { passive: true });
  window.addEventListener("resize", handler);
}

/* ---------- bottom nav ---------- */
const navItems = [
  { label: "Home", icon: "house", href: "index.html", id: "top" },
  { label: "About", icon: "user", href: "index.html#about", id: "about" },
  { label: "Work", icon: "layers", href: "index.html#work", id: "work" },
  { label: "Blog", icon: "notebook-pen", href: "index.html#journal", id: "blog-page" },
  { label: "Contact", icon: "mail", href: "index.html#contact", id: "contact" },
    
];

function buildNav() {
  const mount = document.querySelector("[data-bottom-nav]");
  if (!mount) return;
  const onHome = document.body.dataset.page === "home";

  mount.innerHTML = `
    <div class="liquid nav-pill" data-nav-pill>
      ${navItems
        .map(
          (item) => `
        <a class="nav-item" href="${item.href}" data-nav="${item.id}" aria-label="${item.label}">
          ${icon(item.icon, "icon-lg")}
          <span class="nav-label"><span>${item.label}</span></span>
        </a>`,
        )
        .join("")}
      <span class="nav-sep" aria-hidden="true"></span>
      <button type="button" class="theme-toggle press" data-theme-toggle></button>
    </div>
    <button type="button" class="to-top liquid press" data-to-top aria-label="Back to top">
      ${icon("arrow-up", "icon")}
    </button>`;

  paintIcons(mount);
  paintToggle();

  const pill = mount.querySelector("[data-nav-pill]");
  const toTop = mount.querySelector("[data-to-top]");
  const links = [...mount.querySelectorAll(".nav-item")];

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  onScroll(() => {
    const scrolled = window.scrollY > 40;
    pill.classList.toggle("is-scrolled", scrolled);
    toTop.classList.toggle("is-visible", scrolled);
  });

  /* label expansion on hover / focus / touch */
  let timer;
  const showOnly = (link) => {
    links.forEach((node) => node.classList.toggle("show-label", node === link));
  };
  const restore = () => {
    links.forEach((node) => node.classList.toggle("show-label", node.classList.contains("is-active")));
  };
  links.forEach((link) => {
    const open = () => {
      window.clearTimeout(timer);
      showOnly(link);
    };
    link.addEventListener("mouseenter", open);
    link.addEventListener("focus", open);
    link.addEventListener("touchstart", () => {
      open();
      timer = window.setTimeout(restore, 2600);
    }, { passive: true });
  });
  mount.addEventListener("mouseleave", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(restore, 80);
  });

  const setActive = (id) => {
    links.forEach((link) => link.classList.toggle("is-active", link.dataset.nav === id));
    restore();
  };

  if (!onHome) {
    setActive(document.body.dataset.page === "blog" ? "blog-page" : "");
    return;
  }

  setActive("top");

  /* scroll spy on the home page */
  const sections = ["about", "work", "journal", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (sections.length === 0) return;
  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
  const activeId =
    visible.target.id === "journal"
      ? "blog-page"
      : visible.target.id;

  setActive(activeId);
}
      else if (window.scrollY < 200) setActive("top");
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.5, 1] },
  );
  sections.forEach((section) => spy.observe(section));
}

/* ---------- magnetic buttons ---------- */
export function initMagnetic(root = document) {
  root.querySelectorAll(".btn:not([data-magnetic])").forEach((button) => {
    button.dataset.magnetic = "true";
    const inner = button.querySelector(".btn-inner");
    if (!inner) return;
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      inner.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    button.addEventListener("mouseleave", () => {
      inner.style.transform = "translate3d(0,0,0)";
    });
  });
}

/* ---------- top bar (logo only) ---------- */
function buildTopBar(name) {
  const mount = document.querySelector("[data-top-bar]");
  if (!mount) return;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  mount.innerHTML = `
    <a class="liquid bar press" href="index.html" aria-label="${esc(name)} — home" data-top-pill>
      <span class="logo-mark" aria-hidden="true">${initials}</span>
      <span class="logo-text">${esc(name.split(" ")[0])} <i>${esc(name.split(" ").slice(1).join(" "))}</i></span>
    </a>`;
  const bar = mount.querySelector("[data-top-pill]");
  onScroll(() => bar.classList.toggle("is-scrolled", window.scrollY > 40));
}

/* ---------- footer ---------- */
function buildFooter(name, location) {
  const mount = document.querySelector("[data-footer]");
  if (!mount) return;
  mount.innerHTML = `
    <div class="footer-inner">
      <div>
        <p class="name">${esc(name)}</p>
        <p class="meta">${esc(location)} · Built with care in 2026</p>
      </div>
      <div class="footer-links">
        <a href="index.html#about">About</a>
        <a href="index.html#work">Work</a>
        <a href="index.html#contact">Contact</a>
        <a href="blog.html">Blog</a>
      </div>
    </div>`;
}

/* ---------- boot ---------- */
export function initShell({ name, location } = {}) {
  initTheme();
  buildTopBar(name ?? "Ranmika Kalhan");
  buildNav();
  buildFooter(name ?? "Ranmika Kalhan", location ?? "Matara, Sri Lanka");
  initScrollProgress();
  initMagnetic();
  observeReveals();
}
