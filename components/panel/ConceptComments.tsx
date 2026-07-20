"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useParticipate } from "@/components/participate/ParticipateProvider";
import {
  deleteConceptComment,
  fetchConceptComments,
  upsertConceptComment,
} from "@/lib/comments/actions";
import { CONCEPT_COMMENT_MAX_LENGTH } from "@/lib/comments/types";
import { resolveInvestment } from "@/lib/portfolio/catalog";

interface ConceptCommentsProps {
  siteId: string;
  futureId: string;
}

function formatCommentDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function ConceptComments({ siteId, futureId }: ConceptCommentsProps) {
  const {
    isConfigured,
    user,
    portfolio,
    catalogIndex,
    openSignIn,
  } = useParticipate();
  const investment = useMemo(
    () => resolveInvestment(catalogIndex, siteId, futureId),
    [catalogIndex, siteId, futureId],
  );

  const [comments, setComments] = useState<
    Awaited<ReturnType<typeof fetchConceptComments>>
  >([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const participationOpen = portfolio?.participationOpen ?? true;
  const ownComment = comments.find((comment) => comment.isOwn);

  const loadComments = useCallback(async () => {
    if (!investment) {
      setComments([]);
      return;
    }

    setIsLoading(true);
    const rows = await fetchConceptComments(investment.id);
    setComments(rows);
    const existing = rows.find((row) => row.isOwn);
    setDraft(existing?.body ?? "");
    setIsLoading(false);
  }, [investment]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const handleGuestCompose = useCallback(() => {
    openSignIn();
  }, [openSignIn]);

  const handleSave = useCallback(() => {
    if (!investment) return;

    startTransition(async () => {
      setError(null);
      setStatusMessage(null);
      const result = await upsertConceptComment(investment.id, draft);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setStatusMessage(ownComment ? "Note updated." : "Note posted.");
      await loadComments();
      window.setTimeout(() => setStatusMessage(null), 2500);
    });
  }, [draft, investment, loadComments, ownComment]);

  const handleDelete = useCallback(() => {
    if (!investment) return;

    startTransition(async () => {
      setError(null);
      setStatusMessage(null);
      const result = await deleteConceptComment(investment.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDraft("");
      setStatusMessage("Note removed.");
      await loadComments();
      window.setTimeout(() => setStatusMessage(null), 2500);
    });
  }, [investment, loadComments]);

  if (!isConfigured || !investment) {
    return null;
  }

  const publicComments = comments.filter((comment) => !comment.isOwn);
  const composerDisabled = !participationOpen || isPending;

  return (
    <section className="concept-comments" aria-labelledby={`comments-${futureId}`}>
      <div className="concept-comments__header">
        <h4 id={`comments-${futureId}`} className="concept-comments__title panel-eyebrow">
          Community notes
        </h4>
        <p className="concept-comments__intro">
          Short public notes about why this idea matters. One note per person.
        </p>
      </div>

      {user ? (
        <div className="concept-comments__composer">
          <label className="sr-only" htmlFor={`comment-draft-${futureId}`}>
            Your note about this concept
          </label>
          <textarea
            id={`comment-draft-${futureId}`}
            className="concept-comments__textarea"
            rows={3}
            maxLength={CONCEPT_COMMENT_MAX_LENGTH}
            placeholder="Share why this idea resonates — what would you change or like to see?"
            value={draft}
            disabled={composerDisabled}
            onChange={(event) => setDraft(event.target.value)}
          />
          <div className="concept-comments__composer-actions">
            <span className="concept-comments__count">
              {draft.length}/{CONCEPT_COMMENT_MAX_LENGTH}
            </span>
            <div className="concept-comments__composer-buttons">
              {ownComment && (
                <button
                  type="button"
                  className="concept-comments__button concept-comments__button--ghost"
                  disabled={composerDisabled}
                  onClick={handleDelete}
                >
                  Remove
                </button>
              )}
              <button
                type="button"
                className="concept-comments__button"
                disabled={composerDisabled || draft.trim().length === 0}
                onClick={handleSave}
              >
                {isPending ? "Saving…" : ownComment ? "Save note" : "Post note"}
              </button>
            </div>
          </div>
          {!participationOpen && (
            <p className="concept-comments__notice">
              Participation is currently closed.
            </p>
          )}
        </div>
      ) : (
        <button
          type="button"
          className="concept-comments__guest-cta"
          onClick={handleGuestCompose}
        >
          Sign in to add your note
        </button>
      )}

      {error && (
        <p className="concept-comments__error" role="alert">
          {error}
        </p>
      )}
      {statusMessage && (
        <p className="concept-comments__status" role="status">
          {statusMessage}
        </p>
      )}

      <div className="concept-comments__list">
        {isLoading && (
          <p className="concept-comments__empty">Loading notes…</p>
        )}
        {!isLoading && comments.length === 0 && (
          <p className="concept-comments__empty">
            No notes yet — be the first to share why this idea matters.
          </p>
        )}
        {!isLoading &&
          comments.map((comment) => (
            <article key={comment.id} className="concept-comments__item">
              <header className="concept-comments__item-header">
                <p className="concept-comments__author">
                  {comment.authorDisplayName}
                  {comment.isOwn && (
                    <span className="concept-comments__you">You</span>
                  )}
                </p>
                <p className="concept-comments__meta">
                  {formatCommentDate(comment.createdAt)}
                  {comment.updatedAt > comment.createdAt && " · Edited"}
                </p>
              </header>
              <p className="concept-comments__body">{comment.body}</p>
            </article>
          ))}
      </div>

      {ownComment && publicComments.length > 0 && (
        <p className="concept-comments__own-note-hint">
          Your note appears above with other community notes.
        </p>
      )}
    </section>
  );
}
