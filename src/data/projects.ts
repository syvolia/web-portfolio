import smeDashboard from '@/assets/sme-intelligence-dashboard.png';
import smartdeskDashboard from '@/assets/smartdesk-ai-dashboard.png';
import eventTicketingDashboard from '@/assets/event-ticketing-dashboard.png';

export type ProjectCategory = 'Web Dev' | 'Data Analysis' | 'Full Stack';

export interface Project {
  id: number;
  title: string;
  description: string;
  overview: string;
  category: ProjectCategory;
  image: string;
  tech: string[];
  features: string[];
  challenges: string[];
  role: string;
  year: string;
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 9,
    title: 'Event Ticketing Platform',
    description:
      'Concurrency-correct ticketing: sells the last 10 tickets to exactly 10 people when 1,000 try at once — no overselling, no double-charging, no duplicate tickets.',
    overview:
      'A full-stack event ticketing platform (Node.js, TypeScript, Fastify, PostgreSQL, React) built around the hardest problem in ticketing: selling the last 10 tickets to exactly 10 people when 1,000 are trying to buy at the same instant. The system guarantees three invariants under massive concurrency — inventory can never go negative or exceed capacity, payment webhooks that arrive late, twice, or out of order never cause a double charge, and ticket issuance can be retried infinitely without creating duplicates. Correctness is proven rather than asserted: a concurrency suite fires 200 simultaneous POST /orders requests at a capacity-10 tier and asserts exactly 10 succeed while 190 receive 409 Conflict, with a whole-database invariant checker confirming nothing went negative. A deliberately broken read-check-then-write implementation ships alongside it to reproduce the oversell (reserved = 17 on capacity 10), and k6 load tests hold the invariants at 1,000 virtual users.',
    category: 'Full Stack',
    image: eventTicketingDashboard,
    tech: ['Node.js', 'TypeScript', 'Fastify', 'PostgreSQL', 'React', 'Vitest', 'k6'],
    features: [
      'Database-enforced correctness — a Postgres CHECK (sold + reserved <= capacity) constraint acts as the final safety net on inventory',
      'Atomic conditional UPDATE reservations under READ COMMITTED: the predicate capacity - sold - reserved >= qty is evaluated exactly at the moment of write, using row-level locks',
      'Deadlock prevention for multi-tier orders by sorting tier IDs before locking, giving every transaction a consistent global lock order',
      'Idempotency fences — UNIQUE(buyer_id, idempotency_key) and UNIQUE(provider, provider_event_id) let the database absorb network retries and duplicate webhook deliveries as no-ops',
      'Transactional outbox plus a sweeper process using FOR UPDATE SKIP LOCKED, so multiple replicas process expired reservations and ticket emails concurrently without colliding',
      'Payment abstraction behind one PaymentProvider interface covering M-Pesa STK Push and Stripe PaymentIntents',
      'Offline scanner PWA for door staff: caches check-in manifests, scans HMAC-signed QR codes, and buffers offline scans in IndexedDB until connectivity returns',
      'Observability with Prometheus metrics for reservation conflicts, webhook duplicates, and check-in rejects, plus structured Pino logging with request-scoped correlation IDs',
    ],
    challenges: [
      'Selling the last tickets without overselling — SERIALIZABLE isolation forces complex retry logic and Redis introduces state drift, so reservations move through a single atomic conditional UPDATE with a Postgres CHECK constraint as the backstop',
      'Payments that arrive late, twice, or out of order — every state-changing action sits behind a unique database constraint, so a duplicate webhook becomes a no-op instead of a second charge',
    ],
    role: 'Full Stack Developer — designed the concurrency and correctness model, built the API, the payment integrations, the scanner PWA, and the verification suite',
    year: '2026',
    liveUrl: 'https://event-ticketing-es5.pages.dev',
    githubUrl: 'https://github.com/syvolia/event-ticketing',
  },
  {
    id: 8,
    title: 'SmartDesk AI',
    description:
      'Multi-tenant SaaS help desk with an AI copilot — strict tenant isolation, real-time tickets, RAG-grounded answers, and SLA tracking.',
    overview:
      'A production-grade, multi-tenant SaaS help desk platform built to show what careful full-stack architecture actually buys you. Tenant isolation is enforced at the database layer, the AI copilot only answers when retrieval gives it real evidence, and ticket updates reach every open browser in real time. It covers the whole support workflow — tickets, customers, a knowledge base, analytics, and admin controls for organizations, teams, SLAs, and AI configuration — with role-based access for admins, agents, and customers. A public demo workspace is open: sign in on the live site with admin@smartdesk-demo.dev / Demo123!',
    category: 'Full Stack',
    image: smartdeskDashboard,
    tech: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'OpenAI'],
    features: [
      'Strict multi-tenant isolation — every tenant-owned query carries an organization_id filter, and cross-tenant access returns 404 rather than 403 to block IDOR and enumeration',
      'AI copilot grounded in your own knowledge base: agents get summaries, priority suggestions, and drafted replies',
      'RAG pipeline using pgvector semantic search over knowledge base articles, with hallucination guards that return "insufficient evidence" instead of guessing',
      'Real-time ticket updates and notifications over a WebSocket event bus, fanned out across backend instances with Redis pub/sub',
      'SLA tracking with compliance and first-response metrics, plus analytics on where the team spends its time',
      'Defense-in-depth security: JWT access tokens with rotating hashed refresh tokens (Argon2id), Redis sliding-window rate limiting, and magic-byte validated uploads',
      'Async data layer on SQLAlchemy 2.0 with asyncpg, tuned for Neon serverless with NullPool and unique prepared statement names',
      'Pytest suite covering RBAC, tenant isolation, SLA calculations, and AI endpoints using a deterministic MockProvider — no live API calls in CI',
    ],
    challenges: [
      'Connection exhaustion under serverless load — Neon\'s PgBouncer pooler collides with cached prepared statements, so the engine runs NullPool with unique statement names, eliminating InvalidSQLStatementName errors',
      'Keeping AI answers truthful — retrieval has to surface relevant chunks before the model may answer, and the copilot is instructed to say "insufficient evidence" rather than improvise',
    ],
    role: 'Full Stack Developer & Architect — designed the multi-tenant architecture, built the API, the AI pipeline, and the front end',
    year: '2026',
    liveUrl: 'https://smartdesk-ai-omega.vercel.app',
    githubUrl: 'https://github.com/syvolia/smartdeskAI',
  },
  {
    id: 7,
    title: 'SME Financial & Supply-Chain Intelligence',
    description:
      'Decision intelligence for African SMEs. Turns raw transactions into ranked, actionable recommendations across sales, inventory, cash flow, and suppliers.',
    overview:
      'A full-stack analytics platform that turns data African SMEs already have — sales, stock movements, supplier deliveries, payments — into ranked, actionable recommendations. Enterprise BI is priced for enterprises and modelled for a different operating reality, so this is built for the way small businesses actually run. Eight functional surfaces cover the executive dashboard, sales analytics, inventory intelligence, demand forecasting, cash-flow intelligence, customer segmentation, supplier analytics, and AI recommendations. Every recommendation traces to a real number: a stockout alert cites the exact stock level, daily demand, lead time and reorder point behind it, then names the order to place and the expected impact.',
    category: 'Full Stack',
    image: smeDashboard,
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'dbt', 'Spark', 'Airflow', 'XGBoost'],
    features: [
      'Dashboard with revenue, gross profit, inventory value, cash position, and top risks',
      'Sales analytics: revenue, AOV, and margin by product, category, and location, with top and bottom performers',
      'Inventory intelligence: stock, daily demand, days remaining, reorder point, and risk per product per branch',
      'Demand forecasting: per-product 30-day forecasts with 80% prediction intervals',
      'Cash-flow intelligence: 30-day projections with shortage alerts',
      'Customer intelligence: RFM segmentation into five populated segments',
      'Supplier analytics: composite reliability scores with degradation detection',
      'AI recommendations as Problem / Evidence / Recommendation / Expected Impact cards, ranked by financial exposure',
    ],
    challenges: [
      'Keeping every recommendation traceable — each card cites the stock level, daily demand, lead time, and reorder point it came from, so an owner can verify the number before spending money',
      'Keeping analytical load off the transactional store — PostgreSQL serves operations while a Spark + dbt pipeline builds a star schema on Airflow schedules for the dashboards to read',
    ],
    role: 'Full Stack Developer & Data Analyst — designed the architecture, built the data pipeline and models, and built the React front end',
    year: '2026',
    liveUrl: 'https://sme-intelligence.pages.dev/dashboard',
    githubUrl: 'https://github.com/syvolia/sme-intelligence',
  },
  {
    id: 1,
    title: 'Task Management App',
    description:
      'A full-stack task management application with real-time updates, user authentication, and collaborative features.',
    overview:
      'A full-stack task management platform built for small teams that need to stay in sync without the overhead of heavyweight tools. Users can create projects, assign tasks, set deadlines, and collaborate in real time — updates appear instantly across every connected client thanks to a WebSocket layer. The app includes secure authentication, role-based permissions, and a drag-and-drop board interface.',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    features: [
      'Real-time task updates across all connected clients using WebSockets',
      'Secure authentication with JWT and role-based access control',
      'Drag-and-drop kanban boards with customizable columns',
      'Task comments, file attachments, and activity history',
      'Email reminders for approaching deadlines',
    ],
    challenges: [
      'Keeping state in sync across clients — solved with Socket.io rooms per project and optimistic UI updates',
      'Designing a flexible permission model that scales from solo users to large teams',
    ],
    role: 'Full Stack Developer — designed the architecture, built the API and the entire front end',
    year: '2025',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'E-commerce Dashboard',
    description:
      'Modern admin dashboard for e-commerce platforms with analytics, inventory management, and order tracking.',
    overview:
      'An analytics-rich admin dashboard for online stores. It turns raw sales data into actionable insights with interactive charts for revenue, conversion rates, and product performance. Store managers can track inventory levels, manage orders end to end, and receive low-stock alerts — all from a single, fast interface built with TypeScript for long-term maintainability.',
    category: 'Web Dev',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tech: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    features: [
      'Interactive revenue, traffic, and conversion analytics with date-range filtering',
      'Inventory management with low-stock alerts and reorder suggestions',
      'Order tracking pipeline from purchase to fulfillment',
      'Exportable reports (CSV/PDF) for stakeholders',
      'Responsive layout optimized for tablets used on the shop floor',
    ],
    challenges: [
      'Rendering large datasets smoothly — implemented virtualized tables and memoized chart components',
      'Building a flexible date-range filter that keeps every chart in sync',
    ],
    role: 'Frontend Developer — owned the dashboard architecture, data visualization, and component library',
    year: '2025',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'COVID-19 Data Visualization',
    description:
      'Interactive data visualization dashboard analyzing COVID-19 trends with real-time data updates and predictive models.',
    overview:
      'An interactive analytics dashboard that tracks and explains COVID-19 trends. It ingests public health data feeds, cleans and aggregates them with Python, and presents the results through clear, explorable visualizations — case curves, geographic heatmaps, and vaccination progress. Lightweight predictive models project short-term trends so viewers can see where numbers are heading.',
    category: 'Data Analysis',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop',
    tech: ['Python', 'D3.js', 'Pandas', 'Flask'],
    features: [
      'Live case, recovery, and vaccination curves per country and region',
      'Geographic heatmaps with drill-down from continent to country',
      'Short-term trend projections powered by regression models',
      'Data cleaning and aggregation pipeline built with Pandas',
      'REST API served with Flask, cached for fast repeat visits',
    ],
    challenges: [
      'Normalizing inconsistent public data sources — built a reusable cleaning pipeline with unit tests',
      'Keeping visualizations responsive while animating large time-series datasets in D3.js',
    ],
    role: 'Data Analyst & Developer — built the data pipeline, analysis models, and visualizations',
    year: '2024',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Financial Market Analyzer',
    description:
      'Advanced financial market analysis tool with ML-powered predictions and real-time market data integration.',
    overview:
      'A market analysis tool that combines live market data with machine learning to surface actionable signals. It streams price data, computes technical indicators, and runs ensemble models to generate short-horizon forecasts with confidence intervals. Backtesting tools let users validate strategies against historical data before committing to them.',
    category: 'Data Analysis',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    tech: ['Python', 'MySQL', 'scikit-learn', 'Plotly'],
    features: [
      'Real-time price streaming with interactive candlestick charts',
      'ML-powered short-horizon forecasts with confidence intervals',
      'Technical indicator library (RSI, MACD, Bollinger Bands)',
      'Strategy backtesting against historical data with performance reports',
      'Watchlists and custom price alerts',
    ],
    challenges: [
      'Avoiding look-ahead bias in backtests — structured the data pipeline to enforce strict time-ordering',
      'Serving model predictions with low latency by precomputing features in scheduled jobs',
    ],
    role: 'Data Analyst — designed the models, backtesting framework, and analytics pipeline',
    year: '2024',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Social Media Platform',
    description:
      'Feature-rich social media platform with post sharing, real-time messaging, and user profiles.',
    overview:
      'A full-featured social platform where users share posts, follow creators, and chat in real time. The feed is ranked by engagement and freshness, messaging runs over WebSockets with delivery receipts, and rich profiles showcase activity history. PostgreSQL-backed with Redis caching keeps the feed fast even under load.',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    features: [
      'Engagement-ranked feed with following and discover tabs',
      'Real-time direct messaging with typing indicators and read receipts',
      'Rich user profiles with activity history and follow graphs',
      'Image uploads with automatic optimization',
      'Notification system for mentions, likes, and follows',
    ],
    challenges: [
      'Feed performance at scale — added Redis caching and pagination with cursor-based loading',
      'Delivering messages reliably — implemented acknowledgments and offline message queues',
    ],
    role: 'Full Stack Developer — built the messaging system, feed ranking, and API layer',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Weather Forecast App',
    description:
      'Beautiful weather application with detailed forecasts, interactive maps, and weather alerts.',
    overview:
      'A polished weather app focused on clarity and speed. It delivers hourly and 7-day forecasts, animated interactive maps, and severe-weather alerts, all wrapped in a clean interface that adapts its presentation to current conditions — sunny layouts feel bright, stormy days turn moody. Saved locations sync across devices.',
    category: 'Web Dev',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
    tech: ['React', 'OpenWeather API', 'Leaflet', 'Tailwind CSS'],
    features: [
      'Hourly and 7-day forecasts with hourly precipitation breakdown',
      'Interactive weather maps with radar layers built on Leaflet',
      'Severe weather alerts with push notifications',
      'Saved locations with cross-device sync',
      'Condition-aware theming that adapts the UI to the current weather',
    ],
    challenges: [
      'Making the map layer feel instant — pre-tiled radar overlays and lazy loading kept interactions smooth',
      'Balancing API rate limits with data freshness through smart caching intervals',
    ],
    role: 'Frontend Developer — designed the UI system, map integration, and caching strategy',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const getProjectById = (id: string | number | undefined): Project | undefined =>
  projects.find((p) => String(p.id) === String(id));
