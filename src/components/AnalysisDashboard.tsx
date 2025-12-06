'use client'

import { AlertOctagon, CheckCircle, XCircle, Download, Copy, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AnalysisDashboard({ data }: { data: any }) {
    if (!data) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center glass-panel rounded-2xl p-12 text-center min-h-[600px]"
            >
                <div className="max-w-md">
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                        <AlertOctagon className="w-10 h-10 text-zinc-700" />
                    </div>
                    <h3 className="text-3xl font-bold text-zinc-700 uppercase tracking-tight">Awaiting Input</h3>
                    <p className="text-zinc-500 mt-4 font-mono text-sm leading-relaxed">
                        Upload your resume and the job description. <br />
                        Prepare for brutal honesty.
                    </p>
                </div>
            </motion.div>
        )
    }

    const { analysis, optimizedResume } = data
    const { matchScore, red_flags, weak_areas, missing_keywords, verdict } = analysis

    const handleCopy = () => {
        navigator.clipboard.writeText(optimizedResume)
        alert("Copied to clipboard. Now go fix it.")
    }

    const handleDownload = async () => {
        const res = await fetch('/api/generate-docx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: optimizedResume })
        })

        if (res.ok) {
            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'optimized_resume.docx'
            a.click()
        } else {
            alert("Download failed.")
        }
    }

    // Ruthless Color Scheme
    // < 50: Red (Fail)
    // < 80: Orange (Mediocre)
    // >= 80: Pink/Gradient (Pass? barely)
    const scoreColorClass = matchScore < 50 ? 'text-red-500' : matchScore < 80 ? 'text-orange-500' : 'text-pink-500'
    const scoreBorderClass = matchScore < 50 ? 'border-red-500/50' : matchScore < 80 ? 'border-orange-500/50' : 'border-pink-500/50'

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    }

    return (
        <div className="space-y-8">
            {/* Score Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(236,72,153,0.1)" }}
                className={`glass-panel border ${scoreBorderClass} p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden group transition-all`}
            >
                <div className="relative z-10 text-center md:text-left">
                    <h2 className={`text-7xl font-black mb-2 tracking-tighter ${scoreColorClass}`}>{matchScore}%</h2>
                    <p className="text-2xl font-bold uppercase tracking-widest text-white">{verdict}</p>
                </div>
                {/* Decorative Giant Number */}
                <div className={`hidden md:block absolute -top-10 -right-10 p-4 opacity-5 text-[250px] font-black leading-none select-none pointer-events-none ${scoreColorClass} group-hover:opacity-10 transition-opacity duration-500`}>
                    {matchScore}
                </div>
            </motion.div>

            {/* Feedback Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.01 }}
                    className="glass-panel p-8 rounded-2xl border-l-4 border-l-red-500 hover:bg-red-500/5 transition-colors"
                >
                    <h3 className="text-red-500 font-bold uppercase mb-6 flex items-center gap-2 tracking-wider text-sm">
                        <AlertOctagon className="w-5 h-5" /> Red Flags
                    </h3>
                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-4"
                    >
                        {red_flags?.map((flag: string, i: number) => (
                            <motion.li variants={itemVariants} key={i} className="flex items-start gap-3 text-sm text-zinc-300 group">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full group-hover:shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all" />
                                <span className="leading-relaxed font-light">{flag}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                    className="glass-panel p-8 rounded-2xl border-l-4 border-l-orange-500 hover:bg-orange-500/5 transition-colors"
                >
                    <h3 className="text-orange-500 font-bold uppercase mb-6 flex items-center gap-2 tracking-wider text-sm">
                        <XCircle className="w-5 h-5" /> Missing Keywords
                    </h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-wrap gap-2"
                    >
                        {missing_keywords?.map((kw: string, i: number) => (
                            <motion.span variants={itemVariants} key={i} className="px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs border border-orange-500/30 rounded-full font-mono hover:bg-orange-500/20 hover:text-orange-300 transition-all cursor-default select-none">
                                {kw}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Optimized Resume */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel p-8 rounded-2xl border border-white/5"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold uppercase tracking-wide flex items-center gap-2 text-white">
                        <CheckCircle className="w-5 h-5 text-emerald-500" /> Optimized Resume
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                            title="Copy"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                            title="Download DOCX"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-8 font-mono text-xs text-zinc-300 h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed custom-scrollbar shadow-inner">
                    {optimizedResume}
                </div>
            </motion.div>
        </div>
    )
}

