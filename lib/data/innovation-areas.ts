import type { InnovationArea } from "@/lib/types";

export const innovationAreas: InnovationArea[] = [
  {
    id: "indiana-gateway",
    block: "100",
    name: "Indiana Avenue Gateway",
    category: "gateway",
    phase: "test",
    accent: "#5B8C5A",
    geometry: {
      points:
        "48,252 168,238 182,248 188,342 172,368 52,358 42,290",
      labelX: 115,
      labelY: 305,
    },
    today: {
      summary: "Where campus meets downtown.",
      description:
        "The western edge of Kirkwood is the first impression for thousands of students and visitors arriving from Indiana Avenue. Sidewalks narrow here, and the transition from university to city feels abrupt.",
      stats: [
        { label: "Daily foot traffic", value: "High" },
        { label: "Crosswalks", value: "2" },
        { label: "Public seating", value: "None" },
      ],
      observations: [
        {
          id: "obs-100-1",
          text: "People cluster at the corner waiting to cross — there's nowhere to pause.",
        },
      ],
    },
    ideas: [
      {
        id: "idea-100-1",
        title: "Welcome plaza",
        description:
          "A small paved plaza with benches and planting at the Indiana Avenue corner — a clear threshold between campus and downtown.",
      },
      {
        id: "idea-100-2",
        title: "Wayfinding kiosk",
        description:
          "A simple map and event board orienting newcomers to Kirkwood's shops, theaters, and restaurants.",
      },
    ],
    inspiration: [
      {
        id: "insp-100-1",
        text: "The gateway arches on Iowa City's downtown ped mall — they make arrival feel intentional.",
        source: "Iowa City, IA",
      },
    ],
    participate: {
      prompt: "What would make you feel welcome arriving on Kirkwood from campus?",
      examples: [
        "I loved the entrance plaza in Ann Arbor.",
        "A covered bike rack here would help.",
      ],
    },
  },
  {
    id: "theater-row",
    block: "200",
    name: "Theater Row",
    category: "gathering",
    phase: "next",
    accent: "#7B6BA8",
    geometry: {
      points:
        "192,242 328,235 338,248 348,338 332,372 198,365 188,280",
      labelX: 268,
      labelY: 302,
    },
    today: {
      summary: "Evening energy around the Buskirk-Chumley.",
      description:
        "This block comes alive after dark when shows let out, but the streetscape doesn't match the energy inside. Lines form on narrow sidewalks with little lighting or gathering space.",
      stats: [
        { label: "Evening events", value: "4–5 nights/week" },
        { label: "Existing parklets", value: "1" },
        { label: "Street lighting", value: "Adequate" },
      ],
    },
    ideas: [
      {
        id: "idea-200-1",
        title: "Pre-show gathering zone",
        description:
          "Flexible seating and string lights in the parking lane during show nights — a place to wait, meet friends, and linger.",
      },
      {
        id: "idea-200-2",
        title: "Poster wall",
        description:
          "A community board for local arts events, open mics, and neighborhood announcements.",
      },
    ],
    inspiration: [
      {
        id: "insp-200-1",
        text: "The pre-show bustle on Frenchmen Street in New Orleans — music spilling onto the sidewalk.",
        source: "New Orleans, LA",
      },
    ],
    participate: {
      prompt: "What would make you stay on the street after a show?",
      examples: [
        "Outdoor music like I saw in Austin.",
        "More places to sit and people-watch.",
      ],
    },
  },
  {
    id: "parklet-promenade",
    block: "300",
    name: "Parklet Promenade",
    category: "shared-street",
    phase: "next",
    accent: "#C4A35A",
    geometry: {
      points:
        "352,232 498,228 508,245 518,330 502,378 358,372 348,268",
      labelX: 432,
      labelY: 300,
    },
    today: {
      summary: "Shared street with seasonal parklets.",
      description:
        "Under Bloomington's shared-street model, restaurants here install parklets in parking spaces for outdoor dining. The rhythm works in summer but feels sparse in shoulder seasons.",
      stats: [
        { label: "Active parklets", value: "3" },
        { label: "Outdoor seats", value: "~40" },
        { label: "Vehicle access", value: "Shared" },
      ],
    },
    ideas: [
      {
        id: "idea-300-1",
        title: "Modular parklet kit",
        description:
          "Standardized, accessible parklet designs businesses can deploy quickly — lowering cost and raising quality.",
      },
      {
        id: "idea-300-2",
        title: "Mid-block bulb-out",
        description:
          "A wider pedestrian zone at the block's center with planters defining the shared space.",
      },
    ],
    inspiration: [
      {
        id: "insp-300-1",
        text: "San Francisco's parklet program — small platforms that turn parking into living rooms.",
        source: "San Francisco, CA",
      },
      {
        id: "insp-300-2",
        text: "The parklet row on Madison's State Street in summer.",
        source: "Madison, WI",
      },
    ],
    participate: {
      prompt: "What outdoor dining or gathering have you loved elsewhere?",
      examples: [
        "I loved this street in Madison.",
        "Portland's food cart pods feel welcoming.",
      ],
    },
  },
  {
    id: "mid-block-crossing",
    block: "400",
    name: "Mid-Block Crossing",
    category: "mobility",
    phase: "test",
    accent: "#4A90A4",
    geometry: {
      points:
        "512,245 658,240 668,255 675,325 662,365 518,360 508,290",
      labelX: 592,
      labelY: 303,
    },
    today: {
      summary: "A busy mid-block with awkward crossings.",
      description:
        "Pedestrians cut diagonally across Kirkwood here to reach shops on both sides. Without a marked crossing, people, bikes, and cars negotiate the same space unpredictably.",
      stats: [
        { label: "Reported near-misses", value: "Occasional" },
        { label: "Bike parking", value: "Scarce" },
        { label: "Scooter zones", value: "None designated" },
      ],
    },
    ideas: [
      {
        id: "idea-400-1",
        title: "Raised crosswalk",
        description:
          "A tabled crossing at mid-block that slows traffic and gives pedestrians clear priority.",
      },
      {
        id: "idea-400-2",
        title: "Micromobility hub",
        description:
          "Designated bike and scooter parking with a repair stand — keeping devices off the sidewalk.",
      },
    ],
    inspiration: [
      {
        id: "insp-400-1",
        text: "Copenhagen's raised crossings — you feel safe the moment you step off the curb.",
        source: "Copenhagen, Denmark",
      },
    ],
    participate: {
      prompt: "Where have you felt safest crossing a busy main street?",
      examples: ["Boulder marks mid-block crossings really clearly."],
    },
  },
  {
    id: "courthouse-edge",
    block: "500",
    name: "Courthouse Edge",
    category: "civic",
    phase: "vision",
    accent: "#8B6914",
    geometry: {
      points:
        "672,248 808,252 818,268 828,345 812,382 678,375 665,310",
      labelX: 752,
      labelY: 308,
    },
    today: {
      summary: "Civic buildings without civic space.",
      description:
        "The Monroe County Public Library and nearby courthouse draw daily visitors, but Kirkwood's edge here is mostly blank walls and parking. Shade and seating are scarce in summer.",
      stats: [
        { label: "Library visits", value: "~800/day" },
        { label: "Public shade", value: "Minimal" },
        { label: "Benches", value: "2" },
      ],
    },
    ideas: [
      {
        id: "idea-500-1",
        title: "Civic porch",
        description:
          "A covered seating area bridging library and street — a place to read, wait, and watch the corridor.",
      },
      {
        id: "idea-500-2",
        title: "Tree canopy plan",
        description:
          "Strategic street trees providing shade along the sunniest stretch of the block.",
      },
    ],
    inspiration: [
      {
        id: "insp-500-1",
        text: "The steps of the Boston Public Library — civic architecture that invites you to stay.",
        source: "Boston, MA",
      },
    ],
    participate: {
      prompt: "What would make civic buildings feel like part of the street?",
      examples: [
        "Chattanooga's library plaza has great outdoor reading spots.",
      ],
    },
  },
  {
    id: "walnut-square",
    block: "600",
    name: "Walnut Square",
    category: "retail",
    phase: "vision",
    accent: "#B85C5C",
    geometry: {
      points:
        "822,255 968,262 978,285 985,355 968,388 830,378 818,300",
      labelX: 898,
      labelY: 312,
    },
    today: {
      summary: "Retail frontage at the corridor's eastern end.",
      description:
        "Walnut Street marks the eastern bookend of downtown Kirkwood. Festival spillover and weekend foot traffic peak here, but the street lacks a defined gathering anchor.",
      stats: [
        { label: "Retail storefronts", value: "8" },
        { label: "Festival days/year", value: "~12" },
        { label: "Market potential", value: "High" },
      ],
    },
    ideas: [
      {
        id: "idea-600-1",
        title: "Weekend market square",
        description:
          "A flexible plaza configuration for farmers markets, maker fairs, and seasonal events.",
      },
      {
        id: "idea-600-2",
        title: "Storefront activation grants",
        description:
          "Micro-grants for pop-up displays, art installations, and window treatments that enliven empty storefronts.",
      },
    ],
    inspiration: [
      {
        id: "insp-600-1",
        text: "Portland Saturday Market — a permanent frame for temporary commerce.",
        source: "Portland, OR",
      },
    ],
    participate: {
      prompt: "What markets or street festivals have stuck with you?",
      examples: [
        "The night market in Taipei changed how I think about streets.",
      ],
    },
  },
];

export function getInnovationAreaById(
  id: string,
): InnovationArea | undefined {
  return innovationAreas.find((area) => area.id === id);
}
