/* Blog posts — add a new object to publish a new article. */

export const posts = [
  {
    title: "How to Use GitHub to Publish Websites",
    slug: "publish-websites-with-github",
    excerpt: "A short, practical guide to shipping your site with GitHub Pages.",
    cover_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh8G7Q3rLWczPt80vAY0KHNu0wtwO9Xf9fwA&s",
    tags: ["Tutorial", "GitHub", "Web"],
    published_at: "2026-07-30",
    content: `You do not need a paid host to put a website online. GitHub Pages is free and takes about five minutes.

- Create a repository named \`yourusername.github.io\`.
- Add your \`index.html\`, CSS and JS files.
- Commit and push.
- Open Settings → Pages and select the \`main\` branch.
- Wait a minute, then visit \`https://yourusername.github.io\`.

That is genuinely it. Both of my earlier portfolios started exactly this way.

Tips: keep file names lowercase, use relative paths for images, and always test on a phone before sharing the link.`,
  },
  {
    title: "Pre-conference about Asia Cup 2025",
    slug: "asia-cup-2025",
    excerpt: "The Asia Cup is coming up — here is what I am watching for.",
    cover_image:
      "https://adaderanaenglish.s3.amazonaws.com/1757382719-Asia-Cup-2025-Sri-Lanka-Ada-Derana-6.jpg",
    tags: ["Cricket", "Asia Cup"],
    published_at: "2026-07-23",
    content: `The Asia Cup 2025 is almost here and the excitement is unreal.

Sri Lanka comes in with a young, fearless batting line-up. The bowling still depends heavily on spin, which could be decisive depending on the surfaces.

What I am watching:

- How the top order handles the new ball
- Whether the spinners can control the middle overs
- The fielding standards, which decided so many recent games

Whatever happens, this tournament always delivers drama.`,
  },
  {
    title: "Windows 10 or 11? Choose wisely",
    slug: "windows-10-or-11",
    excerpt: "Which operating system actually makes sense for you right now?",
    cover_image:
      "https://www.lifewire.com/thmb/yNL8V8fxh2KozTWZaFaM1IkdYE4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Windows-11-vs-Windows-10-017883b520cd47608f6b994289765abb.jpg",
    tags: ["Tech", "Windows"],
    published_at: "2026-07-13",
    content: `Windows 11 looks beautiful — rounded corners, centred taskbar, cleaner settings. But looks are not the whole story.

**Choose Windows 11 if** your hardware supports it, you want the newest security features, and you like the modern design language.

**Stay on Windows 10 if** your machine is older, you rely on software that has not been updated yet, or you simply prefer the classic taskbar workflow.

My take: if your PC meets the requirements, upgrade. The performance gap has closed and the design consistency is worth it.`,
  },
  {
    title: "My Life with Cricket and Other Sports",
    slug: "my-life-with-cricket",
    excerpt: "How cricket taught me teamwork, strategy and dedication — on and off the field.",
    cover_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pollock_to_Hussey.jpg/1200px-Pollock_to_Hussey.jpg",
    tags: ["Cricket", "Sports", "Life"],
    published_at: "2026-07-03",
    content: `Cricket is more than a sport for me. It is a passion that inspires teamwork, strategy and dedication.

I joined a cricket club in 2022 and played my first ever match at Uyanwatta Cricket Stadium. In 2025 I became the opening batsman of my school team, which is still one of the proudest moments of my life.

Sports taught me things design never could: how to stay calm under pressure, how to trust the people around you, and how to keep showing up on the days when nothing works.

> Football and chess fill the gaps. Football for the chaos, chess for the quiet.`,
  },
];

export function sortedPosts() {
  return [...posts].sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
}

export function postBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}
