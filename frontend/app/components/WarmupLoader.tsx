"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WarmupLoader = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "Contacting analysis server...",
        "Warming up instances...",
        "This may take a while...",
        "Almost ready..."
    ];

    useEffect(() => {
        const intervals = [2000, 4000, 7000]; // Time to switch messages

        const timers: NodeJS.Timeout[] = [];

        let accumulatedTime = 0;
        intervals.forEach((duration, index) => {
            accumulatedTime += duration;
            const timer = setTimeout(() => {
                setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
            }, accumulatedTime);
            timers.push(timer);
        });

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-6 min-h-[140px]">
            <div className="relative w-12 h-12">
                <motion.span
                    className="block w-12 h-12 border-4 border-white/20 border-t-[#ff70cc] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="h-6 overflow-hidden relative w-full text-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={messageIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-medium text-[var(--foreground)]/80 dark:text-white/80"
                    >
                        {messages[messageIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};
