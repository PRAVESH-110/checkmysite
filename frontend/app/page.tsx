'use client';
import Link from "next/link"
import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { scanRequest, getScanById } from "../config/scan.api"
import { useToast } from "./providers/ToastProvider";
import { motion, useSpring, type Variants } from "framer-motion";
import { WhyUsSection } from "../components/WhyUsSection";
import { ArrowDown } from "lucide-react";
const sections = [
  {
    id: "analysis",
    title: "Deep Analysis",
    body:
      "We scan your website against deterministic UI/UX rules to identify exactly what's killing your conversions.",
  },
  {
    id: "scoring",
    title: "Deterministic Scoring",
    body:
      "Get a concrete, unbiased conversion score. No AI hallucinations—just pure, math-based performance metrics suitable for growth.",
  },
  {
    id: "fix",
    title: "Actionable Fixes",
    body:
      "Don't just know what's wrong. Get a prioritized checklist of code-level fixes to boost your revenue and user engagement immediately.",
  },
];
function HomeClient() {

  //mobile scroller anim
  const [activeId, setActiveId] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [sectionPositions, setSectionPositions] = useState<number[]>([]);

  const dotY = useSpring(0, {
    stiffness: 300,
    damping: 30,
    mass: 0.6,
  });

  useEffect(() => {
    const measure = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();

      const positions = sections.map((s) => {
        const el = sectionRefs.current[s.id];
        if (!el) return 0;

        const rect = el.getBoundingClientRect();
        return rect.top - timelineRect.top + rect.height / 2;
      });
      setSectionPositions(positions);
    };

    const onScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      const timelineRect = timelineRef.current?.getBoundingClientRect();

      let closestIndex = 0;
      let minDistance = Infinity;
      let targetY = 0;

      sections.forEach((s, i) => {
        const el = sectionRefs.current[s.id];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
          if (timelineRect) {
            targetY = rect.top - timelineRect.top + rect.height / 2;
          }
        }
      });

      setActiveId(sections[closestIndex].id);
      dotY.set(targetY - 8);
    };

    measure();
    // remeasure after layout settles
    setTimeout(measure, 100);
    onScroll();

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [dotY]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [scanResult, setScanResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [scanId, setScanId] = useState("");
  const [error, setError] = useState("");

  const { showToast } = useToast();
  const hasNotifiedRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const calculateBreakdown = (result: any) => {
    if (!result || !result.signals) return { cta: 0, mobile: 0, speed: 0, trust: 0 };

    // Handle new nested structure (result.signals.signals) vs legacy (result.signals)
    const signals = result.signals.signals || result.signals;

    // CTA
    let cta = 0;
    if (signals.hasCTA) cta = 95;

    // Mobile
    let mobile = 0;
    if (signals.hasViewportMeta) mobile = 100;

    // Trust
    let trust = 100;
    if (!signals.hasFavicon) trust -= 20;
    if (!signals.hasImages) trust -= 20;
    if (!signals.hasAltText && signals.hasImages) trust -= 10;
    if (!signals.hasTitle) trust -= 10;
    if (!signals.hasMetaDescription) trust -= 20;
    trust = Math.max(0, trust);

    // Speed (Mock for now as backend doesn't fully analyze speed yet)
    const speed = 75;

    return { cta, mobile, speed, trust };
  };

  const breakdown = useMemo(() => calculateBreakdown(scanResult), [scanResult]);

  const heroHeading: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setScanResult(null);
      hasNotifiedRef.current = false;
      const startScan = await scanRequest(inputUrl);
      const id = startScan.scanId;
      setScanId(id);
      router.replace(`/?scanId=${id}`);
      // Polling is handled by useEffect
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Something went wrong");
      console.log("", err);
      showToast(err.message || "Something went wrong", "error");
    }
  }


  function getBarColor(score: number) {
    if (score > 90) return "bg-green-500";
    if (score < 50) return "bg-red-500";
    return "bg-yellow-500";
  }


  // Rehydrate from URL scanId (and cache if available)
  useEffect(() => {
    const urlScanId = searchParams.get("scanId");
    if (urlScanId && urlScanId !== scanId) {
      setScanId(urlScanId);
      const cached = sessionStorage.getItem(`scan:${urlScanId}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setScanResult(parsed);
          setLoading(false);
          hasNotifiedRef.current = true;
          return;
        } catch {
          sessionStorage.removeItem(`scan:${urlScanId}`);
        }
      }
      setLoading(true);
    }
  }, [searchParams, scanId]);

  // Polling Effect
  useEffect(() => {
    if (!scanId) return;

    const intervalId = setInterval(async () => {
      try {
        const result = await getScanById(scanId);

        if (!hasNotifiedRef.current && result.status === "completed") {
          setScanResult(result);
          setLoading(false);
          showToast("Scan completed successfully", "success");
          sessionStorage.setItem(`scan:${scanId}`, JSON.stringify(result));
          hasNotifiedRef.current = true;
          clearInterval(intervalId);
        }

        if (!hasNotifiedRef.current && result.status === "failed") {
          hasNotifiedRef.current = true;
          setError(result.error || "Scan failed");
          setLoading(false);
          clearInterval(intervalId);
        }
      } catch (err) {
        // network errors or 403
        console.log(err);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [scanId]);

  return (
    //use font inter

    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-8 py-16 text-center bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,255,0.05)_0%,transparent_50%)]">
      <style>
        {`
        @keyframes arrow-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        `}
      </style>
      <section className="max-w-[800px] mx-auto mb-16">
        <motion.h3
          variants={heroHeading}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-5xl lg:text-6xl tracking-tighter bg-gradient-to-b from-[var(--foreground)] to-[rgba(var(--foreground),0.9)] bg-clip-text text-transparent dark:from-white dark:to-[#adacac] py-4 font-outfit"
        >
          Stop Losing Customers
        </motion.h3>
        <motion.h3
          variants={heroHeading}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-4xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tighter bg-gradient-to-b from-[var(--foreground)] to-[rgba(var(--foreground),0.9)] bg-clip-text text-transparent dark:from-white dark:to-[#777] font-outfit"
        >
          Get Your Conversion Score today
        </motion.h3>

        <p className="text-xl leading-relaxed text-[var(--foreground)] opacity-70 mb-12 max-w-[800px] mx-auto ">
          Deterministic analysis of your website's conversion blockers thats costing you revenue<br></br>
          No bs ! just fixable insights based on proven UX principles.
        </p>

        <div
          className="flex justify-center m-5"
          style={{ animation: "arrow-float 1s ease-in-out infinite" }}
        >
          <div style={{ transform: "scaleY(1.8)" }}>
            <ArrowDown
              strokeWidth={3}
              className="text-white/85"
              style={{ width: 24, height: 60 }}
              aria-hidden="true"
            />
          </div>
        </div>

        <form
          className="flex gap-4 max-w-[500px] mx-auto w-full mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter your website URL (e.g., https://example.com)"
            className="flex-1  px-6 py-4 rounded-full border border-black/10 bg-white/50 text-base transition-all outline-none focus:border-[#0070f3] focus:ring-4 focus:ring-[#0070f3]/10 focus:bg-white dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:bg-black/50"
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-full border-0 font-semibold text-base transition-all whitespace-nowrap text-white ${loading ? 'bg-gradient-to-br from-[#625f6c] to-[#261e23] cursor-not-allowed opacity-80' : 'bg-gradient-to-br from-[#7051c3] to-[#ff70cc] cursor-pointer hover:bg-[#0051a2] hover:shadow-[0_4px_12px_rgba(0,118,255,0.3)]'}`}
          >
            {loading ? "Scanning..." : "Analyze my site"}
          </button>
        </form>
        {error && <p className="text-red-500 font-medium">{error}</p>}
      </section>

      {/* Conditionally Render Results */}
      {scanResult && (
        <section className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            {/* 1. Score Card */}
            <div className="md:col-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center dark:bg-black/40 dark:border-white/10">
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/10" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#scoreGradient)"
                    strokeWidth="10"
                    fill="transparent"
                    // Calculate strokeDashoffset based on score: 440 - (440 * score / 100)
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * (scanResult.score || 0)) / 100}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7051c3" />
                      <stop offset="100%" stopColor="#ff70cc" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  {/* Dynamic Score */}
                  <span className="text-5xl font-bold bg-gradient-to-br from-[#7051c3] to-[#ff70cc] bg-clip-text text-transparent">
                    {scanResult.score || 0}
                  </span>
                  <span className="text-sm text-[var(--foreground)] opacity-60 uppercase tracking-widest mt-1 dark:text-white/60">Score</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl bg-gradient-to-br from-[#7051c3] to-[#ff70cc] bg-clip-text text-transparent mb-2">Conversion Potential</h3>
                <p className="text-sm text-[var(--foreground)] opacity-70 dark:text-white/60">
                  {/* Dynamic message based on score */}
                  {(scanResult.score || 0) > 80 ? "Your site is doing great!" : "Your site has significant room for improvement."}
                </p>
              </div>
            </div>

            {/* 2. Metrics Breakdown */}
            <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl dark:bg-black/40 dark:border-white/10 flex flex-col justify-center text-left">
              <h3 className="text-xl text-[var(--foreground)] mb-6 text-left dark:text-white">Performance Breakdown</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* Map through calculated breakdown categories */}
                {[
                  { label: 'Constructive Call to Action', score: breakdown.cta },
                  { label: 'Mobile Responsiveness', score: breakdown.mobile },
                  { label: 'Page Load Speed', score: breakdown.speed },
                  { label: 'Trust Signals', score: breakdown.trust },

                ].map((metric, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-sm text-[var(--foreground)] opacity-80 mb-2 dark:text-white/80">
                      <span>{metric.label}</span>
                      <span className="font-mono">{metric.score}/100</span>
                    </div>
                    <div className="h-2 bg-black/10 rounded-full overflow-hidden dark:bg-white/10">
                      <div className={`h-full ${getBarColor(metric.score)} transition-all duration-1000`} style={{ width: `${metric.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <h4 className="mt-7 text-gray-300 text-sm">
                This is a free UI/UX snapshot, not a full deterministic scan.{" "} <br></br>
                <Link
                  href="/pricing"
                  className="font-semibold text-[#e386c2]  decoration-2 hover:text-[#ff70cc] transition-colors"
                >
                  Unlock the complete scan and fixes by upgrading to a paid plan.
                </Link>
              </h4>
            </div>
          </div>

          {/* 3. Actionable Fixes List */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl dark:bg-black/40 dark:border-white/10 text-left">
            <h3 className="text-2xl text-[var(--foreground)] mb-6 dark:text-white">Top Priority Fixes</h3>
            <div className="space-y-4">
              {/* Map through issues strings */}
              {(scanResult.issues || []).map((issue: string, idx: number) => (
                <div key={idx} className="p-4 bg-white/5 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 items-start hover:bg-white/10 transition-colors dark:bg-black/20 dark:border-white/5 dark:hover:bg-black/30">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg text-[var(--foreground)] mb-1 dark:text-white">{issue}</h4>
                    <p className="text-[var(--foreground)] opacity-70 text-sm leading-relaxed dark:text-white/60">
                      Fixing this issue will improve your conversion score.
                    </p>
                  </div>
                  <button className="px-5 py-2 text-xs font-semibold bg-[var(--foreground)] text-[var(--background)] rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap dark:bg-white dark:text-black">
                    Fix This
                  </button>
                </div>
              ))}

              {(!scanResult.issues || scanResult.issues.length === 0) && (
                <div className="p-8 text-center text-[var(--foreground)] opacity-50 italic dark:text-white/50">
                  No critical issues found. Your conversion optimization is on point!
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Good vs Great Website Comparison */}
      <div className="flex flex-col md:flex-row sm:flex-row gap-15  w-full max-w-6xl mx-auto mb-30 px-4 items-stretch">

        {/* Good Website */}
        <div className="flex-1 flex flex-col items-center text-center p-5 bg-gradient-to-b from-red-500/5 to-orange-500/5 border border-red-500/20 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden group hover:border-red-500/50 hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)] transition-all duration-300">
          {/* Glow Effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-gray-100 dark:bg-black/50 aspect-[16/9] mb-4 group-hover:scale-[1.02] transition-transform duration-500">
            <img src="/good.png" alt="Standard Website Example" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 pointer-events-none"></div>
          </div>

          <h3 className="text-2xl font-bold bg-gradient-to-l from-red-500 to-orange-500 bg-clip-text text-transparent mb-2 relative z-10 ">A Good Website</h3>
          <p className="text-[var(--foreground)] opacity-80 leading-relaxed dark:text-gray-200">Functional, flashy. It tells people what you do, but fails to compel them to take action.</p>
        </div>

        {/* Great Website */}
        <div className="flex-1 flex flex-col items-center text-center p-5 bg-gradient-to-b from-emerald-500/5 to-green-500/5 border border-green-500/20 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden group hover:border-green-500/50 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] transition-all duration-300">
          {/* Glow Effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>


          <div className="relative z-10 w-full rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-900/20 bg-gray-100 dark:bg-black/50 aspect-[16/9] mb-4 group-hover:scale-[1.02] transition-transform duration-500">
            <img src="/great.png" alt="Great Website Example" className="w-full h-full object-cover" />
          </div>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2 relative z-10">A Great Website</h3>
          <p className="text-[var(--foreground)] opacity-80 leading-relaxed dark:text-gray-300 relative z-10">Simple yet elegant. Uses deterministic design patterns to trigger action and build trust instantly.</p>
        </div>

      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-outfit md:m-10 lg:m-15 m-5"> What we do ?</h1>

      {/* mobile scroller animation */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6 py-32 gap-20">
        {/* Timeline */}
        <div
          ref={timelineRef}
          className="hidden md:flex relative w-10 justify-center"
        >
          <div className="absolute inset-y-0 border-l-2 border-dotted border-gray-300" />

          {/* Static dots */}
          {sections.map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full border-2 border-gray-300 bg-white dark:bg-black transition-all duration-300"
              style={{
                top: sectionPositions[i] ? sectionPositions[i] - 8 : 0,
                opacity: sectionPositions[i] ? 1 : 0
              }}
            />
          ))}

          {/* Moving dot */}
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-green-500 shadow-[0_0_20px_4px_rgba(34,197,94,0.8)] z-10"
            style={{ y: dotY }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-30 flex flex-col items-center text-center md:block md:text-left">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => { sectionRefs.current[section.id] = el }}
            >
              <motion.h2
                className="text-4xl font-outfit "
                animate={{
                  color: activeId === section.id ? "#eb2ad7ff" : "#e5eaf1ff",

                }}
                transition={{ duration: 0.5 }}
              >
                {section.title}
              </motion.h2>
              <p className="mt-4 text-gray-300 max-w-xl">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* why chose us */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-outfit md:m-10 lg:m-15 m-5"> Why chose us ?</h1>

      <div className="w-full max-w-7xl mx-auto mt-10 mb-32 relative">
        <WhyUsSection />
      </div>

      <div className="flex justify-center my-20">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="border-2 p-[10px] px-5 font-poppins rounded-[25px] text-center text-black min-w-[max-content] transition-all duration-300 ease-in-out hover:border-[#FFD700] cursor-pointer hover:shadow-[0_0_25px_rgba(255,215,0,0.6),_0_5px_15px_rgba(0,0,0,0.8)] w-fit bg-purple-500 block"
        >
          <h3 className="font-bold">Get started</h3>
        </Link>
      </div>
    </div >

  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
