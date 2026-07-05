"use client";

import { useState } from "react";
import { IU_CRIMSON } from "@/lib/map/exhibit-treatment";
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
      return 16;
    case "grow":
      return 22;
    case "long-term":
      return 30;
  }
}

function getPhaseGlowOpacity(activePhase: TimelinePhase): number {
  switch (activePhase) {
    case "try-soon":
      return 0.28;
    case "grow":
      return 0.38;
    case "long-term":
      return 0.48;
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
  const isAuthored = !site.isPlaceholder;

  const pinRadius = isSelected ? 7 : isHovered ? 6.25 : 5;
  const markerColor = isAuthored ? IU_CRIMSON : "rgba(255,255,255,0.55)";
  const pinFill = isSelected || isHovered || isAuthored ? markerColor : "transparent";
  const pinStroke = "rgba(255,255,255,0.96)";
  const pinStrokeWidth = isSelected ? 2.25 : isHovered ? 2 : 1.75;

  const labelOpacity = isSelected
    ? 1
    : isHovered
      ? 0.96
      : site.isPlaceholder
        ? 0.42
        : 0.88;

  const showConnector =
    isSelected &&
    Math.hypot(label.x - pin.x, label.y - pin.y) > pinRadius + 4;

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`place-marker ${isSelected ? "place-marker--selected" : ""} ${isAuthored ? "place-marker--authored" : "place-marker--placeholder"}`}
      style={{ cursor: "pointer" }}
      data-phase={activePhase}
    >
      {glowRadius && isAuthored && (
        <circle
          cx={pin.x}
          cy={pin.y}
          r={glowRadius}
          fill={IU_CRIMSON}
          fillOpacity={glowOpacity}
          filter={`url(#phase-glow-${activePhase})`}
          pointerEvents="none"
          className="transition-[r,fill-opacity] duration-500 ease-out"
        />
      )}

      <g
        className="place-marker__ripples"
        transform={`translate(${pin.x} ${pin.y})`}
        pointerEvents="none"
      >
        <circle r={pinRadius} className="place-marker__ripple" />
        <circle
          r={pinRadius}
          className="place-marker__ripple place-marker__ripple--offset"
        />
      </g>

      <circle
        cx={pin.x}
        cy={pin.y}
        r={22}
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
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1}
          strokeDasharray="2 3"
          pointerEvents="none"
        />
      )}

      {isHovered && !isSelected && (
        <circle
          cx={pin.x}
          cy={pin.y}
          r={pinRadius + 4}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={1.25}
          pointerEvents="none"
        />
      )}

      <circle
        cx={pin.x}
        cy={pin.y}
        r={pinRadius}
        fill={pinFill}
        fillOpacity={isAuthored ? 1 : 0.35}
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
        fontSize={isSelected ? 12.5 : 11.5}
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
          y={label.y + 13}
          textAnchor={label.textAnchor}
          fill="rgba(255,255,255,0.38)"
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
