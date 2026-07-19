# Supabase setup — Optional (Civic Portfolio, future)

> **Local exhibition development does not require Supabase.** The homepage and `/explore` atlas run entirely from static content in `lib/data/`. Only configure Supabase when implementing **Phase 4 — Civic Portfolio** (or Phase 3 accounts).

The migrations below define the long-term Civic Portfolio schema. They remain valid reference material — do not delete — but **do not wire UI or require env vars** until the exhibition and lightweight engagement phases prove value.

---

## When to use this guide

| Phase | Supabase needed? |
|-------|------------------|
| Visual Exhibition | No |
| Lightweight Reactions | No (localStorage) |
| Accounts + Wishlists | Yes — auth + simpler tables *(future)* |
| Civic Portfolio | Yes — run migrations below |
| Planning Insights | Yes — admin role via `profiles.is_admin` |

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Enable **Google** provider under Authentication → Providers.
3. Enable **Email** with magic link (OTP) if desired.

## 2. Redirect URLs

Add these under Authentication → URL Configuration:

| Environment | Site URL | Redirect URLs |
|-------------|----------|---------------|
| Local | `http://localhost:3000` | `http://localhost:3000/auth/callback` |
| Production | `https://your-domain.vercel.app` | `https://your-domain.vercel.app/auth/callback` |

## 3. Environment variables

Copy `env.example` to `.env.local` and fill in values from **Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

- **Anon key** — safe for browser (RLS enforced).
- **Service role key** — server only (admin aggregates in Phase 5). Never expose to the client.

On Vercel, add the same variables to the project environment.

## 4. Run migrations

In the Supabase **SQL Editor**, run in order:

1. [`supabase/migrations/001_civic_portfolio.sql`](../supabase/migrations/001_civic_portfolio.sql)
2. [`supabase/migrations/002_seed_catalog.sql`](../supabase/migrations/002_seed_catalog.sql)

Or with the Supabase CLI:

```bash
supabase link --project-ref YOUR_REF
supabase db push
```

## 5. Grant admin access

After your first sign-in, promote your user in the SQL editor:

```sql
update public.profiles
set is_admin = true
where email = 'you@example.com';
```

## 6. Verify

- `npm run dev` — site loads without auth (anonymous browse).
- `/auth/callback` route exists (OAuth completes when accounts ship).
- Table Editor shows `places`, `investments`, `portfolios`, `portfolio_investments`.

## Schema overview

| Table | Purpose |
|-------|---------|
| `places` | Kirkwood opportunity sites |
| `investments` | Catalog of investable proposals (with tags + tier) |
| `profiles` | User profiles (`is_admin` for admin dashboard) |
| `portfolios` | One Civic Portfolio per user (`building` \| `saved`) |
| `portfolio_investments` | Civic Point assignments (max 10 total, 1–3 each) |

10-point cap is enforced by a Postgres trigger — not UI-only.
