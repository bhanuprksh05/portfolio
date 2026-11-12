// Long-form case studies, one per project slug. Shown at /work/<slug>.

export type CaseStudySection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type CaseStudy = {
  role: string;
  period: string;
  context?: string; // client or company, for work projects
  overview: string[];
  challenge: string[];
  sections: CaseStudySection[];
  outcomes: string[];
  learnings: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "project-assistant": {
    role: "Sole developer: product design, backend, frontend and testing",
    period: "Oct 2026 – present",
    overview: [
      "Project Assistant is a web app where testers, project managers and support staff ask questions about a software project in plain English: how a feature works, what changed this week, how many records match a condition. It reads the project's code and databases and answers, with Excel or CSV exports when a question needs a report.",
      "It is built on the Claude Agent SDK, with a FastAPI backend, PostgreSQL and a React web app that can be installed on a phone.",
    ],
    challenge: [
      "In most teams, non-developers depend on developers for answers that are already in the code or the database. Each question is small, but together they interrupt engineering all day.",
      "Giving an AI agent access to source code and production data is only acceptable if it provably cannot change anything, cannot see what a user isn't allowed to see, and stays within a budget.",
    ],
    sections: [
      {
        heading: "Narrowing the scope to read-only",
        body: [
          "Early versions also let developers ask the assistant to change code, open pull requests and propose database changes behind an approval step. Once that worked, I removed it. The people who needed the tool most were non-developers, and for them a read-only assistant is simpler to trust, to explain and to approve for production data.",
          "Removing features was the most important product decision in the project: it cut the risk surface and made the remaining features clearer.",
        ],
      },
      {
        heading: "Answering questions about code",
        body: [
          "Each session is pinned to the commit it started on, using a shared read-only snapshot per commit, so answers stay consistent while the repository moves on.",
        ],
        bullets: [
          "The agent only gets read tools: file reading and search inside the session's snapshots, plus git tools that read any branch without checking it out (log, diff, show, grep, \"on develop but not on main\").",
          "Every tool call passes a guard hook. Nothing is auto-approved, and no tool that edits files or runs commands is ever offered.",
          "Answers stream live, with each step the agent takes shown as it happens.",
        ],
      },
      {
        heading: "Safe database reports",
        body: [
          "Projects connect PostgreSQL, MySQL/MariaDB or MongoDB databases. Read-only is enforced in layers, so no single check is trusted on its own:",
        ],
        bullets: [
          "SQL is parsed first: exactly one SELECT, WITH or EXPLAIN statement; writes, locks, file access and sleep functions are rejected. MongoDB is limited to find, aggregate, count and distinct.",
          "Queries then run in a read-only transaction with a server-side timeout and a row limit.",
          "The AI sees only a preview of rows; full results go straight to a CSV or Excel file attached to the answer.",
          "Database passwords are encrypted at rest and never shown to the AI or returned by the API. Every query, including rejected ones, is logged.",
          "Production databases are only available to members an admin has explicitly allowed.",
        ],
      },
      {
        heading: "Built for a whole team",
        body: [],
        bullets: [
          "Users, projects and per-member switches for project admin and production-data access, all checked in one permissions module.",
          "Sessions can be renamed, archived and forked; admins can read everyone's sessions.",
          "Every device on a session receives updates over WebSockets and reconnects after sleep or network loss.",
          "A per-session message queue with Stop and cancel, server and per-user concurrency limits, and runs stored in the database so a restart loses nothing.",
          "File uploads as input, retention rules with auto-delete, usage tracking, monthly budgets and a full audit log of settings and access changes.",
          "A choice of AI provider per project and per session, including a lower-cost model for questions that don't need database access.",
        ],
      },
    ],
    outcomes: [
      "Shipped in ten incremental stages, each covered by backend tests (pytest) and browser end-to-end tests.",
      "Non-developers can get code and data answers, with downloadable reports, without waiting on an engineer.",
      "Safety holds in layers: read-only tools, a guard on every tool call, validated read-only SQL, access switches and an audit trail.",
    ],
    learnings: [
      "With AI agents, what you leave out matters as much as what you build. A smaller, safer tool gets adopted faster.",
      "Defence in depth beats one clever check: parse, then restrict the transaction, then limit rows, then log.",
      "Streaming, queuing and restart recovery are what make an AI feature feel like a reliable product, not a demo.",
    ],
  },

  qrdoor: {
    role: "Sole developer: backend, frontend and payments",
    period: "Apr 2026 – Aug 2026",
    overview: [
      "QRDoor turns printed posters into trackable landing pages. A business picks a template, fills in its details (photos, hours, contact options, map), prints the QR code and then sees every scan and every tap on its analytics dashboard.",
      "It is a complete SaaS: sign-up, plans and subscriptions, a page editor with ten templates, analytics and support. It is live at qrdoor.in.",
    ],
    challenge: [
      "Offline marketing is a black box. Owners print posters and flyers but can't tell which ones bring customers, from where, or which contact option people actually use.",
      "Turning that into a paid product meant getting the unglamorous parts right: billing that never double-charges or locks out a paying customer, plan limits enforced everywhere, and analytics that stay fast as events grow.",
    ],
    sections: [
      {
        heading: "Subscriptions and billing that hold up",
        body: [
          "Plans, prices and features are data in the database, so pricing changes need no deploy. Payments run through Razorpay checkout and webhooks.",
        ],
        bullets: [
          "Webhooks are idempotent: every event is stored with a unique (provider, event ID) key, a status and an attempt count, so retries are processed exactly once.",
          "Subscription state lives in one tested module, including a grace period for failed payments and calendar-correct month arithmetic for renewals.",
          "A scheduled job expires lapsed subscriptions.",
          "Plan limits are enforced by entitlement middleware on the API and mirrored in the UI with a single hook, so users see limits before they hit an error.",
        ],
      },
      {
        heading: "Tracking and analytics",
        body: [
          "Each scan is recorded with its source and optional location; each tap on a phone number, WhatsApp, email or link is recorded against that scan and classified by type.",
        ],
        bullets: [
          "Charts with day, week and month presets, plus a contact-taps breakdown.",
          "Location heatmaps on a map, so owners can see where their posters work.",
          "One-click Excel export of analytics data.",
        ],
      },
      {
        heading: "Page builder and templates",
        body: [],
        bullets: [
          "Ten responsive templates with image cropping and direct-to-S3 uploads using signed URLs.",
          "Business hours with all weekdays and optional second time slots.",
          "Shareable links for WhatsApp and printable QR codes.",
        ],
      },
      {
        heading: "Accounts and operations",
        body: [],
        bullets: [
          "Email OTP verification, Google sign-in, password reset and tracked login sessions.",
          "Transactional email through AWS SES or SMTP, with templates stored in the database.",
          "Support tickets and a server-side error log for debugging production issues.",
        ],
      },
    ],
    outcomes: [
      "Launched as a live, paid product at qrdoor.in.",
      "Billing logic isolated and unit-tested, with idempotent webhook handling.",
      "Owners get scan, tap and location data from printed material for the first time.",
    ],
    learnings: [
      "Payments are a state machine first and an API integration second. Model the states, then wire the provider.",
      "Enforcing limits in one place on the server, and only mirroring them in the UI, avoids a whole class of bugs.",
      "Store raw events and aggregate on read until scale demands otherwise; it keeps analytics flexible.",
    ],
  },

  campushub247: {
    role: "Sole developer: architecture, backend and frontend",
    period: "Aug 2026 – Sep 2026",
    overview: [
      "CampusHub247 is a portal for verified college students with four modules under one login: a campus marketplace, interest groups, roommate matching and housing listings.",
      "It is a single Next.js 16 application on Supabase (PostgreSQL, Auth and Storage), designed so that each new module is a new folder, not a rewrite.",
    ],
    challenge: [
      "Students buy, sell, form teams and look for roommates through crowded WhatsApp groups, with no verification and their phone numbers exposed to strangers.",
      "The product had to be open enough to browse without an account, but strict about who can post, contact or see private details.",
    ],
    sections: [
      {
        heading: "Architecture that scales by modules",
        body: [
          "Each product area lives in its own feature module, and modules never import each other. Anything two modules need, such as auth, college verification, profiles, storage and reporting, lives in a shared platform layer. Routing files contain no business logic.",
          "Groups, roommates and housing were added after the marketplace without changing its code.",
        ],
      },
      {
        heading: "Security in two independent layers",
        body: [
          "Every write follows the same path: verify the session, validate input with Zod, check ownership, write, then refresh the page cache. Row Level Security in PostgreSQL enforces the same rules again, so neither layer is the only protection.",
        ],
        bullets: [
          "Sign-in with a 6-digit email code instead of a password, and college verification through the college's email domain.",
          "Private contact details leave the server only through mappers that strip them, unless the owner has chosen to share them.",
          "Images are uploaded straight to storage under the user's own session, then verified by the server before they are attached.",
        ],
      },
      {
        heading: "Roommate matching that respects privacy",
        body: [
          "Students tick one box on their profile and answer a few lifestyle questions (sleep, smoking, guests, cleanliness, kitchen). The answers are scored, never used to filter people out, so a good match is never hidden. Same college and gender are required; course and year are optional filters. Contact details are revealed only when both sides agree.",
        ],
      },
    ],
    outcomes: [
      "Four modules shipped on one shared foundation in about three weeks.",
      "Authorization enforced twice for every write, in application code and in the database.",
      "Documented architecture, data model and conventions, so new features follow one clear pattern.",
    ],
    learnings: [
      "Clear module boundaries pay off immediately: each new module was faster to build than the last.",
      "Row Level Security is a safety net, not a substitute for checks in application code. Use both.",
      "Privacy decisions belong in the data model, not just the UI.",
    ],
  },
  ipn: {
    role: "Full-stack developer in the Dhwani RIS product team",
    period: "Nov 2025 – present",
    context: "India Partner Network, built with Sattva Consulting",
    overview: [
      "India Partner Network (IPN) is a capacity-building platform for nonprofits, drawing on Sattva's network of over 3,000 nonprofits and social enterprises. Organisations register, build a public profile, take organisational assessments, join events and webinars, and use a library of resources. Admins run events, assessments, forms and communications.",
      "The platform is an Angular app with server-side rendering, a Node/Express API with scheduled jobs, and two WordPress sites for resources and the partner directory.",
    ],
    challenge: [
      "IPN had grown feature by feature. Pages were slow on first load, feedback from events and webinars was collected by hand, profile data was patchy, and a security scan and an SEO audit had both raised long lists of issues.",
      "All of it had to be fixed on a live platform without breaking server-side rendering or the existing nonprofit and admin roles.",
    ],
    sections: [
      {
        heading: "A configurable feedback workflow (owned end to end)",
        body: [
          "I designed and built the feedback system across backend and frontend. Admins configure a workflow once, and the platform collects feedback automatically after every event, webinar or interaction.",
        ],
        bullets: [
          "Each configuration sets the offering, audience (participant or partner), feedback type, trigger event and delay (minutes, hours or days).",
          "Delivery by email or WhatsApp, with a sequence of reminders for people who haven't responded.",
          "Scheduled triggers with a configurable rollover time, plus special handling for webinars.",
          "A public feedback form, admin views of every sent request and response, and export of responses.",
        ],
      },
      {
        heading: "Frontend performance under server-side rendering",
        body: [
          "I led the portal optimisation work focused on first load and the largest-paint metric:",
        ],
        bullets: [
          "Preloaded fonts and the logo, and moved images to WebP.",
          "Lazy-loaded admin and other heavy modules; loaded the form builder and spreadsheet libraries only when a page needs them.",
          "Removed an unused UI library and fixed hydration flicker between the server render and the browser.",
        ],
      },
      {
        heading: "Security, sessions and analytics",
        body: [],
        bullets: [
          "Fixed critical and high-severity findings from a vulnerability scan: tighter role checks, stricter permission matching and removal of an unsafe route.",
          "Hardened session handling: token verification across sessions, expiry tuning, retiring old tokens when new ones are issued, and rate limiting on an external auth endpoint.",
          "Sanitised event HTML and replaced a deprecated HTTP library.",
          "Extended Amplitude analytics with UTM and in-app navigation tracking across dashboards, profiles, assessments and registration.",
        ],
      },
      {
        heading: "SEO and data quality",
        body: [],
        bullets: [
          "A dynamic SEO service, readable slug-based event URLs (with a backfill script for existing events), sitemap freshness and structured data on the WordPress sites.",
          "Mandatory headquarter city, team size and budget on profiles, with a prompt for incomplete profiles and a searchable city list linked to states, replacing free-text entries.",
          "Admin tools: removing users or organisations with an audit log, event reminders, onboarding emails and a daily data-cleanup job.",
        ],
      },
    ],
    outcomes: [
      "Feedback collection is now automatic and configurable by admins, without developer involvement.",
      "Critical and high-severity security findings assigned to me were fixed.",
      "Structured data in the October 2026 SEO re-audit improved from F to C.",
    ],
    learnings: [
      "Configuration over code: one well-designed feedback model replaced many one-off email jobs.",
      "With server-side rendering, every performance change has to be checked in both the server and browser render.",
      "Security fixes on a live product need careful rollout so legitimate roles keep working.",
    ],
  },

  "annual-planning-mis": {
    role: "Full-stack developer; one of the main contributors to the planning and reporting APIs",
    period: "Dec 2024 – present",
    context: "A national NGO working on rural livelihoods",
    overview: [
      "A planning and monitoring system that runs a national NGO's yearly cycle: setting objectives and indicator targets, splitting them across geographies and projects, and tracking quarterly achievement against them, with approvals moving up the organisation.",
      "It is a Next.js and TypeScript application with a GraphQL API on MongoDB, plus a separate service for very large exports.",
    ],
    challenge: [
      "Planning happens at every level of the organisation, from village to national, and the numbers must add up correctly at each level. Some indicators are calculated from formulas, targets are split by geography and project, and every plan needs sign-off from several roles.",
      "Reporting runs on collections that hold tens of millions of records, so exports and roll-ups had to stay fast without overloading the main app.",
    ],
    sections: [
      {
        heading: "Annual plan engine",
        body: [
          "I built much of the annual plan backend: impact areas, objectives, strategies and themes; reflection on the previous year; and role-based submission checks.",
        ],
        bullets: [
          "Household targets split across state, district, block, gram panchayat and village, and across projects.",
          "Formula-based indicators evaluated with a maths engine, including protection against circular references.",
          "Incremental saving of indicator targets, so large plans don't need to be resubmitted in one request.",
        ],
      },
      {
        heading: "Target vs achievement reporting",
        body: [],
        bullets: [
          "Quarterly and cumulative achievement calculations by project and geography, filtered to each team's area.",
          "Review cycles with comments, unread counts, file attachments and minutes / action-taken reports.",
          "A national consolidated view of targets against achievements, with JSON and Excel exports.",
        ],
      },
      {
        heading: "Large reports without slowing the app",
        body: [],
        bullets: [
          "Consolidated target and achievement reports in Excel, and indicator sheets bundled as ZIP files.",
          "Switched Excel generation to streaming, and moved heavy exports to a dedicated download service that reads with database cursors.",
          "A scheduled job emails consolidated achievement reports as attachments, and download windows and time limits protect peak hours.",
        ],
      },
      {
        heading: "Integrations, security and performance",
        body: [],
        bullets: [
          "Masters for federations and village organisations with pagination, sorting and sequential codes; donor reporting with sync and reset; daily ERP sync jobs with error logging.",
          "Tokenised public sharing of annual plans, and file uploads moved to short-lived signed URLs with access checks.",
          "Query performance work: lean reads, aggregation lookups instead of repeated queries, parallel requests, trimmed GraphQL fields and cached master data.",
        ],
      },
    ],
    outcomes: [
      "The yearly planning and quarterly reporting cycle runs in one system, from village level to the national view.",
      "Large exports run without blocking the main application.",
      "File access moved to short-lived signed URLs with access checks.",
    ],
    learnings: [
      "In hierarchical data, decide early where each number is calculated, then test the roll-ups at every level.",
      "Stream big exports and move them off the request path from the start; retrofitting it is harder.",
      "Formula engines need guardrails, like circular-reference checks, before users find the edge cases.",
    ],
  },

  "farm-mechanisation": {
    role: "Backend developer, later full-stack on the marketplace",
    period: "Oct 2024 – Oct 2026",
    context: "A state government farm-mechanisation programme",
    overview: [
      "A platform for a state farm-mechanisation programme with two parts. The monitoring portal tracks GPS-enabled farm machinery for government officials and farmer producer organisations. The marketplace lets farmers, service providers and buyers rent equipment and trade crop residue.",
      "One Node/Express API on PostgreSQL serves an Angular admin portal and an Angular marketplace app.",
    ],
    challenge: [
      "Machinery location and engine data came from a third-party telematics service and had to become daily, monthly and yearly utilisation figures and rankings, visible at state, division, district and organisation level, each user seeing only their own area.",
      "Later the marketplace became the main source of activity, and the analytics had to follow it.",
    ],
    sections: [
      {
        heading: "Monitoring API and telematics ingestion",
        body: [
          "I set up the API and built the login, equipment, dashboard, ranking and map endpoints, with data scoped to each user's role and geography.",
        ],
        bullets: [
          "Scheduled jobs pulled device status from the telematics provider and updated live locations and engine state.",
          "Pre-aggregated daily, weekly and monthly utilisation tables, and monthly and yearly rankings for equipment, organisations and districts.",
          "Per-record error logging for the ingestion jobs, CSV downloads, and automated tests for every user type.",
        ],
      },
      {
        heading: "Marketplace features",
        body: [],
        bullets: [
          "Multiple images per listing with a carousel, storing images as a list, and a local fallback when cloud storage is unavailable.",
          "Booking availability checks, rental and purchase status transitions, brands, listing status filters and rental periods.",
          "User credits, dashboards for producer organisations, and carousels for top equipment and latest residue listings.",
          "Upgraded the marketplace to Angular 21, and added recovery from failed chunk loads and protection against double submissions.",
        ],
      },
      {
        heading: "Analytics refactor and performance",
        body: [],
        bullets: [
          "Moved rankings and dashboard metrics to marketplace rental data, then retired about 900 lines of old telematics jobs and ranking code.",
          "Added eight composite indexes on the busiest filters and joins, built concurrently so production writes were never locked.",
        ],
      },
      {
        heading: "Security hardening",
        body: [
          "For a security audit I added security headers, schema validation on inputs, CAPTCHA, unique mobile and email constraints and other hardening, plus accessibility and translation (i18n) improvements in the admin portal.",
        ],
      },
    ],
    outcomes: [
      "Officials see equipment utilisation and rankings for their own area, from one API serving two apps.",
      "Analytics now follow real marketplace activity, with a smaller and simpler codebase.",
      "Indexes on the busiest queries were added without downtime.",
    ],
    learnings: [
      "Pre-aggregating time-series data keeps dashboards fast, but plan for the data source to change.",
      "Deleting code is part of the job. Retiring the old pipeline made the system easier to run.",
      "Concurrent index builds let you tune a live database safely.",
    ],
  },

  "agri-programme-mis": {
    role: "Backend developer; owned the report section and later the query optimisation",
    period: "May 2024 – Aug 2026",
    context: "A foundation's agricultural extension programme",
    overview: [
      "A monitoring dashboard for an agricultural extension programme run with partner NGOs. It tracks farmer profiling, outreach and adoption, crop demonstration plots, the work of community resource persons and programme targets per partner, across state, district, block and village.",
      "The backend is Node/Express on MySQL with many hand-written SQL queries, Redis caching, OTP-based multi-factor login and separate web and mobile APIs.",
    ],
    challenge: [
      "Programme indicators come from complex joins across partner, geography, season and farmer tables. As data grew, some report endpoints slowed down, and joins through mapping tables quietly multiplied rows before aggregation.",
    ],
    sections: [
      {
        heading: "Programme targets and the report section",
        body: [
          "I built the programme target APIs and owned the report section: indicator calculations, farmer outreach counts and geography filters that depend on each user's role, across five levels of users.",
        ],
        bullets: [
          "Financial year, season and crop filters, with consistent season and year logic across reports.",
          "Multi-factor login fields in user management, and test data hidden from live reports.",
        ],
      },
      {
        heading: "Query optimisation",
        body: [
          "In 2026 I went back to the slowest endpoints and rewrote the heaviest queries, documenting in the code why each change keeps the results identical:",
        ],
        bullets: [
          "Replaced joins that multiplied rows with EXISTS checks or de-duplicated sub-queries. In one case the join input dropped from 18,246 rows to 8,598.",
          "Ran up to eight independent indicator queries in parallel instead of one after another, so a response waits for the slowest query, not the sum.",
          "Merged endpoints and re-enabled Redis caching for token and location checks, with automatic reconnection.",
        ],
      },
      {
        heading: "Code quality and security",
        body: [
          "I cleared SonarQube security findings: cryptographically secure randomness, upload and CORS fixes, and a refactor of login and token verification.",
        ],
      },
    ],
    outcomes: [
      "Report endpoints do less work: smaller joins and parallel queries.",
      "Indicator results unchanged after optimisation, with the reasoning recorded next to each query.",
      "Security findings from static analysis cleared.",
    ],
    learnings: [
      "Check join cardinality before aggregating; a mapping table can silently inflate the work.",
      "When optimising reports, prove the numbers don't change before measuring the speed.",
      "Independent queries should run in parallel. It's often the cheapest big win.",
    ],
  },

  "financial-inclusion-platform": {
    role: "Backend developer on performance hardening",
    period: "Aug 2026 – Oct 2026",
    context: "A foundation's financial-inclusion programme",
    overview: [
      "A financial-inclusion programme where field workers register households in a mobile app and record their savings, investment, loan, insurance and pension activity. Each record is approved by a field officer and then a partner NGO, and admins monitor progress in a web panel.",
      "The backend is Node/Express on PostgreSQL with Redis, a job queue for reports and push notifications, running as a multi-process cluster.",
    ],
    challenge: [
      "As usage grew, every API request wrote to the database just to extend the user's session, and some transaction queries and approval steps held locks longer than needed. Mobile sync had to stay fast for many field workers at once.",
    ],
    sections: [
      {
        heading: "Session and auth caching",
        body: [
          "I built an auth cache that stores session and location data per user in Redis, shared across all cluster workers, with an in-memory fallback and invalidation on logout.",
        ],
        bullets: [
          "Session expiry still slides with activity, but the database is updated at most once every five minutes instead of on every request.",
        ],
      },
      {
        heading: "Faster queries and shorter transactions",
        body: [],
        bullets: [
          "Rewrote the transaction listing query with a common table expression and EXISTS, and removed an unnecessary sort.",
          "Approvals now use managed transactions with reads kept outside, and push notifications are sent after commit, off the response path.",
          "Scheduled refreshes of reporting views reduced from every 20–27 minutes to twice a day, and enabled reconciliation and drift reports for a fast-access transaction table.",
        ],
      },
      {
        heading: "Sync and data features",
        body: [],
        bullets: [
          "Timestamp and date filters for incremental mobile sync, a household ID mapping endpoint and filters for beneficiaries without financial records.",
        ],
      },
    ],
    outcomes: [
      "Removed a database write from almost every authenticated request.",
      "Shorter transactions, with notifications moved out of the critical path.",
      "Less background load from view refreshes.",
    ],
    learnings: [
      "Look for writes hiding in the hot path: session handling is a common one.",
      "Keep slow external calls, like push notifications, out of database transactions.",
      "In a clustered app, caches must be shared or invalidated across processes.",
    ],
  },
};
