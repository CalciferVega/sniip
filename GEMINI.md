# Project Context: Enterprise URL Shortener & QR Generator

## 📌 Project Overview
A professional, enterprise-grade digital product functioning as a URL shortener (similar to Bitly) and a dynamic QR code generator. Built for internal company use with a focus on high availability, robust analytics, and a premium user experience.
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
- **Routing:** Created `/signup` and `/dashboard` (protected) routes.
- **Styling:** Configured Tailwind v4 with `@import "tailwindcss";` in `app.css`.

---

## 🚀 Next Steps & Future Improvements
1.  **Frontend QR Designer:** Create an interactive UI for customizing QR codes (colors, margins, logos) with real-time preview.
2.  **CSV Processing:** Hook up the frontend's `BulkUploadModal` to a new batch processing endpoint on the backend to actually parse and generate multiple links from a CSV.
3.  **Real Analytics:** Integrate IP geolocation (e.g., using `ip-api` or a MaxMind database) to record click countries.
4.  **Redis Integration:** Implement caching for `slug -> originalUrl` mappings to further reduce redirection latency.
5.  **Dashboard UI:** Develop the full data table component for advanced sorting/filtering of managed links and a gallery for QR codes.
6.  **Unit & Integration Tests:** Expand test coverage for both frontend and backend to ensure enterprise-grade stability.
