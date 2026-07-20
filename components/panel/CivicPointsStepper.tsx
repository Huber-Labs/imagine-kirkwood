"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useParticipate } from "@/components/participate/ParticipateProvider";
import { resolveInvestment } from "@/lib/portfolio/catalog";
import { savePortfolio, setInvestmentPoints } from "@/lib/portfolio/actions";
import { CIVIC_POINTS_TOTAL } from "@/lib/portfolio/tags";

export function CivicPointsBar() {
  const { isConfigured, user, portfolio, openSignIn, refreshPortfolio } =
    useParticipate();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = useCallback(() => {
    startTransition(async () => {
      const result = await savePortfolio();
      if (!result.ok) {
        setMessage(result.error);
        return;
      }
      setMessage("Your priorities are saved.");
      await refreshPortfolio();
    });
  }, [refreshPortfolio]);

  if (!isConfigured || !user) {
    return (
      <div className="civic-points-bar civic-points-bar--prompt">
        <p className="civic-points-bar__copy">
          Where would you invest limited resources? Sign in to allocate{" "}
          {CIVIC_POINTS_TOTAL} Civic Points across Kirkwood ideas.
        </p>
        <button
          type="button"
          className="civic-points-bar__cta"
          onClick={openSignIn}
        >
          Sign in to prioritize
        </button>
      </div>
    );
  }

  const totalPoints = portfolio?.totalPoints ?? 0;
  const remainingPoints = portfolio?.remainingPoints ?? CIVIC_POINTS_TOTAL;
  const isSaved = portfolio?.status === "saved";
  const participationOpen = portfolio?.participationOpen ?? true;
  const canSave = !isSaved && totalPoints > 0 && participationOpen;

  return (
    <div className="civic-points-bar">
      <div className="civic-points-bar__header">
        <p className="civic-points-bar__label panel-eyebrow">Civic Points</p>
        <p className="civic-points-bar__balance">
          {remainingPoints} of {CIVIC_POINTS_TOTAL} left
        </p>
      </div>
      <p className="civic-points-bar__copy">
        {isSaved
          ? "Your priorities are saved. Thank you for helping the community see what matters."
          : "Allocate up to 3 points per idea. Save when you're ready to share your priorities."}
      </p>
      {!participationOpen && (
        <p className="civic-points-bar__notice">
          Participation is currently closed.
        </p>
      )}
      {canSave && (
        <button
          type="button"
          className="civic-points-bar__save"
          disabled={isPending}
          onClick={handleSave}
        >
          {isPending ? "Saving…" : "Save my priorities"}
        </button>
      )}
      {message && (
        <p className="civic-points-bar__message" role="status">
          {message}
        </p>
      )}
    </div>
  );
}

interface CivicPointsStepperProps {
  siteId: string;
  futureId: string;
}

export function CivicPointsStepper({
  siteId,
  futureId,
}: CivicPointsStepperProps) {
  const {
    isConfigured,
    user,
    portfolio,
    catalogIndex,
    openSignIn,
    refreshPortfolio,
  } = useParticipate();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const investment = useMemo(
    () => resolveInvestment(catalogIndex, siteId, futureId),
    [catalogIndex, siteId, futureId],
  );

  const currentPoints = useMemo(() => {
    if (!portfolio || !investment) return 0;
    return (
      portfolio.allocations.find((row) => row.investmentId === investment.id)
        ?.points ?? 0
    );
  }, [portfolio, investment]);

  const updatePoints = useCallback(
    (nextPoints: number) => {
      if (!investment) return;

      startTransition(async () => {
        setError(null);
        const result = await setInvestmentPoints(investment.id, nextPoints);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        await refreshPortfolio();
      });
    },
    [investment, refreshPortfolio],
  );

  if (!isConfigured || !user) {
    return (
      <div className="civic-points-stepper civic-points-stepper--prompt">
        <p className="civic-points-stepper__hint">
          Sign in to allocate Civic Points to this idea.
        </p>
        <button
          type="button"
          className="civic-points-stepper__sign-in"
          onClick={openSignIn}
        >
          Sign in
        </button>
      </div>
    );
  }

  if (!investment) {
    return null;
  }

  const isSaved = portfolio?.status === "saved";
  const participationOpen = portfolio?.participationOpen ?? true;
  const readOnly = isSaved || !participationOpen;
  const remainingPoints = portfolio?.remainingPoints ?? CIVIC_POINTS_TOTAL;
  const maxForInvestment = investment.pointLimit;

  return (
    <div className="civic-points-stepper">
      <p className="civic-points-stepper__label panel-eyebrow">
        Invest Civic Points
      </p>
      <div className="civic-points-stepper__controls">
        <button
          type="button"
          className="civic-points-stepper__button"
          aria-label="Remove one point"
          disabled={readOnly || isPending || currentPoints <= 0}
          onClick={() => updatePoints(currentPoints - 1)}
        >
          −
        </button>
        <span className="civic-points-stepper__value" aria-live="polite">
          {currentPoints}
          <span className="civic-points-stepper__max">
            / {maxForInvestment}
          </span>
        </span>
        <button
          type="button"
          className="civic-points-stepper__button"
          aria-label="Add one point"
          disabled={
            readOnly ||
            isPending ||
            currentPoints >= maxForInvestment ||
            remainingPoints <= 0
          }
          onClick={() => updatePoints(currentPoints + 1)}
        >
          +
        </button>
      </div>
      {error && (
        <p className="civic-points-stepper__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
