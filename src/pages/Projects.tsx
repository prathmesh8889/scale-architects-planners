import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dimension,
  IconArrowUpRight,
  IconCross,
  IconPhone,
  Reveal,
  SectionTag,
  useReducedMotion,
} from "../components/ui";
import { PROJECTS, SITE, type Project, type ProjectCategory } from "../data/site";

const d = (s: string) => ({ "--d": s }) as CSSProperties;

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Residential", "Commercial", "Interiors", "Planning"];
const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

/* ------------------------------------------------------------------ */
/*  Hand-drawn masterplan SVG (Planning project)                       */
/* ------------------------------------------------------------------ */

function MasterplanSVG() {
  const plots: { x: number; y: number; w: number; h: number; n: string }[] = [];
  let n = 1;
  const addRow = (x0: number, y0: number, cols: number, w: number, h: number) => {
    for (let c = 0; c < cols; c++) {
      plots.push({ x: x0 + c * w, y: y0, w: w - 6, h: h - 6, n: `P-${String(n++).padStart(2, "0")}` });
    }
  };
  // west block
  addRow(70, 80, 3, 95, 95);
  addRow(70, 185, 3, 95, 95);
  addRow(70, 330, 3, 95, 95);
  addRow(70, 435, 3, 95, 95);
  // east block
  addRow(470, 80, 3, 90, 90);
  addRow(470, 180, 3, 90, 90);
  addRow(470, 430, 3, 90, 90);

  return (
    <svg viewBox="0 0 800 600" className="w-full h-full bg-paper" role="img" aria-label="Suyash Enclave masterplan layout drawing">
      <defs>
        <pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#171B21" strokeWidth="1" opacity="0.35" />
        </pattern>
      </defs>

      {/* boundary */}
      <path d="M40 40H760V560H40Z" fill="none" stroke="#171B21" strokeWidth="3" pathLength={1} className="draw-path" />

      {/* main roads */}
      <path d="M40 290H760M40 320H760" stroke="#171B21" strokeWidth="1.6" pathLength={1} className="draw-path" style={d("0.3s")} />
      <path d="M40 305H760" stroke="#171B21" strokeWidth="1" strokeDasharray="10 8" opacity="0.7" />
      <path d="M380 40V560M430 40V560" stroke="#171B21" strokeWidth="1.6" pathLength={1} className="draw-path" style={d("0.45s")} />
      <path d="M405 40V560" stroke="#171B21" strokeWidth="1" strokeDasharray="10 8" opacity="0.7" />

      {/* plots */}
      {plots.map((p, i) => (
        <g key={p.n}>
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill="none"
            stroke="#171B21"
            strokeWidth="1.4"
            pathLength={1}
            className="draw-path"
            style={{ "--d": `${0.5 + (i % 10) * 0.06}s` } as CSSProperties}
          />
          <text
            x={p.x + p.w / 2}
            y={p.y + p.h / 2 + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="#171B21"
            opacity="0.75"
          >
            {p.n}
          </text>
        </g>
      ))}

      {/* amenity garden */}
      <rect x="470" y="290" width="264" height="120" fill="url(#hatch)" stroke="#171B21" strokeWidth="2" pathLength={1} className="draw-path" style={d("0.6s")} />
      <text x="602" y="345" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#171B21" letterSpacing="2">
        GARDEN + TANK
      </text>
      <text x="602" y="363" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#171B21" opacity="0.6">
        RAINWATER HARVEST
      </text>

      {/* dimensions */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="#171B21" opacity="0.8">
        <line x1="40" y1="24" x2="760" y2="24" stroke="#171B21" strokeWidth="1" />
        <line x1="40" y1="18" x2="40" y2="30" stroke="#171B21" strokeWidth="1" />
        <line x1="760" y1="18" x2="760" y2="30" stroke="#171B21" strokeWidth="1" />
        <text x="400" y="18" textAnchor="middle">320′-0″</text>
        <line x1="776" y1="40" x2="776" y2="560" stroke="#171B21" strokeWidth="1" />
        <line x1="770" y1="40" x2="782" y2="40" stroke="#171B21" strokeWidth="1" />
        <line x1="770" y1="560" x2="782" y2="560" stroke="#171B21" strokeWidth="1" />
        <text x="788" y="300" textAnchor="middle" transform="rotate(90 788 300)">230′-0″</text>
      </g>

      {/* road labels */}
      <text x="200" y="310" fontFamily="var(--font-mono)" fontSize="10" fill="#171B21" letterSpacing="3">
        9M ROAD
      </text>
      <text x="392" y="120" fontFamily="var(--font-mono)" fontSize="10" fill="#171B21" letterSpacing="2" transform="rotate(90 392 120)">
        7.5M ROAD
      </text>

      {/* title block */}
      <g>
        <rect x="560" y="470" width="180" height="72" fill="#F1F2EE" stroke="#171B21" strokeWidth="1.6" />
        <text x="572" y="492" fontFamily="var(--font-display)" fontSize="16" fill="#171B21" letterSpacing="1">
          SUYASH ENCLAVE
        </text>
        <text x="572" y="508" fontFamily="var(--font-mono)" fontSize="9" fill="#171B21" opacity="0.75">
          LAYOUT PLAN · 96 PLOTS
        </text>
        <text x="572" y="522" fontFamily="var(--font-mono)" fontSize="9" fill="#E0392C">
          SCALE 1:500 · DWG TP-01
        </text>
        <text x="572" y="536" fontFamily="var(--font-mono)" fontSize="9" fill="#171B21" opacity="0.75">
          SCALE ARCHITECTS &amp; PLANNERS
        </text>
      </g>

      {/* north + scale bar */}
      <g transform="translate(700 70)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#171B21" strokeWidth="1.4" />
        <path d="M0 -14l6 20-6-5-6 5z" fill="#E0392C" />
        <text x="0" y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#171B21">
          N
        </text>
      </g>
      <g transform="translate(60 520)">
        <rect x="0" y="0" width="40" height="6" fill="#171B21" />
        <rect x="40" y="0" width="40" height="6" fill="none" stroke="#171B21" strokeWidth="1" />
        <rect x="80" y="0" width="40" height="6" fill="#171B21" />
        <text x="0" y="20" fontFamily="var(--font-mono)" fontSize="9" fill="#171B21">0</text>
        <text x="52" y="20" fontFamily="var(--font-mono)" fontSize="9" fill="#171B21">10M</text>
        <text x="108" y="20" fontFamily="var(--font-mono)" fontSize="9" fill="#171B21">20M</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [sel, setSel] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sel]);

  return (
    <div>
      {/* header */}
      <section className="bp-grid-light border-b border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 md:pt-20 pb-12 md:pb-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.22em] text-ink/70">
              <span className="bg-ink text-paper px-2.5 py-1.5">LEDGER A-200</span>
              <span>SELECTED BUILT WORK</span>
              <span className="text-redline font-semibold">07 ENTRIES · 2021–2026</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 font-display uppercase text-ink leading-[0.94]">
              <span className="mask-line text-[clamp(3rem,9.5vw,7.5rem)]">
                <span style={d("0.1s")}>PROJECT</span>
              </span>
              <span className="mask-line text-[clamp(3rem,9.5vw,7.5rem)]">
                <span className="text-outline-ink" style={d("0.24s")}>LEDGER</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-ink/80 leading-relaxed">
              A cross-section of the practice — courtyard houses, duplexes, clinics, interiors
              and a 14-acre sanctioned layout. Every entry was drawn, sanctioned and supervised
              by this studio.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <Dimension label="YAVATMAL DISTRICT & BEYOND" className="mt-8 max-w-sm text-ink/50" />
          </Reveal>
        </div>
      </section>

      {/* filters + grid */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-12">
              <span className="font-mono text-[10.5px] tracking-[0.24em] text-ink/55 mr-2">
                FILTER —
              </span>
              {FILTERS.map((f) => {
                const count = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2.5 font-mono text-xs tracking-[0.12em] border transition-all duration-200 ${
                      filter === f
                        ? "bg-ink text-paper border-ink"
                        : "border-ink/35 text-ink/75 hover:border-ink hover:text-ink hover:-translate-y-0.5"
                    }`}
                    aria-pressed={filter === f}
                  >
                    {f.toUpperCase()} <span className={filter === f ? "text-redline" : "text-ink/45"}>({count})</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <motion.div layout className="grid md:grid-cols-12 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.article
                  layout
                  key={p.id}
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`${SPANS[i % SPANS.length]}`}
                >
                  <button
                    onClick={() => setSel(p)}
                    className="group block w-full h-full text-left border border-ink bg-paper transition-all duration-300 hover:shadow-[7px_7px_0_0_var(--color-ink)] hover:-translate-y-1 focus-visible:shadow-[7px_7px_0_0_var(--color-ink)]"
                  >
                    <div className="relative overflow-hidden border-b border-ink">
                      <div className={p.plan ? "aspect-[4/3]" : "aspect-[4/3]"}>
                        {p.plan ? (
                          <Reveal className="w-full h-full">
                            <MasterplanSVG />
                          </Reveal>
                        ) : (
                          <img
                            src={p.img}
                            alt={`${p.name} — ${p.category} in ${p.location}`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          />
                        )}
                      </div>
                      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] bg-ink text-paper px-2.5 py-1.5">
                        {p.category.toUpperCase()}
                      </span>
                      <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.18em] bg-paper/95 text-ink px-2 py-1">
                        {p.year}
                      </span>
                    </div>
                    <div className="p-5 md:p-6 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.22em] text-redline">{p.fig}</p>
                        <h2 className="font-display text-xl md:text-2xl uppercase tracking-wide mt-1.5 leading-tight">
                          {p.name}
                        </h2>
                        <p className="font-mono text-[11px] tracking-wider text-ink/60 mt-2">
                          {p.location} · {p.area}
                        </p>
                      </div>
                      <span className="w-10 h-10 shrink-0 border border-ink/25 flex items-center justify-center mt-1 transition-all duration-300 group-hover:bg-redline group-hover:border-redline group-hover:text-paper">
                        <IconArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal delay={100}>
            <div className="mt-16 border border-ink bg-ink text-paper p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <p className="font-mono text-[10px] tracking-[0.24em] text-blueprint-line">
                  ENTRY NO. 08 — RESERVED
                </p>
                <h3 className="font-display uppercase text-3xl md:text-4xl tracking-wide mt-2.5">
                  Your plot could be the next sheet.
                </h3>
              </div>
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-3 bg-redline text-paper px-7 py-4 font-mono text-sm font-semibold tracking-[0.12em] hover:bg-redline-deep transition-colors shrink-0"
              >
                START AN ENQUIRY
                <IconArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* detail modal */}
      <AnimatePresence>
        {sel && (
          <motion.div
            className="fixed inset-0 z-[96] flex items-end md:items-center justify-center md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${sel.name} details`}
          >
            <motion.div
              className="absolute inset-0 bg-ink/75"
              onClick={() => setSel(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative bg-paper border border-ink w-full max-w-4xl max-h-[92vh] overflow-y-auto hard-shadow"
              initial={reduced ? false : { y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: 36, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setSel(null)}
                className="absolute top-3 right-3 z-10 w-11 h-11 bg-paper border border-ink flex items-center justify-center hover:bg-redline hover:text-paper hover:border-redline transition-colors"
                aria-label="Close project details"
              >
                <IconCross className="w-5 h-5" />
              </button>

              <div className="border-b border-ink">
                {sel.plan ? (
                  <div className="aspect-[16/9]">
                    <MasterplanSVG />
                  </div>
                ) : (
                  <img
                    src={sel.img}
                    alt={`${sel.name} — ${sel.category} project by SCALE Architects, ${sel.location}`}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                )}
              </div>

              <div className="p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] tracking-[0.2em]">
                  <span className="text-redline font-semibold">{sel.fig}</span>
                  <span className="bg-ink text-paper px-2.5 py-1.5">{sel.category.toUpperCase()}</span>
                  <span className="border border-ink/40 px-2.5 py-1.5">{sel.status.toUpperCase()}</span>
                </div>
                <h2 className="font-display uppercase text-3xl md:text-5xl tracking-wide mt-5 leading-[1.02]">
                  {sel.name}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 border border-line mt-8">
                  {[
                    ["LOCATION", sel.location],
                    ["YEAR", sel.year],
                    ["AREA", sel.area],
                    ["STATUS", sel.status],
                  ].map(([k, v], i) => (
                    <div key={k} className={`p-4 ${i < 3 ? "border-r border-line" : ""} ${i < 2 ? "border-b md:border-b-0 border-line" : ""}`}>
                      <p className="font-mono text-[9.5px] tracking-[0.24em] text-ink/50">{k}</p>
                      <p className="text-sm font-semibold mt-1.5">{v}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-7 text-ink/80 leading-relaxed max-w-2xl">{sel.desc}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {sel.scope.map((s) => (
                    <span key={s} className="border border-ink/30 px-3 py-1.5 font-mono text-[11px] tracking-wider text-ink/75">
                      {s}
                    </span>
                  ))}
                </div>

                <Dimension label={sel.area.toUpperCase()} className="mt-9 text-ink/40 max-w-xs" />

                <div className="mt-9 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    onClick={() => setSel(null)}
                    className="inline-flex items-center gap-3 bg-redline text-paper px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] hard-shadow-sm hover:-translate-y-0.5 transition-transform"
                  >
                    ENQUIRE — SIMILAR PROJECT
                    <IconArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center gap-3 border border-ink px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
                  >
                    <IconPhone className="w-4 h-4" />
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
