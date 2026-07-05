import type { InnovationArea } from "@/lib/types";

interface InnovationAreaOverlayProps {
  area: InnovationArea;
  isHighlighted: boolean;
}

export function InnovationAreaOverlay({
  area,
  isHighlighted,
}: InnovationAreaOverlayProps) {
  const labelX = area.geometry.labelX ?? 0;
  const labelY = area.geometry.labelY ?? 0;

  return (
    <g pointerEvents="none" aria-hidden="true">
      <polygon
        points={area.geometry.points}
        fill={area.accent}
        fillOpacity={isHighlighted ? 0.14 : 0.07}
        stroke={area.accent}
        strokeOpacity={isHighlighted ? 0.35 : 0.18}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      {isHighlighted && (
        <text
          x={labelX}
          y={labelY - 24}
          textAnchor="middle"
          fill="rgba(255,255,255,0.45)"
          fontSize={8}
          letterSpacing="0.14em"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {area.name.toUpperCase()}
        </text>
      )}
    </g>
  );
}
