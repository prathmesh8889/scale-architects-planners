import { useState } from "react";
import { SheetCorners } from "./ui";

export default function BeforeAfter({
  before,
  after,
  altBefore,
  altAfter,
  className = "",
  initial = 52,
}: {
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
  className?: string;
  initial?: number;
}) {
  const [pos, setPos] = useState(initial);

  return (
    <div
      className={`relative overflow-hidden border border-ink bg-ink select-none text-ink ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* BEFORE (base layer) */}
      <img src={before} alt={altBefore} className="block w-full h-full object-cover" draggable={false} />
      {/* AFTER (clipped top layer) */}
      <img
        src={after}
        alt={altAfter}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        draggable={false}
      />

      {/* divider */}
      <div
        className="absolute inset-y-0 w-[2px] bg-paper shadow-[0_0_0_1px_rgba(23,27,33,0.35)] pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink text-paper border-2 border-paper flex items-center justify-center gap-[3px]">
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-6 7 6 7" />
          </svg>
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l6 7-6 7" />
          </svg>
        </div>
      </div>

      {/* labels */}
      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.24em] bg-ink/85 text-paper px-2.5 py-1.5 pointer-events-none">
        BEFORE
      </span>
      <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.24em] bg-redline text-paper px-2.5 py-1.5 pointer-events-none">
        AFTER
      </span>

      {/* invisible range input = drag + keyboard control */}
      <input
        type="range"
        min={2}
        max={98}
        step={0.2}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after — slider at ${Math.round(pos)} percent`}
        className="ba-range absolute inset-0 opacity-0"
      />

      <SheetCorners className="text-paper/70" />
    </div>
  );
}
