"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { useParticipate } from "@/components/participate/ParticipateProvider";
import { resolveInvestment } from "@/lib/portfolio/catalog";
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
    updateInvestmentPoints,
  } = useParticipate();
  const [error, setError] = useState<string | null>(null);

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

      void (async () => {
        setError(null);
        const result = await updateInvestmentPoints(investment.id, nextPoints);
        if (!result.ok) {
          setError(result.error);
        }
      })();
    },
    [investment, updateInvestmentPoints],
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
  isSignedIn: boolean;
  maxAffordable: number;
  maxForInvestment: number;
  readOnly: boolean;
  remainingPoints: number;
  requestSignIn: () => void;
  updatePoints: (nextPoints: number) => void;
}

function UpvoteStarIcon({
  filled = false,
  active = false,
  gradientId,
  className = "",
}: {
  filled?: boolean;
  active?: boolean;
  gradientId: string;
  className?: string;
}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`upvote-star${filled ? " upvote-star--filled" : ""}${
        active ? " upvote-star--active" : ""
      }${className ? ` ${className}` : ""}`}
    >
      <path
        d="M12 2.5l2.55 7.85h8.25l-6.68 4.85 2.55 7.85L12 18.2l-6.67 4.85 2.55-7.85L1.2 10.35h8.25L12 2.5z"
        fill={filled ? `url(#${gradientId})` : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CivicPointsOverlayUI({
  currentPoints,
  displayPoints,
  error,
  investment,
  isSignedIn,
  maxAffordable,
  maxForInvestment,
  readOnly,
  remainingPoints,
  requestSignIn,
  updatePoints,
}: OverlayAllocationProps) {
  const gradientId = useId().replace(/:/g, "");
  const segments = useMemo(
    () => Array.from({ length: maxForInvestment }, (_, index) => index + 1),
    [maxForInvestment],
  );

  const isSegmentDisabled = useCallback(
    (value: number) => {
      if (!isSignedIn) return false;
      if (readOnly || !investment) return true;
      if (value > maxForInvestment) return true;
      if (value === currentPoints) return false;
      return value > maxAffordable;
    },
    [
      currentPoints,
      investment,
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
      if (readOnly || !investment) return;

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
      aria-label="Upvote this idea with up to 3 Civic Points"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <svg width="0" height="0" aria-hidden="true" className="sr-only">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="48%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
      </svg>

      <div className="civic-points-stepper__header">
        <span className="civic-points-stepper__overlay-label">Upvote</span>
        <span
          className="civic-points-stepper__budget"
          aria-live="polite"
          aria-atomic="true"
        >
          {remainingPoints} of {CIVIC_POINTS_TOTAL} left
        </span>
      </div>

      <div
        className="civic-points-stepper__segments"
        role="radiogroup"
        aria-label="Choose up to 3 Civic Points"
      >
        {segments.map((value) => {
          const filled = displayPoints >= value;
          const active = displayPoints === value;
          const disabled = isSegmentDisabled(value);
          const segmentLabel =
            active && isSignedIn
              ? `Clear ${value} of ${maxForInvestment} upvotes`
              : `Upvote ${value} of ${maxForInvestment} Civic Points`;

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
              <UpvoteStarIcon
                filled={filled}
                active={active}
                gradientId={gradientId}
              />
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {displayPoints} of {maxForInvestment} Civic Points allocated.{" "}
        {remainingPoints} of {CIVIC_POINTS_TOTAL} remaining.
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
      allocation.currentPoints <= 0 ||
      !allocation.investment);
  const incrementDisabled =
    allocation.isSignedIn &&
    (allocation.readOnly ||
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
