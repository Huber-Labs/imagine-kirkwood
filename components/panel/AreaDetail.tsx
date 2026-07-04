"use client";

import { useState } from "react";
import { IdeaCard } from "@/components/cards/IdeaCard";
import { InspirationCard } from "@/components/cards/InspirationCard";
import { ObservationCard } from "@/components/cards/ObservationCard";
import { Button } from "@/components/ui/Button";
import { PhaseBadge } from "@/components/panel/PhaseBadge";
import { PanelTabs } from "@/components/panel/PanelTabs";
import { ResearchComingSoon } from "@/components/panel/ResearchComingSoon";
import { CATEGORY_LABELS, type InnovationArea, type PanelTab } from "@/lib/types";

interface AreaDetailProps {
  area: InnovationArea;
}

export function AreaDetail({ area }: AreaDetailProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>("today");
  const [inspirationText, setInspirationText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleShare = () => {
    if (!inspirationText.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="flex h-full flex-col">
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Block {area.block} · {CATEGORY_LABELS[area.category]}
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-instrument-serif)] text-2xl text-foreground">
          {area.name}
        </h2>
        <div className="mt-3">
          <PhaseBadge phase={area.phase} />
        </div>
      </header>

      <PanelTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-y-auto py-4">
        {activeTab === "today" && (
          <div
            role="tabpanel"
            id="panel-today"
            aria-labelledby="tab-today"
            className="space-y-4"
          >
            <p className="text-sm font-medium text-foreground">
              {area.today.summary}
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {area.today.description}
            </p>
            <dl className="grid grid-cols-2 gap-3">
              {area.today.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border p-3">
                  <dt className="text-xs text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            {area.today.observations?.map((obs) => (
              <ObservationCard key={obs.id} observation={obs} />
            ))}
          </div>
        )}

        {activeTab === "ideas" && (
          <div
            role="tabpanel"
            id="panel-ideas"
            aria-labelledby="tab-ideas"
            className="space-y-3"
          >
            {area.ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}

        {activeTab === "inspiration" && (
          <div
            role="tabpanel"
            id="panel-inspiration"
            aria-labelledby="tab-inspiration"
            className="space-y-3"
          >
            {area.inspiration.map((item) => (
              <InspirationCard key={item.id} inspiration={item} />
            ))}
          </div>
        )}

        {activeTab === "participate" && (
          <div
            role="tabpanel"
            id="panel-participate"
            aria-labelledby="tab-participate"
            className="space-y-4"
          >
            <p className="text-sm leading-relaxed text-muted">
              {area.participate.prompt}
            </p>
            {submitted ? (
              <p className="rounded-lg border border-border bg-surface p-4 text-sm text-foreground">
                Thank you for sharing. Your inspiration helps shape what&apos;s
                possible here.
              </p>
            ) : (
              <>
                <textarea
                  value={inspirationText}
                  onChange={(e) => setInspirationText(e.target.value)}
                  placeholder="Share a place, experience, or idea…"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                />
                <Button onClick={handleShare} className="w-full">
                  Share Inspiration
                </Button>
              </>
            )}
            <div>
              <p className="mb-2 text-xs text-muted">Examples from others</p>
              <div className="space-y-2">
                {area.participate.examples.map((example, index) => (
                  <p
                    key={index}
                    className="rounded-lg border border-border px-3 py-2 text-sm text-muted"
                  >
                    &ldquo;{example}&rdquo;
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <ResearchComingSoon />
    </div>
  );
}
