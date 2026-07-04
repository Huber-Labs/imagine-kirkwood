import type { Proposal } from "@/lib/types";

export function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <article className="card">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-medium text-foreground">{proposal.title}</h4>
        {proposal.status && (
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted capitalize">
            {proposal.status.replace("-", " ")}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{proposal.summary}</p>
    </article>
  );
}
