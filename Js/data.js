/* Site content — edit this file to update the portfolio. */

export const site = {
  name: "Ranmika Kalhan",
  role: "Creative Designer · Video Editor · Web Developer",
  location: "Matara, Sri Lanka",
  email: "ranmikakalhan17@gmail.com",
  tagline:
    "I craft digital experiences that blend creativity with technical excellence — modern web, motion and visual storytelling.",
  quote: "Design with empathy. Code with care.",
  avatar:
    "https://ranmika17.github.io/WhatsApp%20Image%202025-08-09%20at%2017.55.00_7eb8336d.jpg",
};

export const socials = [
  { label: "GitHub", handle: "@ranmika17", href: "https://github.com/ranmika17", hue: "265", icon: "github" },
  {
    label: "Instagram",
    handle: "@ranmika17",
    href: "https://www.instagram.com/ranmika17?igsh=MXMwcGJiaXZnN29pMw==",
    hue: "20",
    icon: "instagram",
  },
  {
    label: "TikTok",
    handle: "@ranmikakalhan17",
    href: "https://www.tiktok.com/@ranmikakalhan17?_r=1&_t=ZS-94vJiB2I1gn",
    hue: "195",
    icon: "music-2",
  },
  { label: "YouTube", handle: "Ranmika Kalhan", href: "https://www.youtube.com/@ranmikakalhan", hue: "28", icon: "youtube" },
  { label: "Email", handle: "ranmikakalhan17@gmail.com", href: "mailto:ranmikakalhan17@gmail.com", hue: "248", icon: "mail" },
];

export const stats = [
  { value: "15+", label: "Age" },
  { value: "01/17", label: "Birthdate" },
  { value: "MRCM", label: "School" },
  { value: "4+", label: "Years creating" },
];

export const aboutChips = ["After Effects", "Photoshop", "Figma", "JavaScript", "Git", "Cricket"];

export const skills = [
  {
    title: "Video Editing",
    blurb: "Polished, engaging videos with smooth transitions, sound design and professional effects.",
    level: 92,
    tools: ["After Effects", "Premiere Pro", "CapCut", "Alight Motion"],
  },
  {
    title: "Graphics Design",
    blurb: "Thumbnails, posters and brand visuals built around contrast, type and hierarchy.",
    level: 85,
    tools: ["Photoshop", "Illustrator", "Canva", "Figma"],
  },
  {
    title: "Web Development",
    blurb: "Modern, accessible websites and web apps with delightful micro-interactions.",
    level: 80,
    tools: ["HTML", "CSS", "JavaScript", "Git", "Vercel"],
  },
  {
    title: "Cricket & Sports",
    blurb: "Opening batsman for my school team. Teamwork, strategy and dedication.",
    level: 88,
    tools: ["Cricket", "Football", "Chess"],
  },
];

export const achievements = [
  {
    title: "Video Editor",
    blurb: "Create polished, engaging videos with smooth transitions and professional effects.",
    tags: ["After Effects", "CapCut"],
  },
  {
    title: "Portfolio Websites",
    blurb: "Built modern, accessible websites and web apps with delightful micro-interactions.",
    tags: ["HTML", "CSS", "JS"],
  },
  {
    title: "Social Media Creator",
    blurb: "Actively create and share content, engage with communities and grow an online presence.",
    tags: ["YouTube", "TikTok", "Instagram"],
  },
  {
    title: "Sportsman",
    blurb: "Cricket and football are more than a sport for me — they inspire teamwork and dedication.",
    tags: ["Cricket", "Football", "Chess"],
  },
  {
    title: "Graphics Designer",
    blurb: "Visual design work for thumbnails, posters, logos and social identity.",
    tags: ["Photoshop", "Illustrator", "Canva"],
  },
  {
    title: "Scholarship Exam",
    blurb: "Passed the Grade 5 scholarship examination with 183 marks in 2020.",
    tags: ["Academics"],
  },
];

export const timeline = [
  { year: "2011", title: "Birth year", blurb: "Born on 17 January 2011 in Sri Lanka.", icon: "cake" },
  { year: "2020", title: "Scholarship exam", blurb: "Passed my scholarship exam with 183 marks.", icon: "award" },
  { year: "2021", title: "New school", blurb: "Joined MRCM.", icon: "graduation-cap" },
  {
    year: "2022",
    title: "Cricket journey begins",
    blurb: "Joined a cricket club and played my first match at Uyanwatta Cricket Stadium.",
    icon: "users",
  },
  {
    year: "2025",
    title: "Opening batsman",
    blurb: "Played as the opening batsman of the school cricket team.",
    icon: "trophy",
  },
  {
    year: "2026",
    title: "Building on the web",
    blurb: "Designing and shipping modern, animated web experiences.",
    icon: "rocket",
  },
];

export const toolkit = [
  { group: "Video Editing", items: ["After Effects", "Premiere Pro", "CapCut", "Alight Motion", "Wink", "Edits"] },
  { group: "Design & Tools", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Git", "VS Code", "Vercel"] },
  { group: "Games", items: ["AC Black Flag", "Clash of Clans", "Clash Royale", "RDR 1", "Blood Strike", "Fortnite"] },
];

export const marqueeWords = [
  "Video Editing",
  "Motion Design",
  "Web Development",
  "Graphics",
  "Cricket",
  "Storytelling",
  "UI Design",
  "Content Creation",
];

export const orbitItems = ["After Effects", "Figma", "Photoshop", "JavaScript", "Cricket", "CapCut"];

/* ---------- Icon mapping (lucide icon names) ---------- */
const iconMap = {
  "After Effects": "wand-2",
  "Premiere Pro": "clapperboard",
  CapCut: "scissors",
  "Alight Motion": "aperture",
  Wink: "camera",
  Edits: "film",
  Figma: "figma",
  "Adobe XD": "layers",
  Photoshop: "image",
  Illustrator: "pen-tool",
  Canva: "brush",
  HTML: "code-2",
  CSS: "braces",
  JavaScript: "terminal",
  JS: "terminal",
  Git: "git-branch",
  GitHub: "github",
  "VS Code": "code-2",
  Vercel: "rocket",
  Cricket: "trophy",
  Football: "trophy",
  Chess: "crown",
  Academics: "sparkles",
  YouTube: "monitor-play",
  TikTok: "monitor-play",
  Instagram: "camera",
};

const fallbacks = ["boxes", "swords", "gamepad-2", "sparkles", "layers"];

export function iconFor(name) {
  if (iconMap[name]) return iconMap[name];
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) % 9973;
  return fallbacks[hash % fallbacks.length];
}

