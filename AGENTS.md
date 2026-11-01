# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 App Router site backed by Sanity. Application routes live in `app/`, with the public site under `app/(website)`, API handlers in `app/api`, and the embedded Studio in `app/studio`. Shared UI lives in `components/`. Sanity configuration, queries, schemas, and Studio plugins live in `sanity/`. Global styles start in `app/globals.css` and `styles/`. Keep generated artifacts such as `sanity.types.ts` and `schema.json` committed when schema changes require them.

## Build, Test, and Development Commands
- `npm run dev`: starts the local Next.js app with Turbopack after regenerating Sanity types.
- `npm run build`: creates a production build and extracts the Studio manifest.
- `npm run start`: serves the production build locally.
- `npm run lint`: runs ESLint across the repo.
- `npm run format`: formats files with Prettier.
- `npm run type-check`: runs Next.js type generation and `tsc --noEmit`.
- `npm run typegen`: refreshes `schema.json` and `sanity.types.ts` after schema edits.

## Coding Style & Naming Conventions
Use TypeScript and functional React components. Follow the existing style of concise files, named exports where practical, and route-specific code colocated under its route folder. Prettier uses `@sanity/prettier-config` plus Tailwind class sorting and import sorting; run `npm run format` before opening a PR. Use `PascalCase` for components like `TimelineSection.tsx`, `camelCase` for utilities, and lowercase route segment names in `app/`.

## Testing Guidelines
There is no dedicated test suite yet, so treat `npm run lint` and `npm run type-check` as the required validation baseline. When adding tests, place them next to the feature as `*.test.ts` or `*.test.tsx` and prefer lightweight coverage for data fetching, rendering branches, and Sanity-driven content behavior.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects such as `Fix auto links and add dark mode`. This repo targets `github.com/BruckDev/sanity-brucksystemsgroup-website`; treat `main` as the release branch and `https://brucksystems.com/` as the required final destination. Unless the user explicitly asks for local-only work, a preview, or a different branch, agents must complete the full production release automatically: commit and push the approved change to `develop`, wait for the exact commit's Vercel preview to succeed, use the GitHub MCP integration to create a `develop` → `main` pull request, merge that pull request themselves as soon as required checks and branch protections permit, then wait for the exact resulting `main` commit's Vercel production deployment to succeed. Do not stop for a manual pull-request or merge handoff, and do not leave approved work only on `develop` or report the development deployment as final. If the GitHub integration lacks a necessary repository permission or a branch rule prevents the action, exhaust the available GitHub MCP operations first, then report the precise external blocker and the single user action required. After each production merge, agents must check GitHub for the Vercel deployment attached to that exact `main` commit. A successful check from an earlier commit, another branch, or an existing `dev` deployment does not satisfy this requirement. Do not give deployment feedback early, and do not share `https://brucksystems.com/` as a successful result unless GitHub confirms the exact production commit's Vercel deployment. PRs should include a brief summary, note any schema or environment variable changes, link the related issue when available, and attach screenshots for UI or Studio updates.

## Agent-Specific Notes
Before changing Next.js behavior, read the relevant local docs in `node_modules/next/dist/docs/`; this repo explicitly treats those docs as the source of truth. Avoid hand-editing generated Sanity outputs unless the matching source change is included. Use GitHub's Vercel deployment indication for the exact pushed `main` commit as the authoritative production deployment signal. Never infer production success from a previously shared URL or an earlier Vercel check; share `https://brucksystems.com/` only after the current commit's check reports success.

## Visual Verification
For every change that can affect the public site's appearance, inspect the relevant page directly in the Codex in-app Browser at `localhost` before reporting the work complete. This is mandatory for layout, styling, typography, imagery, responsive behavior, animations, and any change to visible copy or UI. Do not substitute source-code review, `curl`, DOM inspection alone, or an assumed layout for visual confirmation.

When the user asks to look at, see, check, or improve the site in the Browser, open the current page yourself before making changes so the implementation responds to the rendered result rather than a guess. After edits, reload the page and inspect the affected area again, using a screenshot when visual detail matters. Verify the appropriate desktop and mobile breakpoints when the change could alter responsive layout. If the in-app Browser cannot be reached, state that clearly before editing and use the safest available fallback; never claim visual confirmation without having actually viewed the rendered page.

## Architecture Guidelines
For layout and UI changes, preserve the App Router structure: keep route-specific composition in `app/(website)` and reusable presentation pieces in `components/`. Prefer extending existing sections such as `Navbar`, `Header`, and timeline components before introducing parallel patterns. Keep content structure in Sanity and presentation logic in the frontend; if a layout change depends on editor-managed content, model it in `sanity/schemas` instead of hardcoding values. Any user-visible text displayed on the site should be editable in Sanity, including section headers, labels, supporting copy, and call-to-action text unless there is a strong technical reason not to.

For styling and theming, favor updates through shared styles and existing Tailwind utilities rather than one-off overrides. Keep visual decisions consistent across pages, define reusable tokens or patterns before duplicating classes, and avoid coupling theme logic to a single page when it should apply site-wide. For custom behavior, start with server-first Next.js patterns, add client components only when interactivity requires them, and keep data fetching aligned with the existing `sanity/lib/live.ts` cache and preview flow so Draft Mode and Visual Editing keep working. When introducing new display text, include the matching schema, query, and frontend wiring in the same change so editors can manage it immediately.
