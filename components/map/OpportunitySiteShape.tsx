"use client";

import { useState } from "react";
import type { OpportunitySite, TimelinePhase } from "@/lib/types";

interface OpportunitySiteShapeProps {
  site: OpportunitySite;
  isSelected: boolean;
  activePhase: TimelinePhase;
  onSelect: (id: string) => void;
}

function getPolygonCenter(points: string): { x: number; y: number } {
  const coords = points.split(" ").map((point) => {
    const [x, y] = point.split(",").map(Number);
    return { x, y };
  });
  return {
    x: coords.reduce((sum, c) => sum + c.x, 0) / coords.length,
    y: coords.reduce((sum, c) => sum + c.y, 0) / coords.length,
  };
}

export function OpportunitySiteShape({
  site,
  isSelected,
  activePhase,
  onSelect,
}: OpportunitySiteShapeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const center = getPolygonCenter(site.geometry.points);
  const labelX = site.geometry.labelX ?? center.x;
  const labelY = site.geometry.labelY ?? center.y;
  const isActive = isHovered || isSelected;

  const fillOpacity = isSelected ? 0.65 : isHovered ? 0.5 : 0.32;
  const strokeWidth = isSelected ? 2.5 : isHovered ? 2 : 1.25;

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
      data-phase={activePhase}
    >
      {isActive && (
        <polygon
          points={site.geometry.points}
          fill={site.accent}
          fillOpacity={isSelected ? 0.22 : 0.14}
          stroke="none"
          filter="url(#area-glow)"
          pointerEvents="none"
        />
      )}

      <polygon
        points={site.geometry.points}
        fill={site.accent}
        fillOpacity={fillOpacity}
        stroke={
          isSelected
            ? "rgba(255,255,255,0.95)"
            : isHovered
              ? "rgba(255,255,255,0.8)"
              : "rgba(255,255,255,0.45)"
        }
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        className="transition-[fill-opacity,stroke-width] duration-300 ease-out focus:outline-none"
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

      {(isActive || !site.isPlaceholder) && (
        <g pointerEvents="none">
          <circle
            cx={labelX}
            cy={labelY}
            r={isActive ? 4 : 3}
            fill={site.accent}
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={1.5}
          />
          {isActive && (
            <>
              <rect
                x={labelX - 72}
                y={labelY - 36}
                width={144}
                height={32}
                rx={16}
                fill="rgba(255,255,255,0.94)"
                stroke="rgba(28,27,24,0.08)"
                strokeWidth={1}
              />
              <text
                x={labelX}
                y={labelY - 16}
                textAnchor="middle"
                fill="#1a1a18"
                fontSize={11}
                fontWeight={500}
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                }}
              >
                {site.name}
              </text>
            </>
          )}
        </g>
      )}
    </g>
  );
}
