"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../providers/ToastProvider";

export default function Userbtn() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, logout, user } = useAuth();
    const { showToast } = useToast();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <div ref={dropdownRef} className="hidden md:block relative z-[1000]">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg shadow-lg transition-all duration-300 border border-white/20
                    ${open ? 'ring-2 ring-purple-400/50 scale-105 bg-white/10' : 'hover:scale-105 hover:bg-white/5'}
                    bg-gradient-to-br from-[#7051c3] to-[#ff70cc] text-white overflow-hidden
                `}
            >
                {/* Profile Image / Initials */}
                {isAuthenticated && user?.fname ? (
                    <span className="z-10">{user.fname.charAt(0).toUpperCase()}</span>
                ) : (
                    <svg className="w-5 h-5 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                )}

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-4 w-60 rounded-2xl bg-white/80 dark:bg-[#0f0f0f]/95 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.05)] ring-1 ring-white/20 overflow-hidden z-[1002] animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right p-1.5">

                    {isAuthenticated && user ? (
                        <>
                            {/* Profile Header */}
                            <div className="p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7051c3] to-[#ff70cc] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                        {user?.fname?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate leading-tight">{user?.fname} {user?.lname}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate leading-tight mt-0.5">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 uppercase tracking-wide">Free Plan</span>
                                    <Link href="/pricing" onClick={() => setOpen(false)} className="text-[10px] text-[var(--foreground)] opacity-60 hover:opacity-100 underline decoration-dotted">Upgrade</Link>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="flex flex-col gap-0.5">
                                <Link
                                    href="/settings"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
                                >
                                    <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#7051c3] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Account Settings
                                </Link>

                                <Link
                                    href="/pricing"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
                                >
                                    <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#7051c3] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Billing & Plans
                                </Link>

                                <div className="h-px bg-black/5 dark:bg-white/5 my-1 mx-2"></div>

                                <button
                                    onClick={() => {
                                        logout();
                                        setOpen(false);
                                        showToast("Successfully logged out!", "success");
                                    }}
                                    className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group text-left"
                                >
                                    <svg className="w-4 h-4 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="p-1">
                            {/* Value Prop Header */}
                            <div className="p-4 bg-gradient-to-br from-[#7051c3]/10 to-[#ff70cc]/10 rounded-xl mb-3 border border-purple-500/10">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Unlock Your Score</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Join thousands of founders optimizing their conversion rates.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/signup"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-br from-[#7051c3] to-[#ff70cc] text-white text-sm font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity"
                                >
                                    Get Started
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </Link>
                                <Link
                                    href="/signin"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    Log In
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}