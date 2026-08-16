# Alpha Digi AI Accountants

Marketing site for Alpha Digi AI Accountants — ICAEW chartered accountants in London.

## Tech

TanStack Start, TanStack Router, React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and shadcn/ui. See [TECH_STACK.md](./TECH_STACK.md) for the full list.

## Development

You need Node.js and npm.

```sh
npm i
npm run dev
```

The app runs at [http://localhost:8080](http://localhost:8080).

## Supabase

CMS data, admin auth, and file uploads use Supabase.

1. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Add the same keys in Vercel.
2. In the Supabase SQL Editor, run `supabase/schema.sql`.
3. If the tables already exist, run `supabase/grants.sql`. That restores GRANTs and replaces policies that queried `public.admins` as `anon` (which caused `permission denied for table admins` on cards).
4. Optionally run `supabase/seed-page-content.sql` and `supabase/seed-cards.sql` to load the current site copy.
5. Authentication → Users → Add user (email + password). Then insert that user into `public.admins` (see the comment at the bottom of `schema.sql`).
6. Restart `npm run dev`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Routes

File-based routes live in `src/routes/`. The site shell is `src/routes/__root.tsx`.
