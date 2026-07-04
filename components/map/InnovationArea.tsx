"use client";

import { useState } from "react";
import type { InnovationArea } from "@/lib/types";

interface InnovationAreaShapeProps {
  area: InnovationArea;
  isSelected: boolean;
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

export function InnovationAreaShape({
  area,
  isSelected,
  onSelect,
}: InnovationAreaShapeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const center = getPolygonCenter(area.geometry.points);
  const labelX = area.geometry.labelX ?? center.x;
  const labelY = area.geometry.labelY ?? center.y;
  const isActive = isHovered || isSelected;

  const fillOpacity = isSelected ? 0.52 : isHovered ? 0.4 : 0.18;
  const strokeWidth = isSelected ? 2 : isHovered ? 1.5 : 1;

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {isActive && (
        <polygon
          points={area.geometry.points}
          fill={area.accent}
          fillOpacity={isSelected ? 0.2 : 0.12}
          stroke="none"
          filter="url(#area-glow)"
          pointerEvents="none"
        />
      )}

      <polygon
        points={area.geometry.points}
        fill={area.accent}
        fillOpacity={fillOpacity}
        stroke={
          isSelected
            ? "rgba(255,255,255,0.95)"
            : isHovered
              ? "rgba(255,255,255,0.75)"
              : "rgba(255,255,255,0.35)"
        }
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        className="transition-[fill-opacity,stroke-width] duration-300 ease-out focus:outline-none"
        role="button"
        tabIndex={0}
        aria-label={`${area.name}, block ${area.block}`}
        aria-pressed={isSelected}
        onClick={() => onSelect(area.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(area.id);
          }
        }}
      />

      {isActive && (
        <g pointerEvents="none">
          <rect
            x={labelX - 78}
            y={labelY - 30}
            width={156}
            height={40}
            rx={20}
            fill="rgba(255,255,255,0.92)"
            stroke="rgba(28,27,24,0.08)"
            strokeWidth={1}
          />
          <text
            x={labelX}
            y={labelY - 10}
            textAnchor="middle"
            fill="#1a1a18"
            fontSize={11}
            fontWeight={500}
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
            }}
          >
            {area.name}
          </text>
          <text
            x={labelX}
            y={labelY + 6}
            textAnchor="middle"
            fill="rgba(28,27,24,0.45)"
            fontSize={8}
            letterSpacing="0.12em"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            BLOCK {area.block}
          </text>
        </g>
      )}
    </g>
  );
}
