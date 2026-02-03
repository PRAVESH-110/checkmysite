"use client"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';

export default function Footer() {

    return (
        <footer className="w-full border-t border-black/10 bg-white/5 backdrop-blur-md pt-16 pb-8 mt-auto dark:border-white/10 dark:bg-black/20">
            <div className="max-w-7xl grid-cols-3 md:grid-cols-3 mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tight  bg-gradient-to-br from-[#7051c3] to-[#ff70cc] bg-clip-text text-transparent decoration-0 mb-4 block">
                            checkmysite
                        </Link>
                        <p className="text-sm text-[var(--foreground)] opacity-60 leading-relaxed mb-6 dark:text-gray-200">
                            Deterministic conversion scoring for modern SaaS. Stop guessing and start converting.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <Link href="https://github.com/PRAVESH-110"
                                className="w-8 h-8 rounded-full bg-black/5 border border-black/10 hover:bg-black/10 transition-colors cursor-pointer dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 flex items-center justify-center text-4xl"
                            >
                                <FaGithub />
                            </Link>
                            <Link href="https://www.linkedin.com/in/pravesh-dhakal" className="w-8 h-8 bg-black/5 border border-black/10 hover:bg-black/10 transition-colors cursor-pointer dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 flex items-center justify-center text-4xl">
                                <FaLinkedin />
                            </Link>
                        </div>
                    </div>

                    {/* Links Grid Container */}
                    <div className="col-span-1 md:col-span-3 grid grid-cols-3 gap-8">
                        {/* Column 1: Product */}
                        <div>
                            <h4 className="font-semibold text-[var(--foreground)] mb-6 dark:text-white">Product</h4>
                            <ul className="flex flex-col gap-3">
                                <li><Link href="/#analysis" className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity dark:text-gray-200 hover:text-[#FF6B6B]">Features</Link></li>
                                <li><Link href="/pricing" className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity dark:text-gray-200 hover:text-[#FF6B6B]">Pricing</Link></li>
                                <li><Link href="/" className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity dark:text-gray-200 hover:text-[#FF6B6B]">Get Score</Link></li>
                            </ul>
                        </div>

                        {/* Column 2: Company */}
                        <div>
                            <h4 className="font-semibold text-[var(--foreground)] mb-6 dark:text-white">Company</h4>
                            <ul className="flex flex-col gap-3">
                                <li><Link href="/about" className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity dark:text-gray-200 hover:text-[#FF6B6B]">About Us</Link></li>
                                <li><Link href="/contact" className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity dark:text-gray-200 hover:text-[#FF6B6B]">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Copyright */}
                        <div>
                            <h4 className="font-semibold text-[var(--foreground)] mb-6 dark:text-white">Copyright</h4>
                            <p className="text-sm text-[var(--foreground)] opacity-60 leading-relaxed dark:text-gray-200">
                                © {new Date().getFullYear()} chechmysite Inc. All rights reserved.
                            </p>
                            <p className="mt-3 text-xs text-[var(--foreground)] opacity-50 leading-relaxed dark:text-gray-200">
                                CheckMySite and its logos are trademarks of checkmysite Inc.
                            </p>
                        </div>

                    
                    </div>
                </div>

                <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 dark:border-white/5">
                    <p className="text-xs text-[var(--foreground)] opacity-40 dark:text-gray-200">
                        © {new Date().getFullYear()} chechmysite Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-xs text-[var(--foreground)] opacity-40 flex items-center gap-2 dark:text-gray-200">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            All Systems Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
