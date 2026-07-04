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
    vision: {
      northStar: "The Welcome Threshold",
      paragraphs: [
        "Imagine arriving from Indiana Avenue and immediately sensing you've entered somewhere distinct — not a highway shoulder, but a civic room that belongs to everyone.",
        "Broad sidewalks, dappled shade, and a clear welcome gesture invite students, visitors, and residents to pause, orient, and wander inward.",
      ],
    },
    today: {
      summary:
        "Where campus meets downtown — the first impression thousands of students and visitors carry into Kirkwood.",
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
          "A small paved plaza with benches and planting at the Indiana Avenue corner.",
      },
      {
        id: "idea-100-2",
        title: "Wayfinding kiosk",
        description:
          "A simple map and event board orienting newcomers to Kirkwood's shops and theaters.",
      },
    ],
    precedents: [
      {
        id: "prec-100-1",
        place: "Iowa City, IA",
        summary:
          "Gateway arches on the ped mall make arrival feel intentional and celebrated.",
      },
      {
        id: "prec-100-2",
        place: "Ann Arbor, MI",
        summary:
          "The campus-to-downtown threshold on South University feels like a clear welcome.",
      },
      {
        id: "prec-100-3",
        place: "Charlottesville, VA",
        summary:
          "The Downtown Mall entrance frames the shift from car to foot gracefully.",
      },
    ],
    imagineWithUs: {
      prompt:
        "Tell us about a place that made you feel welcome the moment you arrived.",
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
    vision: {
      northStar: "The Evening Streetroom",
      paragraphs: [
        "When the lights come up inside the Buskirk-Chumley, the street should feel like an encore — lit, lively, and ready for conversation.",
        "Flexible gathering zones and gentle lighting transform show nights into shared neighborhood rituals.",
      ],
    },
    today: {
      summary:
        "Evening energy around the Buskirk-Chumley — alive inside, but the sidewalk doesn't match.",
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
          "Flexible seating and string lights in the parking lane during show nights.",
      },
      {
        id: "idea-200-2",
        title: "Poster wall",
        description:
          "A community board for local arts events and neighborhood announcements.",
      },
    ],
    precedents: [
      {
        id: "prec-200-1",
        place: "New Orleans, LA",
        summary:
          "Frenchmen Street — music and conversation spill onto the sidewalk after every show.",
      },
      {
        id: "prec-200-2",
        place: "Austin, TX",
        summary:
          "Live music venues on Red River draw crowds that linger long after the encore.",
      },
      {
        id: "prec-200-3",
        place: "Chicago, IL",
        summary:
          "Theater district lobbies extend warmth onto the sidewalk on performance nights.",
      },
    ],
    imagineWithUs: {
      prompt:
        "Share a place where you stayed on the street long after the main event ended.",
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
    vision: {
      northStar: "Bloomington's Living Room",
      paragraphs: [
        "Picture Kirkwood slowed to human pace — tables spilling into the sunshine, neighbors passing through, and conversation replacing the rush of traffic.",
        "Modular parklets and planted edges reclaim the street for people year-round.",
      ],
    },
    today: {
      summary:
        "A shared street with seasonal parklets — vibrant in summer, sparse in shoulder seasons.",
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
          "Standardized parklet designs businesses can deploy quickly and affordably.",
      },
      {
        id: "idea-300-2",
        title: "Mid-block bulb-out",
        description:
          "A wider pedestrian zone at the block's center with planters defining shared space.",
      },
    ],
    precedents: [
      {
        id: "prec-300-1",
        place: "San Francisco, CA",
        summary:
          "Small parklet platforms turn parking spaces into neighborhood living rooms.",
      },
      {
        id: "prec-300-2",
        place: "Madison, WI",
        summary:
          "State Street's summer parklet row makes outdoor dining feel effortless.",
      },
      {
        id: "prec-300-3",
        place: "Barcelona, Spain",
        summary:
          "Superblocks slow traffic and give streets back to people and patios.",
      },
    ],
    imagineWithUs: {
      prompt:
        "Tell us about outdoor dining or gathering you've loved — and why it worked.",
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
    vision: {
      northStar: "Cross With Confidence",
      paragraphs: [
        "Nobody should have to gamble mid-block — a raised crossing and clear markings make priority plain and movement graceful.",
        "Micromobility hubs and bike parking woven in make this block a model for how a college town moves.",
      ],
    },
    today: {
      summary:
        "A busy mid-block where pedestrians, bikes, and cars negotiate the same space unpredictably.",
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
          "Designated bike and scooter parking with a repair stand.",
      },
    ],
    precedents: [
      {
        id: "prec-400-1",
        place: "Copenhagen, Denmark",
        summary:
          "Raised crossings make you feel safe the moment you step off the curb.",
      },
      {
        id: "prec-400-2",
        place: "Boulder, CO",
        summary:
          "Clearly marked mid-block crossings on Pearl Street remove all guesswork.",
      },
      {
        id: "prec-400-3",
        place: "Montreal, Canada",
        summary:
          "Protected bike lanes and pedestrian priority zones share space calmly.",
      },
    ],
    imagineWithUs: {
      prompt:
        "Where have you felt safest crossing a busy main street — and what made it work?",
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
    vision: {
      northStar: "The Civic Porch",
      paragraphs: [
        "Public buildings should feel like they belong to the street — generous edges with seats, shade, and welcome.",
        "A covered porch and tree canopy turn summer's hottest stretch into a place to read, wait, and be together.",
      ],
    },
    today: {
      summary:
        "Civic buildings that draw daily visitors — but blank walls and parking at the street edge.",
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
          "A covered seating area bridging library and street.",
      },
      {
        id: "idea-500-2",
        title: "Tree canopy plan",
        description:
          "Strategic street trees providing shade along the sunniest stretch.",
      },
    ],
    precedents: [
      {
        id: "prec-500-1",
        place: "Boston, MA",
        summary:
          "The steps of the Public Library invite you to stay before you ever go inside.",
      },
      {
        id: "prec-500-2",
        place: "Chattanooga, TN",
        summary:
          "The library plaza offers outdoor reading spots that feel like a front porch.",
      },
      {
        id: "prec-500-3",
        place: "Portland, OR",
        summary:
          "Civic buildings with generous plazas make democracy feel approachable.",
      },
    ],
    imagineWithUs: {
      prompt:
        "Tell us about a civic building that felt like part of the street — not apart from it.",
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
    vision: {
      northStar: "The Eastern Square",
      paragraphs: [
        "At the corridor's eastern edge, imagine a square that reconfigures with the seasons — market one morning, maker fair the next.",
        "Activated storefronts and generous plaza space turn foot traffic into community.",
      ],
    },
    today: {
      summary:
        "Retail frontage at Kirkwood's eastern end — busy on festival weekends, but without a gathering anchor.",
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
          "A flexible plaza for farmers markets, maker fairs, and seasonal events.",
      },
      {
        id: "idea-600-2",
        title: "Storefront activation",
        description:
          "Pop-up displays and art installations that enliven empty storefronts.",
      },
    ],
    precedents: [
      {
        id: "prec-600-1",
        place: "Portland, OR",
        summary:
          "Saturday Market provides a permanent frame for temporary commerce.",
      },
      {
        id: "prec-600-2",
        place: "Taipei, Taiwan",
        summary:
          "Night markets transform ordinary streets into vibrant gathering places.",
      },
      {
        id: "prec-600-3",
        place: "Burlington, VT",
        summary:
          "Church Street Marketplace anchors downtown with flexible public space.",
      },
    ],
    imagineWithUs: {
      prompt:
        "Share a market or street festival that changed how you think about public space.",
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
