'use client';

import Modal from '@/app/components/Modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { WarmupLoader } from '../../components/WarmupLoader';
import { useAuth } from "../../../context/AuthContext";
import { signupRequest } from '../../../config/auth.api';

export default function SignUp() {
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isFirstAttempt, setIsFirstAttempt] = useState(() => {
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem("server_warm");
        }
        return true;
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const data = await signupRequest(
                formData.get("email") as string,
                formData.get("password") as string,
                formData.get("fname") as string,
                formData.get("lname") as string
            )
            if (data.token && data.user) {
                login(data.token, data.user);
            }

            // Mark server as warm
            sessionStorage.setItem("server_warm", "true");
            setIsFirstAttempt(false);

            router.back();
        }
        catch (err: any) {
            if (isFirstAttempt) {
                console.log("Warmup attempt failed silently.");
                setIsFirstAttempt(false);
            } else {
                setError(err.message || "Signup failed");
            }
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Modal>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl
             w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl
            max-h-[95vh] overflow-y-auto
            dark:bg-black/40 dark:border-white/30 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">


                <div className="text-center mb-2">
                    <h2 className="text-xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-1">
                        Get Started
                    </h2>
                    <p className="text-white/60 text-xs">
                        Join checkmysite.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold font-semibold text-white/50 uppercase tracking-wider mb-1 ml-1">
                                First Name
                            </label>
                            <input
                                name="fname"
                                type="text"
                                placeholder="John"
                                required
                                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold font-semibold text-white/50 uppercase tracking-wider mb-1 ml-1">
                                Last Name
                            </label>
                            <input
                                name="lname"
                                type="text"
                                placeholder="Doe"
                                required
                                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold font-semibold text-white/50 uppercase tracking-wider mb-1 ml-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@company.com"
                            required
                            className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold font-semibold text-white/50 uppercase tracking-wider mb-1 ml-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs text-center">{error}</p>
                    )}

                    {loading && isFirstAttempt ? (
                        <div className="mt-4">
                            <WarmupLoader />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-[#7051c3] to-[#ff70cc] text-white font-bold text-sm shadow-lg shadow-[#556270]/20 hover:shadow-[#556270]/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    )}
                </form>

                <div className="mt-7 text-center text-xs text-white/50">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        replace
                        className="text-white text-xs font-semibold hover:text-[#556270] transition-colors font-medium"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </Modal>
    );
}
