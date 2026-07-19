import { MAP_CANVAS } from "@/lib/map/opportunity-locations";

export type MapPosition = {
  x: number;
  y: number;
};

export function clampMapPosition(x: number, y: number): MapPosition {
  return {
    x: Math.min(100, Math.max(0, x)),
    y: Math.min(100, Math.max(0, y)),
  };
}

export function percentToViewBox(position: MapPosition): { x: number; y: number } {
  return {
    x: (position.x / 100) * MAP_CANVAS.width,
    y: (position.y / 100) * MAP_CANVAS.height,
  };
}

export function viewBoxToPercent(svgX: number, svgY: number): MapPosition {
  return clampMapPosition(
    (svgX / MAP_CANVAS.width) * 100,
    (svgY / MAP_CANVAS.height) * 100,
  );
}

export function clientPointToViewBox(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } | null {
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;

  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const transformed = point.matrixTransform(matrix.inverse());

  return {
    x: Math.min(MAP_CANVAS.width, Math.max(0, transformed.x)),
    y: Math.min(MAP_CANVAS.height, Math.max(0, transformed.y)),
  };
}
