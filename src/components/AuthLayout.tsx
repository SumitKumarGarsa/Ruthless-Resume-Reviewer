"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex bg-[#09090b] text-white overflow-hidden relative">
            {/* Mesh Gradients Background (Global) is already in globals.css */}

            {/* LEFT SIDE - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative z-10">
                <div className="w-full max-w-md space-y-8 glass-panel p-8 rounded-2xl shadow-2xl">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-6">
                            {/* Logo placeholder */}
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                                <span className="font-bold text-white text-lg">R</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        <p className="text-gray-400">{subtitle}</p>
                    </div>

                    {children}
                </div>
            </div>

            {/* RIGHT SIDE - Visuals/Testimonials */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center p-12 bg-zinc-900/50 backdrop-blur-sm m-4 rounded-3xl border border-white/5 overflow-hidden">
                {/* Star Burst Graphic */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-50 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow w-full h-full stroke-pink-500/30 fill-none">
                        <path d="M100 0 L110 90 L200 100 L110 110 L100 200 L90 110 L0 100 L90 90 Z" strokeWidth="1" />
                        <path d="M100 20 L105 95 L180 100 L105 105 L100 180 L95 105 L20 100 L95 95 Z" strokeWidth="1" className="stroke-orange-500/30" transform="rotate(45 100 100)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        What our <br />
                        <span className="text-gradient-pink">Survivors Said.</span>
                    </h2>
                    <div className="text-6xl text-pink-500 font-serif mb-4">“</div>
                    <p className="text-xl text-gray-300 font-light mb-8 leading-relaxed">
                        "I thought my resume was perfect. This AI destroyed my ego in seconds.
                        I cried, fixed it, and got hired immediately. 10/10 would suffer again."
                    </p>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-semibold text-white">Sarah Jenkins</h4>
                            <p className="text-sm text-gray-400">Software Engineer (Finally)</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 rounded-lg bg-pink-400/20 hover:bg-pink-400/30 flex items-center justify-center transition-colors border border-pink-500/30 text-pink-500">
                                <ArrowLeft size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/40 flex items-center justify-center transition-colors border border-emerald-500/30 text-emerald-500">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-10 right-12 bg-white text-black p-6 rounded-2xl shadow-xl w-64 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-2">Resume Score: 3/10</h3>
                    <p className="text-xs text-gray-600 mb-4">"Is this a joke? Or are you actually unemployed on purpose?"</p>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                {i}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
