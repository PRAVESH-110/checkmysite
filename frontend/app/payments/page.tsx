"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { apiEndpoints } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const PRICING_PLANS = {
    Basic: { price: "$29", message: "Upgrade to Basic Plan" },
    Pro: { price: "$79", message: "Upgrade to Pro Plan" },
};

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { token, isAuthenticated } = useAuth();

    const planName = searchParams.get("plan");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Redirect if not authenticated
    useEffect(() => {
        // Give a small delay to allow auth to restore
        const timer = setTimeout(() => {
            if (!isAuthenticated && !token) {
                router.push("/signup");
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [isAuthenticated, token, router]);

    const planDetails = planName && PRICING_PLANS[planName as keyof typeof PRICING_PLANS];

    const handleConfirm = async () => {
        if (!token) {
            router.push("/signup");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            console.log("Creating order for plan:", planName);
            const res = await fetch(apiEndpoints.order.create, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ planId: planName }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                console.error("Order creation failed:", res.status, errData);
                throw new Error(errData.message || "Failed to create order");
            }

            const data = await res.json();
            console.log("Order created successfully:", data);

            setStatus("success");
            // Here you would typically redirect to Razorpay or payment gateway
            // For now, we show success as requested.
        } catch (error: any) {
            console.error("Payment error:", error);
            setStatus("error");
            setErrorMsg(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!planName || !planDetails) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)] dark:text-white">Invalid Plan Selected</h2>
                <Link href="/pricing" className="text-blue-500 hover:underline">
                    Back to Pricing
                </Link>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 rounded-3xl border border-green-500/30 bg-green-500/10 backdrop-blur-xl text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-[var(--foreground)] dark:text-white">Order Created!</h2>
                <p className="text-[var(--foreground)] opacity-70 mb-6 dark:text-white/70">
                    Your upgrade request for {planName} has been initiated.
                </p>
                <div className="text-sm opacity-50">Redirecting to payment gateway...</div>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto mt-10 md:mt-24">
            <div className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="relative z-10 text-center">
                    <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Confirm Upgrade
                    </h1>
                    <p className="text-[var(--foreground)] opacity-60 mb-8 dark:text-white/60">
                        You are about to upgrade to the <span className="font-bold text-[var(--foreground)] dark:text-white">{planName}</span> plan.
                    </p>

                    <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm opacity-70">New Plan</span>
                            <span className="font-bold">{planName}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm opacity-70">Price</span>
                            <span className="text-2xl font-bold">{planDetails.price}<span className="text-sm font-normal opacity-50">/mo</span></span>
                        </div>
                        <div className="border-t border-white/10 pt-4 text-left text-sm opacity-60">
                            Includes all {planName} features. Cancel anytime.
                        </div>
                    </div>

                    {status === "error" && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-200
                                ${loading
                                    ? "bg-gray-600 cursor-not-allowed opacity-70"
                                    : "bg-gradient-to-r from-[#7051c3] to-[#ff70cc] hover:shadow-purple-500/25 hover:-translate-y-0.5"
                                }
                            `}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Confirm & Pay"
                            )}
                        </button>

                        <Link href="/pricing">
                            <button
                                disabled={loading}
                                className="w-full py-3 rounded-xl font-semibold text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-white/5 transition-all dark:text-white"
                            >
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <div className="min-h-screen pt-20 px-4 flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(100,100,255,0.05)_0%,transparent_50%)]">
            <Suspense fallback={<div className="text-center opacity-50">Loading plan...</div>}>
                <PaymentContent />
            </Suspense>
        </div>
    );
}