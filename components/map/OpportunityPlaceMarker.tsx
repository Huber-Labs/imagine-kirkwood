"use client";

import { useState } from "react";
import {
  getLabelAnchor,
  getOpportunityLocation,
  toViewBoxPoint,
} from "@/lib/map/opportunity-locations";
import type { OpportunitySite, TimelinePhase } from "@/lib/types";

interface OpportunityPlaceMarkerProps {
  site: OpportunitySite;
  isSelected: boolean;
  activePhase: TimelinePhase;
  onSelect: (id: string) => void;
}

function getPhaseGlowRadius(
  activePhase: TimelinePhase,
  isSelected: boolean,
): number | null {
  if (!isSelected) return null;

  switch (activePhase) {
    case "today":
      return null;
    case "try-soon":
      return 14;
    case "grow":
      return 20;
    case "long-term":
      return 28;
  }
}

function getPhaseGlowOpacity(activePhase: TimelinePhase): number {
  switch (activePhase) {
    case "try-soon":
      return 0.22;
    case "grow":
      return 0.32;
    case "long-term":
      return 0.42;
    default:
      return 0;
  }
}

export function OpportunityPlaceMarker({
  site,
  isSelected,
  activePhase,
  onSelect,
}: OpportunityPlaceMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const location = getOpportunityLocation(site.id);

  if (!location) return null;

  const pin = toViewBoxPoint(location);
  const label = getLabelAnchor(location, pin);
  const glowRadius = getPhaseGlowRadius(activePhase, isSelected);
  const glowOpacity = getPhaseGlowOpacity(activePhase);

  const pinRadius = isSelected ? 5.5 : isHovered ? 4.75 : 3.5;
  const pinFill = isSelected
    ? site.accent
    : isHovered
      ? "rgba(255,255,255,0.92)"
      : "transparent";
  const pinStroke = isSelected
    ? "rgba(255,255,255,0.98)"
    : isHovered
      ? "rgba(255,255,255,0.95)"
      : "rgba(255,255,255,0.72)";
  const pinStrokeWidth = isSelected ? 2 : isHovered ? 1.75 : 1.25;

  const labelOpacity = isSelected
    ? 1
    : isHovered
      ? 0.92
      : site.isPlaceholder
        ? 0.38
        : 0.72;

  const showConnector = isSelected && Math.hypot(label.x - pin.x, label.y - pin.y) > pinRadius + 4;

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
      data-phase={activePhase}
    >
      {glowRadius && (
        <circle
          cx={pin.x}
          cy={pin.y}
          r={glowRadius}
          fill={site.accent}
          fillOpacity={glowOpacity}
          filter={`url(#phase-glow-${activePhase})`}
          pointerEvents="none"
          className="transition-[r,fill-opacity] duration-500 ease-out"
        />
      )}

      <circle
        cx={pin.x}
        cy={pin.y}
        r={18}
        fill="transparent"
        role="button"
        tabIndex={0}
        aria-label={site.name}
        aria-pressed={isSelected}
        onClick={() => onSelect(site.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(site.id);
          }
        }}
      />

      {showConnector && (
        <line
          x1={pin.x}
          y1={pin.y}
          x2={label.x}
          y2={label.y + ((location.labelOffset?.y ?? 0) > 0 ? -4 : 4)}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1}
          strokeDasharray="2 3"
          pointerEvents="none"
        />
      )}

      {isHovered && !isSelected && (
        <circle
          cx={pin.x}
          cy={pin.y}
          r={pinRadius + 3}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1}
          pointerEvents="none"
        />
      )}

      <circle
        cx={pin.x}
        cy={pin.y}
        r={pinRadius}
        fill={pinFill}
        stroke={pinStroke}
        strokeWidth={pinStrokeWidth}
        pointerEvents="none"
        className="transition-[r,fill,stroke-width] duration-300 ease-out"
      />

      <text
        x={label.x}
        y={label.y}
        textAnchor={label.textAnchor}
        fill={`rgba(255,255,255,${labelOpacity})`}
        fontSize={isSelected ? 11.5 : 10.5}
        fontWeight={isSelected ? 600 : 500}
        filter="url(#label-shadow)"
        pointerEvents="none"
        className="transition-[opacity,font-size] duration-300 ease-out"
        style={{
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
        }}
      >
        {location.label}
      </text>

      {site.isPlaceholder && (
        <text
          x={label.x}
          y={label.y + 12}
          textAnchor={label.textAnchor}
          fill="rgba(255,255,255,0.35)"
          fontSize={8}
          letterSpacing="0.12em"
          pointerEvents="none"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          SOON
        </text>
      )}
    </g>
  );
}
