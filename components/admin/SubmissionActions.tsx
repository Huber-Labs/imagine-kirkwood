"use client";

import { useState, useTransition } from "react";
import { updateSubmissionStatus } from "@/lib/submissions/actions";
import type { IdeaSubmissionStatus } from "@/lib/submissions/types";

interface SubmissionActionsProps {
  id: string;
  status: IdeaSubmissionStatus;
}

const buttonClass =
  "inline-flex items-center justify-center rounded-full border border-foreground/15 px-3 py-1 text-xs transition-colors hover:border-foreground/30 disabled:opacity-50";

export function SubmissionActions({ id, status }: SubmissionActionsProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function setStatus(next: IdeaSubmissionStatus) {
    setError(null);
    startTransition(async () => {
      const result = await updateSubmissionStatus(id, next);
      if (!result.ok) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex flex-wrap gap-2">
        {status !== "reviewed" && (
          <button
            type="button"
            className={buttonClass}
            disabled={pending}
            onClick={() => setStatus("reviewed")}
          >
            Mark reviewed
          </button>
        )}
        {status !== "archived" && (
          <button
            type="button"
            className={buttonClass}
            disabled={pending}
            onClick={() => setStatus("archived")}
          >
            Archive
          </button>
        )}
        {status !== "new" && (
          <button
            type="button"
            className={buttonClass}
            disabled={pending}
            onClick={() => setStatus("new")}
          >
            Reopen
          </button>
        )}
      </div>
      {error && <span className="text-xs text-amber-700">{error}</span>}
    </div>
  );
}
