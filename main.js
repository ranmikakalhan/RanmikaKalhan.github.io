/* Home page rendering. */
import {
  site,
  socials,
  stats,
  aboutChips,
  skills,
  achievements,
  timeline,
  toolkit,
  marqueeWords,
  orbitItems,
  iconFor,
} from "./data.js";
import { sortedPosts } from "./posts.js";
import {
  esc,
  icon,
  initShell,
  initMagnetic,
  observeReveals,
  onScroll,
  paintIcons,
  formatDate,
  readingTime,
} from "./ui.js";

/* ---------- small builders ---------- */
const heading = (eyebrow, title, subtitle) => `
  <div class="section-heading">
    <div class="reveal">
      <span class="eyebrow"><span class="dot"></span>${esc(eyebrow)}</span>
      <h2>${title}</h2>
      ${subtitle ? `<p>${esc(subtitle)}</p>` : ""}
    </div>
  </div>`;

const btn = (href, label, variant = "primary", trailingIcon) => `
  <a class="btn btn-${variant} press" href="${href}">
    <span class="sheen" aria-hidden="true"></span>
    <span class="btn-inner">${esc(label)}${trailingIcon ? icon(trailingIcon) : ""}</span>
  </a>`;

/* ---------- hero ---------- */
function hero() {
  const orbit = orbitItems
    .map((item, index) => {
      const angle = (index / orbitItems.length) * 360;
      return `
      <div class="orbit-arm" style="transform: rotate(${angle}deg) translate(10.5rem)">
        <span class="orbit-chip">
          <span class="liquid orbit-box" style="animation-delay:${index * 300}ms" title="${esc(item)}">
            ${icon(iconFor(item), "icon-lg")}
          </span>
        </span>
      </div>`;
    })
    .join("");

  return `
    <span class="hero-blob" aria-hidden="true"></span>
    <div class="wrap hero-grid">
      <div>
        <div class="reveal">
          <span class="available"><span class="dot"></span>Available for collaborations</span>
        </div>
        <div class="reveal" data-delay="90">
          <h1>
            <span class="hello">Hello, I'm</span>
            <span class="text-gradient">Ranmika</span><br />
            <span>Kalhan</span>
          </h1>
        </div>
        <div class="reveal" data-delay="180"><p class="lead">${esc(site.tagline)}</p></div>
        <div class="reveal" data-delay="260">
          <div class="mt-6" style="display:flex;flex-wrap:wrap;gap:0.75rem">
            ${btn("#work", "View my work", "primary", "arrow-right")}
            ${btn("#contact", "Get in touch", "outline")}
          </div>
        </div>
        <div class="reveal" data-delay="340">
          <div class="hero-meta">
            <span>${icon("map-pin", "icon-sm")} ${esc(site.location)}</span>
            <span>${icon("sparkles", "icon-sm")} ${esc(site.role)}</span>
          </div>
        </div>
      </div>
      <div class="reveal avatar-wrap" data-delay="200">
        <div class="orbit" aria-hidden="true"><div class="orbit-track">${orbit}</div></div>
        <div class="liquid glow-ring avatar-card">
          <img src="${esc(site.avatar)}" alt="Portrait of Ranmika Kalhan" />
        </div>
        <div class="liquid avatar-quote"><p>${esc(site.quote)}</p></div>
      </div>
    </div>`;
}

/* ---------- sections ---------- */
function marquee() {
  const run = [...marqueeWords, ...marqueeWords]
    .map((word) => `<span>${esc(word)}<i></i></span>`)
    .join("");
  return `<div class="marquee-track">${run}</div>`;
}

function about() {
  const chips = aboutChips
    .map(
      (item, index) => `
      <span class="chip press" style="animation:bob 6s ease-in-out infinite;animation-delay:${index * 320}ms">
        ${icon(iconFor(item), "icon-sm")} ${esc(item)}
      </span>`,
    )
    .join("");

  const statCards = stats
    .map(
      (stat, index) => `
      <div class="liquid stat reveal" data-delay="${index * 80}">
        <span class="card-top-line" aria-hidden="true"></span>
        <p class="value text-gradient">${esc(stat.value)}</p>
        <p class="label">${esc(stat.label)}</p>
      </div>`,
    )
    .join("");

  return `
    <div class="wrap">
      ${heading("About me", "A young creative obsessed with detail", "I'm a 15-year-old creative from Sri Lanka with a strong passion for design and video editing, focused on immersive and visually engaging digital experiences.")}
      <div class="grid gap-6 about-grid mt-12">
        <div class="liquid card about-card reveal">
          <span class="about-blob" aria-hidden="true"></span>
          <p>Currently I'm exploring the intersection of visual storytelling and user experience — content that not only looks good but connects with people in a meaningful way. I'm always experimenting with new styles, effects and techniques to refine my craft.</p>
          <p>When I'm not editing you'll find me exploring new creative tools, following design trends, or diving into gaming and tech for fresh inspiration.</p>
          <div class="tag-row">${chips}</div>
          <a class="chip press mt-6" href="#journey" style="padding:0.5rem 1rem;font-size:0.85rem">
            See my journey ${icon("arrow-up-right", "icon-sm")}
          </a>
        </div>
        <div class="stat-grid">${statCards}</div>
      </div>
    </div>`;
}

function skillsSection() {
  const cards = skills
    .map(
      (skill, index) => `
      <div class="liquid card reveal" data-delay="${index * 80}">
        <span class="card-top-line" aria-hidden="true"></span>
        <span class="skill-blob" aria-hidden="true"></span>
        <div class="skill-head">
          <h3>${esc(skill.title)}</h3>
          <span>${skill.level}%</span>
        </div>
        <p>${esc(skill.blurb)}</p>
        <div class="meter"><i data-meter="${skill.level}"></i></div>
        <div class="tag-row">
          ${skill.tools.map((tool) => `<span class="chip">${icon(iconFor(tool), "icon-sm")} ${esc(tool)}</span>`).join("")}
        </div>
      </div>`,
    )
    .join("");

  return `
    <div class="wrap">
      ${heading("Skills", "What I do, and how well I do it", "Four disciplines I keep sharpening every week.")}
      <div class="cards cards-2 mt-12">${cards}</div>
    </div>`;
}

function journey() {
  const items = timeline
    .map(
      (item, index) => `
      <li>
        <span class="node">${icon(item.icon, "icon")}</span>
        <div class="liquid milestone">
          <span class="m-blob" aria-hidden="true"></span>
          <div class="m-head">
            <span class="m-year">${esc(item.year)}</span>
            <span class="m-index">${String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.blurb)}</p>
        </div>
      </li>`,
    )
    .join("");

  return `
    <div class="wrap">
      ${heading("My journey", "Milestones so far", "From a scholarship exam to opening the batting for my school team.")}
      <div class="timeline" data-timeline>
        <span class="spine" aria-hidden="true"><i data-spine></i></span>
        <ol>${items}</ol>
      </div>
    </div>`;
}

function achievementsSection() {
  const cards = achievements
    .map(
      (item, index) => `
      <div class="liquid card reveal" data-delay="${index * 70}">
        <span class="card-top-line" aria-hidden="true"></span>
        <span class="icon-box">${icon(iconFor(item.tags[0]), "icon-lg")}</span>
        <h3 class="mt-4">${esc(item.title)}</h3>
        <p>${esc(item.blurb)}</p>
        <div class="tag-row">
          ${item.tags.map((tag) => `<span class="chip chip-sm">${esc(tag)}</span>`).join("")}
        </div>
      </div>`,
    )
    .join("");

  return `
    <div class="wrap">
      ${heading("Achievements", "Personal milestones in academics, sport and creative work", "A mix of school, sport and self-taught creative wins.")}
      <div class="cards cards-3 mt-12">${cards}</div>
    </div>`;
}

function toolkitSection() {
  const groups = toolkit
    .map(
      (group, index) => `
      <div class="liquid card reveal" data-delay="${index * 90}">
        <div class="toolkit-head">
          <span class="dot"></span>
          <h3>${esc(group.group)}</h3>
        </div>
        <ul class="toolkit-list">
          ${group.items
            .map(
              (item) => `
            <li>
              <span class="icon-box">${icon(iconFor(item), "icon-sm")}</span>
              ${esc(item)}
              <span class="trail" aria-hidden="true"></span>
            </li>`,
            )
            .join("")}
        </ul>
      </div>`,
    )
    .join("");

  return `
    <div class="wrap">
      ${heading("Toolkit", "Apps I use and games I play", "My technical toolkit for building modern digital experiences — plus what I unwind with.")}
      <div class="cards cards-3-lg mt-12">${groups}</div>
    </div>`;
}

function latest() {
  const posts = sortedPosts().slice(0, 3);
  const cards = posts
    .map(
      (post, index) => `
      <a class="liquid post-card reveal" data-delay="${index * 80}" href="404.html">
        ${post.cover_image ? `<div class="post-cover"><img src="${esc(post.cover_image)}" alt="${esc(post.title)}" loading="lazy" /></div>` : ""}
        <div class="post-body">
          <div class="post-meta">
            <span>${icon("calendar", "icon-sm")} ${formatDate(post.published_at)}</span>
            <span>${icon("clock", "icon-sm")} ${readingTime(post.content)}</span>
          </div>
          <h3>${esc(post.title)}</h3>
          <p class="excerpt">${esc(post.excerpt)}</p>
          <span class="read-more">Read article ${icon("arrow-right", "icon-sm")}</span>
        </div>
      </a>`,
    )
    .join("");

  return `
    <div class="wrap">
      ${heading("Journal", "Latest from the blog", "Thoughts on sport, tech and building things for the web.")}
      <div class="cards cards-3 mt-12">${cards}</div>
      <div class="reveal mt-10">${btn("404.html", "Read all articles", "outline", "arrow-right")}</div>
    </div>`;
}

function fund() {
  return `
    <div class="wrap">
      <div class="liquid mesh-bg fund reveal">
        <div class="fund-grid">
          <div>
            <span class="kicker" style="color:var(--coral)">Fund raise</span>
            <h2>Support my PS4 Pro project</h2>
            <p>I'm raising funds for a PS4 Pro to keep building and sharing gaming projects and content. Your support helps me bring more ideas to life.</p>
            <div class="mt-6" style="display:flex;flex-wrap:wrap;gap:0.75rem">
              ${btn(`mailto:${site.email}`, "Contribute", "primary")}
              ${btn("#contact", "Other ways to help", "outline")}
            </div>
          </div>
          <img src="https://m.media-amazon.com/images/I/51W9a-gmcwL.jpg" alt="PS4 Pro console" loading="lazy" />
        </div>
      </div>
    </div>`;
}

function contact() {
  const rows = [
    { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: "map-pin", label: "Location", value: site.location },
    { icon: "github", label: "GitHub", value: "@ranmika17", href: "https://github.com/ranmika17" },
  ]
    .map((row, index) => {
      const inner = `
        <span class="icon-box">${icon(row.icon, "icon-lg")}</span>
        <span style="min-width:0">
          <span class="label">${esc(row.label)}</span>
          <span class="value">${esc(row.value)}</span>
        </span>`;
      return row.href
        ? `<a class="liquid contact-row press reveal" data-delay="${index * 80}" href="${esc(row.href)}"${row.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${inner}</a>`
        : `<div class="liquid contact-row reveal" data-delay="${index * 80}">${inner}</div>`;
    })
    .join("");

  return `
    <div class="wrap">
      ${heading("Contact", "Let's work together", "Have a project in mind? I'd love to hear about it.")}
      <div class="grid gap-6 contact-grid mt-12">
        <div class="grid gap-3">${rows}</div>
        <div class="liquid card reveal" data-delay="120">
          <form class="form-stack" data-contact-form>
            <input class="field" name="name" placeholder="Your name" required />
            <input class="field" name="email" type="email" placeholder="Your email" required />
            <textarea class="field" name="message" placeholder="Tell me about your project" required></textarea>
            <button class="btn btn-primary btn-block press" type="submit">
              <span class="sheen" aria-hidden="true"></span>
              <span class="btn-inner">Send message</span>
            </button>
          </form>
        </div>
      </div>
    </div>`;
}

function connect() {
  const cards = socials
    .map(
      (social, index) => `
      <a class="liquid social reveal" data-delay="${index * 70}" href="${esc(social.href)}"${social.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>
        <span class="blob" aria-hidden="true" style="background:oklch(0.7 0.18 ${social.hue} / 0.5)"></span>
        <span class="icon-box">${icon(social.icon, "icon-lg")}</span>
        <span style="min-width:0">
          <span class="name">${esc(social.label)}</span>
          <span class="handle">${esc(social.handle)}</span>
        </span>
        <span class="go">${icon("arrow-up-right", "icon-sm")}</span>
      </a>`,
    )
    .join("");

  return `
    <div class="wrap">
      ${heading("Find me online", "Let's connect")}
      <div class="socials mt-10">${cards}</div>
      <div class="reveal center mt-12">
        <h3 style="font-size:clamp(1.5rem,4vw,2rem)">Have a project in mind?</h3>
        <p class="muted mt-4" style="max-width:28rem;margin-inline:auto;font-size:0.9rem">
          I'd love to hear about it. Let's create something amazing together.
        </p>
        <div class="mt-6" style="display:flex;justify-content:center">
          ${btn(`mailto:${site.email}`, "Start a conversation", "primary", "arrow-right")}
        </div>
      </div>
    </div>`;
}

/* ---------- behaviour ---------- */
function initMeters() {
  const meters = [...document.querySelectorAll("[data-meter]")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        window.setTimeout(() => {
          node.style.width = `${node.dataset.meter}%`;
        }, 180);
        observer.unobserve(node);
      });
    },
    { threshold: 0.4 },
  );
  meters.forEach((meter) => observer.observe(meter));
}

function initTimeline() {
  const root = document.querySelector("[data-timeline]");
  if (!root) return;
  const spine = root.querySelector("[data-spine]");
  const items = [...root.querySelectorAll("li")];

  onScroll(() => {
    const rect = root.getBoundingClientRect();
    const line = window.innerHeight * 0.62;
    const progress = Math.max(0, Math.min(1, (line - rect.top) / Math.max(1, rect.height)));
    spine.style.transform = `scaleY(${Math.max(0.02, progress)})`;
    items.forEach((item) => {
      const box = item.getBoundingClientRect();
      item.classList.toggle("is-active", box.top < window.innerHeight * 0.82);
    });
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  });
}

/* ---------- boot ---------- */
const mounts = [
  ["[data-hero]", hero],
  ["[data-marquee]", marquee],
  ["[data-about]", about],
  ["[data-skills]", skillsSection],
  ["[data-journey]", journey],
  ["[data-achievements]", achievementsSection],
  ["[data-toolkit]", toolkitSection],
  ["[data-latest]", latest],
  ["[data-fund]", fund],
  ["[data-contact]", contact],
  ["[data-connect]", connect],
];

mounts.forEach(([selector, build]) => {
  const node = document.querySelector(selector);
  if (node) node.innerHTML = build();
});

initShell({ name: site.name, location: site.location });
paintIcons();
initMagnetic();
observeReveals();
initMeters();
initTimeline();
initContactForm();

window.addEventListener("load", () => paintIcons());
