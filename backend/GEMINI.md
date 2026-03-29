# Project Context: Enterprise URL Shortener & QR Generator

## 📌 Project Overview
A professional, enterprise-grade digital product functioning as a URL shortener (branded as **Sniip**) and a dynamic QR code generator. Built for internal company use with a focus on high availability, robust analytics, and a premium user experience.
This project is also intended to be a showcase piece of high-level UX/UI and system design. Code should reflect production-ready standards.

## ⚙️ Scale & Performance Targets
* **Traffic:** ~200,000 redirections/reads per month.
* **Latency:** Core redirection endpoint must be ultra-fast (< 50ms).
* **Analytics:** Click tracking must be asynchronous to avoid blocking the redirection flow.

## 🛠️ Tech Stack
* **Frontend:** Svelte 5 (Runes), SvelteKit, TypeScript, TailwindCSS v4.
* **Backend:** Node.js, Fastify, TypeScript, Prisma (PostgreSQL).
* **Auth & Storage:** Firebase (Authentication via Google OAuth).
* **Database:** PostgreSQL.
* **Caching (Optional but recommended):** Redis (To store `slug -> url` mappings in memory).

## 🗺️ Core Epics & Features
1.  **Authentication & Identity:** External provider login (Firebase Auth), session management, and role-based access control (Admin vs. User).
2.  **User/Account Management:** Profile settings, role management, and usage limits.
3.  **Link Shortener Engine:** Base62 encoding algorithm, duplicate prevention, malware validation, and custom slug creation.
4.  **Custom QR Creator:** Dynamic generation (SVG/Canvas), custom colors/shapes, logo overlay in the center, and multi-format export (PNG/SVG/PDF).
5.  **Analytics Dashboard:** Real-time data visualization (clicks over time, geographic data, device type, referrers).
6.  **Filterable Link List:** Data table with advanced search, date filters, tags, and status (active/archived).
7.  **Filterable QR List:** Gallery/list view for generated QR assets with quick-action menus.

## 🗄️ Database Architecture (SQL Target)
* **`users`**: id, email, role, created_at.
* **`links`**: id, user_id, original_url, short_slug (INDEXED), title, tags[], status.
* **`qr_codes`**: id, link_id, design_config (JSONB for flexibility), image_url (Firebase Storage link).
* **`clicks_analytics`**: id, link_id, clicked_at, country, device, referrer (Insert-only table for metrics).

## 🧠 AI Assistant Directives (Rules for generating code)
* **TypeScript:** Use strict typing for all API contracts between Svelte and Node.js.
* **UX/UI First:** When generating Svelte components, prioritize accessible, responsive, and visually clean layouts. State changes (like editing QR colors) must reflect instantly in the UI.
* **Separation of Concerns:** Keep the redirection logic extremely lightweight. Defer analytics recording to a background worker or non-blocking promise.
* **Language:** Keep code comments and variable names in English, aligning with standard international development practices.

---

## ✅ Development Log - March 28, 2026
### Rebranding & UI/UX:
- **Global Rebranding:** Successfully transitioned the entire platform brand from "Bitlo" to **Sniip**. Updated all UI components, page titles, URLs (`sniip.com`), backend package names, and documentation.
- **Root Landing Page:** Designed and implemented a high-conversion landing page at the root route featuring a responsive `Navbar`, Hero section with animations, and detailed blocks for Product, Solutions, and Pricing.
- **UI Consistency:** Standardized button typography (`text-base font-semibold`), fixed form input padding (`py-2.5`), and ensured matching widths between email forms and Google buttons. Standardized all internal page headers to `text-4xl font-black`.
- **Interactivity:** Added `cursor-pointer` to all primary action buttons and implemented smooth global transitions for theme changes.
- **Advanced Pricing UI:** Added the **Teams** plan ($99/mo) and upgraded the **Pro** tier ($19/mo) with a high-end "Rainbow Glass" aesthetic featuring rotating border animations and glowing effects.

### Dashboard & Analytics:
- **High-Fidelity Dashboard:** Redesigned the main dashboard with premium placeholder metrics, a robust search/filter bar, and an interactive link list.
- **Analytics Visualization:** Implemented a full Analytics page with real-time tracking placeholders, an animated SVG click-trend chart, and detailed geographic/traffic source breakdowns.
- **Auth UX Fix:** Implemented automatic redirects from the landing page to the dashboard for authenticated users to prevent UI overlap issues.

### New Features:
- **UTM Builder:** Developed a dedicated `UTMModal` component integrated into the link creation flow. It supports parsing existing UTMs, pre-loading data for editing, and a custom `ConfirmModal` for a premium user experience.
- **Intelligent Tag System:** Created a reusable `TagInput` component with multi-color support using a consistent hashing algorithm, ensuring tags are visually distinct and persistent in color.

### Theme & System:
- **Reactive Dark Mode:** Implemented a robust, class-based `darkMode` store using Svelte 5 Runes. Support includes "Light," "Dark," and "System" modes with real-time persistence in `localStorage`.
- **Theme Previews:** Created a high-fidelity Appearance section in the Settings page with visual UI previews for each theme mode.
- **Site-wide Support:** Extended `dark:` variant support to all core pages, including Dashboard, Create Link, QR Generator, Login, Signup, and Modals.

### Architecture & DevOps:
- **Project Restructuring:** Refactored the repository into a clean workspace structure with dedicated `backend/` and `frontend/` directories.
- **Backend Setup:** Consolidated all backend source code, Prisma configurations, and root-level config files (Dockerfile, tsconfig, etc.) into the new `backend` folder.

---

## ✅ Development Log - March 21, 2026
### Frontend Progress:
- **UI Theming:** Transitioned the primary brand color from Indigo to `blue-600` across all major components, buttons, and links to establish a more standard enterprise feel.
- **QR Code Designer UI:** Generated the polished `/qrcodes/create` route with a responsive CSS grid, interactive color pickers, and dynamic mockups.
- **Client-Side QR Generation:** Implemented real-time QR Code rendering within the browser using the `qrcode` library on an HTML `<canvas>`, strictly utilizing reactive Svelte 5 state (`$effect` and `$state`) for instant visual feedback without backend round-trips.
- **Reusable Components:** Extracted drag-and-drop logic into a highly reusable, strictly typed `DragDropUploader.svelte` UI component. Successfully integrated this component into both the `BulkUploadModal` and the new `QR Logo Overlay` configuration.

### Backend & DevOps Progress:
- **Production Readiness:** Established Infrastructure as Code (IaC) for Railway deployment (`railway.toml`).
- **Dockerization:** Created a highly optimized, multi-stage `Dockerfile` (Builder -> Production Runner) using `node:20-alpine` designed for fast cold starts, minimal image size, and secure execution of the Fastify/Prisma backend. Added comprehensive `.dockerignore` rules.

---

## ✅ Development Log - March 20, 2026
### Backend Progress:
- **API Architecture:** Grouped authenticated routes under the `/api` prefix, utilizing the Firebase Auth JWT validation middleware.
- **Link Routes:** Implemented `POST /api/links` for creating short links and `GET /api/links` for listing user links.
- **Controllers:** Developed `createLink` controller handling user creation/syncing via Prisma `upsert`, custom slug validation, and automated Base62 slug generation fallback with duplicate prevention logic.
- **Prisma Configuration:** Addressed `PrismaClient` initialization errors for version 7.x, balancing constructor requirements and standard configurations.

### Frontend Progress:
- **API Utility:** Created a universal `apiFetch` wrapper (`src/lib/utils/api.ts`) that automatically injects Firebase ID tokens into headers.
- **Dashboard UI:** Transformed the `/dashboard` page to fetch and display actual user links. Added robust UI states for loading, connection errors, and empty workspaces utilizing the `EmptyState.svelte` component.
- **Link Creation Flow:** Integrated the `apiFetch` utility into the `/links/create` page. Added state management (loading, error, success feedback) using Svelte 5 Runes.
- **Bulk Upload UI:** Designed and implemented a highly polished `BulkUploadModal.svelte` component using the native `<dialog>` element and Tailwind CSS. It supports CSV drag-and-drop, state-based visual feedback, and file size validation.

---

## ✅ Development Log - March 18, 2026
### Backend Progress:
- **Initialization:** Set up Fastify server with TypeScript, ESLint (Flat Config), and Prettier.
- **Database:** Defined Prisma schema with PostgreSQL, including `users`, `links`, `qr_codes`, and `clicks_analytics` tables.
- **Services:**
  - `slugGenerator.ts`: Base62 encoder/decoder with unit tests (Vitest).
  - `qrGenerator.ts`: QR generation with logo overlay (Canvas/QRCode libraries) and Error Correction Level H.
- **Routes:** Implemented `GET /:slug` with ultra-fast redirection and asynchronous (non-blocking) analytics insertion.
- **Security:** Added Firebase Auth JWT validation middleware for protecting future API routes.

### Frontend Progress:
- **Initialization:** SvelteKit v2 with Svelte 5 (Runes), TypeScript, and TailwindCSS v4.
- **Auth System:**
  - Firebase Client initialization.
  - Svelte store (`authStore.ts`) for managing global user state and Google Login logic.
  - Google-branded login component (`GoogleButton.svelte`) using Svelte 5 Runes.
- **Routing:** Created `/signup` and `/dashboard (protected)` routes.
- **Styling:** Configured Tailwind v4 with `@import "tailwindcss";` in `app.css`.

---

## 🚀 Next Steps & Future Improvements (Agenda)
1.  **Backend QR Processing:** Connect the frontend's QR code "Create" button to the backend to generate the final image, store it in Firebase Storage, and save the configuration to the `qr_codes` database table.
2.  **CSV Processing Endpoint:** Hook up the frontend's `BulkUploadModal` to a new batch processing endpoint on the backend to parse the uploaded CSV and generate multiple short links in bulk.
3.  **Real Analytics Integration:** Implement IP geolocation (e.g., MaxMind or `ip-api`) on the redirection endpoint to record click countries and populate the `clicks_analytics` table.
4.  **Dashboard Completion:** Build out the full data table component for advanced sorting, filtering, and tagging of managed links, as well as a gallery view for generated QR codes.
5.  **Redis Integration:** Implement caching for `slug -> originalUrl` mappings on the backend to achieve the <50ms latency target for core redirections.
6.  **Testing Phase:** Expand unit and integration test coverage across both frontend components and backend services to solidify enterprise-grade stability.
