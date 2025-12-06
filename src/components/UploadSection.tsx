'use client'

import { useState } from 'react'
import { Upload, FileText, AlertTriangle, File, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UploadSection({ onAnalysisComplete }: { onAnalysisComplete: (data: any) => void }) {
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [jdFile, setJdFile] = useState<File | null>(null)
    const [resumeText, setResumeText] = useState<string>('')
    const [jdText, setJdText] = useState<string>('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const handleAnalyze = async () => {
        if ((!resumeFile && !resumeText) || (!jdFile && !jdText)) {
            alert("Upload your files or paste text, you lazy bum.")
            return
        }

        setIsAnalyzing(true)

        const formData = new FormData()
        if (resumeFile) formData.append('resumeFile', resumeFile)
        if (jdFile) formData.append('jdFile', jdFile)
        formData.append('resumeText', resumeText)
        formData.append('jdText', jdText)

        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Analysis failed')

            onAnalysisComplete(data)
        } catch (err: any) {
            alert(err.message)
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Preloader Overlay */}
            <AnimatePresence>
                {isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full animate-pulse" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 border-4 border-zinc-800 border-t-red-600 rounded-full relative z-10"
                            />
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                className="absolute inset-0 flex items-center justify-center z-10"
                            >
                                <Zap className="w-8 h-8 text-red-500 fill-red-500" />
                            </motion.div>
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 text-2xl font-black uppercase tracking-widest text-white text-center"
                        >
                            Ruthless Analysis <span className="text-red-600">In Progress</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-2 text-zinc-500 font-mono text-sm"
                        >
                            Destroying your ego... please wait.
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Resume Upload */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.01, borderColor: 'rgba(236, 72, 153, 0.3)' }}
                className="glass-panel p-6 rounded-2xl relative overflow-hidden group transition-all"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2 tracking-wide text-white">
                    <FileText className="w-5 h-5 text-pink-500" /> Upload Resume
                </h3>

                <div className="relative">
                    <input type="file" className="hidden" id="resume-upload" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />
                    <label
                        htmlFor="resume-upload"
                        className="block border border-dashed border-zinc-700 hover:border-pink-500/50 transition-all duration-300 p-8 text-center cursor-pointer rounded-xl bg-black/20 hover:bg-black/40 group-hover:shadow-lg"
                    >
                        {resumeFile ? (
                            <div className="flex flex-col items-center gap-2">
                                <File className="w-8 h-8 text-pink-500" />
                                <span className="text-white font-mono text-sm">{resumeFile.name}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                                <span className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">Drop PDF/DOCX here</span>
                            </div>
                        )}
                    </label>
                </div>

                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-px flex-1 bg-white/10"></span>
                        <span className="text-[10px] text-zinc-500 uppercase font-mono">OR PASTE TEXT</span>
                        <span className="h-px flex-1 bg-white/10"></span>
                    </div>
                    <textarea
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 h-32 resize-none transition-all placeholder:text-zinc-700 hover:bg-black/40"
                        placeholder="Paste resume content here..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                    />
                </div>
            </motion.div>

            {/* JD Upload */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.01, borderColor: 'rgba(236, 72, 153, 0.3)' }}
                className="glass-panel p-6 rounded-2xl relative overflow-hidden group transition-all"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2 tracking-wide text-white">
                    <Upload className="w-5 h-5 text-orange-500" /> Job Description
                </h3>

                <div className="relative">
                    <input type="file" className="hidden" id="jd-upload" onChange={(e) => setJdFile(e.target.files?.[0] || null)} />
                    <label
                        htmlFor="jd-upload"
                        className="block border border-dashed border-zinc-700 hover:border-orange-500/50 transition-all duration-300 p-8 text-center cursor-pointer rounded-xl bg-black/20 hover:bg-black/40 group-hover:shadow-lg"
                    >
                        {jdFile ? (
                            <div className="flex flex-col items-center gap-2">
                                <File className="w-8 h-8 text-orange-500" />
                                <span className="text-white font-mono text-sm">{jdFile.name}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                                <span className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">Drop PDF/DOCX here</span>
                            </div>
                        )}
                    </label>
                </div>

                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-px flex-1 bg-white/10"></span>
                        <span className="text-[10px] text-zinc-500 uppercase font-mono">OR PASTE TEXT</span>
                        <span className="h-px flex-1 bg-white/10"></span>
                    </div>
                    <textarea
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 h-32 resize-none transition-all placeholder:text-zinc-700 hover:bg-black/40"
                        placeholder="Paste JD content here..."
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                    />
                </div>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-white text-black font-black uppercase py-4 rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all tracking-[0.2em] text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                    </span>
                ) : (
                    'Analyze Ruthlessly'
                )}
            </motion.button>
        </div>
    )
}

