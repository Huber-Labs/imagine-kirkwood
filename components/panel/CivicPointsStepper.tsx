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

function useCivicPointsAllocation(siteId: string, futureId: string) {
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
  const maxAffordable = Math.min(
    maxForInvestment,
    currentPoints + remainingPoints,
  );

  const requestSignIn = useCallback(() => {
    openSignIn();
  }, [openSignIn]);

  return {
    currentPoints,
    displayPoints,
    error,
    investment,
    isPending,
    isSignedIn,
    maxAffordable,
    maxForInvestment,
    readOnly,
    remainingPoints,
    requestSignIn,
    updatePoints,
  };
}

interface OverlayAllocationProps {
  currentPoints: number;
  displayPoints: number;
  error: string | null;
  investment: ReturnType<typeof resolveInvestment>;
  isPending: boolean;
  isSignedIn: boolean;
  maxAffordable: number;
  maxForInvestment: number;
  readOnly: boolean;
  requestSignIn: () => void;
  updatePoints: (nextPoints: number) => void;
}

function CivicPointsOverlayUI({
  currentPoints,
  displayPoints,
  error,
  investment,
  isPending,
  isSignedIn,
  maxAffordable,
  maxForInvestment,
  readOnly,
  requestSignIn,
  updatePoints,
}: OverlayAllocationProps) {
  const segments = useMemo(
    () => Array.from({ length: maxForInvestment }, (_, index) => index + 1),
    [maxForInvestment],
  );

  const isSegmentDisabled = useCallback(
    (value: number) => {
      if (!isSignedIn) return false;
      if (readOnly || isPending || !investment) return true;
      if (value > maxForInvestment) return true;
      if (value === currentPoints) return false;
      return value > maxAffordable;
    },
    [
      currentPoints,
      investment,
      isPending,
      isSignedIn,
      maxAffordable,
      maxForInvestment,
      readOnly,
    ],
  );

  const handleSegmentSelect = useCallback(
    (value: number) => {
      if (!isSignedIn) {
        requestSignIn();
        return;
      }
      if (readOnly || isPending || !investment) return;

      if (currentPoints === value) {
        updatePoints(0);
        return;
      }

      if (value <= maxForInvestment && value <= maxAffordable) {
        updatePoints(value);
      }
    },
    [
      currentPoints,
      investment,
      isPending,
      isSignedIn,
      maxAffordable,
      maxForInvestment,
      readOnly,
      requestSignIn,
      updatePoints,
    ],
  );

  return (
    <div
      className="civic-points-stepper civic-points-stepper--overlay"
      role="group"
      aria-label="Invest up to 3 Civic Points in this idea"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <p className="civic-points-stepper__overlay-label panel-eyebrow">
        Civic Points
      </p>

      <div
        className="civic-points-stepper__segments"
        role="radiogroup"
        aria-label="Allocate Civic Points"
      >
        {segments.map((value) => {
          const filled = displayPoints >= value;
          const active = displayPoints === value;
          const disabled = isSegmentDisabled(value);
          const segmentLabel =
            active && isSignedIn
              ? `Clear ${value} of ${maxForInvestment} Civic Points`
              : `Allocate ${value} of ${maxForInvestment} Civic Points`;

          return (
            <button
              key={value}
              type="button"
              role="radio"
              className={`civic-points-stepper__segment${
                filled ? " civic-points-stepper__segment--filled" : ""
              }${active ? " civic-points-stepper__segment--active" : ""}`}
              aria-checked={active}
              aria-label={segmentLabel}
              disabled={disabled}
              onClick={() => handleSegmentSelect(value)}
            >
              <span className="civic-points-stepper__segment-mark" aria-hidden="true" />
              <span className="civic-points-stepper__segment-label">{value}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {displayPoints} of {maxForInvestment} Civic Points allocated
      </p>

      {error && (
        <p className="civic-points-stepper__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function CivicPointsStepper({
  siteId,
  futureId,
  variant = "default",
}: CivicPointsStepperProps) {
  const allocation = useCivicPointsAllocation(siteId, futureId);

  const handleDecrement = useCallback(() => {
    if (!allocation.isSignedIn) {
      allocation.requestSignIn();
      return;
    }
    if (
      !allocation.investment ||
      allocation.readOnly ||
      allocation.isPending ||
      allocation.currentPoints <= 0
    ) {
      return;
    }
    allocation.updatePoints(allocation.currentPoints - 1);
  }, [allocation]);

  const handleIncrement = useCallback(() => {
    if (!allocation.isSignedIn) {
      allocation.requestSignIn();
      return;
    }
    if (
      !allocation.investment ||
      allocation.readOnly ||
      allocation.isPending ||
      allocation.currentPoints >= allocation.maxForInvestment ||
      allocation.remainingPoints <= 0
    ) {
      return;
    }
    allocation.updatePoints(allocation.currentPoints + 1);
  }, [allocation]);

  if (variant === "overlay") {
    return <CivicPointsOverlayUI {...allocation} />;
  }

  const decrementDisabled =
    allocation.isSignedIn &&
    (allocation.readOnly ||
      allocation.isPending ||
      allocation.currentPoints <= 0 ||
      !allocation.investment);
  const incrementDisabled =
    allocation.isSignedIn &&
    (allocation.readOnly ||
      allocation.isPending ||
      !allocation.investment ||
      allocation.currentPoints >= allocation.maxForInvestment ||
      allocation.remainingPoints <= 0);

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
          disabled={decrementDisabled}
          onClick={handleDecrement}
        >
          −
        </button>
        <span className="civic-points-stepper__value" aria-live="polite">
          {allocation.displayPoints}
          <span className="civic-points-stepper__max">
            / {allocation.maxForInvestment}
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
      {allocation.error && (
        <p className="civic-points-stepper__error" role="alert">
          {allocation.error}
        </p>
      )}
    </div>
  );
}
