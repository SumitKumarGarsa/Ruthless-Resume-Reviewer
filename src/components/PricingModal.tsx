'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Zap, Star } from "lucide-react"

interface PricingModalProps {
    isOpen: boolean
    onClose: () => void
    currentPlan: string
}

export default function PricingModal({ isOpen, onClose, currentPlan }: PricingModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl z-50 p-4"
                    >
                        <div className="glass-panel rounded-2xl p-8 relative overflow-hidden border border-white/10 shadow-2xl">
                            {/* Background Effects */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                            <div className="text-center mb-12 relative z-10">
                                <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-3">
                                    Choose Your <span className="text-gradient">Weapon</span>
                                </h2>
                                <p className="text-zinc-400 font-mono text-sm max-w-xl mx-auto">
                                    How much does your career mean to you? Choose wisely.
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6 relative z-10">
                                {/* Free Plan */}
                                <div className="rounded-xl border border-zinc-800 bg-black/40 p-6 flex flex-col relative group hover:border-zinc-700 transition-all hover:-translate-y-1 duration-300">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-zinc-400 uppercase tracking-wider">Rookie</h3>
                                        <div className="flex items-baseline gap-1 mt-2">
                                            <span className="text-4xl font-black text-white">$0</span>
                                            <span className="text-zinc-500 font-mono text-xs">/month</span>
                                        </div>
                                        <p className="text-xs text-zinc-500 mt-2 font-mono">For those who like rejection.</p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-zinc-500" />
                                            <span>3 Scans / day</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-zinc-500" />
                                            <span>Basic Analysis</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-zinc-500">
                                            <X className="w-4 h-4" />
                                            <span>AI Resume Rewrite</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-zinc-500">
                                            <X className="w-4 h-4" />
                                            <span>Cover Letter Gen</span>
                                        </li>
                                    </ul>

                                    <button
                                        disabled={currentPlan === 'FREE'}
                                        className="w-full py-4 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-widest cursor-not-allowed"
                                    >
                                        Current Plan
                                    </button>
                                </div>

                                {/* Pro Plan */}
                                <div className="rounded-xl border border-red-500/50 bg-red-950/20 p-6 flex flex-col relative group hover:border-red-500 transition-all hover:-translate-y-2 duration-300 shadow-[0_0_30px_rgba(220,38,38,0.15)] scale-105 z-10">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-lg border border-red-400">
                                        Most Popular
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                            Ruthless <Zap className="w-4 h-4 text-red-500 fill-red-500" />
                                        </h3>
                                        <div className="flex items-baseline gap-1 mt-2">
                                            <span className="text-4xl font-black text-white">$19</span>
                                            <span className="text-zinc-500 font-mono text-xs">/month</span>
                                        </div>
                                        <p className="text-xs text-red-200/70 mt-2 font-mono">Get hired or die trying.</p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        <li className="flex items-center gap-3 text-sm text-white">
                                            <Check className="w-4 h-4 text-red-500" />
                                            <span>Unlimited Scans</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-white">
                                            <Check className="w-4 h-4 text-red-500" />
                                            <span>Deep AI Analysis</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-white">
                                            <Check className="w-4 h-4 text-red-500" />
                                            <span>Auto-Rewrite & Export</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-white">
                                            <Check className="w-4 h-4 text-red-500" />
                                            <span>Priority Support</span>
                                        </li>
                                    </ul>

                                    <button
                                        onClick={() => alert("Redirecting to payment gateway...")}
                                        className="w-full py-4 rounded-lg bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-500 transition-all shadow-lg shadow-red-900/40 hover:shadow-red-500/20"
                                    >
                                        Upgrade Now
                                    </button>
                                </div>

                                {/* Enterprise Plan */}
                                <div className="rounded-xl border border-blue-500/30 bg-blue-950/10 p-6 flex flex-col relative group hover:border-blue-400 transition-all hover:-translate-y-1 duration-300">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                            God Mode <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                                        </h3>
                                        <div className="flex items-baseline gap-1 mt-2">
                                            <span className="text-4xl font-black text-white">$49</span>
                                            <span className="text-zinc-500 font-mono text-xs">/month</span>
                                        </div>
                                        <p className="text-xs text-blue-200/50 mt-2 font-mono">For absolute domination.</p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-blue-400" />
                                            <span>Everything in Ruthless</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-blue-400" />
                                            <span>1-on-1 Career Coaching</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-blue-400" />
                                            <span>LinkedIn Optimization</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-blue-400" />
                                            <span>Mock Interviews</span>
                                        </li>
                                    </ul>

                                    <button
                                        onClick={() => alert("Contacting sales...")}
                                        className="w-full py-4 rounded-lg border border-blue-500/50 text-blue-400 text-xs font-bold uppercase tracking-widest hover:bg-blue-500/10 transition-all"
                                    >
                                        Contact Sales
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors bg-black/20 rounded-full hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
