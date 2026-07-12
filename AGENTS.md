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
Recent history favors short, imperative commit subjects such as `Fix auto links and add dark mode`. This repo targets `github.com/BruckDev/sanity-brucksystemsgroup-website`; work from the `develop` branch unless told otherwise. After completing requested changes, agents are expected to create a focused commit and push it unless the user explicitly says not to push or there is a clear blocker preventing it. Do not stop at a local commit when push access is available. After each push to `develop`, agents must check GitHub for the Vercel preview deployment attached to that exact commit SHA and wait until that specific check reports success before reporting completion to the user. A successful check from an earlier commit, another branch, or an existing `dev` deployment does not satisfy this requirement. Do not give post-push deployment feedback early, and do not omit the preview follow-up when deployment status can be checked. If the exact commit's preview check is pending or fails, report that status without sharing the preview link as a successful result; fix and push a new commit when appropriate, then repeat the exact-commit check. Only once GitHub confirms the exact `develop` commit's preview deployment may agents share `https://dev.brucksystems.com/`, without opening, requesting, or otherwise checking that URL directly. The preview requires login and must not be used as deployment verification. PRs should include a brief summary, note any schema or environment variable changes, link the related issue when available, and attach screenshots for UI or Studio updates.

## Agent-Specific Notes
Before changing Next.js behavior, read the relevant local docs in `node_modules/next/dist/docs/`; this repo explicitly treats those docs as the source of truth. Avoid hand-editing generated Sanity outputs unless the matching source change is included. The preview at `https://dev.brucksystems.com/` requires login: do not open or probe it for deployment status or content verification. Use GitHub's preview deployment indication for the exact pushed `develop` commit as the authoritative deployment signal. Never infer success from a previously shared `dev` URL or an earlier Vercel check; share the URL only after the current commit's check reports success.

## Architecture Guidelines
For layout and UI changes, preserve the App Router structure: keep route-specific composition in `app/(website)` and reusable presentation pieces in `components/`. Prefer extending existing sections such as `Navbar`, `Header`, and timeline components before introducing parallel patterns. Keep content structure in Sanity and presentation logic in the frontend; if a layout change depends on editor-managed content, model it in `sanity/schemas` instead of hardcoding values. Any user-visible text displayed on the site should be editable in Sanity, including section headers, labels, supporting copy, and call-to-action text unless there is a strong technical reason not to.

For styling and theming, favor updates through shared styles and existing Tailwind utilities rather than one-off overrides. Keep visual decisions consistent across pages, define reusable tokens or patterns before duplicating classes, and avoid coupling theme logic to a single page when it should apply site-wide. For custom behavior, start with server-first Next.js patterns, add client components only when interactivity requires them, and keep data fetching aligned with the existing `sanity/lib/live.ts` cache and preview flow so Draft Mode and Visual Editing keep working. When introducing new display text, include the matching schema, query, and frontend wiring in the same change so editors can manage it immediately.
