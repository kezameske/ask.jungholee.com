# AGENTS.md

This repo is a small Next.js (App Router) + TypeScript project.

## Commands (npm)

Package manager is npm (see `package-lock.json`).

- Install: `npm ci` (preferred) or `npm install`
- Dev server: `npm run dev` (Next dev server)
- Production build: `npm run build` (Next build)
- Start prod server: `npm run start` (Next start)

### Lint

Lint is ESLint v9 with flat config in `eslint.config.mjs`.

- Lint: `npm run lint`
- Lint and fix: `npm run lint -- --fix`
- Lint a single file: `npm run lint -- src/app/page.tsx`
- Lint a folder: `npm run lint -- src/components`

### Typecheck

There is no explicit `typecheck` script.

- Typecheck: `npx tsc -p tsconfig.json --noEmit`

### Tests

No test runner is currently configured (no `test` script; no `*.test.*` / `*.spec.*` found).

If you add a test runner later, document the exact single-test commands here.

## Repository Layout

- App Router entrypoints: `src/app/layout.tsx`, `src/app/page.tsx`
- Global styles: `src/app/globals.css` (Tailwind v4 + CSS variables)
- Route handler: `src/app/api/chat/route.ts`
- Site constants/config: `src/config/site.ts`
- Server-side data fetching: `src/lib/airtable.ts`
- UI components: `src/components/*`

## Code Style (follow existing patterns)

This codebase is small but formatting is currently mixed across files (indentation, quotes, and possibly file encoding).

- When editing an existing file: match that file's style (indentation, quotes, semicolons).
- When creating new files: prefer a consistent default:
  - Indent: 2 spaces
  - Quotes: double quotes
  - Semicolons: yes
  - Trailing commas: yes where idiomatic
  - Keep files UTF-8 (avoid introducing UTF-16/other encodings)

### Imports

- Use the `@/` path alias for internal imports (configured in `tsconfig.json`):
  - Good: `import { siteConfig } from "@/config/site";`
- Use `import type` for type-only imports (see `src/app/layout.tsx`).
- Keep third-party imports separate from internal imports when possible.

### TypeScript

- TypeScript is `strict: true` (see `tsconfig.json`): avoid widening types.
- Prefer `unknown` + narrowing over `any`.
- Avoid `as any`, `@ts-ignore`, and `@ts-expect-error`.
- Prefer explicit prop types via `interface Props { ... }` or an inline object type.

### Next.js (App Router)

- Server components are the default in `src/app/*`.
- Client components must start with a top-of-file directive: `"use client";`.
- Do not access secrets from client components.
- Route handlers live under `src/app/api/**/route.ts`.

### Environment variables / secrets

- `.env*` files are gitignored (see `.gitignore`). Use `.env.local` for local dev.
- Keep secrets server-side only.
- `src/lib/airtable.ts` uses:
  - `process.env.AIRTABLE_PAT`
  - `process.env.AIRTABLE_BASE_ID`
  Validate required env vars before making requests when adding new integrations.

### Error handling

- Route handlers should:
  - Validate inputs and return 4xx for client errors
  - Wrap external calls in `try/catch` and return 5xx on failures
  - Use `NextResponse.json({ error: "..." }, { status: N })`
  - Log with context (see `src/app/api/chat/route.ts`)

- Optional content fetches should fail gracefully when reasonable:
  - `src/lib/airtable.ts` returns empty arrays on fetch failure and logs errors
  - Prefer `Promise.allSettled` when partial results are acceptable

### Data fetching

- Check `response.ok` before consuming JSON.
- For dynamic external data, use `cache: "no-store"` (pattern in `src/lib/airtable.ts`).

### UI and styling

- Styling is Tailwind v4 + a few global utility classes in `src/app/globals.css`:
  - `.glass`, `.premium-gradient`, `.text-gradient`
- Prefer Tailwind utility classes for component styling; keep truly global styles in `globals.css`.

### Naming conventions

- Components: `PascalCase` component names + `PascalCase.tsx` filenames (see `src/components/Chatbot.tsx`).
- Functions/locals: `camelCase`.
- Constants: `camelCase` in module scope unless truly constant across builds (then `SCREAMING_SNAKE_CASE`).
- Route handlers: named exports matching HTTP methods (e.g. `export async function POST(...)`).

### Client vs server code

- Only client components may use hooks/DOM APIs; always keep `"use client";` as the first line.
- Prefer server components for data fetching (see `src/app/page.tsx` calling `getSiteContent()`).
- For browser-only libraries/widgets (e.g. `@n8n/chat`), use a client component and/or `next/dynamic` with `ssr: false` (see `src/components/Chatbot.tsx`).

### External integrations

- n8n chat is configured via `siteConfig.n8nWebhookUrl` (`src/config/site.ts`) and used from both:
  - Client widget: `createChat({ webhookUrl })` (see `src/components/ChatInterface.tsx`).
  - Server route proxy: `src/app/api/chat/route.ts`.
- Treat values in `src/config/site.ts` as public; do not place secrets there.

### Searching / file encoding

- Some files may not be UTF-8 (symptom: ripgrep/grep finds deps in `package.json` but not matching strings inside certain `src/**/*.tsx`).
- Prefer keeping source files UTF-8; avoid editors that silently rewrite encoding/line endings.

## Lint Configuration Notes

- ESLint config: `eslint.config.mjs`
  - Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
  - Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

## Agent Rules

- No Cursor rules found (`.cursor/rules/` or `.cursorrules`).
- No Copilot instructions found (`.github/copilot-instructions.md`).
