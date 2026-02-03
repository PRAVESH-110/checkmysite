"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
    { label: "Avg. Score Lift", value: "+27%" },
    { label: "Checks Per Scan", value: "120+" },
    { label: "Actionable Fixes", value: "50+" },
    { label: "Minutes to Insight", value: "<2" },
];

const values = [
    {
        title: "Deterministic First",
        body: "No hand-wavy advice. We use rule-based UX and conversion principles to surface fixes you can trust.",
    },
    {
        title: "Built for Builders",
        body: "Our reports are written for devs, founders, and growth teams who want clear, code-ready guidance.",
    },
    {
        title: "Speed Over Noise",
        body: "Fast scans, focused insights, and zero fluff. You get to action faster and ship improvements quicker.",
    },
];

const steps = [
    {
        title: "Scan",
        body: "Enter a URL and get a structured scan against conversion-critical UI rules.",
    },
    {
        title: "Score",
        body: "Receive a deterministic score with transparent breakdowns and confidence you can explain to stakeholders.",
    },
    {
        title: "Fix",
        body: "Implement prioritized fixes with immediate impact on trust, clarity, and conversion.",
    },
];

export default function About() {
    return (
        <div className="relative overflow-hidden px-6 py-16 md:py-24 ">
            <div className="max-w-6xl mx-auto">
                <section className="text-center mb-16 md:mb-24">
                    <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-[var(--foreground)]/70 mb-4">
                        About CheckMySite
                    </p>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-black font-outfit tracking-tight bg-gradient-to-b from-[var(--foreground)] to-[rgba(var(--foreground),0.25)] bg-clip-text drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                    >
                        We turn website confusion into clear, conversion-ready action.
                    </motion.h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-[var(--foreground)]/70 leading-relaxed">
                        CheckMySite is built for teams who care about outcomes, not buzzwords. Our scans surface
                        deterministic UI/UX blockers and translate them into practical fixes you can ship fast.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/pricing"
                            className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-br from-[#7051c3] to-[#ff70cc] hover:opacity-95 transition-opacity"
                        >
                            View Plans
                        </Link>
                        <Link
                            href="/contact"
                            className="px-6 py-3 rounded-full font-semibold border border-white/20 text-[var(--foreground)] hover:border-white/40 transition-colors"
                        >
                            Talk to Us
                        </Link>
                    </div>
                </section>

                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 text-center"
                        >
                            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-[#7051c3] to-[#ff70cc] bg-clip-text text-transparent">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-sm text-[var(--foreground)]/60">{stat.label}</p>
                        </div>
                    ))}
                </section>

                <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center mb-16 md:mb-24">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 text-[var(--foreground)]">
                            Why we exist
                        </h2>
                        <p className="text-[var(--foreground)]/70 leading-relaxed mb-6">
                            Most audits tell you what is wrong, but not what to do next. We built CheckMySite to close
                            that gap with deterministic scoring and a prioritized fix list that teams can action in a
                            single sprint.
                        </p>
                        <div className="space-y-3 text-sm text-[var(--foreground)]/70">
                            <p>Built by product builders, for product builders.</p>
                            <p>Clear standards, measurable progress, and no vague advice.</p>
                            <p>Designed to scale from solo founders to growth teams.</p>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
                        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">Our Promise</h3>
                        <ul className="space-y-4 text-[var(--foreground)]/70">
                            <li className="flex gap-3 items-start">
                                <span className="mt-1 h-2 w-2 rounded-full bg-[#ff70cc]"></span>
                                Deterministic scores you can explain to stakeholders.
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="mt-1 h-2 w-2 rounded-full bg-[#7051c3]"></span>
                                Fixes mapped to revenue-impacting UX signals.
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="mt-1 h-2 w-2 rounded-full bg-[#ff70cc]"></span>
                                Reports written with engineers and marketers in mind.
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-center mb-10 text-[var(--foreground)]">
                        How it works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7 backdrop-blur-xl shadow-xl"
                            >
                                <p className="text-sm font-semibold text-[var(--foreground)]/60 mb-3">
                                    Step {index + 1}
                                </p>
                                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">{step.title}</h3>
                                <p className="text-[var(--foreground)]/70 leading-relaxed">{step.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-center mb-10 text-[var(--foreground)]">
                        What we value
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 md:p-7 shadow-xl backdrop-blur-xl"
                            >
                                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">{value.title}</h3>
                                <p className="text-[var(--foreground)]/70 leading-relaxed">{value.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#7051c3]/20 to-[#ff70cc]/20 p-8 md:p-10 text-center shadow-2xl backdrop-blur-xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-[var(--foreground)] mb-4">
                        Ready to see your conversion score?
                    </h2>
                    <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto mb-6">
                        Run a deterministic scan and get a prioritized list of fixes that move the needle.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-br from-[#7051c3] to-[#ff70cc] hover:opacity-95 transition-opacity"
                    >
                        Analyze My Site
                    </Link>
                </section>
            </div>
        </div>
    );
}
