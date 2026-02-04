'use client';

import Modal from '@/app/components/Modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
import { signinRequest } from '../../../config/auth.api';
import { useToast } from '../../providers/ToastProvider';

export default function SignIn() {
    const { login } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);



        const formdata = new FormData(e.currentTarget);
        const email = formdata.get("email") as string;
        const password = formdata.get("password") as string;

        try {
            const response = await signinRequest(email, password);
            login(response.token, response.user);
            showToast("Successfully signed in!", "success");
            router.back();
            console.log(response.token);
        }
        catch (err) {
            setError("Something went wrong");
        }
        finally {
            setLoading(false);

        }
    }
    return (
        <Modal>
            <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-2xl dark:bg-black/40 dark:border-white/30">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-white/60 text-sm">Sign in to continue your optimization journey.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@company.com"
                            required
                            className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50 focus:border-[#7051c3] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 ml-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50 focus:border-[#7051c3] transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="hover:cursor-pointer w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#7051c3] to-[#ff70cc] text-white font-bold text-base shadow-lg shadow-[#FF6B6B]/20 hover:shadow-[#FF6B6B]/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-white/50">
                    Don't have an account?{' '}
                    <Link href="/signup" replace className="text-white hover:text-[#7051c3] transition-colors font-medium">
                        Create one
                    </Link>
                </div>
            </div>
        </Modal>
    );
}
