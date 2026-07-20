"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useParticipate } from "@/components/participate/ParticipateProvider";
import { resolveInvestment } from "@/lib/portfolio/catalog";
import { setInvestmentPoints } from "@/lib/portfolio/actions";
import { CIVIC_POINTS_TOTAL, MAX_POINTS_PER_INVESTMENT } from "@/lib/portfolio/tags";

export function CivicPointsBar() {
  const { user, portfolio } = useParticipate();

  if (!user) {
    return null;
  }

  const remainingPoints = portfolio?.remainingPoints ?? CIVIC_POINTS_TOTAL;
  const participationOpen = portfolio?.participationOpen ?? true;

  return (
    <div className="civic-points-bar">
      <div className="civic-points-bar__header">
        <p className="civic-points-bar__label panel-eyebrow">Civic Points</p>
        <p className="civic-points-bar__balance">
          {remainingPoints} of {CIVIC_POINTS_TOTAL} left
        </p>
      </div>
      <p className="civic-points-bar__copy">
        Allocate up to 3 points per idea. Your choices save as you go.
      </p>
      {!participationOpen && (
        <p className="civic-points-bar__notice">
          Participation is currently closed.
        </p>
      )}
    </div>
  );
}

interface CivicPointsStepperProps {
  siteId: string;
  futureId: string;
  variant?: "default" | "overlay";
}

export function CivicPointsStepper({
  siteId,
  futureId,
  variant = "default",
}: CivicPointsStepperProps) {
  const {
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

  const isSignedIn = Boolean(user);
  const participationOpen = portfolio?.participationOpen ?? true;
  const readOnly = isSignedIn && !participationOpen;
  const remainingPoints = portfolio?.remainingPoints ?? CIVIC_POINTS_TOTAL;
  const maxForInvestment = investment?.pointLimit ?? MAX_POINTS_PER_INVESTMENT;
  const displayPoints = isSignedIn ? currentPoints : 0;

  const requestSignIn = useCallback(() => {
    openSignIn();
  }, [openSignIn]);

  const handleDecrement = useCallback(() => {
    if (!isSignedIn) {
      requestSignIn();
      return;
    }
    if (!investment || readOnly || isPending || currentPoints <= 0) return;
    updatePoints(currentPoints - 1);
  }, [
    currentPoints,
    investment,
    isPending,
    isSignedIn,
    readOnly,
    requestSignIn,
    updatePoints,
  ]);

  const handleIncrement = useCallback(() => {
    if (!isSignedIn) {
      requestSignIn();
      return;
    }
    if (
      !investment ||
      readOnly ||
      isPending ||
      currentPoints >= maxForInvestment ||
      remainingPoints <= 0
    ) {
      return;
    }
    updatePoints(currentPoints + 1);
  }, [
    currentPoints,
    investment,
    isPending,
    isSignedIn,
    maxForInvestment,
    readOnly,
    remainingPoints,
    requestSignIn,
    updatePoints,
  ]);

  const decrementDisabled =
    isSignedIn && (readOnly || isPending || currentPoints <= 0 || !investment);
  const incrementDisabled =
    isSignedIn &&
    (readOnly ||
      isPending ||
      !investment ||
      currentPoints >= maxForInvestment ||
      remainingPoints <= 0);

  return (
    <div
      className={`civic-points-stepper${
        variant === "overlay" ? " civic-points-stepper--overlay" : ""
      }`}
      aria-label={variant === "overlay" ? "Vote with Civic Points" : undefined}
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {variant === "overlay" && (
        <p className="civic-points-stepper__overlay-label" aria-hidden="true">
          Vote
        </p>
      )}
      {variant !== "overlay" && (
        <p className="civic-points-stepper__label panel-eyebrow">
          Invest Civic Points
        </p>
      )}
      <div className="civic-points-stepper__controls">
        <button
          type="button"
          className="civic-points-stepper__button"
          aria-label="Remove one point"
          disabled={decrementDisabled}
          onClick={handleDecrement}
        >
          −
        </button>
        <span className="civic-points-stepper__value" aria-live="polite">
          {displayPoints}
          <span className="civic-points-stepper__max">
            / {maxForInvestment}
          </span>
        </span>
        <button
          type="button"
          className="civic-points-stepper__button"
          aria-label="Add one point"
          disabled={incrementDisabled}
          onClick={handleIncrement}
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
