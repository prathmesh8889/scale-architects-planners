import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  hooks                                                              */
/* ------------------------------------------------------------------ */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/*  Reveal — scroll-triggered .is-in                                   */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(
    as,
    {
      ref,
      className: `reveal ${className}`,
      style: { "--d": `${delay}ms` } as CSSProperties,
    },
    children
  );
}

/* ------------------------------------------------------------------ */
/*  CountUp                                                            */
/* ------------------------------------------------------------------ */

export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  duration = 1700,
  className = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setVal(to);
          return;
        }
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                            */
/* ------------------------------------------------------------------ */

export function Marquee({
  items,
  className = "",
  speed = 30,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ "--speed": `${speed}s` } as CSSProperties}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center shrink-0">
            {items.map((it, i) => (
              <span key={i} className="flex items-center gap-7 pr-7 py-3.5">
                <span className="font-display text-lg md:text-xl tracking-[0.04em] uppercase">
                  {it}
                </span>
                <IconCross className="w-3.5 h-3.5 text-redline shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dimension line — drafting annotation                               */
/* ------------------------------------------------------------------ */

export function Dimension({
  label,
  className = "",
  labelBg = "bg-paper",
}: {
  label: string;
  className?: string;
  labelBg?: string;
}) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden="true">
      <span className="w-px h-3.5 bg-current" />
      <span className="flex-1 h-px bg-current relative">
        <span
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 font-mono text-[10px] tracking-[0.22em] whitespace-nowrap ${labelBg}`}
        >
          {label}
        </span>
      </span>
      <span className="w-px h-3.5 bg-current" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section tag + sheet corners                                        */
/* ------------------------------------------------------------------ */

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.26em] text-redline uppercase">
      <IconCross className="w-3 h-3" />
      {children}
    </div>
  );
}

export function SheetCorners({ className = "" }: { className?: string }) {
  const c = "absolute w-4 h-4 pointer-events-none " + className;
  return (
    <>
      <span aria-hidden className={`${c} top-0 left-0 border-t border-l border-current`} />
      <span aria-hidden className={`${c} top-0 right-0 border-t border-r border-current`} />
      <span aria-hidden className={`${c} bottom-0 left-0 border-b border-l border-current`} />
      <span aria-hidden className={`${c} bottom-0 right-0 border-b border-r border-current`} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Rotating seal                                                      */
/* ------------------------------------------------------------------ */

export function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="58" fill="#E0392C" />
      <g className="seal-spin" style={{ transformOrigin: "60px 60px" }}>
        <circle
          cx="60"
          cy="60"
          r="37"
          fill="none"
          stroke="#F1F2EE"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <defs>
          <path
            id="sealPath"
            d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"
            fill="none"
          />
        </defs>
        <text
          fill="#F1F2EE"
          fontSize="9"
          letterSpacing="2.4"
          fontFamily="var(--font-mono)"
          fontWeight="600"
        >
          <textPath href="#sealPath">SCALE ARCHITECTS · YAVATMAL · EST. 2011 ·</textPath>
        </text>
      </g>
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="25"
        fill="#F1F2EE"
      >
        S/P
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label="SCALE Architects and Planners — home">
      <svg
        viewBox="0 0 40 40"
        className={`w-9 h-9 transition-transform duration-300 group-hover:-rotate-3 ${
          dark ? "text-paper" : "text-ink"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      >
        <path d="M7 33V11l26 22H7z" strokeLinejoin="round" />
        <path d="M12 33v-4M17 33v-4M22 33v-4M27 33v-4" strokeWidth="1.6" />
        <rect x="29" y="6" width="7" height="7" fill="#E0392C" stroke="none" />
      </svg>
      <span className="block leading-none">
        <span className={`block font-display text-[22px] tracking-[0.02em] ${dark ? "text-paper" : "text-ink"}`}>
          SCALE
        </span>
        <span
          className={`block font-mono text-[8.5px] tracking-[0.28em] mt-1 ${
            dark ? "text-blueprint-line" : "text-ink/60"
          }`}
        >
          ARCHITECTS &amp; PLANNERS
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom inline icons                                                */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

export const IconCross = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const IconStar = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="#D99A3D" aria-hidden="true">
    <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
  </svg>
);

export const IconPhone = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.6 3.2h3.8l1.6 4.4-2.2 1.7a13 13 0 006.9 6.9l1.7-2.2 4.4 1.6v3.8a1.6 1.6 0 01-1.7 1.6C10.6 20.4 3.6 13.4 3 4.9a1.6 1.6 0 011.6-1.7z" />
  </svg>
);

export const IconWhatsApp = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" />
    <path d="M8.7 8.4c0 3.5 3.4 6.9 6.9 6.9l1-1.6-2-1.2-1 .8c-1-.5-2.2-1.7-2.7-2.7l.8-1-1.2-2z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconArrowUpRight = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const IconArrowRight = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 12.6l4.8 4.8L19.5 6.8" />
  </svg>
);

export const IconCompass = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="4.5" r="2" />
    <path d="M12 6.5l-6.5 13.5M12 6.5l6.5 13.5M7.4 16.4a9.4 9.4 0 009.2 0" />
  </svg>
);

export const IconSection = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="6.5" width="14" height="11" />
    <path d="M5 14.5l4-4M9.5 17.5l8-8M15.5 17.5l2-2" strokeWidth="1.2" />
    <path d="M12 1.5v3M10.6 3.2L12 1.5l1.4 1.7M12 19.5v3M10.6 20.8L12 22.5l1.4-1.7" />
  </svg>
);

export const IconSun = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5a7.5 7.5 0 0115 0" />
    <path d="M12 5.5V3M6 8.5L4.3 6.8M18 8.5l1.7-1.7M2 16.5h20M4 20.5l2-2M9.5 20.5l2-2M15 20.5l2-2" />
  </svg>
);

export const IconBrick = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 5.5h18v4.5H3zM3 10h18v4.5H3zM3 14.5h18V19H3z" />
    <path d="M12 5.5V10M7 10v4.5M17 10v4.5M12 14.5V19" />
  </svg>
);

export const IconRuler = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h16V4L4 20z" />
    <path d="M9.5 20L20 9.5" strokeWidth="1.2" />
    <path d="M8 20v-2.5M12 20v-2.5M16 20v-2.5" strokeWidth="1.2" />
  </svg>
);

export const IconPlan = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" />
    <path d="M12 4v16M4 12h16" strokeDasharray="2.5 2.5" strokeWidth="1.2" />
    <path d="M17.5 8.5l1-2 1 2" strokeWidth="1.2" />
  </svg>
);

export const NorthArrow = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 5.5l2.8 9.5L12 12.8l-2.8 2.2z" fill="currentColor" stroke="none" />
  </svg>
);
