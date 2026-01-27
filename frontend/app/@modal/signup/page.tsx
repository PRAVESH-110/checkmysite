'use client';

import Modal from '@/app/components/Modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { signupRequest } from '../../../config/auth.api';

export default function SignUp() {
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            if (data.token) {
                login(data.token); // optional (auto-login)
            }
            router.back();
        }
        catch (err: any) {
            setError(err.message || "Signup failed");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Modal>
            <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl 
             w-full  max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl
            max-h-[90vh] overflow-y-auto

            dark:bg-black/40 dark:border-white/10">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#556270] to-[#FF6B6B]" />

                <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                        Get Started
                    </h2>
                    <p className="text-white/60 text-sm">
                        Join checkmysite and boost your conversions.
                    </p>
                </div>

                <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 ml-1">
                            First Name
                        </label>
                        <input
                            name="fname"                          // ✅ REQUIRED
                            type="text"
                            placeholder="John"
                            required
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 ml-1">
                            Last Name
                        </label>
                        <input
                            name="lname"                          // ✅ REQUIRED
                            type="text"
                            placeholder="Doe"
                            required
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 ml-1">
                            Email Address
                        </label>
                        <input
                            name="email"                          // ✅ REQUIRED
                            type="email"
                            placeholder="you@company.com"
                            required
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 ml-1">
                            Password
                        </label>
                        <input
                            name="password"                       // ✅ REQUIRED
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#556270]/50 focus:border-[#556270] transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#7051c3] to-[#ff70cc] text-white font-bold text-lg shadow-lg shadow-[#556270]/20 hover:shadow-[#556270]/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-white/50">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        replace
                        className="text-white hover:text-[#556270] transition-colors font-medium"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </Modal>
    );
}
