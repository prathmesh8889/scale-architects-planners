import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import BeforeAfter from "../components/BeforeAfter";
import {
  Dimension,
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  Reveal,
  SectionTag,
} from "../components/ui";
import { CASE_STUDIES, SITE } from "../data/site";

const d = (s: string) => ({ "--d": s }) as CSSProperties;

export default function CaseStudies() {
  return (
    <div>
      {/* header */}
      <section className="bp-grid-light border-b border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 md:pt-20 pb-12 md:pb-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.22em] text-ink/70">
              <span className="bg-ink text-paper px-2.5 py-1.5">FILE CS-100</span>
              <span>RENOVATION RECORDS</span>
              <span className="text-redline font-semibold">OPEN FILES · 02</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 font-display uppercase text-ink leading-[0.94]">
              <span className="mask-line text-[clamp(2.8rem,9vw,7rem)]">
                <span style={d("0.1s")}>CASE FILES:</span>
              </span>
              <span className="mask-line text-[clamp(2.8rem,9vw,7rem)]">
                <span className="text-outline-ink" style={d("0.24s")}>BEFORE / AFTER</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-ink/80 leading-relaxed">
              New buildings get the photographs, but old buildings get the craft. Two recent
              transformations, documented with the slider — drag the red line and see exactly
              what changed, what it cost, and how long the family lived through it.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <Dimension label="DRAG THE LINE ON EACH PHOTO" className="mt-8 max-w-sm text-ink/50" />
          </Reveal>
        </div>
      </section>

      {/* case studies */}
      {CASE_STUDIES.map((cs, idx) => (
        <section
          key={cs.id}
          className={`border-b border-ink ${idx % 2 === 0 ? "bg-paper" : "bg-paper-2"}`}
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-12">
            {/* narrative */}
            <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <Reveal>
                <SectionTag>{cs.code}</SectionTag>
                <h2 className="font-display uppercase text-3xl md:text-[2.6rem] leading-[1.02] tracking-wide mt-4">
                  {cs.title}
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <dl className="mt-8 border-t border-ink/25">
                  {[
                    ["CLIENT", cs.client],
                    ["LOCATION", cs.location],
                    ["YEAR", cs.year],
                    ["DURATION", cs.duration],
                    ["BUDGET", cs.budget],
                    ["AREA", cs.area],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-6 py-3 border-b border-dashed border-ink/25"
                    >
                      <dt className="font-mono text-[10px] tracking-[0.24em] text-ink/50">{k}</dt>
                      <dd className="text-sm font-semibold text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-8">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-redline font-semibold">
                    CH — THE PROBLEM
                  </p>
                  <p className="mt-2.5 text-sm md:text-[15px] text-ink/80 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-redline font-semibold">
                    SL — THE FIX
                  </p>
                  <p className="mt-2.5 text-sm md:text-[15px] text-ink/80 leading-relaxed">
                    {cs.solution}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* slider + results */}
            <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              <Reveal delay={140}>
                <BeforeAfter
                  before={cs.before}
                  after={cs.after}
                  altBefore={`${cs.title} — before renovation`}
                  altAfter={`${cs.title} — after renovation by SCALE Architects Yavatmal`}
                  className="aspect-[14/9] hard-shadow"
                  initial={idx % 2 === 0 ? 55 : 45}
                />
                <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-ink/55">
                  {cs.location.toUpperCase()} · DRAG TO COMPARE · SAME CAMERA ANGLE
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-9 border border-ink bg-paper p-6 md:p-7">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-ink/50 mb-4">
                    MEASURED OUTCOMES —
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
                    {cs.results.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-sm text-ink/80 leading-snug">
                        <span className="w-5 h-5 shrink-0 border border-redline text-redline flex items-center justify-center mt-0.5">
                          <IconCheck className="w-3 h-3" />
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={280}>
                <blockquote className="mt-8 border-l-4 border-redline pl-5">
                  <p className="text-lg md:text-xl font-medium leading-snug text-ink">
                    “{cs.quote}”
                  </p>
                  <footer className="mt-3 font-mono text-[11px] tracking-[0.16em] text-ink/55">
                    — {cs.quoteBy.toUpperCase()}
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* renovation ledger stats */}
      <section className="bg-blueprint bp-grid-dark text-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionTag>RENOVATION LEDGER · SINCE 2017</SectionTag>
              <p className="font-mono text-[10px] tracking-[0.22em] text-blueprint-line hidden md:block">
                FAMILIES STAYED IN RESIDENCE IN 9 OF 10 JOBS
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-paper/20 border border-paper/20 mt-10">
            {[
              ["26", "renovations delivered"],
              ["8 wks", "average job duration"],
              ["2.1×", "average value uplift"],
              ["0", "jobs over budget by >5%"],
            ].map(([v, l], i) => (
              <Reveal key={l} delay={i * 80} className="bg-blueprint">
                <div className="p-6 md:p-8 hover:bg-blueprint-deep transition-colors h-full">
                  <p className="font-display text-4xl md:text-5xl tracking-wide">{v}</p>
                  <p className="font-mono text-[10.5px] tracking-[0.2em] text-blueprint-line mt-3 uppercase">
                    {l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-redline bp-grid-red text-paper border-t border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <Reveal>
            <div>
              <p className="font-mono text-[11px] tracking-[0.26em] text-paper/85">
                GOT A TIRED HOUSE?
              </p>
              <h2 className="font-display uppercase text-4xl md:text-6xl mt-3 tracking-wide leading-[0.98] drop-shadow-[4px_4px_0_rgba(23,27,33,0.35)]">
                We'll file the next case.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-4 md:items-end shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 font-mono text-sm font-semibold tracking-[0.12em] hover:bg-blueprint transition-colors"
              >
                BOOK A SITE VISIT
                <IconArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 font-mono text-sm tracking-wider text-ink hover:text-paper transition-colors"
              >
                OR CALL {SITE.phoneDisplay}
                <IconArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
