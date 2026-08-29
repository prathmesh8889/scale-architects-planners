import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AREAS, SERVICES, SITE } from "../data/site";
import {
  IconArrowUpRight,
  IconCross,
  IconPhone,
  IconStar,
  IconWhatsApp,
  Logo,
  Marquee,
} from "./ui";
import { MARQUEE_ITEMS } from "../data/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Work" },
  { to: "/case-studies", label: "Case Files" },
  { to: "/studio", label: "Studio" },
  { to: "/contact", label: "Contact" },
];

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-redline z-[80] transition-[width] duration-150 ease-out"
      style={{ width: `${pct}%` }}
      aria-hidden="true"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[70] bg-paper/95 backdrop-blur-sm border-b border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `group relative font-mono text-[11.5px] font-medium tracking-[0.22em] uppercase transition-colors ${
                    isActive ? "text-redline" : "text-ink hover:text-redline"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    <span
                      className={`absolute -bottom-[7px] left-0 h-[2px] bg-redline transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="hidden lg:inline-flex items-center gap-2 border border-ink px-3.5 py-2.5 font-mono text-xs font-medium tracking-wider hover:bg-ink hover:text-paper transition-colors"
            >
              <IconPhone className="w-3.5 h-3.5" />
              {SITE.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-redline text-paper px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.14em] hard-shadow-sm hover:-translate-y-0.5 hover:translate-x-0 transition-transform"
            >
              BOOK CONSULT
              <IconArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[7px]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-7 h-[2px] bg-ink" />
            <span className="block w-5 h-[2px] bg-ink self-end mr-[6px]" />
            <span className="block w-7 h-[2px] bg-ink" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[95] bg-blueprint-deep bp-grid-dark text-paper flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-paper/15">
              <Logo dark />
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Close menu"
              >
                <IconCross className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.4 }}
                >
                  <NavLink
                    to={n.to}
                    end={n.to === "/"}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-2.5 border-b border-paper/10 group ${
                        isActive ? "text-redline" : "text-paper hover:text-redline"
                      }`
                    }
                  >
                    <span className="font-mono text-xs text-blueprint-line">0{i + 1}</span>
                    <span className="font-display text-4xl tracking-[0.02em] uppercase">
                      {n.label}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="px-8 pb-10 pt-6 space-y-3">
              <a href={SITE.phoneHref} className="flex items-center gap-3 font-mono text-sm text-paper">
                <IconPhone className="w-4 h-4 text-redline" /> {SITE.phoneDisplay}
              </a>
              <p className="font-mono text-[11px] text-blueprint-line tracking-wider">
                SHREE BAG CENTRE · VIDHARDH HOUSING SOCIETY · YAVATMAL
              </p>
              <div className="flex items-center gap-1.5">
                <IconStar className="w-4 h-4" />
                <span className="font-mono text-[11px] tracking-wider text-paper/90">
                  {SITE.rating} RATED · {SITE.reviewCount} GOOGLE REVIEWS
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative bg-blueprint-deep bp-grid-dark text-paper overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 font-display text-[27vw] md:text-[19vw] leading-none text-outline-paper opacity-[0.07] whitespace-nowrap select-none"
      >
        SCALE
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 space-y-5">
            <Logo dark />
            <p className="text-sm leading-relaxed text-paper/70 max-w-xs">
              A COA-registered architecture, interiors and town-planning practice working from
              Yavatmal across all of Vidarbha since {SITE.est}.
            </p>
            <div className="inline-flex items-center gap-2 border border-paper/25 px-3 py-2">
              <IconStar className="w-4 h-4" />
              <span className="font-mono text-xs tracking-wider">
                {SITE.rating} · {SITE.reviewCount} GOOGLE REVIEWS
              </span>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 bg-redline text-paper px-4 py-2.5 font-mono text-xs font-semibold tracking-wider hover:bg-redline-deep transition-colors"
              >
                <IconPhone className="w-3.5 h-3.5" /> CALL THE STUDIO
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-paper/40 px-4 py-2.5 font-mono text-xs font-semibold tracking-wider hover:bg-paper hover:text-blueprint-deep transition-colors"
              >
                <IconWhatsApp className="w-4 h-4" /> WHATSAPP
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] tracking-[0.26em] text-blueprint-line mb-5">
              EXPLORE
            </h3>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-sm text-paper/80 hover:text-redline transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-[2px] bg-redline opacity-0 group-hover:opacity-100 transition-opacity" />
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-paper/80 hover:text-redline transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-2 h-[2px] bg-redline opacity-0 group-hover:opacity-100 transition-opacity" />
                  Google Reviews
                  <IconArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] tracking-[0.26em] text-blueprint-line mb-5">
              SERVICES
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.code} className="flex items-baseline gap-2.5 text-sm text-paper/80">
                  <span className="font-mono text-[10px] text-redline">{s.code}</span>
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] tracking-[0.26em] text-blueprint-line mb-5">
              STUDIO
            </h3>
            <address className="not-italic text-sm text-paper/80 leading-relaxed">
              {SITE.addressLines[0]}
              <br />
              {SITE.addressLines[1]}
            </address>
            <p className="font-mono text-[11px] tracking-wider text-paper/50 mt-2">
              PLUS CODE · {SITE.plusCode}
            </p>
            <ul className="mt-5 space-y-1.5">
              {SITE.hours.map((h) => (
                <li key={h.d} className="flex justify-between gap-4 text-[13px] text-paper/70">
                  <span className="font-mono text-[11px] tracking-wider">{h.d}</span>
                  <span>{h.h}</span>
                </li>
              ))}
            </ul>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-5 font-mono text-xs tracking-wider text-redline hover:text-paper transition-colors"
            >
              GET DIRECTIONS <IconArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-paper/15">
          <p className="font-mono text-[10px] tracking-[0.24em] text-blueprint-line mb-4">
            SERVING VIDARBHA —
          </p>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <span
                key={a}
                className="border border-paper/20 px-3 py-1.5 font-mono text-[11px] tracking-wider text-paper/75 hover:border-redline hover:text-paper transition-colors cursor-default"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-paper/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-wider text-paper/55">
            © 2026 {SITE.name.toUpperCase()} · COA-REGISTERED PRACTICE · YAVATMAL, MAHARASHTRA
          </p>
          <div className="flex items-center gap-6">
            <a
              href={SITE.website}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] tracking-wider text-paper/55 hover:text-redline transition-colors"
            >
              OFFICIAL PROFILE
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-[11px] tracking-wider text-paper/55 hover:text-redline transition-colors flex items-center gap-2"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />
      <main key={location.pathname} className="flex-1 pt-16 md:pt-[72px]">
        {children}
      </main>
      <Marquee
        items={MARQUEE_ITEMS}
        className="bg-redline text-paper border-y border-ink"
        speed={26}
      />
      <Footer />
      <a
        href={SITE.phoneHref}
        aria-label={`Call ${SITE.name} at ${SITE.phoneDisplay}`}
        className="fab-ring fixed bottom-6 right-6 z-[75] w-14 h-14 rounded-full bg-redline text-paper flex items-center justify-center border-2 border-paper shadow-[4px_4px_0_0_rgba(23,27,33,0.9)] hover:scale-105 transition-transform"
      >
        <IconPhone className="w-6 h-6" />
      </a>
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
