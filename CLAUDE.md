# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Build for production
npm run start    # Start production server
```

There is no test suite or lint script configured.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` — Supabase project credentials
- `GOOGLE_CLIENT_ID` / `GOOGLE_SECRET_ID` — Google OAuth app credentials
- `NEXTAUTH_SECRET` — random secret for NextAuth session signing
- `NEXTAUTH_URL` — base URL of the app (e.g. `http://localhost:3000`)

## Architecture

This is a Next.js 14 App Router project. Pages are server components by default; client components are explicitly marked `'use client'`.

### Authentication flow

NextAuth (v4) handles OAuth via Google. `utils/auth.ts` exports two things:
- `authOptions` — the NextAuth config, used at `app/api/auth/[...nextauth]/route.ts`
- `getUser()` (default export) — a server-side helper that calls `getServerSession`, then looks up or auto-creates the user in Supabase's `users` table by email. Any server page that requires auth calls this; it redirects to `/login?redirect_to=...` if there's no session.

The root `app/page.tsx` is a **client component** that checks for a session via `useSession` and redirects to `/login` client-side. This is intentional — it avoids a server-side redirect on the landing page so the "game secret" input form can render.

### Supabase client

`utils/supabase/server.ts` creates a server-side Supabase client using `@supabase/ssr`. It uses the **service key** (bypasses RLS), so all access control is enforced in application logic (e.g. `updateCompletedStatusOfTask` validates `user_id` matches before writing).

### Routing

```
/                          → game secret entry (client component)
/login                     → OAuth login page
/g/[gameSecret]            → game landing page (shows name/tagline)
/g/[gameSecret]/b          → the bingo board
/g/[gameSecret]/b/[id]     → single task detail / mark complete
/g/[gameSecret]/print      → print preview with configurable copies
```

### Board generation

When a user first visits `/g/[gameSecret]/b`, the page checks whether `users_tasks` rows already exist for that user. If not, it calls `createBoard` (`utils/createBoard.ts`), which:
1. Pulls the task with `type === 'center'` and places it at grid position (2, 2)
2. Shuffles all remaining tasks and fills the 5×5 grid, skipping (2, 2)
3. Inserts 25 `users_tasks` rows into Supabase

Board requires at least 24 non-center tasks in the game.

### Free space tasks

The center cell (type `center`) may have no preset description. Users can write their own via the `free_space_user_added_tasks` table. `getUserTasksWithInfo` joins this table and prefers the user-written description when present.

### Database schema (key tables)

- `games` — name, tagline, secret (join code), status, expiry
- `tasks` — one row per task template; `type` is `'center'` or anything else
- `users_tasks` — per-user board state; holds `grid_row`, `grid_column`, `completed`, `completed_at`
- `free_space_user_added_tasks` — optional user-defined description for center cells
- `users` — auto-created on first login from Google OAuth data

Schema initialization SQL is in `db/init.sql`.

### Styling

Tailwind CSS with two custom colors (`gold: #84726A`, `lightGold: #CCC0B7`) and two custom breakpoints (`print` / `screen`) for print-vs-screen visibility toggling. Font is Averia Serif Libre (Google Fonts, weight 300) applied globally in `app/layout.tsx`.

### Server Actions

Mutation utilities use `'use server'` and call `revalidatePath` after writes to bust Next.js cache:
- `updateCompletedStatusOfTask` — toggles `completed` + `completed_at` on a `users_tasks` row
- `addFreeSpaceUserTask` — inserts into `free_space_user_added_tasks`
- `checkForGame` — looks up a game by secret and redirects if found

### Admin

There is no in-app admin UI. Games and tasks are managed directly through the Supabase dashboard.
