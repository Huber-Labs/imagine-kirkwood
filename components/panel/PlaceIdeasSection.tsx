"use client";

import { useCallback, useMemo, useState } from "react";
import {
  getIdeaVoteCount,
  getSupportedIdeaIds,
  toggleIdeaSupport,
} from "@/lib/ideas/votes";
import { TIMELINE_PHASES, type PlaceIdea } from "@/lib/types";

interface PlaceIdeasSectionProps {
  siteId: string;
  ideas: PlaceIdea[];
}

const PHASE_SHORT_LABELS = Object.fromEntries(
  TIMELINE_PHASES.filter((phase) => phase.id !== "today").map((phase) => [
    phase.id,
    phase.shortLabel,
  ]),
) as Record<NonNullable<PlaceIdea["phase"]>, string>;

export function PlaceIdeasSection({ siteId, ideas }: PlaceIdeasSectionProps) {
  const [supportedIds, setSupportedIds] = useState<string[]>(() =>
    getSupportedIdeaIds(siteId),
  );

  const sortedIdeas = useMemo(() => {
    return [...ideas].sort((a, b) => {
      const countA = getIdeaVoteCount(siteId, a.id, a.seedVotes ?? 0);
      const countB = getIdeaVoteCount(siteId, b.id, b.seedVotes ?? 0);
      if (countB !== countA) return countB - countA;
      return a.title.localeCompare(b.title);
    });
  }, [ideas, siteId, supportedIds]);

  const handleToggle = useCallback(
    (ideaId: string) => {
      toggleIdeaSupport(siteId, ideaId);
      setSupportedIds(getSupportedIdeaIds(siteId));
    },
    [siteId],
  );

  if (ideas.length === 0) {
    return (
      <p className="place-ideas__empty text-[0.9375rem] leading-relaxed text-foreground/55">
        Ideas coming soon.
      </p>
    );
  }

  return (
    <div className="place-ideas">
      <p className="place-ideas__hint text-[0.8125rem] leading-relaxed text-foreground/50">
        Tap support for ideas you&apos;d like to see here — saved on this
        device only.
      </p>
      <ul className="place-ideas__list">
        {sortedIdeas.map((idea) => {
          const isSupported = supportedIds.includes(idea.id);
          const voteCount = getIdeaVoteCount(
            siteId,
            idea.id,
            idea.seedVotes ?? 0,
          );

          return (
            <li key={idea.id} className="place-idea-row">
              <div className="place-idea-row__content">
                <div className="place-idea-row__header">
                  <h4 className="place-idea-row__title">{idea.title}</h4>
                  {idea.phase && (
                    <span className="place-idea-row__phase">
                      {PHASE_SHORT_LABELS[idea.phase]}
                    </span>
                  )}
                </div>
                {idea.description && (
                  <p className="place-idea-row__description">
                    {idea.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                className={`place-idea-row__support${isSupported ? " place-idea-row__support--active" : ""}`}
                aria-pressed={isSupported}
                onClick={() => handleToggle(idea.id)}
              >
                <span className="place-idea-row__support-label">
                  {isSupported ? "Supported" : "Support"}
                </span>
                <span className="place-idea-row__support-count">
                  {voteCount}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
