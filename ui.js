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
  if (window.lucide?.createIcons) {
    window.lucide.createIcons({
      nameAttr: "data-lucide",
      root,
    });
  }
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
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

function paintToggle() {
  const dark = getTheme() === "dark";

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.innerHTML = icon(
      dark ? "sun" : "moon",
      "icon-lg"
    );

    button.setAttribute(
      "aria-label",
      dark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    paintIcons(button);
  });
}

export function setTheme(theme) {
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark"
  );

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
    const button = event.target.closest(
      "[data-theme-toggle]"
    );

    if (!button) return;

    setTheme(
      getTheme() === "dark"
        ? "light"
        : "dark"
    );
  });
}


/* ---------- reveal on scroll ---------- */

let observer;

export function observeReveals(root = document) {
  const nodes = root.querySelectorAll(
    ".reveal:not(.is-visible)"
  );

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const node = entry.target;

          const delay = Number(
            node.dataset.delay ?? 0
          );

          window.setTimeout(
            () => node.classList.add("is-visible"),
            delay
          );

          observer.unobserve(node);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      }
    );
  }

  nodes.forEach((node) =>
    observer.observe(node)
  );
}


/* ---------- scroll progress bar ---------- */

function initScrollProgress() {
  const bar = document.querySelector(
    "[data-scroll-progress] > i"
  );

  if (!bar) return;

  onScroll(() => {
    const max =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const value =
      max > 0
        ? Math.min(
            1,
            window.scrollY / max
          )
        : 0;

    bar.style.transform =
      `scaleX(${value})`;
  });
}


/* ---------- scroll helper ---------- */

export function onScroll(update) {
  let frame = 0;

  const run = () => {
    frame = 0;
    update();
  };

  const handler = () => {
    if (!frame) {
      frame = requestAnimationFrame(run);
    }
  };

  update();

  window.addEventListener(
    "scroll",
    handler,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    handler
  );
}


/* ---------- bottom nav ---------- */

const navItems = [
  {
    label: "Home",
    icon: "house",
    href: "index.html",
    id: "top",
  },

  {
    label: "About",
    icon: "user",
    href: "index.html#about",
    id: "about",
  },

  {
    label: "Work",
    icon: "layers",
    href: "index.html#work",
    id: "work",
  },

  {
    label: "Blog",
    icon: "notebook-pen",
    href: "index.html#journal",
    id: "blog-page",
  },

  {
    label: "Contact",
    icon: "mail",
    href: "index.html#contact",
    id: "contact",
  },
];


function buildNav() {
  const mount = document.querySelector(
    "[data-bottom-nav]"
  );

  if (!mount) return;

  const onHome =
    document.body.dataset.page === "home";


  /* ---------- build navigation ---------- */

  mount.innerHTML = `
    <div
      class="liquid nav-pill"
      data-nav-pill
    >
      ${navItems
        .map(
          (item) => `
            <a
              class="nav-item"
              href="${item.href}"
              data-nav="${item.id}"
              aria-label="${item.label}"
            >
              ${icon(item.icon, "icon-lg")}

              <span class="nav-label">
                <span>${item.label}</span>
              </span>
            </a>
          `
        )
        .join("")}

      <span
        class="nav-sep"
        aria-hidden="true"
      ></span>

      <button
        type="button"
        class="theme-toggle press"
        data-theme-toggle
      ></button>
    </div>
  `;

  paintIcons(mount);
  paintToggle();


  /* ---------- references ---------- */

  const pill =
    mount.querySelector("[data-nav-pill]");

  const links = [
    ...mount.querySelectorAll(".nav-item"),
  ];


  /* ---------- nav pill scroll appearance ---------- */

  onScroll(() => {
    const scrolled =
      window.scrollY > 40;

    pill.classList.toggle(
      "is-scrolled",
      scrolled
    );
  });


  /* ---------- label expansion ---------- */

  let timer;

  const showOnly = (link) => {
    links.forEach((node) => {
      node.classList.toggle(
        "show-label",
        node === link
      );
    });
  };

  const restore = () => {
    links.forEach((node) => {
      node.classList.toggle(
        "show-label",
        node.classList.contains("is-active")
      );
    });
  };


  links.forEach((link) => {
    const open = () => {
      window.clearTimeout(timer);
      showOnly(link);
    };

    link.addEventListener(
      "mouseenter",
      open
    );

    link.addEventListener(
      "focus",
      open
    );

    link.addEventListener(
      "touchstart",
      () => {
        open();

        timer = window.setTimeout(
          restore,
          2600
        );
      },
      { passive: true }
    );
  });


  mount.addEventListener(
    "mouseleave",
    () => {
      window.clearTimeout(timer);

      timer = window.setTimeout(
        restore,
        80
      );
    }
  );


  /* ---------- active nav ---------- */

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.dataset.nav === id
      );
    });

    restore();
  };


  /* ---------- other pages ---------- */

  if (!onHome) {
    setActive(
      document.body.dataset.page === "blog"
        ? "blog-page"
        : ""
    );

    return;
  }


  /* =====================================================
     HOME PAGE NAVIGATION
     ===================================================== */


  /*
   * This prevents the scroll spy from changing
   * the active button while we are smoothly
   * travelling to the selected section.
   */
  let navigationInProgress = false;

  let navigationTimer = null;


  /*
   * Finish the programmatic scroll.
   */
  const finishNavigation = () => {
    navigationInProgress = false;

    if (navigationTimer) {
      window.clearTimeout(
        navigationTimer
      );

      navigationTimer = null;
    }

    updateActiveNav();
  };


  /*
   * Smoothly scroll to a section.
   */
  const scrollToTarget = (id) => {
    let target = null;

    if (id === "top") {
      target = document.documentElement;
    } else {
      target =
        document.getElementById(id);
    }

    if (!target) return;


    /*
     * Lock the scroll spy.
     */
    navigationInProgress = true;


    /*
     * Immediately show the button that
     * the user actually selected.
     */
    setActive(id);


    /*
     * Cancel any previous fallback timer.
     */
    if (navigationTimer) {
      window.clearTimeout(
        navigationTimer
      );
    }


    /*
     * Home.
     */
    if (id === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }


    /*
     * Other sections.
     */
    else {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }


    /*
     * Modern browsers fire scrollend after
     * smooth scrolling finishes.
     */
    let finished = false;

    const done = () => {
      if (finished) return;

      finished = true;

      window.removeEventListener(
        "scrollend",
        done
      );

      finishNavigation();
    };


    window.addEventListener(
      "scrollend",
      done,
      { once: true }
    );


    /*
     * Fallback for browsers that don't support
     * scrollend.
     */
    navigationTimer =
      window.setTimeout(
        done,
        1400
      );
  };


  /*
   * Intercept navigation clicks on the HOME page.
   *
   * This is the important fix.
   *
   * The browser will NOT navigate through
   * the href. Instead, we perform one smooth
   * scroll directly to the destination.
   */
  links.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();

        const navId =
          link.dataset.nav;

        if (!navId) return;


        /*
         * Blog uses "blog-page" as its
         * navigation ID but its actual
         * section ID is "journal".
         */
        const targetId =
          navId === "blog-page"
            ? "journal"
            : navId;


        scrollToTarget(targetId);
      }
    );
  });


  /* ---------- sections ---------- */

  const sectionData = [
    {
      id: "about",
      nav: "about",
    },

    {
      id: "work",
      nav: "work",
    },

    {
      id: "journal",
      nav: "blog-page",
    },

    {
      id: "contact",
      nav: "contact",
    },
  ];


  const sections = sectionData
    .map((item) => {
      const element =
        document.getElementById(item.id);

      if (!element) return null;

      return {
        ...item,
        element,
      };
    })
    .filter(Boolean);


  /* ---------- scroll spy ---------- */

  const updateActiveNav = () => {

    /*
     * DO NOT change the active button while
     * a navbar click is performing a smooth
     * scroll.
     */
    if (navigationInProgress) {
      return;
    }


    const scrollY =
      window.scrollY;


    /*
     * TOP / HOME
     *
     * When we are near the top,
     * Home becomes active.
     */
    if (scrollY <= 150) {
      setActive("top");
      return;
    }


    /*
     * Find the section closest to the
     * active point on the screen.
     */
    const activePoint =
      scrollY +
      window.innerHeight * 0.35;

    let current = null;


    sections.forEach((section) => {
      const top =
        section.element.offsetTop;

      if (top <= activePoint) {
        current = section;
      }
    });


    if (current) {
      setActive(current.nav);
    } else {
      setActive("top");
    }
  };


  /*
   * Start on Home.
   */
  setActive("top");


  /*
   * Watch scrolling.
   */
  onScroll(updateActiveNav);


  /*
   * Recalculate after images/fonts have
   * finished loading and section positions
   * are stable.
   */
  window.addEventListener(
    "load",
    updateActiveNav
  );
}


/* ---------- magnetic buttons ---------- */

export function initMagnetic(
  root = document
) {
  root
    .querySelectorAll(
      ".btn:not([data-magnetic])"
    )
    .forEach((button) => {

      button.dataset.magnetic =
        "true";

      const inner =
        button.querySelector(
          ".btn-inner"
        );

      if (!inner) return;


      button.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            button.getBoundingClientRect();

          const x =
            (
              (event.clientX -
                rect.left) /
                rect.width -
              0.5
            ) * 12;

          const y =
            (
              (event.clientY -
                rect.top) /
                rect.height -
              0.5
            ) * 10;

          inner.style.transform =
            `translate3d(${x}px,${y}px,0)`;
        }
      );


      button.addEventListener(
        "mouseleave",
        () => {
          inner.style.transform =
            "translate3d(0,0,0)";
        }
      );
    });
}


/* ---------- top bar (logo only) ---------- */

function buildTopBar(name) {
  const mount =
    document.querySelector(
      "[data-top-bar]"
    );

  if (!mount) return;


  const initials = name
    .split(" ")
    .map(
      (part) => part[0]
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();


  /*
   * DIV instead of A.
   *
   * The top bar is therefore completely
   * non-clickable.
   */

  mount.innerHTML = `
    <div
      class="liquid bar press"
      aria-label="${esc(name)}"
      data-top-pill
    >
      <span
        class="logo-mark"
        aria-hidden="true"
      >
        ${initials}
      </span>

      <span class="logo-text">
        ${esc(
          name.split(" ")[0]
        )}

        <i>
          ${esc(
            name
              .split(" ")
              .slice(1)
              .join(" ")
          )}
        </i>
      </span>
    </div>
  `;


  const bar =
    mount.querySelector(
      "[data-top-pill]"
    );


  onScroll(() => {
    bar.classList.toggle(
      "is-scrolled",
      window.scrollY > 40
    );
  });
}


/* ---------- footer ---------- */

function buildFooter(
  name,
  location
) {
  const mount =
    document.querySelector(
      "[data-footer]"
    );

  if (!mount) return;


  mount.innerHTML = `
    <div class="footer-inner">

      <div>
        <p class="name">
          ${esc(name)}
        </p>

        <p class="meta">
          ${esc(location)}
          · Built with care in 2026
        </p>
      </div>

      <div class="footer-links">

        <a href="index.html#about">
          About
        </a>

        <a href="index.html#work">
          Work
        </a>

        <a href="index.html#contact">
          Contact
        </a>

        <a href="blog.html">
          Blog
        </a>

      </div>
    </div>
  `;
}


/* ---------- boot ---------- */

export function initShell({
  name,
  location,
} = {}) {

  initTheme();

  buildTopBar(
    name ?? "Ranmika Kalhan"
  );

  buildNav();

  buildFooter(
    name ?? "Ranmika Kalhan",
    location ?? "Matara, Sri Lanka"
  );

  initScrollProgress();

  initMagnetic();

  observeReveals();
}
