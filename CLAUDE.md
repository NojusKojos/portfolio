# Portfolio Project — Claude Guidelines

## Package Manager

Always use **pnpm** for all package operations:
- `pnpm install` — install deps
- `pnpm add <pkg>` — add dependency
- `pnpm add -D <pkg>` — add dev dependency
- `pnpm run <script>` — run scripts
- Never use `npm install` or `npm add`

## MCP Servers

### Context7
Always use Context7 when needing library or API documentation, code generation help, setup steps, or configuration guidance — without requiring an explicit ask. Use the `resolve-library-id` and `get-library-docs` tools to pull up-to-date docs for any library used in this project (React, Vite, Framer Motion, React Router, Three.js, etc.).

### Exa
Use Exa for real-time web search, finding code examples, researching design patterns, or looking up anything that may have changed since the knowledge cutoff. Prefer `web_search_exa` for general queries and `web_fetch_exa` for fetching specific pages.

### Vercel
Use the Vercel MCP for deployment management, checking build logs, and inspecting deployments.

## Linting

Run `pnpm lint` (oxlint) before committing. Fix errors with `pnpm lint:fix`. The config is in `.oxlintrc.json`.

## TypeScript

Strict mode is enforced. Do not use `any` — oxlint will flag it as an error. Non-null assertions (`!`) are warned — use optional chaining (`?.`) where possible.

## Tech Stack

React 18 · TypeScript 5 (strict) · Vite 5 · React Router 6 · Framer Motion 11 · React Three Fiber · Lenis · react-helmet-async · oxlint · pnpm

## Architecture

- **Routing**: React Router 6 with `React.lazy` code splitting per page + `Suspense` fallback
- **Pages**: `src/pages/` — Home, About, Music, Contact, NotFound (404 catch-all)
- **Components**: `src/components/` — reusable UI (SEO, Navigation, Footer, CreativeButton, etc.)
- **Styling**: CSS custom properties (design tokens) in `src/index.css` — always use `var(--color-*)` tokens, never hardcode hex colors in components
- **Images**: WebP format in `public/images/`, optimized at build time by `vite-plugin-image-optimizer`
- **Fonts**: woff2 format in `public/fonts/`, preloaded in `index.html`; Google Fonts loaded via `<link>` in `index.html` only (never `@import` in CSS)
- **SEO**: `<SEO>` component (react-helmet-async) on every page for per-page title/description/OG tags
- **Accessibility**: `prefers-reduced-motion` respected, `:focus-visible` styles, ARIA labels on interactive elements, `<main>` landmark wraps page content
- **Contact form**: Web3Forms API — requires `VITE_WEB3FORMS_KEY` env var (see `.env.example`)

## Environment Variables

- `VITE_WEB3FORMS_KEY` — Web3Forms access key for contact form (set in Vercel dashboard for production)

## Important: This is NOT a Next.js project

This is a **Vite + React SPA**. Ignore any suggestions about `"use client"` directives, Next.js App Router, or server components — they do not apply here.
