"use client";

import { useState } from "react";
import { InnovationAreaShape } from "@/components/map/InnovationArea";
import { innovationAreas } from "@/lib/data/innovation-areas";
import {
  AERIAL_EDITORIAL,
  AERIAL_IMAGE_FALLBACK,
  AERIAL_IMAGE_PATH,
  MAP_VIEWBOX,
  corridorLabels,
  corridorTitle,
} from "@/lib/map/aerial";

interface AerialMapProps {
  selectedAreaId: string | null;
  onSelectArea: (id: string) => void;
}

export function AerialMap({ selectedAreaId, onSelectArea }: AerialMapProps) {
  const [imageSrc, setImageSrc] = useState(AERIAL_IMAGE_PATH);
  const {
    brightness,
    limestone,
    scrim,
    vignette,
    labelColor,
    labelOpacity,
    titleOpacity,
  } = AERIAL_EDITORIAL;

  return (
    <svg
      viewBox={MAP_VIEWBOX}
      className="h-full w-full touch-manipulation"
      role="img"
      aria-label="Aerial view of Kirkwood Avenue with six innovation areas"
    >
      <defs>
        <filter
          id="editorial-aerial"
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="saturate"
            values={String(AERIAL_EDITORIAL.saturation)}
            result="desaturated"
          />
          <feComponentTransfer in="desaturated" result="darkened">
            <feFuncR
              type="linear"
              slope={brightness.slope}
              intercept={brightness.intercept}
            />
            <feFuncG
              type="linear"
              slope={brightness.slope}
              intercept={brightness.intercept}
            />
            <feFuncB
              type="linear"
              slope={brightness.slope}
              intercept={brightness.intercept}
            />
          </feComponentTransfer>
          <feGaussianBlur
            in="darkened"
            stdDeviation={AERIAL_EDITORIAL.soften}
            result="softened"
          />
        </filter>

        <radialGradient id="editorial-vignette" cx="50%" cy="48%" r="72%">
          <stop offset="45%" stopColor={vignette.color} stopOpacity={0} />
          <stop
            offset="100%"
            stopColor={vignette.color}
            stopOpacity={vignette.opacity}
          />
        </radialGradient>

        <filter id="label-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodColor="#000"
            floodOpacity="0.55"
          />
        </filter>

        <filter id="area-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <image
        href={imageSrc}
        x={0}
        y={0}
        width={1000}
        height={600}
        preserveAspectRatio="xMidYMid slice"
        crossOrigin="anonymous"
        filter="url(#editorial-aerial)"
        onError={() => {
          if (imageSrc !== AERIAL_IMAGE_FALLBACK) {
            setImageSrc(AERIAL_IMAGE_FALLBACK);
          }
        }}
      />

      <rect
        width={1000}
        height={600}
        fill={limestone.color}
        fillOpacity={limestone.opacity}
      />

      <rect
        width={1000}
        height={600}
        fill={scrim.color}
        fillOpacity={scrim.opacity}
      />

      <rect width={1000} height={600} fill="url(#editorial-vignette)" />

      <text
        x={corridorTitle.x}
        y={corridorTitle.y}
        textAnchor="middle"
        fill={`rgba(${labelColor},${titleOpacity})`}
        fontSize={10}
        letterSpacing="0.22em"
        filter="url(#label-shadow)"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {corridorTitle.label.toUpperCase()}
      </text>

      {corridorLabels.map((street) => (
        <text
          key={street.label}
          x={street.x}
          y={street.y}
          textAnchor={street.anchor}
          fill={`rgba(${labelColor},${labelOpacity})`}
          fontSize={9}
          letterSpacing="0.04em"
          filter="url(#label-shadow)"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {street.label}
        </text>
      ))}

      {innovationAreas.map((area) => (
        <InnovationAreaShape
          key={area.id}
          area={area}
          isSelected={selectedAreaId === area.id}
          onSelect={onSelectArea}
        />
      ))}
    </svg>
  );
}
