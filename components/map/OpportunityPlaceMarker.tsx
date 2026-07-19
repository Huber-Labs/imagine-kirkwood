"use client";

import { useState } from "react";
import { getPublishedFutureCount } from "@/lib/data/opportunity-sites";
import { IU_CRIMSON } from "@/lib/map/exhibit-treatment";
import {
  getLabelAnchor,
  getOpportunityLocation,
  toViewBoxPoint,
} from "@/lib/map/opportunity-locations";
import type { OpportunitySite } from "@/lib/types";

interface OpportunityPlaceMarkerProps {
  site: OpportunitySite;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function OpportunityPlaceMarker({
  site,
  isSelected,
  onSelect,
}: OpportunityPlaceMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const location = getOpportunityLocation(site.id);

  if (!location) return null;

  const pin = toViewBoxPoint(location);
  const label = getLabelAnchor(location, pin);
  const isAuthored = !site.isPlaceholder;
  const futureCount = getPublishedFutureCount(site);

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

  const futuresLabel =
    futureCount > 0
      ? `${futureCount} possible future${futureCount === 1 ? "" : "s"}`
      : null;

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`place-marker ${isSelected ? "place-marker--selected" : ""} ${isAuthored ? "place-marker--authored" : "place-marker--placeholder"}`}
      style={{ cursor: "pointer" }}
    >
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
        aria-label={
          futuresLabel ? `${site.name}, ${futuresLabel}` : site.name
        }
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

      {futuresLabel && isAuthored && (isSelected || isHovered) && (
        <text
          x={label.x}
          y={label.y + 13}
          textAnchor={label.textAnchor}
          fill="rgba(255,255,255,0.62)"
          fontSize={8}
          letterSpacing="0.06em"
          pointerEvents="none"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {futuresLabel.toUpperCase()}
        </text>
      )}

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
