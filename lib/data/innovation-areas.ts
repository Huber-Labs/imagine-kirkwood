import type { InnovationArea } from "@/lib/types";

/** Block-scale contextual overlays — orientation, not primary interaction. */
export const innovationAreas: InnovationArea[] = [
  {
    id: "indiana-gateway",
    block: "100",
    name: "Indiana Avenue Gateway",
    category: "gateway",
    accent: "#5B8C5A",
    geometry: {
      points:
        "48,252 168,238 182,248 188,342 172,368 52,358 42,290",
      labelX: 115,
      labelY: 305,
    },
    chapterIntro:
      "Where campus meets downtown — the threshold into Kirkwood.",
  },
  {
    id: "theater-row",
    block: "200",
    name: "Theater Row",
    category: "gathering",
    accent: "#7B6BA8",
    geometry: {
      points:
        "192,242 328,235 338,248 348,338 332,372 198,365 188,280",
      labelX: 268,
      labelY: 302,
    },
    chapterIntro:
      "Evening energy around the Buskirk-Chumley — where culture meets the street.",
  },
  {
    id: "parklet-promenade",
    block: "300",
    name: "Parklet Promenade",
    category: "shared-street",
    accent: "#C4A35A",
    geometry: {
      points:
        "352,232 498,228 508,245 518,330 502,378 358,372 348,268",
      labelX: 432,
      labelY: 300,
    },
    chapterIntro:
      "Shared street life — outdoor dining and flexible public space.",
  },
  {
    id: "mid-block-crossing",
    block: "400",
    name: "Mid-Block Crossing",
    category: "mobility",
    accent: "#4A90A4",
    geometry: {
      points:
        "512,245 658,240 668,255 675,325 662,365 518,360 508,290",
      labelX: 592,
      labelY: 303,
    },
    chapterIntro:
      "Movement and safety — how people cross and linger mid-block.",
  },
  {
    id: "courthouse-edge",
    block: "500",
    name: "Courthouse Edge",
    category: "civic",
    accent: "#8B6914",
    geometry: {
      points:
        "672,248 808,252 818,268 828,345 812,382 678,375 665,310",
      labelX: 752,
      labelY: 308,
    },
    chapterIntro:
      "Civic buildings at the street edge — democracy made visible.",
  },
  {
    id: "walnut-square",
    block: "600",
    name: "Walnut Square",
    category: "retail",
    accent: "#B85C5C",
    geometry: {
      points:
        "822,255 968,262 978,285 985,355 968,388 830,378 818,300",
      labelX: 898,
      labelY: 312,
    },
    chapterIntro:
      "Retail frontage and festival spillover at Kirkwood's eastern end.",
  },
];

export function getInnovationAreaById(
  id: string,
): InnovationArea | undefined {
  return innovationAreas.find((area) => area.id === id);
}
