import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfter from "../components/BeforeAfter";
import {
  CountUp,
  Dimension,
  IconArrowRight,
  IconArrowUpRight,
  IconCross,
  IconStar,
  Reveal,
  Seal,
  SectionTag,
  SheetCorners,
  useReducedMotion,
} from "../components/ui";
import { IMG, PROCESS, PROJECTS, SERVICES, SITE, STATS, TESTIMONIALS, AREAS } from "../data/site";

const d = (s: string) => ({ "--d": s }) as CSSProperties;

function WorkCard({
  p,
  className = "",
}: {
  p: (typeof PROJECTS)[number];
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <Link
        to="/projects"
        className="group block border border-ink bg-paper h-full transition-all duration-300 hover:shadow-[6px_6px_0_0_var(--color-ink)] hover:-translate-y-1"
      >
        <div className="relative overflow-hidden border-b border-ink">
          <div className="aspect-[4/3]">
            <img
              src={p.img}
              alt={`${p.name} — ${p.category} project in ${p.location}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
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
            <h3 className="font-display text-2xl md:text-[1.7rem] uppercase tracking-wide mt-1.5">
              {p.name}
            </h3>
            <p className="font-mono text-[11px] tracking-wider text-ink/60 mt-2">
              {p.location} · {p.area}
            </p>
          </div>
          <IconArrowUpRight className="w-5 h-5 mt-2 shrink-0 text-redline transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>
    </Reveal>
  );
}

export default function Home() {
  const [tIdx, setTIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const featured = PROJECTS.filter((p) => p.featured);
  const t = TESTIMONIALS[tIdx];

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [paused, reduced, tIdx]);

  return (
    <div>
      {/* ============ COVER SHEET ============ */}
      <section className="relative bp-grid-light overflow-hidden">
        <IconCross className="absolute top-24 left-[8%] w-4 h-4 text-ink/20" />
        <IconCross className="absolute bottom-24 left-[46%] w-4 h-4 text-ink/20 hidden md:block" />
        <IconCross className="absolute top-40 right-[6%] w-4 h-4 text-ink/20 hidden lg:block" />

        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 md:pt-24 pb-20 md:pb-28 grid lg:grid-cols-12 gap-14 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.22em] text-ink/70">
                <span className="bg-ink text-paper px-2.5 py-1.5">DWG NO. A-000</span>
                <span>COVER SHEET</span>
                <span className="text-redline font-semibold">EST. {SITE.est}</span>
                <span>
                  YAVATMAL, MH<span className="caret-blink text-redline">▊</span>
                </span>
              </div>
            </Reveal>

            <Reveal className="mt-9" delay={60}>
              <h1 className="font-display uppercase text-ink leading-[0.94]">
                <span className="mask-line text-[clamp(3.6rem,11.5vw,9rem)]">
                  <span style={d("0.1s")}>SCALE</span>
                </span>
                <span className="mask-line text-[clamp(2.3rem,7.4vw,5.7rem)]">
                  <span style={d("0.24s")}>ARCHITECTS</span>
                </span>
                <span className="mask-line text-[clamp(2.3rem,7.4vw,5.7rem)]">
                  <span className="text-outline-ink" style={d("0.38s")}>
                    &amp; PLANNERS
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={420}>
              <Dimension label="EVERY DRAWING AT TRUE SCALE" className="mt-8 max-w-md text-ink/50" />
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-ink/80">
                We design homes, interiors and township layouts that fit Vidarbha's climate,
                budgets and families — drawn carefully, priced honestly with a line-item BOQ,
                and supervised on site all the way to handover.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-redline text-paper px-7 py-4 font-mono text-sm font-semibold tracking-[0.12em] hard-shadow hover:-translate-y-1 transition-transform duration-200"
                >
                  BOOK A CONSULTATION
                  <IconArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-3 border border-ink px-7 py-4 font-mono text-sm font-semibold tracking-[0.12em] hover:bg-ink hover:text-paper transition-colors duration-200"
                >
                  VIEW THE WORK
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex flex-wrap items-center gap-3 border border-ink/25 bg-paper-2 px-4 py-3 hover:border-ink transition-colors group"
              >
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4" />
                  ))}
                </span>
                <span className="text-sm">
                  <strong className="font-display text-lg tracking-wide">{SITE.rating}</strong>
                  <span className="text-ink/70"> rated · {SITE.reviewCount} Google reviews</span>
                </span>
                <span className="font-mono text-[11px] tracking-wider text-redline underline underline-offset-4 group-hover:no-underline">
                  READ THEM ↗
                </span>
              </a>
            </Reveal>
          </div>

          {/* framed sheet image */}
          <div className="lg:col-span-5 relative lg:mt-2">
            <Reveal delay={160}>
              <div className="relative">
                <Dimension label="36′-0″" className="text-ink/45 mb-3" />
                <div className="relative border border-ink bg-ink">
                  <div className="overflow-hidden aspect-[4/5]">
                    <img
                      src={IMG.hero}
                      alt="The Courtyard House, Pusad Road Yavatmal — exposed concrete frame with jali screens at dusk"
                      className="kenburns w-full h-full object-cover"
                    />
                  </div>
                  <SheetCorners className="text-paper/80" />
                  <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.2em] bg-paper text-ink px-2.5 py-1.5">
                    REV 03 · 2026
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-ink/60">
                  <span>FIG. 01 — THE COURTYARD HOUSE</span>
                  <span>SCALE 1:100</span>
                </div>
              </div>
            </Reveal>
            <Seal className="absolute -bottom-9 -left-5 w-24 h-24 md:w-28 md:h-28 drop-shadow-md hidden sm:block" />
            <div
              className="hidden lg:flex flex-col items-center absolute -right-10 top-16 bottom-24 text-ink/45"
              aria-hidden="true"
            >
              <span className="h-3.5 w-px bg-current" />
              <span className="flex-1 w-px bg-current relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 font-mono text-[10px] tracking-[0.22em] whitespace-nowrap bg-paper px-2.5">
                  48′-0″
                </span>
              </span>
              <span className="h-3.5 w-px bg-current" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DRAWING INDEX / SERVICES ============ */}
      <section className="border-t border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-5 mb-2">
              <div>
                <SectionTag>SERIES A-100 · SERVICES</SectionTag>
                <h2 className="font-display uppercase text-4xl md:text-6xl mt-4 tracking-wide">
                  Drawing Index
                </h2>
              </div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-ink/55 hidden md:block pb-2">
                08 SERVICES / FULL-SCOPE PRACTICE
              </p>
            </div>
          </Reveal>

          <div>
            {SERVICES.map((s, i) => (
              <Reveal key={s.code} delay={Math.min(i * 40, 240)}>
                <Link
                  to="/contact"
                  className="group grid grid-cols-12 gap-4 items-center border-b border-line py-5 md:py-6 px-2 md:px-4 transition-colors duration-300 hover:bg-blueprint hover:text-paper"
                >
                  <span className="col-span-3 md:col-span-1 font-mono text-xs font-semibold text-redline">
                    {s.code}
                  </span>
                  <span className="col-span-9 md:col-span-4 font-display text-xl md:text-2xl uppercase tracking-wide">
                    {s.name}
                  </span>
                  <span className="hidden md:block md:col-span-4 text-sm text-ink/65 group-hover:text-paper/75 transition-colors">
                    {s.scope}
                  </span>
                  <span className="hidden md:block md:col-span-2 font-mono text-[10.5px] tracking-wider text-ink/50 group-hover:text-paper/60 transition-colors">
                    {s.out}
                  </span>
                  <span className="hidden md:flex md:col-span-1 justify-end">
                    <IconArrowRight className="w-5 h-5 text-redline transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-8 font-mono text-[11.5px] tracking-wider text-ink/60">
              <span className="text-redline font-semibold">NOTE —</span> every engagement starts
              with a complimentary studio consultation. Bring your plot papers; we'll sketch
              possibilities on the spot.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ SELECTED WORK ============ */}
      <section className="border-t border-ink bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <SectionTag>SHEET A-200 · SELECTED WORK</SectionTag>
                <h2 className="font-display uppercase text-4xl md:text-6xl mt-4 tracking-wide">
                  Built, not just drawn.
                </h2>
              </div>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.18em] border border-ink px-5 py-3.5 hover:bg-ink hover:text-paper transition-colors"
              >
                FULL LEDGER
                <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-5 md:gap-6">
            <WorkCard p={featured[0]} className="md:col-span-7" />
            <WorkCard p={featured[1]} className="md:col-span-5" />
            <WorkCard p={featured[2]} className="md:col-span-5" />
            <Reveal className="md:col-span-7">
              <Link
                to="/projects"
                className="group relative h-full min-h-[280px] border border-ink bg-blueprint bp-grid-dark text-paper p-7 md:p-10 flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <p className="font-mono text-[10px] tracking-[0.24em] text-blueprint-line">
                    FROM THE SAME DRAWING BOARD
                  </p>
                  <h3 className="font-display uppercase text-3xl md:text-5xl leading-[1.02] mt-4 tracking-wide">
                    96-plot layouts
                    <br />
                    <span className="text-outline-paper">to 600 sq.ft shops.</span>
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-paper/70">
                    120+ PROJECTS SINCE {SITE.est}
                  </p>
                  <span className="w-14 h-14 rounded-full border border-paper/50 flex items-center justify-center transition-all duration-300 group-hover:bg-redline group-hover:border-redline group-hover:rotate-45">
                    <IconArrowUpRight className="w-6 h-6" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative bg-blueprint bp-grid-dark text-paper border-y border-ink overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 relative">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionTag>SHEET S-01 · PRACTICE IN NUMBERS</SectionTag>
              <p className="font-mono text-[10px] tracking-[0.22em] text-blueprint-line hidden md:block">
                AS ON JANUARY 2026
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 border-t border-l border-paper/20">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="border-b border-r border-paper/20">
                <div className="p-6 md:p-9 h-full transition-colors duration-300 hover:bg-blueprint-deep group">
                  <CountUp
                    to={s.value}
                    decimals={s.decimals}
                    suffix={s.suffix}
                    className="font-display text-5xl md:text-[4.2rem] leading-none tracking-wide group-hover:text-redline transition-colors duration-300"
                  />
                  <p className="font-mono text-[10.5px] tracking-[0.22em] text-blueprint-line mt-4 uppercase">
                    {s.label}
                  </p>
                  <p className="text-xs text-paper/50 mt-1.5">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <SectionTag>METHOD · PH-01 → PH-06</SectionTag>
                <h2 className="font-display uppercase text-4xl md:text-6xl mt-4 tracking-wide">
                  How a scheme gets built
                </h2>
              </div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-ink/55 hidden md:block pb-2">
                SAME SIX PHASES, EVERY PROJECT
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-12">
            {PROCESS.map((ph, i) => (
              <Reveal key={ph.code} delay={i * 80}>
                <div className="relative border-t-2 border-ink pt-6 group">
                  <span className="absolute -top-[7px] left-0 w-3 h-3 bg-redline transition-transform duration-300 group-hover:scale-125" />
                  <p className="font-mono text-[10.5px] tracking-[0.24em] text-redline font-semibold">
                    {ph.code}
                  </p>
                  <h3 className="font-display text-xl uppercase tracking-wide mt-2.5 leading-tight">
                    {ph.name}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed mt-3">{ph.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BEFORE / AFTER TEASER ============ */}
      <section className="border-t border-ink bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTag>CASE FILES · CS-01 / 2023</SectionTag>
              <h2 className="font-display uppercase text-4xl md:text-5xl mt-4 tracking-wide leading-[1.02]">
                Same walls.
                <br />
                <span className="text-outline-red">New light.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-ink/80 leading-relaxed max-w-md">
                A 1998 row house at Gandhi Chowk, dark after twenty-five years of boxed-up rooms.
                Ten weeks, one partition removed, one steel-framed window — and the whole house
                changed its mind about itself.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-7 space-y-3">
                {[
                  "Daylight reach into the living room up ~40%",
                  "Zero demolition waste — old mosaic topped, not torn",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-ink/75">
                    <span className="w-2 h-2 bg-redline mt-1.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <Link
                to="/case-studies"
                className="group mt-9 inline-flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.18em] text-redline border-b-2 border-redline pb-2 hover:gap-5 transition-all"
              >
                OPEN THE CASE FILES
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={160}>
              <BeforeAfter
                before={IMG.baLivingBefore}
                after={IMG.baLivingAfter}
                altBefore="Joshi residence living room before renovation, 1998 finishes"
                altAfter="Joshi residence living room after renovation, light-filled contemporary interior"
                className="aspect-[14/9] hard-shadow"
              />
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-ink/55 flex justify-between">
                <span>DRAG TO COMPARE — JOSHI RESIDENCE, GANDHI CHOWK</span>
                <span className="hidden sm:block">10 WEEKS · ₹18.2 L</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="border-t border-ink bg-paper relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <SectionTag>CLIENT NOTES · {SITE.reviewCount} GOOGLE REVIEWS</SectionTag>
                <h2 className="font-display uppercase text-4xl md:text-6xl mt-4 tracking-wide">
                  Signed &amp; handed over
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setTIdx((tIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-12 h-12 border border-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                  aria-label="Previous testimonial"
                >
                  <IconArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() => setTIdx((tIdx + 1) % TESTIMONIALS.length)}
                  className="w-12 h-12 border border-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                  aria-label="Next testimonial"
                >
                  <IconArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Reveal>

          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={tIdx}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
              >
                <p className="text-2xl md:text-[2.05rem] leading-snug font-medium text-ink">
                  <span className="text-redline font-display">“</span>
                  {t.text}
                  <span className="text-redline font-display">”</span>
                </p>
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <footer className="mt-4 font-mono text-[11.5px] tracking-[0.16em] text-ink/60">
                  <span className="text-ink font-semibold">{t.name.toUpperCase()}</span> — {t.project.toUpperCase()}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex gap-2.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-[3px] transition-all duration-300 ${
                    i === tIdx ? "w-10 bg-redline" : "w-6 bg-line hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOCAL PRESENCE ============ */}
      <section className="border-t border-ink bp-grid-light">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionTag>LOCAL PRACTICE · YAVATMAL 445001</SectionTag>
              <h2 className="font-display uppercase text-4xl md:text-5xl mt-4 tracking-wide leading-[1.02]">
                From Yavatmal,
                <br />
                across Vidarbha.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-ink/80 leading-relaxed max-w-lg">
                Our studio sits at <strong>Shree Bag Centre in Vidhardh Housing Society</strong>,
                two streets from Gandhi Chowk. Because we're local, site visits happen twice a
                week — not once a month — and our contractors, masons and material suppliers are
                people we've worked with for over a decade.
              </p>
              <p className="mt-4 text-ink/80 leading-relaxed max-w-lg">
                Whether your plot is in Pusad, Pandharkawda, Wardha or Nagpur, the drawing
                process stays the same: site walk, concept at true scale, BOQ in your hand
                before a single brick is ordered.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center justify-between gap-8 w-full max-w-md border border-ink bg-paper p-5 hard-shadow-sm hover:-translate-y-1 transition-transform"
              >
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.24em] text-redline font-semibold">
                    VISIT THE STUDIO
                  </span>
                  <span className="block mt-1.5 text-sm font-semibold">
                    {SITE.addressLines[0]}, {SITE.addressLines[1]}
                  </span>
                </span>
                <IconArrowUpRight className="w-6 h-6 shrink-0 text-redline transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <p className="font-mono text-[10px] tracking-[0.24em] text-ink/55 mb-4">
                DISTRICTS WE BUILD IN —
              </p>
              <div className="flex flex-wrap gap-2.5">
                {AREAS.map((a, i) => (
                  <Reveal key={a} delay={Math.min(i * 40, 360)}>
                    <span className="inline-block border border-ink/30 bg-paper px-3.5 py-2 font-mono text-xs tracking-wider text-ink/80 hover:border-redline hover:text-redline hover:-translate-y-0.5 transition-all cursor-default">
                      {a}
                    </span>
                  </Reveal>
                ))}
              </div>
              <div className="mt-10 border border-ink bg-ink text-paper p-6 md:p-8 relative overflow-hidden">
                <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-blueprint-line">
                    SITE VISIT RADIUS
                  </p>
                  <p className="font-display text-3xl md:text-4xl uppercase tracking-wide mt-3 leading-tight">
                    300 km of Vidarbha,
                    <br />
                    <span className="text-outline-paper">one drawing board.</span>
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 font-mono text-[11px] tracking-wider text-paper/75">
                    <div>
                      <span className="block text-2xl font-display text-paper tracking-wide">8</span>
                      DISTRICTS
                    </div>
                    <div>
                      <span className="block text-2xl font-display text-paper tracking-wide">2×</span>
                      WEEKLY SITE CHECKS
                    </div>
                    <div>
                      <span className="block text-2xl font-display text-paper tracking-wide">24 H</span>
                      QUERY TURNAROUND
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="bg-redline bp-grid-red text-paper border-t border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <Reveal>
            <div>
              <p className="font-mono text-[11px] tracking-[0.26em] text-paper/85">
                NEXT SHEET IN THE SET — YOUR PLOT
              </p>
              <h2 className="font-display uppercase text-5xl md:text-7xl mt-4 tracking-wide leading-[0.98] drop-shadow-[4px_4px_0_rgba(23,27,33,0.35)]">
                Let's draw yours.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-col gap-4 md:items-end">
              <a
                href={SITE.phoneHref}
                className="font-display text-3xl md:text-4xl tracking-wide text-ink hover:text-paper transition-colors"
              >
                {SITE.phoneDisplay}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 font-mono text-sm font-semibold tracking-[0.12em] hover:bg-blueprint transition-colors"
              >
                START WITH A FREE CONSULTATION
                <IconArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
