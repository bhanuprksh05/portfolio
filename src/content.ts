// All site copy lives here so it can be edited without touching layout code.

export const site = {
  name: "Bhanu Prakash",
  role: "Full-Stack & AI Engineer",
  url: "https://bhanuprakash.dev", // TODO: replace with your real domain
  email: "bhanuprksh05@gmail.com",
  github: "https://github.com/bhanuprksh05",
  linkedin: "", // TODO: paste your LinkedIn profile URL
  resume: "/Bhanu_Prakash_Resume.pdf",
  location: "Gurugram, India",
};

export const hero = {
  title: "Full-stack engineer building AI-powered products.",
  subtitle:
    "I'm Bhanu, a software engineer with two years of experience shipping scalable web apps and production AI — RAG assistants, agents, and the products around them. I care about fast, secure, well-structured software.",
};

export type Screenshot = { src: string; alt: string; caption: string };

export type Project = {
  slug: string; // case study lives at /work/<slug> when caseStudies has this key
  kind: "work" | "personal";
  title: string;
  tag: string;
  summary: string;
  problem: string;
  highlights: string[];
  stack: string[];
  status?: string;
  link?: { label: string; href: string };
  // Screenshots live in public/projects/. The first one is shown large.
  images?: Screenshot[];
};

export const projects: Project[] = [
  {
    slug: "project-assistant",
    kind: "personal",
    title: "Project Assistant",
    tag: "AI assistant · code & data Q&A",
    summary:
      "A read-only AI assistant, built on the Claude Agent SDK, that lets testers, PMs and support staff ask about a project's code and databases in plain English — and get answers and Excel reports without waiting on a developer.",
    problem:
      "Non-developers constantly need answers only developers can give — \"Is this feature live?\", \"What changed this week?\", \"How many users signed up last month?\" — which interrupts engineering and slows everyone down.",
    highlights: [
      "Answers questions about the codebase on any branch using read-only code and git tools",
      "Turns plain-English questions into database queries on PostgreSQL, MySQL and MongoDB, with CSV/Excel export",
      "Read-only by design, in layers: SQL validation, read-only transactions, timeouts and row limits; production data only for approved members",
      "Multi-user web app with live streaming answers, a message queue, usage budgets and a full audit log",
    ],
    stack: ["Claude Agent SDK", "FastAPI", "PostgreSQL", "React", "WebSockets", "Docker"],
    images: [
      {
        src: "/projects/project-assistant-session.png",
        alt: "Project Assistant chat screen with session list and suggested questions",
        caption: "Sessions per project, with a choice of AI model",
      },
      {
        src: "/projects/project-assistant-activity.png",
        alt: "Audit log of settings and access changes",
        caption: "Full audit log of every change",
      },
    ],
  },
  {
    slug: "ipn",
    kind: "work",
    title: "India Partner Network",
    tag: "Nonprofit platform",
    summary:
      "A capacity-building platform for nonprofits, built with Sattva Consulting: profiles, assessments, events, resources and admin tools.",
    problem:
      "Manual feedback collection, slow first loads, patchy profile data and open findings from security and SEO audits on a live platform.",
    highlights: [
      "Built the configurable feedback workflow end to end: triggers, delays, email/WhatsApp, reminders",
      "Frontend performance work under server-side rendering",
      "Security fixes, session hardening, SEO and profile data quality",
    ],
    stack: ["Angular", "Angular SSR", "Node.js", "Express", "PostgreSQL", "Amplitude", "WordPress"],
    link: { label: "Visit indiapartnernetwork.org", href: "https://www.indiapartnernetwork.org" },
  },
  {
    slug: "annual-planning-mis",
    kind: "work",
    title: "Annual Planning & MIS",
    tag: "Planning and reporting system",
    summary:
      "Yearly planning and quarterly target-vs-achievement tracking for a national NGO, from village level to a national view.",
    problem:
      "Targets split across geographies and projects, formula-based indicators, multi-role approvals and reports over tens of millions of records.",
    highlights: [
      "Annual plan engine with formula indicators and geography-wise target splits",
      "Quarterly reporting, reviews and a national consolidated view",
      "Streaming Excel/ZIP exports moved to a dedicated service",
    ],
    stack: ["Next.js", "TypeScript", "GraphQL", "Apollo", "MongoDB", "AWS S3"],
  },
  {
    slug: "farm-mechanisation",
    kind: "work",
    title: "Farm Mechanisation Platform",
    tag: "IoT monitoring + marketplace",
    summary:
      "Telematics-based monitoring of farm machinery for a state programme, plus a marketplace to rent equipment and trade crop residue.",
    problem:
      "Turning third-party machine data into utilisation and rankings per area, then following activity as the marketplace took over.",
    highlights: [
      "Telematics ingestion jobs and pre-aggregated utilisation tables",
      "Marketplace bookings, listings and image handling",
      "Analytics refactor and zero-downtime indexing",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Angular", "AWS S3", "node-cron"],
  },
  {
    slug: "agri-programme-mis",
    kind: "work",
    title: "Agriculture Programme Dashboard",
    tag: "Monitoring & reporting",
    summary:
      "A monitoring dashboard for an agricultural extension programme: farmer outreach, adoption, demo plots and partner targets.",
    problem:
      "Complex SQL reports across partners, geographies and seasons slowed down as data grew.",
    highlights: [
      "Owned the report section and role-based geography filters",
      "Rewrote heavy joins and parallelised indicator queries",
      "Cleared static-analysis security findings",
    ],
    stack: ["Node.js", "Express", "MySQL", "Redis", "SQL"],
  },
  {
    slug: "financial-inclusion-platform",
    kind: "work",
    title: "Financial Inclusion Platform",
    tag: "Backend performance",
    summary:
      "Backend for a financial-inclusion programme where field workers record household savings, loans and insurance in a mobile app.",
    problem:
      "A database write on every request, long transactions and growing mobile sync load.",
    highlights: [
      "Redis auth cache shared across cluster workers",
      "Shorter transactions and faster listing queries",
      "Incremental mobile sync filters",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "Bull", "FCM"],
  },
  {
    slug: "helpdesk",
    kind: "work",
    title: "Enterprise HelpDesk Assistant",
    tag: "RAG chatbot",
    summary:
      "A production multilingual RAG chatbot answering staff questions on HR policy, coding standards and project documentation.",
    problem:
      "Knowledge was scattered across PDFs, Word files and web pages — people spent time hunting for answers or asking colleagues.",
    highlights: [
      "Retrieval across PDF, DOCX and HTML sources in multiple languages",
      "Admin-controlled document upload and re-indexing, no developer needed",
      "Built production-ready for internal company use",
    ],
    stack: ["LangChain", "ChromaDB", "OpenAI API", "Python", "FastAPI"],
  },
  {
    slug: "qrdoor",
    kind: "personal",
    title: "QRDoor",
    tag: "SaaS product",
    summary:
      "A SaaS for printable smart QR posters: businesses design a poster, publish a listing, and track every scan and tap on a live analytics dashboard.",
    problem:
      "Offline posters give no data. Owners couldn't tell which poster, location or design actually brought customers in.",
    highlights: [
      "Plans, subscriptions and entitlements with payment webhooks and auto-expiry jobs",
      "Scan analytics with charts, location heatmaps and Excel export",
      "10+ poster templates, image cropping, S3 uploads and transactional email",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "AWS S3/SES"],
    link: { label: "Visit qrdoor.in", href: "https://qrdoor.in" },
    images: [
      {
        src: "/projects/qrdoor-home.png",
        alt: "QRDoor homepage: turn any poster into a smart QR experience",
        caption: "Live product at qrdoor.in",
      },
    ],
  },
  {
    slug: "campushub247",
    kind: "personal",
    title: "CampusHub247",
    tag: "Full-stack platform",
    summary:
      "A verified-student portal with a campus marketplace, interest groups, roommate matching and housing listings.",
    problem:
      "Students trade, find roommates and housing through noisy WhatsApp groups with no verification or privacy.",
    highlights: [
      "Four independent product modules on a shared platform layer",
      "Row-level security in the database plus server-side authorization on every write",
      "Private contact details never leave the server unless explicitly shared",
    ],
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Zod", "Tailwind"],
    images: [
      {
        src: "/projects/campushub247-home.png",
        alt: "CampusHub247 homepage: marketplace, groups and roommates for verified students",
        caption: "Marketplace, groups and roommate matching under one login",
      },
    ],
  },
];

export const experience = [
  {
    role: "Software Development Engineer — Full Stack",
    company: "Dhwani RIS",
    period: "Sep 2024 – Present",
    items: [
      {
        name: "India Partner Network (with Sattva Consulting)",
        text: "Capacity-building platform for a network of 3,000+ nonprofits: assessments, events and resources. Cut page load time by 50%, hardened token and session handling, extended Amplitude analytics, and built a configurable feedback and reminder workflow.",
      },
      {
        name: "HelpDesk AI",
        text: "Built a multilingual RAG chatbot with LangChain, ChromaDB and OpenAI over PDF, DOCX and HTML sources, with admin-managed indexing.",
      },
      {
        name: "PRAGATI",
        text: "Annual planning and target tracking in Next.js and GraphQL, with role-based data entry and a multi-level approval workflow.",
      },
    ],
  },
  {
    role: "Software Development Engineer — Intern",
    company: "Dhwani RIS",
    period: "Mar 2024 – Aug 2024",
    items: [
      {
        name: "Farm Mechanization",
        text: "Real-time IoT portal for farm machinery. Cut report generation time by 40% with query optimization and Redis caching, and cut dashboard query load by 60% with a trigger-based reporting table.",
      },
    ],
  },
];

export const availability = [
  {
    title: "Full-time roles",
    text: "Full-stack or AI engineering roles — remote, or hybrid in Gurugram / Delhi NCR.",
    points: ["Full-Stack Engineer", "AI / LLM Engineer", "Frontend-heavy product roles"],
  },
  {
    title: "Freelance & contract",
    text: "Projects for startups and agencies, with working hours that overlap the UK and US East Coast.",
    points: ["RAG assistants and AI agents", "AI features in existing products", "Full-stack MVPs and dashboards"],
  },
];

export const education = "B.Tech, Computer Science — Chandigarh University, 2024 (CGPA 8.14/10)";

export const skills = [
  { group: "AI", items: ["RAG pipelines", "LangChain", "LangGraph", "Claude Agent SDK", "OpenAI / Claude / Gemini APIs", "ChromaDB", "pgvector", "n8n"] },
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Angular", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "REST", "WebSockets"] },
  { group: "Data & infra", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "RabbitMQ", "Docker", "AWS", "Vercel"] },
];
