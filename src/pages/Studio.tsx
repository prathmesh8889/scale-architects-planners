import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  Dimension,
  IconArrowUpRight,
  IconBrick,
  IconSection,
  IconStar,
  IconSun,
  Reveal,
  Seal,
  SectionTag,
  SheetCorners,
} from "../components/ui";
import { IMG, PRINCIPLES, RECOGNITION, SITE, TEAM, TIMELINE } from "../data/site";

const d = (s: string) => ({ "--d": s }) as CSSProperties;

const PRINCIPLE_ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  section: IconSection,
  sun: IconSun,
  brick: IconBrick,
};

export default function Studio() {
  return (
    <div>
      {/* header */}
      <section className="bp-grid-light border-b border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 md:pt-20 pb-12 md:pb-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.22em] text-ink/70">
              <span className="bg-ink text-paper px-2.5 py-1.5">DOSSIER S-100</span>
              <span>THE PRACTICE</span>
              <span className="text-redline font-semibold">EST. {SITE.est} · YAVATMAL</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 font-display uppercase text-ink leading-[0.94]">
              <span className="mask-line text-[clamp(2.9rem,9vw,7.2rem)]">
                <span style={d("0.1s")}>THE PEOPLE</span>
              </span>
              <span className="mask-line text-[clamp(2.9rem,9vw,7.2rem)]">
                <span className="text-outline-ink" style={d("0.24s")}>BEHIND THE PLANS</span>
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* story */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionTag>ORIGIN · 2011</SectionTag>
              <h2 className="font-display uppercase text-3xl md:text-5xl mt-4 tracking-wide leading-[1.02]">
                A rented room,
                <br />a borrowed drafting table.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-7 space-y-5 text-ink/80 leading-relaxed max-w-xl">
                <p>
                  SCALE began in {SITE.est} with one architect, one room near Gandhi Chowk, and a
                  simple conviction: a family in Yavatmal deserves the same rigour of drawing as
                  a project in Mumbai. The name is literal — every decision here is checked
                  against a scale rule, a BOQ line, or the site itself.
                </p>
                <p>
                  Fourteen years later the practice runs three wings — architecture, interiors
                  and town planning — from Shree Bag Centre in Vidhardh Housing Society. The
                  drafting table is bigger; the conviction hasn't moved.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <blockquote className="mt-9 border-l-4 border-redline pl-6 max-w-xl">
                <p className="font-display text-2xl md:text-3xl uppercase tracking-wide leading-tight">
                  “If the client can't read the plan, the plan isn't finished.”
                </p>
                <footer className="mt-3 font-mono text-[11px] tracking-[0.18em] text-ink/55">
                  — AR. SAMEER KOLTE, FOUNDING PRINCIPAL
                </footer>
              </blockquote>
            </Reveal>
          </div>
          <div className="lg:col-span-6 relative">
            <Reveal delay={150}>
              <div className="relative">
                <Dimension label="STUDIO FLOOR · SHREE BAG CENTRE" className="text-ink/45 mb-3" />
                <div className="relative border border-ink bg-ink">
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={IMG.office}
                      alt="SCALE Architects studio interior at Shree Bag Centre, Yavatmal — drafting table and material wall"
                      className="kenburns w-full h-full object-cover"
                    />
                  </div>
                  <SheetCorners className="text-paper/80" />
                  <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.2em] bg-paper text-ink px-2.5 py-1.5">
                    FIG. S-01
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-ink/60">
                  <span>THE DRAFTING ROOM, VIDHARDH HOUSING SOCIETY</span>
                  <span>1:50</span>
                </div>
              </div>
              <Seal className="absolute -bottom-8 -right-4 w-24 h-24 drop-shadow-md hidden sm:block" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* principles */}
      <section className="border-t border-ink bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
              <div>
                <SectionTag>S-101 · WORKING PRINCIPLES</SectionTag>
                <h2 className="font-display uppercase text-3xl md:text-5xl mt-4 tracking-wide">
                  Three rules we don't bend
                </h2>
              </div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-ink/55 hidden md:block pb-2">
                PINNED ABOVE EVERY DESK
              </p>
            </div>
          </Reveal>
          <div>
            {PRINCIPLES.map((pr, i) => {
              const Icon = PRINCIPLE_ICONS[pr.icon];
              return (
                <Reveal key={pr.title} delay={i * 90}>
                  <div
                    className={`group grid md:grid-cols-12 gap-5 items-start border-b border-line py-8 md:py-10 ${
                      i === 1 ? "md:pl-16" : i === 2 ? "md:pl-32" : ""
                    }`}
                  >
                    <div className="md:col-span-1">
                      <span className="w-14 h-14 border border-ink flex items-center justify-center text-ink transition-colors duration-300 group-hover:bg-redline group-hover:border-redline group-hover:text-paper">
                        <Icon className="w-7 h-7" />
                      </span>
                    </div>
                    <h3 className="md:col-span-4 font-display text-2xl md:text-3xl uppercase tracking-wide leading-tight">
                      {pr.title}
                    </h3>
                    <p className="md:col-span-7 text-ink/75 leading-relaxed md:pr-10">{pr.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="border-t border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <SectionTag>S-102 · THE TEAM</SectionTag>
                <h2 className="font-display uppercase text-3xl md:text-5xl mt-4 tracking-wide">
                  Three desks, one drawing board
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 100}>
                <div className="group h-full border border-ink bg-paper p-7 transition-all duration-300 hover:shadow-[7px_7px_0_0_var(--color-ink)] hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="w-16 h-16 rounded-full bg-blueprint bp-grid-dark text-paper flex items-center justify-center font-display text-xl tracking-wider border border-ink">
                      {m.initials}
                    </span>
                    <span className="font-mono text-[9.5px] tracking-[0.2em] text-ink/45">
                      {m.reg}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-wide mt-6">{m.name}</h3>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-redline mt-2">
                    {m.role.toUpperCase()}
                  </p>
                  <p className="text-sm text-ink/75 leading-relaxed mt-4">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline + recognition */}
      <section className="border-t border-ink bg-blueprint bp-grid-dark text-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionTag>S-103 · PRACTICE TIMELINE</SectionTag>
              <h2 className="font-display uppercase text-3xl md:text-5xl mt-4 tracking-wide">
                Fourteen years, sheet by sheet
              </h2>
            </Reveal>
            <div className="mt-10 relative border-l border-paper/25 pl-8 space-y-9">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 80}>
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1.5 w-3 h-3 bg-redline" />
                    <p className="font-display text-3xl tracking-wide text-paper">{t.year}</p>
                    <p className="text-sm text-paper/70 leading-relaxed mt-2 max-w-md">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <SectionTag>S-104 · RECOGNITION</SectionTag>
              <h2 className="font-display uppercase text-3xl md:text-4xl mt-4 tracking-wide">
                Noted, filed, moved on
              </h2>
            </Reveal>
            <div className="mt-8 border-t border-paper/25">
              {RECOGNITION.map((r, i) => (
                <Reveal key={r.title} delay={i * 70}>
                  <div className="py-5 border-b border-dashed border-paper/25 flex items-baseline gap-5">
                    <span className="font-display text-xl text-redline shrink-0 w-14">{r.year}</span>
                    <div>
                      <p className="text-sm font-semibold leading-snug">{r.title}</p>
                      <p className="font-mono text-[10.5px] tracking-[0.16em] text-blueprint-line mt-1.5">
                        {r.by.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={240}>
              <div className="mt-9 inline-flex items-center gap-3 border border-paper/30 px-4 py-3">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4" />
                  ))}
                </span>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] tracking-wider hover:text-redline transition-colors inline-flex items-center gap-2"
                >
                  {SITE.rating} · {SITE.reviewCount} GOOGLE REVIEWS
                  <IconArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <Reveal>
            <div>
              <SectionTag>NEXT STEP</SectionTag>
              <h2 className="font-display uppercase text-4xl md:text-6xl mt-4 tracking-wide leading-[0.98]">
                Come sit at <span className="text-outline-red">the table.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-redline text-paper px-7 py-4 font-mono text-sm font-semibold tracking-[0.12em] hard-shadow hover:-translate-y-1 transition-transform shrink-0"
            >
              BOOK A STUDIO VISIT
              <IconArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
