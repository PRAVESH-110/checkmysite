"use client"
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Pricing() {
    const { isAuthenticated } = useAuth();

    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for testing the waters and personal projects.",
            features: [
                "1 Website Scan per day",
                "Basic Conversion Score",
                "Top 3 Issues Report",
                "Community Support",
            ],
            cta: "Your current plan",
            gradient: false,
            current: true
        },
        {
            name: "Basic",
            price: "$29",
            period: "/month",
            description: "For solopreneurs and small business owners.",
            features: [
                "10 Website Scans per day",
                "Detailed Performance Breakdown",
                "Full Issues List & Actionable Fixes",
                "Priority Email Support",
                "Historical Scan Data (30 days)",
            ],
            cta: "Start Free Trial",
            gradient: true, // Highlight this plan
            popular: true,
            current: false,
            // Logged In -> Payment, Logged Out -> Signup
            href: isAuthenticated ? "/payments?plan=Basic" : "/signup"
        },
        {
            name: "Pro",
            price: "$79",
            period: "/month",
            description: "Advanced tools for agencies and growth teams.",
            features: [
                "Unlimited Scans",
                "White-label PDF Reports",
                "Competitor Analysis",
                "API Access",
                "Dedicated Account Manager",
            ],
            cta: "Contact Sales",
            gradient: false,
            current: false,
            // Logged In -> Contact, Logged Out -> Signup
            href: isAuthenticated ? "/payments?plan=Pro" : "/signup"
        },
    ];

    return (
        <div className="min-h-screen pt-25 pb-20 px-4 bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,255,0.05)_0%,transparent_50%)]">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-outfit pb-4 font-extrabold mb-6 tracking-tight bg-gradient-to-b from-[var(--foreground)] to-[rgba(var(--foreground),0.7)] bg-clip-text text-transparent dark:from-white dark:to-[#aaa]">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-[var(--foreground)] opacity-70 mb-16 max-w-2xl mx-auto dark:text-white/70">
                    Choose the plan that fits your growth stage. No hidden fees, cancel anytime.
                </p>

                <div className="w-60% grid grid-cols-1 md:grid-cols-3 gap-8 items-start mx-5">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col h-full text-left
                ${plan.popular
                                    ? "bg-white/10 backdrop-blur-xl border-[#7051c3]/50 shadow-[0_0_40px_rgba(112,81,195,0.2)] dark:bg-black/40"
                                    : "bg-white/[0.03] backdrop-blur-md border-white/10 dark:bg-white/5"
                                }
                ${!plan.current ? "hover:-translate-y-2 hover:bg-white/5" : ""}
              `}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#7051c3] to-[#ff70cc] rounded-full text-white text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2 text-[var(--foreground)] dark:text-white">{plan.name}</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-extrabold text-[var(--foreground)] dark:text-white">{plan.price}</span>
                                {plan.period && <span className="text-[var(--foreground)] opacity-60 ml-1 dark:text-white/60">{plan.period}</span>}
                            </div>
                            <p className="text-sm text-[var(--foreground)] opacity-70 mb-8 min-h-[40px] dark:text-white/60">{plan.description}</p>

                            <div className="border-t border-white/10 my-6"></div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm text-[var(--foreground)] opacity-80 dark:text-white/80">
                                        <svg
                                            className={`w-5 h-5 mr-3 shrink-0 ${plan.gradient ? "text-[#ff70cc]" : "text-[#7051c3]"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {plan.current ? (
                                <button
                                    disabled
                                    className="w-full py-3 rounded-xl font-semibold bg-white/5 text-[var(--foreground)] opacity-50 cursor-not-allowed border border-white/5 dark:text-white"
                                >
                                    {plan.cta}
                                </button>
                            ) : (
                                <Link href={plan.href || "/signup"}>
                                    <button
                                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 
                    ${plan.gradient
                                                ? "bg-gradient-to-r from-[#7051c3] to-[#ff70cc] text-white hover:shadow-lg hover:opacity-90 "
                                                : "bg-white/10 text-[var(--foreground)] hover:bg-white/20 border border-white/10 dark:text-white "
                                            }
                  `}
                                    >
                                        {plan.cta}
                                    </button>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
