"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");


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
        <div className="min-h-screen flex py-10 px-4 relative">
            {/* Background Elements similar to home page for consistency */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-6xl bg-white dark:bg-[#050505] rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 dark:border-white/5 backdrop-blur-sm"
            >

                {/* Left Side: Contact Form */}
                <div className="w-full md:w-3/5 p-8 md:p-14 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle localized background glow for the form side */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#7051c3]/5 to-transparent pointer-events-none opacity-50"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit text-gray-900 dark:text-white mb-3 tracking-tight">
                            Get in Touch
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
                            Have a question or proposal? We'd love to hear from you.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-white outline-none focus:border-[#7051c3] focus:ring-4 focus:ring-[#7051c3]/10 transition-all font-outfit placeholder:text-gray-400 group-hover:border-gray-300 dark:group-hover:border-[#333]"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-white outline-none focus:border-[#7051c3] focus:ring-4 focus:ring-[#7051c3]/10 transition-all font-outfit placeholder:text-gray-400 group-hover:border-gray-300 dark:group-hover:border-[#333]"
                                    />
                                </div>
                            </div>

                            {/* Subject Input */}
                            <div className="relative group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project Inquiry"
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-white outline-none focus:border-[#7051c3] focus:ring-4 focus:ring-[#7051c3]/10 transition-all font-outfit placeholder:text-gray-400 group-hover:border-gray-300 dark:group-hover:border-[#333]"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="relative group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project..."
                                    required
                                    rows={5}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-white outline-none focus:border-[#7051c3] focus:ring-4 focus:ring-[#7051c3]/10 transition-all font-outfit placeholder:text-gray-400 resize-none group-hover:border-gray-300 dark:group-hover:border-[#333]"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold text-white text-lg tracking-wide shadow-xl transition-all transform hover:-translate-y-1 active:scale-[0.98] outline-none focus:ring-4 focus:ring-[#7051c3]/30 flex items-center justify-center gap-2 ${status === "success"
                                    ? "bg-green-500 hover:bg-green-600 shadow-green-500/30"
                                    : "bg-gradient-to-r from-[#7051c3] to-[#a051c3] hover:shadow-[0_8px_30px_rgba(112,81,195,0.4)]"
                                    }`}
                            >
                                {status === "submitting" ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Message Sent
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side: Info & Newsletter */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-[#120b1e] via-[#1a0f2e] to-[#0f0518] p-8 md:p-14 flex flex-col justify-between relative overflow-hidden text-white border-l border-white/5">

                    {/* Decorative Background Elements */}
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-[#7051c3]/20 blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-20%] w-80 h-80 rounded-full bg-[#ff70cc]/10 blur-[80px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                    {/* Top Content */}
                    <div className="relative z-10 w-full flex flex-col items-start gap-12 pt-4">
                        <div className="space-y-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 mb-6 text-[#ff70cc]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Contact Us</p>
                            <a href="mailto:pravdhakal110@gmail.com" className="text-2xl md:text-3xl font-bold text-white hover:text-[#ff70cc] transition-colors tracking-tight break-all font-outfit leading-tight">
                                pravdhakal110@gmail.com
                            </a>
                        </div>

                        {/* Newsletter Input */}
                        <div className="w-full">
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Newsletter</p>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">Subscribe to our newsletter for the latest updates, design tips, and exclusive offers.</p>
                            <div className="relative w-full shadow-2xl rounded-xl group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-14 pl-5 pr-14 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-base outline-none focus:bg-white/10 focus:border-[#7051c3]/50 transition-all font-outfit"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#7051c3] hover:bg-[#8a6bd6] rounded-lg flex items-center justify-center text-white transition-all shadow-lg hover:shadow-[#7051c3]/40 active:scale-95">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Content: Socials */}
                    <div className="relative z-10 w-full mt-12 md:mt-0">
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">Socials</p>
                        <div className="flex gap-3">
                            {[
                                { name: "Twitter", icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4 2 12.4-2.2 9.3-11.4 3-2 .9-5.1.9-5.1z" /> },
                                { name: "LinkedIn", icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
                                { name: "Instagram", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></> },
                                { name: "GitHub", icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 hover:text-white hover:border-[#7051c3]/50 transition-all hover:scale-105 active:scale-95 group"
                                    aria-label={social.name}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#ff70cc] transition-colors">
                                        {social.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    )
}
