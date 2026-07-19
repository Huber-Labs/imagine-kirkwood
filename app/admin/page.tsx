import Link from "next/link";
import { redirect } from "next/navigation";
import { getOptionalProfile } from "@/lib/auth/session";
import { fetchAdminInvestmentTotals } from "@/lib/portfolio/actions";
import { getSupabaseEnv } from "@/lib/supabase/env";

export default async function AdminPage() {
  if (!getSupabaseEnv()) {
    return (
      <main className="admin-page mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl">
          Admin
        </h1>
        <p className="mt-4 text-foreground/70">
          Supabase is not configured. Add environment variables to Vercel
          (Production) and redeploy to view Civic Points totals.
        </p>
      </main>
    );
  }

  try {
    const profile = await getOptionalProfile();
    if (!profile?.is_admin) {
      redirect("/explore");
    }

    const totals = await fetchAdminInvestmentTotals();

    return (
      <main className="admin-page mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="admin-page__header flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="panel-eyebrow">Planning insights</p>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl tracking-[-0.02em]">
              Civic Points totals
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">
              Aggregate signal from saved portfolios only. Not a binding vote —
              a pulse of what residents would protect or build under scarcity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/export"
              className="admin-page__export inline-flex items-center justify-center rounded-full border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-foreground/30"
            >
              Download CSV
            </a>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
            >
              Back to atlas
            </Link>
          </div>
        </div>

        <div className="admin-page__table-wrap mt-10 overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="admin-page__table min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-foreground/[0.03]">
              <tr>
                <th className="px-4 py-3 font-medium">Place</th>
                <th className="px-4 py-3 font-medium">Concept</th>
                <th className="px-4 py-3 font-medium">Tier</th>
                <th className="px-4 py-3 font-medium text-right">Total points</th>
                <th className="px-4 py-3 font-medium text-right">Investors</th>
              </tr>
            </thead>
            <tbody>
              {totals.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-foreground/55"
                    colSpan={5}
                  >
                    No saved portfolios yet.
                  </td>
                </tr>
              )}
              {totals.map((row) => (
                <tr
                  key={row.investmentId}
                  className="border-b border-foreground/6 last:border-b-0"
                >
                  <td className="px-4 py-3">{row.placeName}</td>
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3 capitalize">
                    {row.investmentTier.replace("-", " ")}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {row.totalPoints}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {row.uniqueInvestors}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected admin error.";

    return (
      <main className="admin-page mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl">
          Admin
        </h1>
        <p className="mt-4 text-foreground/70">
          Unable to load the admin dashboard: {message}
        </p>
        <Link
          href="/explore"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          Back to atlas
        </Link>
      </main>
    );
  }
}
