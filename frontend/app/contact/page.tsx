"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    // PAST YOUR IMAGE LINK HERE
    const contactImage = "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulating API call
        setTimeout(() => {
            console.log("Form Submitted:", formData);
            setStatus("success");
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-4 relative">
            {/* Background Elements similar to home page for consistency */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-5xl bg-white dark:bg-[#111] rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 dark:border-white/10"
            >
                {/* Image Section (Left) */}
                <div className="w-full md:w-1/2 relative bg-gray-100 dark:bg-black/50 min-h-[300px] md:min-h-full flex items-center justify-center overflow-hidden">
                    {contactImage ? (
                        <img
                            src={contactImage}
                            alt="Contact Us"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                            {/* Placeholder indication */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="bg-white/80 dark:bg-black/80 px-4 py-2 rounded-full backdrop-blur-sm text-sm">Add Image in Code</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Section (Right) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-[var(--foreground)] dark:text-white mb-8">
                        Get in Touch
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name Input */}
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-[var(--foreground)] dark:text-white outline-none focus:border-[#7051c3] focus:ring-2 focus:ring-[#7051c3]/20 transition-all font-poppins placeholder:text-gray-400"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-[var(--foreground)] dark:text-white outline-none focus:border-[#7051c3] focus:ring-2 focus:ring-[#7051c3]/20 transition-all font-poppins placeholder:text-gray-400"
                            />
                        </div>

                        {/* Subject Input */}
                        <div className="relative">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-[var(--foreground)] dark:text-white outline-none focus:border-[#7051c3] focus:ring-2 focus:ring-[#7051c3]/20 transition-all font-poppins placeholder:text-gray-400"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="relative">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                required
                                rows={4}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-[var(--foreground)] dark:text-white outline-none focus:border-[#7051c3] focus:ring-2 focus:ring-[#7051c3]/20 transition-all font-poppins placeholder:text-gray-400 resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className={`w-full py-4 rounded-full font-bold text-white text-lg tracking-wide shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] outline-none focus:ring-4 focus:ring-[#7051c3]/30 ${status === "success"
                                    ? "bg-green-500 hover:bg-green-600 shadow-green-500/30"
                                    : "bg-gradient-to-r from-[#7051c3] to-[#ff70cc] hover:shadow-[0_4px_20px_rgba(112,81,195,0.4)] hover:opacity-90"
                                }`}
                        >
                            <span className="relative z-10">
                                {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                            </span>
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
