"use client";

import { useState } from "react";
import { toOpportunityLocationFields } from "@/lib/author/session";
import type { AuthorPlace } from "@/lib/author/types";
import { getPublishedFutureCount } from "@/lib/data/opportunity-sites";
import { percentToViewBox } from "@/lib/map/calibration";
import { MAP_PIN_BLUE } from "@/lib/map/exhibit-treatment";
import {
  getLabelAnchor,
  getOpportunityLocation,
  type OpportunityLocation,
} from "@/lib/map/opportunity-locations";
import type { OpportunitySite } from "@/lib/types";

const SCOUTED_PIN_COLOR = "#4A90D9";
const COMMITTED_AUTHOR_PIN = "rgba(255,255,255,0.92)";

interface OpportunityPlaceMarkerProps {
  site?: OpportunitySite | null;
  authorPlace?: AuthorPlace;
  isSelected: boolean;
  onSelect: (id: string) => void;
  locationOverride?: OpportunityLocation;
  authorMode?: boolean;
  onAuthorPointerDown?: (
    siteId: string,
    event: React.PointerEvent<SVGCircleElement>,
  ) => void;
}

function getDisplayLabelAnchor(
  location: OpportunityLocation,
  pin: { x: number; y: number },
  pinRadius: number,
  authorMode: boolean,
): { x: number; y: number; textAnchor: "start" | "middle" | "end" } {
  if (authorMode) {
    return getLabelAnchor(location, pin);
  }

  return {
    x: pin.x,
    y: pin.y - pinRadius - 16,
    textAnchor: "middle",
  };
}

function resolveLocation(
  site: OpportunitySite | null | undefined,
  authorPlace: AuthorPlace | undefined,
  locationOverride?: OpportunityLocation,
): OpportunityLocation | null {
  if (locationOverride) return locationOverride;
  if (authorPlace) {
    const fields = toOpportunityLocationFields(authorPlace);
    return {
      siteId: fields.siteId,
      x: fields.x,
      y: fields.y,
      label: fields.label,
      labelAlign: fields.labelAlign,
      labelOffset: fields.labelOffset,
    };
  }
  if (site) return getOpportunityLocation(site.id) ?? null;
  return null;
}

export function OpportunityPlaceMarker({
  site = null,
  authorPlace,
  isSelected,
  onSelect,
  locationOverride,
  authorMode = false,
  onAuthorPointerDown,
}: OpportunityPlaceMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const location = resolveLocation(site, authorPlace, locationOverride);
  const placeId = authorPlace?.siteId ?? site?.id;

  if (!location || !placeId) return null;

  const pin = percentToViewBox({ x: location.x, y: location.y });
  const pinRadius = isSelected ? 20 : isHovered ? 12.5 : 10;
  const label = getDisplayLabelAnchor(location, pin, pinRadius, authorMode);
  const isScouted = authorMode && authorPlace?.origin === "scouted";
  const isAuthored = site ? !site.isPlaceholder : false;
  const futureCount = site ? getPublishedFutureCount(site) : 0;
  const displayName = authorPlace?.title ?? site?.name ?? location.label;

  const hitRadius = isSelected ? 64 : authorMode ? 52 : 44;

  let pinFill: string;
  if (authorMode) {
    pinFill = isScouted ? SCOUTED_PIN_COLOR : COMMITTED_AUTHOR_PIN;
  } else {
    const markerColor = isAuthored ? MAP_PIN_BLUE : "rgba(255,255,255,0.55)";
    pinFill =
      isSelected || isHovered || isAuthored ? markerColor : "transparent";
  }

  const pinStroke =
    isSelected && authorMode ? "#FFE08A" : "rgba(255,255,255,0.96)";
  const pinStrokeWidth =
    isSelected && authorMode ? 4 : isSelected ? 3.5 : isHovered ? 2.5 : 2;

  const labelOpacity = isSelected
    ? 1
    : isHovered
      ? 0.96
      : site?.isPlaceholder
        ? 0.42
        : 0.88;

  const showConnector =
    authorMode &&
    isSelected &&
    Math.hypot(label.x - pin.x, label.y - pin.y) > pinRadius + 4;

  const futuresLabel =
    futureCount > 1
      ? `${futureCount} possible futures`
      : null;

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`place-marker ${isSelected ? "place-marker--selected" : ""} ${isHovered ? "place-marker--hovered" : ""} ${authorMode ? "place-marker--author" : ""} ${isAuthored ? "place-marker--authored" : "place-marker--placeholder"}${isScouted ? " place-marker--scouted" : ""}`}
      style={{ cursor: authorMode ? "grab" : "pointer" }}
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
        r={hitRadius}
        fill="transparent"
        role="button"
        tabIndex={0}
        aria-label={
          futuresLabel ? `${displayName}, ${futuresLabel}` : displayName
        }
        aria-pressed={isSelected}
        onClick={() => {
          if (authorMode) {
            onSelect(placeId);
            return;
          }
          onSelect(placeId);
        }}
        onPointerDown={(event) => {
          if (!authorMode) return;
          event.stopPropagation();
          onAuthorPointerDown?.(placeId, event);
        }}
        onKeyDown={(event) => {
          if (authorMode) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(placeId);
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

      {isSelected && !authorMode && (
        <circle
          cx={pin.x}
          cy={pin.y}
          r={pinRadius + 8}
          fill="none"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth={1.5}
          pointerEvents="none"
          className="transition-[r,opacity] duration-300 ease-out"
        />
      )}

      {isHovered && !isSelected && (
        <circle
          cx={pin.x}
          cy={pin.y}
          r={pinRadius + 6}
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
        fillOpacity={authorMode && !isScouted ? 0.95 : isAuthored || authorMode ? 1 : 0.35}
        stroke={pinStroke}
        strokeWidth={pinStrokeWidth}
        pointerEvents="none"
        className="transition-[r,fill,stroke-width] duration-300 ease-out"
      />

      {authorMode && isSelected && (
        <text
          x={pin.x}
          y={pin.y - 16}
          textAnchor="middle"
          fill="#FFE08A"
          fontSize={8}
          fontWeight={600}
          letterSpacing="0.08em"
          pointerEvents="none"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          AUTHOR
        </text>
      )}

      <text
        x={label.x}
        y={label.y}
        textAnchor={label.textAnchor}
        fill={`rgba(255,255,255,${labelOpacity})`}
        fontSize={isSelected ? 13.5 : 11.5}
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

      {futuresLabel && isAuthored && (isSelected || isHovered) && !authorMode && (
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

      {site?.isPlaceholder && !authorMode && (
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

      {isScouted && (
        <text
          x={label.x}
          y={label.y + 13}
          textAnchor={label.textAnchor}
          fill="rgba(147,197,253,0.85)"
          fontSize={8}
          letterSpacing="0.08em"
          pointerEvents="none"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          SCOUTED
        </text>
      )}
    </g>
  );
}
