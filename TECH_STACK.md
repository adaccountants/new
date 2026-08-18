# Tech stack

This file describes the complete technology stack used by this project (Alpha Digi AI Accountants marketing site). CMS data lives in Supabase. The contact form sends mail through Resend.

## Runtime and language

| Layer         | Choice     | Version (from `package.json`) | Role                                                                 |
| ------------- | ---------- | ----------------------------- | -------------------------------------------------------------------- |
| Language      | TypeScript | `^5.8.3`                      | Typed application code; `strict` compiler options in `tsconfig.json` |
| UI library    | React      | `^19.2.0`                     | Components and client interactivity                                  |
| Module system | ESM        | `"type": "module"`            | Native ES modules                                                    |

TypeScript compiles for **ES2022**, uses the **bundler** module resolver, and maps `@/*` to `./src/*`.

## App framework

The app is a **TanStack Start** project, not Next.js.

| Package                   | Role                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `@tanstack/react-start`   | Full-stack React framework: SSR, HTML shell, server functions, request middleware                                     |
| `@tanstack/react-router`  | File-based routing, layouts, head/meta, scroll restoration                                                            |
| `@tanstack/router-plugin` | Vite plugin that generates `src/routeTree.gen.ts` from `src/routes/`                                                  |
| `@tanstack/react-query`   | Server-state cache; a `QueryClient` is created per router in `src/router.tsx` and provided in `src/routes/__root.tsx` |

### Routing

Routes live in `src/routes/`. Each `.tsx` file is a URL:

| File           | URL                                            |
| -------------- | ---------------------------------------------- |
| `__root.tsx`   | App shell (`<html>`, fonts, CSS, `<Outlet />`) |
| `index.tsx`    | `/`                                            |
| `about.tsx`    | `/about`                                       |
| `services.tsx` | `/services`                                    |
| `careers.tsx`  | `/careers`                                     |
| `blog.tsx`     | `/blog`                                        |
| `contact.tsx`  | `/contact`                                     |

Do not add Next.js-style `app/` or `pages/` trees. The only root layout is `__root.tsx`.

### Server

- `src/start.ts` — TanStack Start instance with error middleware and **CSRF protection** for server functions (`createCsrfMiddleware`).
- `src/server.ts` — Fetch handler wrapping `@tanstack/react-start/server-entry`, plus HTML fallback for catastrophic SSR errors.
- **Nitro** (`nitro` 3 beta) is the production server bundler (platform auto-detected, or pin with `NITRO_PRESET`).

Public pages load CMS data in route loaders. The contact form posts through `createServerFn` in `src/lib/contact-submit.ts` (Resend + `contact_submissions`). CSRF protection for server functions is enabled in `src/start.ts`.

## Build and tooling

| Tool                       | Role                                                         |
| -------------------------- | ------------------------------------------------------------ |
| **Vite** `^8.1.5`          | Dev server (`npm run dev` → `vite dev`) and production build |
| **`vite.config.ts`**       | TanStack Start, React, Tailwind, Nitro, and `@` path alias   |
| **`@vitejs/plugin-react`** | React Fast Refresh / JSX                                     |
| **`vite-tsconfig-paths`**  | Resolves `tsconfig` paths                                    |
| **`@tailwindcss/vite`**    | Tailwind v4 Vite plugin                                      |

Scripts:

- `npm run dev` — Vite development server (this project serves on port **8080**)
- `npm run build` / `npm run build:dev` — production / development-mode builds
- `npm run preview` — preview the built app
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Styling and design system

| Tool                                                       | Role                                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------- |
| **Tailwind CSS v4**                                        | Utility CSS in `src/styles.css` (`@import "tailwindcss"`)        |
| **tw-animate-css**                                         | Extra animation utilities                                        |
| **shadcn/ui** (New York style)                             | Generated primitives in `src/components/ui/` (`components.json`) |
| **Radix UI**                                               | Accessible headless primitives under the shadcn wrappers         |
| **class-variance-authority**, **clsx**, **tailwind-merge** | Variant APIs and `cn()` class merging in `src/lib/utils.ts`      |
| **Lucide React**                                           | Icons (`iconLibrary`: lucide)                                    |

Design tokens (brand gold, ink, cream, radius, fonts) are CSS custom properties in `src/styles.css`, mapped into Tailwind via `@theme inline`.

**Fonts** (Google Fonts, loaded in `__root.tsx`):

- Display: **Sora**
- Body: **Manrope**

## Animation

| Package                 | Role                                                       |
| ----------------------- | ---------------------------------------------------------- |
| **Framer Motion** `^12` | Scroll reveal, parallax, staggered cards, button hover/tap |

Site-specific wrappers:

- `src/components/motion/ScrollAnimate.tsx`
- `src/components/motion/Parallax.tsx`
- `src/components/motion/StaggerCards.tsx`
- `src/components/motion/MotionButton.tsx`

Marketing sections live in `src/components/site/` (`SiteHeader`, `Hero`, `About`, `Services`, `WhyChoose`, `Testimonials`, `SiteFooter`, `SiteShell`).

## Forms, validation, and extra UI kits

These are on the shadcn/Radix template even if not every widget is used on the public pages:

| Package                             | Role                                                           |
| ----------------------------------- | -------------------------------------------------------------- |
| **react-hook-form**                 | Form state                                                     |
| **zod**                             | Schema validation (including the contact form server function) |
| **resend**                          | Transactional email for `/contact` submissions                 |
| **@hookform/resolvers**             | Zod adapter for react-hook-form                                |
| **cmdk**                            | Command palette                                                |
| **vaul**                            | Drawer                                                         |
| **embla-carousel-react**            | Carousel                                                       |
| **react-day-picker** / **date-fns** | Calendar and dates                                             |
| **input-otp**                       | OTP input                                                      |
| **react-resizable-panels**          | Split panes                                                    |
| **recharts**                        | Charts (`src/components/ui/chart.tsx`)                         |
| **sonner**                          | Toasts                                                         |

## Quality

| Tool                       | Role                                             |
| -------------------------- | ------------------------------------------------ |
| **ESLint 9** (flat config) | Lint TS/TSX; React Hooks + React Refresh plugins |
| **typescript-eslint**      | TypeScript-aware rules                           |
| **Prettier**               | Formatting; ESLint runs `eslint-plugin-prettier` |

SSR error helpers live in `src/lib/error-capture.ts` and `src/lib/error-page.ts`.

## What this stack is not

- Not Next.js, Remix, or Vite SPA-only
- Not Prisma; CMS and submissions use **Supabase**
- Admin auth is Supabase Auth plus `public.admins`
- Contact form submissions go through Resend (see README)

## Typical request path

```text
Browser
  → Vite (dev) or Nitro (prod)
    → src/server.ts fetch handler
      → TanStack Start SSR
        → TanStack Router (src/routes/*)
          → React 19 components + Tailwind + Framer Motion
```
