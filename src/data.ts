export const EMAIL = "mdhvbhanot@gmail.com";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/madhavbhanot" },
  { label: "LinkedIn", href: "https://linkedin.com/in/madhavbhanot" },
  { label: "Email", href: `mailto:${EMAIL}` },
];

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
];

export const STATS = [
  { value: 8.32, decimals: 2, suffix: "", label: "CGPA, B.Tech CSE" },
  { value: 3, decimals: 0, suffix: "rd", label: "Unstop Hackathon, 200+ participants" },
  { value: 65, decimals: 0, suffix: "k★", label: "Repo I contribute to — uptime-kuma" },
];

export const SKILLS = [
  { group: "Frontend", items: ["React", "Next.js", "React Native (Expo)", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend & Data", items: ["Node.js", "Express.js", "WebSockets", "Socket.IO", "Prisma", "PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase"] },
  { group: "Cloud & Tools", items: ["AWS EC2 / S3", "Docker", "Git", "CI/CD", "Jest", "Postman", "Vercel", "Jira"] },
  { group: "AI & Workflow", items: ["OpenAI API", "Anthropic API", "RAG", "Prompt Engineering", "Apache Airflow", "Celery", "ETL Pipelines"] },
];

/** `crop` reproduces the Figma image crop: img box as % of the screenshot slot. `ambient` is a tiny pre-blurred copy of that crop. */
export type Shot = { src: string; ambient: string; url: string; width: number; height: number; crop: { w: number; h: number; l: number; t: number } };

export const FEATURED = {
  index: "01",
  title: "RunAway",
  badge: "★  FEATURED — 01 / 2026",
  href: "https://runaway-jade.vercel.app/",
  linkLabel: "runaway-jade.vercel.app",
  description:
    "A generative sketchbook canvas paired with an Apple-esque glass music player — procedural gaits, graphite & watercolor textures and a Web Audio synth, at a steady 60 FPS with zero dependencies.",
  metrics: [
    { value: 60, suffix: "", label: "FPS, zero deps" },
    { value: 30, suffix: "+", label: "Daily users" },
    { value: 48, suffix: "+", label: "Unique visitors" },
  ],
  tags: ["HTML5 Canvas", "Web Audio API", "JavaScript"],
  shot: { src: "/assets/runaway.webp", ambient: "/assets/ambient-runaway.webp", url: "runaway-jade.vercel.app", width: 580, height: 475, crop: { w: 201.26, h: 138.04, l: -25.91, t: -2.3 } } as Shot,
};

export const PROJECTS: {
  index: string; title: string; meta: string; href: string; description: string; stack: string;
  shot: Shot; win: { left: number; top: number };
}[] = [
  {
    index: "02", title: "ProScape — Focus", meta: "02 — 2026", href: "https://pro-scape.vercel.app/",
    description: "Offline-first React 19 workspace — IndexedDB with a 600ms debounced sync keeps state updates under 100ms; Express cache layer for YouTube metadata.",
    stack: "React 19 · IndexedDB · Express · OAuth 2.0",
    shot: { src: "/assets/proscape.webp", ambient: "/assets/ambient-proscape.webp", url: "pro-scape.vercel.app", width: 350, height: 200, crop: { w: 220.69, h: 216.87, l: -17.24, t: -15.66 } },
    win: { left: 30, top: 40 },
  },
  {
    index: "03", title: "Gaminai", meta: "03 — 2024–25", href: "https://drive.google.com/file/d/1aGqOn8-Oua4PVAIz9kcQWp3hQe9UNknT/view",
    description: "Full-stack AI research assistant — RAG pipeline over OpenAI & Anthropic with idempotent memory, authenticated history and live answer streaming.",
    stack: "React · Express · Postgres · Prisma · RAG",
    shot: { src: "/assets/gaminai.webp", ambient: "/assets/ambient-gaminai.webp", url: "gaminai — demo", width: 230, height: 300, crop: { w: 371.81, h: 164.74, l: -94.27, t: -5.27 } },
    win: { left: 40, top: 36 },
  },
  {
    index: "04", title: "Movie Recommender", meta: "04 — 2023–24", href: "https://madsreccoms.netlify.app/",
    description: "Collaborative-filtering movie recommendations powered by the TMDB API, with an interactive React front end.",
    stack: "React · Python · TMDB API",
    shot: { src: "/assets/movie.webp", ambient: "/assets/ambient-movie.webp", url: "madsreccoms.netlify.app", width: 320, height: 281, crop: { w: 235.64, h: 150.75, l: -38.88, t: -6.53 } },
    win: { left: 30, top: 36 },
  },
];

export const EXPERIENCE = [
  { when: "2026", title: "Open Source Contributor", org: "uptime-kuma (65k★) · kana-dojo",
    text: "Dynamic gRPC port binding (fix/grpc-ports) and URL-synced dashboard filters (+241 lines) in uptime-kuma; a visual theme for kana-dojo — across 16+ code-review threads." },
  { when: "JUL — OCT 2025", title: "React Developer", org: "Innate AI · Helsinki (Remote)",
    text: "React + TypeScript dashboards (Artifact, Signal, Context Handler) for LLM workflow systems. WebSocket updates 300ms faster, Airflow + Celery at 1K+ batch jobs/worker, OpenAI integration and prompt engineering." },
  { when: "NOV 2024 — APR 2025", title: "Jr Full-Stack Developer", org: "Krishlabs · Bangalore",
    text: "Next.js + Express marketing platform: +25% engagement, +40% sign-ups. Expo React Native social app with Socket.IO — 60% lower latency. 15+ REST endpoints on AWS EC2/S3 at 99.8% uptime." },
  { when: "2024", title: "Hackathon — 3rd Place", org: "Unstop · 200+ participants", star: true,
    text: "Built a React Native safety application end-to-end. Also certified in JavaScript & Java by IIT Bombay (90%)." },
];
