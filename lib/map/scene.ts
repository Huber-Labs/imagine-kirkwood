/** Static building footprints for the Kirkwood corridor SVG scene. */
export const buildings = [
  { x: 50, y: 130, width: 60, height: 100 },
  { x: 120, y: 130, width: 50, height: 100 },
  { x: 50, y: 370, width: 70, height: 100 },
  { x: 130, y: 370, width: 40, height: 100 },
  { x: 200, y: 130, width: 55, height: 110 },
  { x: 270, y: 130, width: 60, height: 110 },
  { x: 200, y: 360, width: 65, height: 110 },
  { x: 275, y: 360, width: 55, height: 110 },
  { x: 360, y: 130, width: 60, height: 105 },
  { x: 430, y: 130, width: 55, height: 105 },
  { x: 360, y: 365, width: 70, height: 105 },
  { x: 440, y: 365, width: 50, height: 105 },
  { x: 520, y: 130, width: 65, height: 100 },
  { x: 595, y: 130, width: 55, height: 100 },
  { x: 520, y: 370, width: 60, height: 100 },
  { x: 590, y: 370, width: 60, height: 100 },
  { x: 680, y: 130, width: 55, height: 115 },
  { x: 745, y: 130, width: 65, height: 115 },
  { x: 680, y: 355, width: 60, height: 115 },
  { x: 750, y: 355, width: 60, height: 115 },
  { x: 840, y: 130, width: 60, height: 100 },
  { x: 910, y: 130, width: 55, height: 100 },
  { x: 840, y: 370, width: 55, height: 100 },
  { x: 905, y: 370, width: 65, height: 100 },
] as const;

export const crossStreets = [
  { x: 40, label: "Indiana Ave" },
  { x: 190, label: "Dunn St" },
  { x: 350, label: "Grant St" },
  { x: 510, label: "College Ave" },
  { x: 670, label: "Walnut St" },
] as const;

export const MAP_VIEWBOX = "0 0 1000 600";

export const kirkwoodStreet = {
  x: 20,
  y: 248,
  width: 960,
  height: 104,
};
