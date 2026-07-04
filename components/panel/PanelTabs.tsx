import type { PanelTab } from "@/lib/types";
import { PANEL_TABS } from "@/lib/types";

interface PanelTabsProps {
  activeTab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
}

export function PanelTabs({ activeTab, onTabChange }: PanelTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Area details"
      className="flex gap-1 border-b border-border"
    >
      {PANEL_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 ${
              isActive
                ? "font-medium text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-3 -bottom-px h-0.5 bg-foreground" />
            )}
          </button>
        );
      })}
    </div>
  );
}
