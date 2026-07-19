"use client";

import { useState } from "react";
import { OpportunityPlaceMarker } from "@/components/map/OpportunityPlaceMarker";
import { opportunitySites } from "@/lib/data/opportunity-sites";
import {
  AERIAL_EDITORIAL,
  AERIAL_IMAGE_FALLBACK,
  AERIAL_IMAGE_PATH,
  MAP_VIEWBOX,
  corridorLabels,
} from "@/lib/map/aerial";
import {
  EXHIBIT_BASE_FILTER,
  EXHIBIT_OUTER_DIM,
  EXHIBIT_PAPER_TINT,
  EXHIBIT_SPOTLIGHT_FILTER,
  KIRKWOOD_CORRIDOR,
  KIRKWOOD_STREET_LABEL,
  PEDESTRIAN_SPOTLIGHTS,
  SPOTLIGHT_FEATHER,
} from "@/lib/map/exhibit-treatment";

interface AerialMapProps {
  selectedSiteId: string | null;
  onSelectSite: (id: string) => void;
}

function buildEditorialFilter(
  id: string,
  {
    saturation,
    brightness,
    soften,
  }: {
    saturation: number;
    brightness: { slope: number; intercept: number };
    soften: number;
  },
) {
  return (
    <filter
      id={id}
      x="-2%"
      y="-2%"
      width="104%"
      height="104%"
      colorInterpolationFilters="sRGB"
    >
      <feColorMatrix
        type="saturate"
        values={String(saturation)}
        result="desaturated"
      />
      <feComponentTransfer in="desaturated" result="toned">
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
      <feGaussianBlur in="toned" stdDeviation={soften} result="softened" />
    </filter>
  );
}

function SpotlightShapes({ fill }: { fill: "white" | "black" }) {
  return (
    <>
      <rect
        x={KIRKWOOD_CORRIDOR.x}
        y={KIRKWOOD_CORRIDOR.y}
        width={KIRKWOOD_CORRIDOR.width}
        height={KIRKWOOD_CORRIDOR.height}
        rx={KIRKWOOD_CORRIDOR.rx}
        fill={fill}
      />
      {PEDESTRIAN_SPOTLIGHTS.map((pool, index) => (
        <ellipse
          key={index}
          cx={pool.cx}
          cy={pool.cy}
          rx={pool.rx}
          ry={pool.ry}
          fill={fill}
        />
      ))}
    </>
  );
}

export function AerialMap({
  selectedSiteId,
  onSelectSite,
}: AerialMapProps) {
  const [imageSrc, setImageSrc] = useState(AERIAL_IMAGE_PATH);
  const { vignette, labelColor, labelOpacity } = AERIAL_EDITORIAL;

  const handleImageError = () => {
    if (imageSrc !== AERIAL_IMAGE_FALLBACK) {
      setImageSrc(AERIAL_IMAGE_FALLBACK);
    }
  };

  return (
    <svg
      viewBox={MAP_VIEWBOX}
      className="h-full w-full touch-manipulation"
      role="img"
      aria-label="Editorial map of downtown Kirkwood with named opportunity places"
    >
      <defs>
        {buildEditorialFilter("exhibit-base", EXHIBIT_BASE_FILTER)}
        {buildEditorialFilter("exhibit-spotlight", EXHIBIT_SPOTLIGHT_FILTER)}

        <filter
          id="spotlight-feather"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation={SPOTLIGHT_FEATHER} />
        </filter>

        <mask
          id="study-spotlight-mask"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={1000}
          height={600}
        >
          <rect width={1000} height={600} fill="black" />
          <g filter="url(#spotlight-feather)">
            <SpotlightShapes fill="white" />
          </g>
        </mask>

        <mask
          id="study-outer-mask"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={1000}
          height={600}
        >
          <rect width={1000} height={600} fill="white" />
          <g filter="url(#spotlight-feather)">
            <SpotlightShapes fill="black" />
          </g>
        </mask>

        <radialGradient id="editorial-vignette" cx="50%" cy="48%" r="78%">
          <stop offset="52%" stopColor={vignette.color} stopOpacity={0} />
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

        <filter
          id="street-label-halo"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="3.5"
            floodColor="#141310"
            floodOpacity="0.85"
          />
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1.5"
            floodColor="#000"
            floodOpacity="0.4"
          />
        </filter>

        <path
          id="kirkwood-street-line"
          d={KIRKWOOD_STREET_LABEL.path}
          fill="none"
        />
      </defs>

      <image
        href={imageSrc}
        x={0}
        y={0}
        width={1000}
        height={600}
        preserveAspectRatio="xMidYMid slice"
        crossOrigin="anonymous"
        filter="url(#exhibit-base)"
        onError={handleImageError}
      />

      <image
        href={imageSrc}
        x={0}
        y={0}
        width={1000}
        height={600}
        preserveAspectRatio="xMidYMid slice"
        crossOrigin="anonymous"
        filter="url(#exhibit-spotlight)"
        mask="url(#study-spotlight-mask)"
        onError={handleImageError}
      />

      <rect
        width={1000}
        height={600}
        fill={EXHIBIT_PAPER_TINT.color}
        fillOpacity={EXHIBIT_PAPER_TINT.opacity}
      />

      <rect
        width={1000}
        height={600}
        fill={EXHIBIT_OUTER_DIM.color}
        fillOpacity={EXHIBIT_OUTER_DIM.opacity}
        mask="url(#study-outer-mask)"
      />

      <rect width={1000} height={600} fill="url(#editorial-vignette)" />

      <text
        fill={`rgba(${labelColor},${KIRKWOOD_STREET_LABEL.opacity})`}
        fontSize={KIRKWOOD_STREET_LABEL.fontSize}
        fontWeight={600}
        letterSpacing={KIRKWOOD_STREET_LABEL.letterSpacing}
        filter="url(#street-label-halo)"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <textPath
          href="#kirkwood-street-line"
          startOffset="50%"
          textAnchor="middle"
        >
          KIRKWOOD AVENUE
        </textPath>
      </text>

      {corridorLabels.map((street) => (
        <text
          key={street.label}
          x={street.x}
          y={street.y}
          textAnchor={street.anchor}
          fill={`rgba(${labelColor},${labelOpacity})`}
          fontSize={8}
          letterSpacing="0.06em"
          filter="url(#label-shadow)"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {street.label}
        </text>
      ))}

      {[...opportunitySites]
        .sort((a, b) => {
          if (a.id === selectedSiteId) return 1;
          if (b.id === selectedSiteId) return -1;
          return 0;
        })
        .map((site) => (
          <OpportunityPlaceMarker
            key={site.id}
            site={site}
            isSelected={selectedSiteId === site.id}
            onSelect={onSelectSite}
          />
        ))}
    </svg>
  );
}
