"use client";
import React, { useState } from "react";

export const WhyUsSection = () => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[500px] lg:min-h-[800px]">
            <style>
                {`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>

            {/* Mobile/Tablet Grid View (< lg) */}
            <div className="grid grid-cols-2 gap-4 px-4 w-full lg:hidden z-10">
                {[
                    { title: "Subjective Debates", icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM12 6a1 1 0 0 0-1 1v5a1 1 0 0 0 .29.71l3 3a1 1 0 0 0 1.42-1.42l-2.5-2.5V7a1 1 0 0 0-1-1z" />, desc: "Stop arguing over opinions" },
                    { title: "Mystery Drop-offs", icon: <path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9zM12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm1.7 13.3a1 1 0 1 1-1.4-1.4 1 1 0 0 1 1.4 1.4zm0-4a1 1 0 1 1-1.4 0V8a1 1 0 1 1 1.4 0z" />, desc: "Find out where they leave" },
                    { title: "Mobile Neglect", icon: <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-4 17a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4-3H8V4h8z" />, desc: "Fix phone-only broken UX" },
                    { title: "Slow Load Times", icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 0 0 1-1 1z" />, desc: "Boost speed & SEO rank" },
                    { title: "Trust Gaps", icon: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.96-7 10.16-3.87-1.2-7-5.49-7-10.16v-4.7l7-3.12z" />, desc: "Boost credibility instantly" },
                    { title: "Confusing Copy", icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />, desc: "Clear text that converts" },
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
                        <div className="w-10 h-10 mb-3 text-[#ff70cc]">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">{item.icon}</svg>
                        </div>
                        <p className="text-sm font-semibold text-white">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Desktop Orbit View (>= lg) */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-center overflow-hidden">

                {/* Center Static Content */}
                <div className="absolute z-20 text-center max-w-md px-4 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#7051c3] blur-[50px] opacity-40"></div>
                    <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight font-poppins">
                        Problems <span className="text-[#ff70cc]">we solve</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed italic">
                        "Think of an expert UI/UX audit team in your pocket, without the $5,000 retainer."
                    </p>
                    <svg className="absolute -top-10 -right-10 w-8 h-8 text-[#ebad3e] opacity-80 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3 7h7l-6 5 2 7-6-5-6 5 2-7-6-5h7z" />
                    </svg>
                </div>

                {/* Orbiting Ring */}
                <div
                    
                    className="relative w-[300px] h-[700px] rounded-full border border-white/5 flex items-center justify-center"
                    style={{
                        animation: "spin-slow 60s linear infinite",
                        animationPlayState: isPaused ? "paused" : "running"
                    }}
                >
                    {[
                        { title: "Subjective Debates", icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM12 6a1 1 0 0 0-1 1v5a1 1 0 0 0 .29.71l3 3a1 1 0 0 0 1.42-1.42l-2.5-2.5V7a1 1 0 0 0-1-1z" />, desc: "Stop arguing over opinions" },
                        { title: "Mystery Drop-offs", icon: <path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9zM12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm1.7 13.3a1 1 0 1 1-1.4-1.4 1 1 0 0 1 1.4 1.4zm0-4a1 1 0 1 1-1.4 0V8a1 1 0 1 1 1.4 0z" />, desc: "Find out where they leave" },
                        { title: "Mobile Neglect", icon: <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-4 17a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4-3H8V4h8z" />, desc: "Fix phone-only broken UX" },
                        { title: "Slow Load Times", icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 0 0 1-1 1z" />, desc: "Boost speed & SEO rank" },
                        { title: "Trust Gaps", icon: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.96-7 10.16-3.87-1.2-7-5.49-7-10.16v-4.7l7-3.12z" />, desc: "Boost credibility instantly" },
                        { title: "Confusing Copy", icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />, desc: "Clear text that converts" },
                    ].map((item, i) => {
                        const angleDeg = (i * 360) / 6;
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2"
                                onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                                style={{
                                    width: '240px',
                                    marginLeft: '-120px',
                                    marginTop: '-70px',
                                    transform: `rotate(${angleDeg}deg) translate(350px) rotate(-${angleDeg}deg)`
                                }}
                            >
                                <div
                                    className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-xl flex flex-col items-center text-center group hover:border-[#7051c3]/50 transition-colors cursor-pointer"
                                    style={{
                                        animation: "spin-slow 60s linear infinite reverse",
                                        animationPlayState: isPaused ? "paused" : "running"
                                    }}
                                >
                                    <div className="w-10 h-10 mb-3 text-[#ff70cc] group-hover:text-[#7051c3] transition-colors">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">{item.icon}</svg>
                                    </div>
                                    <p className="text-sm font-semibold text-white">{item.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
};
