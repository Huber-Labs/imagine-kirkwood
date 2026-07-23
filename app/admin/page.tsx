import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmissionActions } from "@/components/admin/SubmissionActions";
import { getOptionalProfile } from "@/lib/auth/session";
import { fetchAdminConceptComments } from "@/lib/comments/actions";
import { fetchAdminInvestmentTotals } from "@/lib/portfolio/actions";
import { fetchAdminSubmissions } from "@/lib/submissions/actions";
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
    const comments = await fetchAdminConceptComments();
    const submissions = await fetchAdminSubmissions();

    return (
      <main className="admin-page mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="admin-page__header flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="panel-eyebrow">Planning insights</p>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl tracking-[-0.02em]">
              Civic Points totals
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">
              Aggregate signal from Civic Point allocations. Not a binding vote
              — a pulse of what residents would protect or build under scarcity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/export"
              className="admin-page__export inline-flex items-center justify-center rounded-full border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-foreground/30"
            >
              Download points CSV
            </a>
            <a
              href="/admin/comments/export"
              className="admin-page__export inline-flex items-center justify-center rounded-full border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-foreground/30"
            >
              Download comments CSV
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
                    No Civic Point allocations yet.
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

        <div className="admin-page__section mt-12">
          <div className="admin-page__header flex flex-col gap-2">
            <p className="panel-eyebrow">Community voice</p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-[-0.02em]">
              Concept notes
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/65">
              Public notes left on concepts. One note per signed-in participant
              per idea.
            </p>
          </div>
        </div>

        <div className="admin-page__table-wrap mt-6 overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="admin-page__table min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-foreground/[0.03]">
              <tr>
                <th className="px-4 py-3 font-medium">Place</th>
                <th className="px-4 py-3 font-medium">Concept</th>
                <th className="px-4 py-3 font-medium">Author</th>
                <th className="px-4 py-3 font-medium">Note</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {comments.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-foreground/55"
                    colSpan={5}
                  >
                    No concept notes yet.
                  </td>
                </tr>
              )}
              {comments.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-foreground/6 last:border-b-0"
                >
                  <td className="px-4 py-3 align-top">{row.placeName}</td>
                  <td className="px-4 py-3 align-top">{row.conceptTitle}</td>
                  <td className="px-4 py-3 align-top">{row.authorDisplayName}</td>
                  <td className="max-w-md px-4 py-3 align-top whitespace-pre-wrap">
                    {row.body}
                  </td>
                  <td className="px-4 py-3 align-top tabular-nums text-foreground/65">
                    {new Date(row.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-page__section mt-12">
          <div className="admin-page__header flex flex-col gap-2">
            <p className="panel-eyebrow">Community voice</p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-[-0.02em]">
              Idea submissions
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/65">
              Ideas submitted from the public form. Review each one, then create
              approved concepts manually. Mark reviewed or archive to keep the
              queue tidy.
            </p>
          </div>
        </div>

        <div className="admin-page__table-wrap mt-6 overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="admin-page__table min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-foreground/[0.03]">
              <tr>
                <th className="px-4 py-3 font-medium">Photo</th>
                <th className="px-4 py-3 font-medium">Idea</th>
                <th className="px-4 py-3 font-medium">From</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-foreground/55"
                    colSpan={6}
                  >
                    No idea submissions yet.
                  </td>
                </tr>
              )}
              {submissions.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-foreground/6 last:border-b-0"
                >
                  <td className="px-4 py-3 align-top">
                    {row.photoUrl ? (
                      <a
                        href={row.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={row.photoUrl}
                          alt={`Photo for ${row.title}`}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      </a>
                    ) : (
                      <span className="text-foreground/40">—</span>
                    )}
                  </td>
                  <td className="max-w-md px-4 py-3 align-top">
                    <div className="font-medium">{row.title}</div>
                    <div className="mt-1 whitespace-pre-wrap text-foreground/70">
                      {row.description}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {row.submitterName || row.submitterEmail ? (
                      <div className="flex flex-col">
                        {row.submitterName && <span>{row.submitterName}</span>}
                        {row.submitterEmail && (
                          <a
                            href={`mailto:${row.submitterEmail}`}
                            className="text-foreground/65 underline"
                          >
                            {row.submitterEmail}
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-foreground/40">Anonymous</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top capitalize">{row.status}</td>
                  <td className="px-4 py-3 align-top tabular-nums text-foreground/65">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <SubmissionActions id={row.id} status={row.status} />
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
