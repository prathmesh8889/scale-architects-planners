/* ------------------------------------------------------------------ */
/*  SCALE Architects and Planners — site content & types               */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "SCALE Architects and Planners",
  shortName: "SCALE",
  tagline: "Architects & Planners",
  phoneDisplay: "+91 94209 27590",
  phoneHref: "tel:+919420927590",
  whatsappHref: "https://wa.me/919420927590",
  email: "studio.scaleypm@gmail.com",
  addressLines: ["Shree Bag Centre, Vidhardh Housing Society", "Yavatmal, Maharashtra 445001"],
  plusCode: "94QJ+X7 Yavatmal, Maharashtra",
  mapsUrl: "https://maps.app.goo.gl/fSrDVcMvuyjAopb98",
  website: "https://sites.google.com/view/scale-architects-planners/home",
  mapEmbed:
    "https://www.google.com/maps?q=94QJ%2BX7%20Yavatmal%2C%20Maharashtra&z=16&output=embed",
  rating: 4.9,
  reviewCount: 34,
  hours: [
    { d: "Mon – Fri", h: "10:30 AM – 6:30 PM" },
    { d: "Saturday", h: "10:30 AM – 3:00 PM" },
    { d: "Sunday", h: "By appointment" },
  ],
  est: 2011,
};

export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/a6966fda-b2ef-4e82-b265-9c4eff3d2326/_result.png",
  living: "https://image.qwenlm.ai/generated-images/7a0fa6c7-1d5a-4b45-80a1-c8d75b3182c0/_result.png",
  duplex: "https://image.qwenlm.ai/generated-images/2ce04ccc-7b64-4358-be0b-b5d027018c71/_result.png",
  office: "https://image.qwenlm.ai/generated-images/c159cd9e-ea04-4273-9e4e-5b9fb4c57f41/_result.png",
  bedroom: "https://image.qwenlm.ai/generated-images/5ae811be-e655-4ec2-b4a0-7609e5251f89/_result.png",
  facade: "https://image.qwenlm.ai/generated-images/4f577a6b-77dc-4bb8-8f57-1bf8e7dc81da/_result.png",
  baLivingBefore: "https://image.qwenlm.ai/generated-images/37b990ad-dfad-4331-96c8-62103f1273bf/_result.png",
  baLivingAfter: "https://image.qwenlm.ai/generated-images/0b3397b7-7759-4e7a-9f9b-8f64f5b94dbe/_result.png",
  baKitchenBefore: "https://image.qwenlm.ai/generated-images/d81090ec-dd36-4c4d-8c56-6e6021cefbc8/_result.png",
  baKitchenAfter: "https://image.qwenlm.ai/generated-images/4427b628-2b5d-42b5-a5b6-00141a437e2a/_result.png",
};

/* ---------------- projects ---------------- */

export type ProjectCategory = "Residential" | "Commercial" | "Interiors" | "Planning";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  status: string;
  img?: string;
  plan?: boolean;
  fig: string;
  desc: string;
  scope: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "courtyard-house",
    name: "The Courtyard House",
    category: "Residential",
    location: "Pusad Road, Yavatmal",
    year: "2024",
    area: "3,200 sq.ft",
    status: "Completed",
    img: IMG.hero,
    fig: "FIG. P-01",
    featured: true,
    desc: "A two-storey family home organised around a planted courtyard. An exposed-concrete frame carries perforated jali screens that cut the harsh Vidarbha sun into soft, moving patterns, while the deep veranda keeps every room shaded and cross-ventilated.",
    scope: ["Architecture", "Interiors", "Vastu", "Landscape"],
  },
  {
    id: "deshpande-duplex",
    name: "Deshpande Duplex",
    category: "Residential",
    location: "Civil Lines, Yavatmal",
    year: "2023",
    area: "2,600 sq.ft",
    status: "Completed",
    img: IMG.duplex,
    fig: "FIG. P-02",
    featured: true,
    desc: "Stacked white volumes over a stone-clad plinth, planned on a tight 30×50 city plot. The cantilevered upper floor shades the parking court and frames the street with slim steel railings.",
    scope: ["Architecture", "3D Elevation", "Structural"],
  },
  {
    id: "shree-bag-clinic",
    name: "Shree Bag Clinic & Offices",
    category: "Commercial",
    location: "Shree Bag Centre, Yavatmal",
    year: "2024",
    area: "5,400 sq.ft",
    status: "Completed",
    img: IMG.facade,
    fig: "FIG. P-03",
    desc: "A ground-plus-two commercial block two streets from our own studio. Vertical concrete fins and warm brick give the west façade depth, and recessed glazing keeps waiting areas glare-free through the afternoon.",
    scope: ["Architecture", "Facade Design", "Approval Liaison"],
  },
  {
    id: "kale-interiors",
    name: "Kale Residence Interiors",
    category: "Interiors",
    location: "Gandhi Chowk, Yavatmal",
    year: "2022",
    area: "1,800 sq.ft",
    status: "Completed",
    img: IMG.living,
    fig: "FIG. P-04",
    featured: true,
    desc: "Full interior fit-out of a joint-family flat: an exposed-concrete feature wall anchors the living room, terrazzo floors run wall to wall, and cane, teak and brass keep the palette warm without heaviness.",
    scope: ["Interior Design", "FF&E", "Site Supervision"],
  },
  {
    id: "scale-studio",
    name: "The SCALE Studio",
    category: "Interiors",
    location: "Vidhardh Housing Society, Yavatmal",
    year: "2023",
    area: "950 sq.ft",
    status: "In use",
    img: IMG.office,
    fig: "FIG. P-05",
    desc: "Our own workspace at Shree Bag Centre — a wood-slat material wall, a drafting table long enough for full-size plan checks, and a client corner where schemes are pinned up at true scale.",
    scope: ["Interior Design", "Furniture Design"],
  },
  {
    id: "mehta-bedroom",
    name: "Mehta Residence — Bedroom Suite",
    category: "Interiors",
    location: "Wardha Road, Yavatmal",
    year: "2025",
    area: "620 sq.ft",
    status: "Completed",
    img: IMG.bedroom,
    fig: "FIG. P-06",
    desc: "A calm master suite: fluted walnut panelling, brass sconces dimmed to 2700K, and a handwoven rug from a Wardha workshop. The brief was a single word — 'quiet'.",
    scope: ["Interior Design", "Lighting Design"],
  },
  {
    id: "suyash-enclave",
    name: "Suyash Enclave Masterplan",
    category: "Planning",
    location: "Pandharkawda, Yavatmal Dist.",
    year: "2021",
    area: "14 acres · 96 plots",
    status: "Sanctioned",
    plan: true,
    fig: "FIG. P-07",
    desc: "A 96-plot NA layout with a central amenity spine, 9-metre internal roads and rainwater harvesting on every cluster. Sanctioned layout, plot-sale drawings and phase-wise development plan delivered.",
    scope: ["Town Planning", "NA Layout", "Plot-sale Drawings"],
  },
];

/* ---------------- services ---------------- */

export interface Service {
  code: string;
  name: string;
  scope: string;
  out: string;
}

export const SERVICES: Service[] = [
  { code: "A-101", name: "Architectural Design", scope: "New homes, bungalows, duplexes, farmhouses", out: "Concept → GFC drawings" },
  { code: "A-102", name: "Interior Design", scope: "Residences, offices, clinics, retail", out: "Working drawings + FF&E" },
  { code: "A-103", name: "Town Planning & Layouts", scope: "NA layouts, plotted schemes, masterplans", out: "Sanctioned layout drawings" },
  { code: "A-104", name: "Renovation & Turnkey", scope: "Old homes, additional floors, makeovers", out: "Audit → handover" },
  { code: "A-105", name: "3D Elevation & Walkthrough", scope: "Photoreal exterior & interior previews", out: "Renders + video walk" },
  { code: "A-106", name: "Structural Drawings & BOQ", scope: "RCC design, steel & cost estimates", out: "Structural set + BOQ" },
  { code: "A-107", name: "Vastu Consultation", scope: "Site selection & plan alignment", out: "Vastu overlay report" },
  { code: "A-108", name: "Approval & Liaison", scope: "NMC / NIT sanctions, NA conversion", out: "Sanction + OC support" },
];

/* ---------------- process ---------------- */

export const PROCESS = [
  { code: "PH-01", name: "Brief & Site Visit", desc: "We walk your plot, note sun, slope, soil and street — and listen to how you actually live." },
  { code: "PH-02", name: "Concept & Vastu", desc: "Two to three concept options with Vastu overlay, massing studies and a first cost band." },
  { code: "PH-03", name: "Design Freeze", desc: "Plans, sections and photoreal 3D elevations refined until every family member signs off." },
  { code: "PH-04", name: "Working Drawings", desc: "GFC set: structure, electrical, plumbing, finishes schedule and a line-item BOQ." },
  { code: "PH-05", name: "Approvals & Tender", desc: "Sanction drawings filed with the authority; contractor comparison with transparent bids." },
  { code: "PH-06", name: "Site Supervision", desc: "Stage-wise site checks, drawing queries resolved on the spot, handover with as-built set." },
];

/* ---------------- stats ---------------- */

export const STATS = [
  { value: 120, suffix: "+", decimals: 0, label: "Projects delivered", note: "since 2011" },
  { value: 14, suffix: "", decimals: 0, label: "Years in practice", note: "Yavatmal-based" },
  { value: 8, suffix: "", decimals: 0, label: "Vidarbha districts", note: "served to date" },
  { value: 4.9, suffix: "★", decimals: 1, label: "Google rating", note: "across 34 reviews" },
];

/* ---------------- case studies ---------------- */

export interface CaseStudy {
  id: string;
  code: string;
  title: string;
  client: string;
  location: string;
  year: string;
  duration: string;
  budget: string;
  area: string;
  before: string;
  after: string;
  challenge: string;
  solution: string;
  results: string[];
  quote: string;
  quoteBy: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "rowhouse-light",
    code: "CS-01 / 2023",
    title: "A 1998 Row House, Reopened to Light",
    client: "Joshi family",
    location: "Gandhi Chowk, Yavatmal",
    year: "2023",
    duration: "10 weeks",
    budget: "₹18.2 L",
    area: "1,150 sq.ft",
    before: IMG.baLivingBefore,
    after: IMG.baLivingAfter,
    challenge:
      "Twenty-five years of layered paint, a boxed-up living room, and a steel-grilled window that admitted almost no daylight. The family wanted the house to feel twice its size without touching the outer walls.",
    solution:
      "We removed one non-structural partition, replaced the grilled window with a full-height steel-framed glazed unit, laid light oak over the old mosaic floor and rebuilt storage as a single continuous wall unit — so the room reads as one long, bright volume.",
    results: [
      "Daylight reach into the room increased by ~40%",
      "Steel-framed window replaced the 1998 steel grill",
      "New mezzanine study over the living zone",
      "Old mosaic topped with engineered oak — no demolition waste",
    ],
    quote: "Guests keep asking which wall we extended. We didn't extend any — we just let the light in.",
    quoteBy: "Kanchan Joshi, homeowner",
  },
  {
    id: "open-kitchen",
    code: "CS-02 / 2024",
    title: "The Kitchen That Went Open",
    client: "Dhote family",
    location: "Civil Lines, Yavatmal",
    year: "2024",
    duration: "6 weeks",
    budget: "₹6.8 L",
    area: "480 sq.ft",
    before: IMG.baKitchenBefore,
    after: IMG.baKitchenAfter,
    challenge:
      "A closed, greasy galley kitchen cut off from the dining area, with peeling laminate and no counter space for two cooks — the family's daily routine revolved around avoiding it.",
    solution:
      "The partition to the dining room became a breakfast bar. Sage-green matte shutters with soft-close hardware, a quartz worktop, a slim chimney and one enlarged window turned the kitchen into the social centre of the flat.",
    results: [
      "Closed galley converted to open kitchen + breakfast bar",
      "Counter length doubled: 6 ft → 13 ft of workspace",
      "Natural ventilation restored via enlarged window",
      "Delivered in 6 weeks, family stayed in residence throughout",
    ],
    quote: "Six weeks, zero drama, and now every family function ends up in the kitchen — on purpose.",
    quoteBy: "Anagha Dhote, homeowner",
  },
];

/* ---------------- testimonials ---------------- */

export const TESTIMONIALS = [
  {
    text: "They treated our 30×50 plot like it was their own home. Every rupee is accounted for in the BOQ, and the site engineer visited twice a week without being asked.",
    name: "Sandeep & Kanchan Joshi",
    project: "Row-house renovation, Gandhi Chowk",
  },
  {
    text: "From NA conversion to the final plot-sale drawing, SCALE handled the entire layout. 96 plots sold out in fourteen months — the masterplan did half the selling.",
    name: "Prakash Wankhede",
    project: "Suyash Enclave, Pandharkawda",
  },
  {
    text: "The 3D elevation they showed us matched the finished building almost brick for brick. That has never happened to us in three constructions.",
    name: "Dr. Neha Kale",
    project: "Residence interiors, Yavatmal",
  },
  {
    text: "Final cost landed within 4% of the original estimate — on a two-year project. I don't know another firm in Vidarbha that can say that.",
    name: "Anand Deshpande",
    project: "Deshpande Duplex, Civil Lines",
  },
];

/* ---------------- studio ---------------- */

export const TEAM = [
  {
    initials: "SK",
    name: "Ar. Sameer Kolte",
    role: "Principal Architect · Founder",
    reg: "COA Reg. A-41827",
    bio: "B.Arch, Nagpur University. Fourteen years of practice across Yavatmal, Wardha and Amravati with 120+ delivered works — from 600 sq.ft shops to 14-acre layouts. Believes a plan is only good if the client can read it.",
  },
  {
    initials: "PW",
    name: "Ar. Prachi Wankhede",
    role: "Design Lead · Interiors",
    reg: "COA Reg. A-52914",
    bio: "B.Arch, CEPT-trained interiors. Leads the interior wing and the studio's material library — terrazzo, cane, brick and lime plaster sourced within 300 km of Yavatmal wherever possible.",
  },
  {
    initials: "RM",
    name: "Er. Rohan Meshram",
    role: "Planning & Structures",
    reg: "M.Tech (Town Planning)",
    bio: "Handles NA layouts, masterplans and the structural set. Has taken 9 township layouts through sanction across Yavatmal and Chandrapur districts.",
  },
];

export const PRINCIPLES = [
  {
    icon: "section",
    title: "Design in section, not just plan",
    body: "Plans make rooms; sections make atmosphere. Every SCALE scheme is resolved in section first — ceiling heights, light paths and air movement are decided before the furniture layout.",
  },
  {
    icon: "sun",
    title: "Sun before style",
    body: "Yavatmal touches 45°C in May. Orientation, deep chhajjas, jali screens and stack ventilation are fixed on day one; aesthetics grow around the climate, never against it.",
  },
  {
    icon: "brick",
    title: "Local material, honest detail",
    body: "Brick from Wardha, teak from the local mandi, terrazzo poured on site. A building should age well where it stands — and its money should stay in Vidarbha.",
  },
];

export const TIMELINE = [
  { year: "2011", text: "Practice founded in a single rented room near Gandhi Chowk, Yavatmal." },
  { year: "2014", text: "First township layout — 12 acres at Pandharkawda — sanctioned in 11 months." },
  { year: "2017", text: "Interiors wing opens; terrazzo-and-cane material library begins." },
  { year: "2020", text: "100th project handed over: a farmhouse at Umarkhed." },
  { year: "2023", text: "Studio moves to Shree Bag Centre, Vidhardh Housing Society." },
  { year: "2025", text: "Crosses 4.9★ across 34 Google reviews; renovation case-file series launched." },
];

export const RECOGNITION = [
  { year: "2019", title: "Best Residential Design — Vidarbha Builders' Expo", by: "VBE Jury, Nagpur" },
  { year: "2022", title: "Featured residence in 'Homes of Vidarbha' annual", by: "Deshmukh Publications" },
  { year: "2023", title: "Guest critique, B.Arch design studio", by: "JD College of Architecture, Nagpur" },
  { year: "2024", title: "Town Planning Excellence — Sanctioned Layout category", by: "Vidarbha Realty Awards" },
];

/* ---------------- local SEO ---------------- */

export const AREAS = [
  "Yavatmal",
  "Pusad",
  "Pandharkawda",
  "Darwha",
  "Umarkhed",
  "Ghatanji",
  "Arni",
  "Nagpur",
  "Wardha",
  "Amravati",
  "Chandrapur",
  "Akola",
  "Washim",
  "Hingoli",
];

export const FAQS = [
  {
    q: "What does construction cost per sq.ft in and around Yavatmal today?",
    a: "As of 2026, good-quality residential construction in Yavatmal district runs roughly ₹1,650–₹2,400 per sq.ft depending on finishes, structure span and site access. Every SCALE project starts with a line-item BOQ, so you see the number before you commit to a single drawing change.",
  },
  {
    q: "Do you handle municipal and NA approvals?",
    a: "Yes. We prepare and file sanction drawings with the local authority (NMC/NIT/NMR as applicable) and manage NA-conversion paperwork for layouts and farm plots. You sign; we queue.",
  },
  {
    q: "Can you design according to Vastu?",
    a: "Absolutely — Vastu alignment is offered as an overlay at concept stage, so it shapes the plan instead of fighting it later. Around 70% of our residential clients opt for it.",
  },
  {
    q: "Do you take up renovation of old houses?",
    a: "It's one of our favourite briefs. We begin with a structure and services audit, then work room-by-room so the family can usually stay in the house during the work. See the Case Files page for two recent examples.",
  },
  {
    q: "My plot is outside Yavatmal. Will you still take the project?",
    a: "We regularly work across all eight Vidarbha districts — Nagpur, Wardha, Amravati, Chandrapur, Akola, Washim and Hingoli. Design meetings can happen at our Shree Bag Centre studio, on your site, or over video call.",
  },
  {
    q: "How do your fees work?",
    a: "Either a percentage of construction cost or a per-sq.ft lump sum, agreed in writing before work starts. The first studio consultation is complimentary — bring your plot papers and we'll sketch possibilities on the spot.",
  },
];

export const MARQUEE_ITEMS = [
  "Residential",
  "Commercial",
  "Town Planning",
  "Interiors",
  "Renovation",
  "3D Elevations",
  "Vastu",
  "NA Layouts",
];
