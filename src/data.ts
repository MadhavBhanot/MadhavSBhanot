export const EMAIL = "mdhvbhanot@gmail.com";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/madhavbhanot" },
  { label: "LinkedIn", href: "https://linkedin.com/in/madhavbhanot" },
  { label: "Email", href: `mailto:${EMAIL}` },
];

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
];

export const STATS = [
  { value: 8.32, decimals: 2, suffix: "", label: "CGPA, B.Tech CSE" },
  { value: 3, decimals: 0, suffix: "rd", label: "Unstop Hackathon, 200+ participants" },
  { value: 92, decimals: 0, suffix: "k★", label: "Repo I contribute to — uptime-kuma" },
];

export const SKILLS = [
  { group: "Frontend", items: ["React 19", "TypeScript", "Next.js (SSR/SSG)", "React Native (Expo)", "Vue.js", "Tailwind CSS", "Framer Motion", "IndexedDB"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST", "WebSockets", "Socket.IO", "SSE", "Webhooks", "Pub/Sub", "RBAC", "OAuth 2.0", "JWT", "Prisma", "Mongoose"] },
  { group: "AI & Data", items: ["RAG", "AI Agents (tool calling)", "pgvector Hybrid Search", "LLM-as-Judge Evals", "Prompt-Injection Defense", "Vercel AI SDK", "MCP", "Langfuse", "OpenAI / Gemini / Groq", "LangSmith", "Airflow", "Celery"] },
  { group: "Databases, Cloud & Tools", items: ["PostgreSQL", "Supabase", "MongoDB", "Docker", "AWS EC2 / S3", "Vercel", "Render", "GitHub Actions", "Python", "Java", "SQL", "Jest", "Vitest"] },
];

/** `crop` reproduces the Figma image crop: img box as % of the screenshot slot. `ambient` is a tiny pre-blurred copy of that crop. */
export type Shot = { src: string; ambient: string; url: string; width: number; height: number; crop: { w: number; h: number; l: number; t: number } };

export const FEATURED = {
  index: "01",
  title: "Gaminai",
  badge: "★  FEATURED — 01 / 2026 – PRESENT",
  links: [
    { label: "Live", href: "https://gaminai-alpha.vercel.app/" },
    { label: "GitHub", href: "https://github.com/MadhavBhanot/Gamanai" },
    { label: "Evals", href: "https://gaminai-alpha.vercel.app/evals" },
  ],
  description:
    "A full-stack RAG research assistant that streams cited answers over SSE — a 4-provider LLM fallback chain (Gemini, Gemma, NVIDIA, Groq), two-stage hybrid retrieval with Jina rerank, a pgvector semantic cache, Langfuse tracing and an MCP server for Claude and Cursor. A deep-research agent mode plans multi-hop questions with tool calls, and every change is scored by an LLM-as-judge eval harness gated in CI.",
  metrics: [
    { value: 99, suffix: "%", label: "Answers cite a source" },
    { value: 100, suffix: "%", label: "Multi-hop faithfulness" },
    { value: 10, suffix: "/10", label: "Injection canaries resisted" },
  ],
  tags: ["React", "TypeScript", "Express", "PostgreSQL + pgvector", "Vercel AI SDK", "MCP"],
  shot: { src: "/assets/gaminai.webp", ambient: "/assets/ambient-gaminai.webp", url: "gaminai-alpha.vercel.app", width: 340, height: 392, crop: { w: 100, h: 100, l: 0, t: 0 } } as Shot,
  win: { left: 190, top: 40 },
};

export const PROJECTS: {
  index: string; title: string; meta: string; href: string; description: string; stack: string;
  shot: Shot; win: { left: number; top: number };
}[] = [
  {
    index: "02", title: "ProScape — Focus", meta: "02 — 2026", href: "https://pro-scape.vercel.app/",
    description: "Offline-first React 19 workspace — playlists and media cached in IndexedDB behind a 600ms debounced write buffer; Express 5 backend with Google/GitHub OAuth and a cache layer that cut YouTube API latency by 50%.",
    stack: "React 19 · IndexedDB · Express 5 · OAuth 2.0",
    shot: { src: "/assets/proscape.webp", ambient: "/assets/ambient-proscape.webp", url: "pro-scape.vercel.app", width: 350, height: 200, crop: { w: 220.69, h: 216.87, l: -17.24, t: -15.66 } },
    win: { left: 30, top: 40 },
  },
  {
    index: "03", title: "RunAway", meta: "03 — 2026", href: "https://runaway-jade.vercel.app/",
    description: "Zero-dependency animated sketchbook — procedural scenery, a forward-kinematics stickman with three gaits and a Web Audio rain synth; batched rendering cut draw calls 98%+. 358 unit tests.",
    stack: "Canvas 2D · Web Audio API · Vanilla JS · Node.js",
    shot: { src: "/assets/runaway.webp", ambient: "/assets/ambient-runaway.webp", url: "runaway-jade.vercel.app", width: 330, height: 270, crop: { w: 201.26, h: 138.04, l: -25.91, t: -2.3 } },
    win: { left: 30, top: 36 },
  },
  {
    index: "04", title: "Movie Recommender", meta: "04 — 2025", href: "https://madsreccoms.netlify.app/",
    description: "Collaborative-filtering movie recommendations powered by the TMDB API, with an interactive React front end.",
    stack: "React · Python · TMDB API",
    shot: { src: "/assets/movie.webp", ambient: "/assets/ambient-movie.webp", url: "madsreccoms.netlify.app", width: 340, height: 230, crop: { w: 100, h: 100, l: 0, t: 0 } },
    win: { left: 30, top: 40 },
  },
];

export const EXPERIENCE = [
  { when: "AUG 2026 — PRESENT", title: "Open Source Contributor", org: "uptime-kuma (92k★) · kana-dojo (3.6k★)",
    text: "uptime-kuma PR #7732 (in review): a Vue.js feature that syncs monitor filters with URL query params so filtered views persist and can be shared — +336 lines including a 206-line test spec. kana-dojo PR #28654 (merged): a new community UI theme." },
  { when: "JUL — OCT 2025", title: "Full-Stack / React Developer", org: "Innate AI · Helsinki (Remote)",
    text: "Built the React + TypeScript interface of an LLM research platform for VC advisory teams — agent \"thinking\" view, live sources and editable report artifacts. Wrote the Node.js WebSocket layer and a real-time Signals pipeline (Airflow → webhooks → pub/sub), ~300ms faster than polling; multi-tenant RBAC over OAuth, Postgres migrations in Docker, document parsers and Airflow + Celery ingestion (1,000+ jobs/worker) for RAG, and an LLM-as-judge eval harness in LangSmith." },
  { when: "NOV 2024 — APR 2025", title: "Junior Full-Stack Developer", org: "Krishlabs · Bangalore",
    text: "Built an Instagram-style social app end to end — Expo React Native, Node.js/Express, MongoDB, 50+ REST endpoints: reels, stories, in-app photo editing, nested comments, an interest-ranked feed with cold-start fallback, and Socket.IO 1:1 and group chat with push notifications. Direct-to-S3 presigned uploads, a hardened EC2 API (OAuth, JWT refresh, rate limiting, injection sanitization) and the Next.js landing page." },
  { when: "2024", title: "Hackathon — 3rd Place", org: "Dev with AI Hackathon · Unstop · 200+ participants", star: true,
    text: "Built a React Native safety application end-to-end. Also certified in JavaScript & Java by IIT Bombay (90%)." },
];
