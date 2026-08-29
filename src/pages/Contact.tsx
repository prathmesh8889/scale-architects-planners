import { useState, type CSSProperties, type FormEvent } from "react";
import {
  IconArrowUpRight,
  IconCheck,
  IconPhone,
  IconStar,
  IconWhatsApp,
  Reveal,
  SectionTag,
  SheetCorners,
} from "../components/ui";
import { AREAS, FAQS, SERVICES, SITE } from "../data/site";

const d = (s: string) => ({ "--d": s }) as CSSProperties;

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  property: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "Yavatmal",
  service: "",
  property: "",
  budget: "",
  message: "",
};

const inputCls =
  "w-full bg-paper border border-ink/35 px-4 py-3.5 text-sm placeholder:text-ink/35 focus:border-ink focus:outline-none focus:ring-2 focus:ring-redline/60 transition-shadow";

const labelCls = "block font-mono text-[10px] tracking-[0.22em] text-ink/60 mb-2 uppercase";

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [refNo, setRefNo] = useState("");
  const [faqOpen, setFaqOpen] = useState<number>(0);

  const set = (k: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) er.name = "PLEASE ENTER YOUR FULL NAME";
    const digits = form.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) er.phone = "ENTER A VALID 10-DIGIT MOBILE NUMBER";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "EMAIL LOOKS INCOMPLETE";
    if (!form.service) er.service = "PICK THE SERVICE YOU NEED";
    setErrors(er);
    if (Object.keys(er).length > 0) return;
    setStatus("sending");
    window.setTimeout(() => {
      setRefNo(`SC-2026-${String(Math.floor(1000 + Math.random() * 9000))}`);
      setStatus("done");
    }, 900);
  };

  return (
    <div>
      {/* header */}
      <section className="bp-grid-light border-b border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 md:pt-20 pb-12 md:pb-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.22em] text-ink/70">
              <span className="bg-ink text-paper px-2.5 py-1.5">SHEET C-001</span>
              <span>CONSULTATION BOOKING</span>
              <span className="text-redline font-semibold">REPLY WITHIN 1 WORKING DAY</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 font-display uppercase text-ink leading-[0.94]">
              <span className="mask-line text-[clamp(2.7rem,8.5vw,6.8rem)]">
                <span style={d("0.1s")}>BOOK A</span>
              </span>
              <span className="mask-line text-[clamp(2.7rem,8.5vw,6.8rem)]">
                <span className="text-outline-ink" style={d("0.24s")}>CONSULTATION</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-ink/80 leading-relaxed">
              The first studio consultation is complimentary — bring your plot papers, a
              7/12 extract, or just a photo of the site on your phone. We'll sketch
              possibilities at true scale while the chai is still hot.
            </p>
          </Reveal>
        </div>
      </section>

      {/* form + studio info */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20 grid lg:grid-cols-12 gap-10">
          {/* form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative border border-ink bg-paper p-6 md:p-9 hard-shadow">
                <SheetCorners className="text-ink/40" />
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.24em] text-redline font-semibold">
                      ENQUIRY FORM · EQ-01
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide mt-2">
                      Tell us about the plot
                    </h2>
                  </div>
                  <span className="hidden md:block font-mono text-[10px] tracking-[0.18em] text-ink/40 text-right">
                    REV 2026-01
                    <br />
                    NO FEE · NO OBLIGATION
                  </span>
                </div>

                {status === "done" ? (
                  <div className="py-10 text-center">
                    <div className="stamp-in inline-block border-[3px] border-redline text-redline px-8 py-5 font-display text-3xl md:text-4xl uppercase tracking-[0.08em]">
                      Enquiry Logged
                    </div>
                    <p className="mt-8 font-mono text-sm tracking-[0.18em] text-ink/70">
                      REFERENCE — <span className="text-redline font-semibold">{refNo}</span>
                    </p>
                    <p className="mt-4 text-ink/75 max-w-md mx-auto leading-relaxed">
                      Thank you, {form.name.split(" ")[0]}. We'll call{" "}
                      <strong>{form.phone}</strong> within one working day to fix a time.
                      In a hurry?
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-4">
                      <a
                        href={SITE.phoneHref}
                        className="inline-flex items-center gap-2 bg-redline text-paper px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] hard-shadow-sm"
                      >
                        <IconPhone className="w-4 h-4" /> {SITE.phoneDisplay}
                      </a>
                      <button
                        onClick={() => {
                          setForm(EMPTY);
                          setStatus("idle");
                        }}
                        className="border border-ink px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
                      >
                        LOG ANOTHER ENQUIRY
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="f-name" className={labelCls}>Full name *</label>
                        <input
                          id="f-name"
                          className={`${inputCls} ${errors.name ? "border-redline ring-2 ring-redline/40" : ""}`}
                          placeholder="e.g. Ramesh Rathod"
                          value={form.name}
                          onChange={set("name")}
                        />
                        {errors.name && <p className="mt-1.5 font-mono text-[10px] tracking-wider text-redline">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="f-phone" className={labelCls}>Mobile number *</label>
                        <input
                          id="f-phone"
                          inputMode="tel"
                          className={`${inputCls} ${errors.phone ? "border-redline ring-2 ring-redline/40" : ""}`}
                          placeholder="10-digit mobile"
                          value={form.phone}
                          onChange={set("phone")}
                        />
                        {errors.phone && <p className="mt-1.5 font-mono text-[10px] tracking-wider text-redline">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="f-email" className={labelCls}>Email (optional)</label>
                        <input
                          id="f-email"
                          type="email"
                          className={`${inputCls} ${errors.email ? "border-redline ring-2 ring-redline/40" : ""}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={set("email")}
                        />
                        {errors.email && <p className="mt-1.5 font-mono text-[10px] tracking-wider text-redline">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="f-city" className={labelCls}>Town / village of plot</label>
                        <input
                          id="f-city"
                          className={inputCls}
                          placeholder="e.g. Pusad, Yavatmal"
                          value={form.city}
                          onChange={set("city")}
                        />
                      </div>
                      <div>
                        <label htmlFor="f-service" className={labelCls}>Service needed *</label>
                        <select
                          id="f-service"
                          className={`${inputCls} ${errors.service ? "border-redline ring-2 ring-redline/40" : ""} ${form.service ? "" : "text-ink/35"}`}
                          value={form.service}
                          onChange={set("service")}
                        >
                          <option value="">— select a service —</option>
                          {SERVICES.map((s) => (
                            <option key={s.code} value={s.name}>
                              {s.code} · {s.name}
                            </option>
                          ))}
                        </select>
                        {errors.service && <p className="mt-1.5 font-mono text-[10px] tracking-wider text-redline">{errors.service}</p>}
                      </div>
                      <div>
                        <label htmlFor="f-property" className={labelCls}>Property type</label>
                        <select
                          id="f-property"
                          className={`${inputCls} ${form.property ? "" : "text-ink/35"}`}
                          value={form.property}
                          onChange={set("property")}
                        >
                          <option value="">— select —</option>
                          {["Plot (vacant)", "Existing house — renovation", "Flat / apartment", "Commercial building", "NA layout / land", "Other"].map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelCls}>Approximate budget</label>
                        <div className="flex flex-wrap gap-2.5">
                          {["Under ₹15 L", "₹15–30 L", "₹30–60 L", "₹60 L – 1 Cr", "Above ₹1 Cr", "Not sure yet"].map((b) => (
                            <button
                              type="button"
                              key={b}
                              onClick={() => setForm((f) => ({ ...f, budget: b }))}
                              className={`px-4 py-2.5 font-mono text-xs tracking-wider border transition-all duration-200 ${
                                form.budget === b
                                  ? "bg-ink text-paper border-ink"
                                  : "border-ink/35 text-ink/70 hover:border-ink hover:-translate-y-0.5"
                              }`}
                              aria-pressed={form.budget === b}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="f-msg" className={labelCls}>About the project</label>
                        <textarea
                          id="f-msg"
                          rows={4}
                          className={inputCls}
                          placeholder="Plot size, number of bedrooms, timeline, anything on your mind…"
                          value={form.message}
                          onChange={set("message")}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
                      <p className="font-mono text-[10px] tracking-[0.16em] text-ink/50 max-w-xs">
                        WE CALL BACK — NO SPAM, NO FORWARDING YOUR NUMBER.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center justify-center gap-3 bg-redline text-paper px-8 py-4 font-mono text-sm font-semibold tracking-[0.14em] hard-shadow hover:-translate-y-1 transition-transform disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
                            FILING…
                          </>
                        ) : (
                          <>
                            SEND ENQUIRY
                            <IconArrowUpRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* studio card */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={120}>
              <div className="border border-ink bg-ink text-paper p-7 relative overflow-hidden">
                <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-blueprint-line">
                    VISIT — THE STUDIO
                  </p>
                  <address className="not-italic mt-3">
                    <p className="font-display text-2xl uppercase tracking-wide leading-tight">
                      Shree Bag Centre
                    </p>
                    <p className="text-sm text-paper/80 mt-2 leading-relaxed">
                      {SITE.addressLines[0]}
                      <br />
                      {SITE.addressLines[1]}
                    </p>
                  </address>
                  <p className="font-mono text-[10.5px] tracking-[0.18em] text-paper/50 mt-4">
                    PLUS CODE · {SITE.plusCode}
                  </p>
                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.16em] text-redline hover:text-paper transition-colors"
                  >
                    OPEN IN GOOGLE MAPS <IconArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="border border-ink bg-paper p-7">
                <p className="font-mono text-[10px] tracking-[0.24em] text-redline font-semibold">
                  CALL / MESSAGE
                </p>
                <a href={SITE.phoneHref} className="block font-display text-3xl tracking-wide mt-3 hover:text-redline transition-colors">
                  {SITE.phoneDisplay}
                </a>
                <div className="flex flex-wrap gap-3 mt-5">
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
                  >
                    <IconPhone className="w-3.5 h-3.5" /> CALL
                  </a>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
                  >
                    <IconWhatsApp className="w-4 h-4" /> WHATSAPP
                  </a>
                </div>
                <ul className="mt-6 border-t border-dashed border-ink/30 pt-4 space-y-2">
                  {SITE.hours.map((h) => (
                    <li key={h.d} className="flex justify-between gap-4 text-[13px]">
                      <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink/55">{h.d}</span>
                      <span className="font-medium">{h.h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 border border-ink bg-paper p-5 group hard-shadow-sm hover:-translate-y-1 transition-transform"
              >
                <span>
                  <span className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="w-4 h-4" />
                    ))}
                  </span>
                  <span className="block mt-2 text-sm">
                    <strong className="font-display text-xl tracking-wide">{SITE.rating}</strong>
                    <span className="text-ink/65"> from {SITE.reviewCount} Google reviews</span>
                  </span>
                </span>
                <span className="w-11 h-11 border border-ink/25 flex items-center justify-center shrink-0 transition-colors group-hover:bg-redline group-hover:text-paper group-hover:border-redline">
                  <IconArrowUpRight className="w-5 h-5" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* map */}
      <section className="bg-paper border-t border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-18">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <SectionTag>LOCATION · 94QJ+X7</SectionTag>
                <h2 className="font-display uppercase text-3xl md:text-4xl mt-3 tracking-wide">
                  Find the studio
                </h2>
              </div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-ink/55">
                2 MIN FROM GANDHI CHOWK · PARKING ON SOCIETY ROAD
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative border border-ink hard-shadow-sm">
              <iframe
                title="SCALE Architects and Planners on Google Maps — Shree Bag Centre, Vidhardh Housing Society, Yavatmal"
                src={SITE.mapEmbed}
                className="w-full h-[380px] md:h-[440px] block grayscale-[35%] contrast-[1.05]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.22em] bg-ink text-paper px-2.5 py-1.5 pointer-events-none">
                VIDHARDH HOUSING SOCIETY · YAVATMAL 445001
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ + areas */}
      <section className="border-t border-ink bp-grid-light">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionTag>FAQ · BEFORE YOU ASK</SectionTag>
              <h2 className="font-display uppercase text-3xl md:text-5xl mt-4 tracking-wide">
                Good questions, straight answers
              </h2>
            </Reveal>
            <div className="mt-9 border-t border-ink">
              {FAQS.map((f, i) => {
                const open = faqOpen === i;
                return (
                  <Reveal key={f.q} delay={i * 40}>
                    <div className="border-b border-ink/25">
                      <button
                        onClick={() => setFaqOpen(open ? -1 : i)}
                        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                        aria-expanded={open}
                      >
                        <span className={`text-[15px] md:text-base font-semibold leading-snug transition-colors ${open ? "text-redline" : "group-hover:text-redline"}`}>
                          <span className="font-mono text-[10px] tracking-[0.2em] text-ink/40 mr-3">Q{i + 1}</span>
                          {f.q}
                        </span>
                        <span className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-redline border-redline text-paper rotate-45" : "border-ink/40"}`}>
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-6 pr-10 text-sm md:text-[15px] text-ink/75 leading-relaxed max-w-2xl">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={140}>
              <div className="border border-ink bg-paper p-7 hard-shadow-sm sticky top-28">
                <SectionTag>WORKING CHECKLIST</SectionTag>
                <h3 className="font-display text-2xl uppercase tracking-wide mt-3">
                  Bring these to your first visit
                </h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "7/12 extract or sale deed of the plot",
                    "Plot dimensions — even a rough tape measure works",
                    "A photo of the site taken from the road",
                    "Family headcount + room wish-list",
                    "An honest budget range (we'll design to it)",
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-3.5 text-sm text-ink/80">
                      <span className="w-6 h-6 shrink-0 bg-ink text-paper font-mono text-[10px] flex items-center justify-center mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-dashed border-ink/30 pt-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-ink/50 mb-3">
                    DISTRICTS WE BUILD IN —
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {AREAS.map((a) => (
                      <span
                        key={a}
                        className="border border-ink/30 px-2.5 py-1 font-mono text-[10.5px] tracking-wider text-ink/70 hover:border-redline hover:text-redline transition-colors cursor-default"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 w-full inline-flex items-center justify-center gap-2.5 bg-ink text-paper px-6 py-4 font-mono text-xs font-semibold tracking-[0.14em] hover:bg-blueprint transition-colors"
                >
                  <IconWhatsApp className="w-4 h-4" /> OR SEND PLOT PHOTOS ON WHATSAPP
                </a>
                <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-wider text-ink/45">
                  <IconCheck className="w-3.5 h-3.5 text-redline" /> TYPICALLY REPLIES WITHIN A FEW HOURS
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
