'use client'

import Navbar from "@/components/Navbar"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { User, Mail, Shield, Award, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import PricingModal from "@/components/PricingModal"

export default function ProfilePage() {
    const { data: session } = useSession()
    const [showPricing, setShowPricing] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        const storedImage = localStorage.getItem('userImage')
        if (storedImage) {
            setImagePreview(storedImage)
        }
    }, [])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setImagePreview(result)
                localStorage.setItem('userImage', result)
                window.dispatchEvent(new CustomEvent('profile-image-update', { detail: result }))
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <main className="min-h-screen bg-black text-white relative overflow-x-hidden pt-24 pb-12 px-4 md:px-8">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none z-0" />

            <Navbar
                user={session?.user as any}
                onOpenPricing={() => setShowPricing(true)}
            />

            <PricingModal
                isOpen={showPricing}
                onClose={() => setShowPricing(false)}
                currentPlan={(session?.user as any)?.planType || 'FREE'}
            />

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
                        Your <span className="text-gradient-pink">Profile</span>
                    </h1>
                    <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                        The Candidate // <span className="text-pink-500">Under Surveillance</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* User Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-1 glass-panel p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-pink-500"
                    >
                        <div className="relative group cursor-pointer mb-4">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="profile-upload"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="profile-upload" className="block relative cursor-pointer">
                                <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-pink-500">
                                    {imagePreview || session?.user?.image ? (
                                        <img
                                            src={imagePreview || session?.user?.image || ''}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-10 h-10 text-zinc-500" />
                                    )}

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <div className="text-[10px] uppercase font-bold text-white tracking-widest">Change</div>
                                    </div>
                                </div>
                            </label>

                            <div className="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full border-4 border-black z-20" title="Online" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">{session?.user?.name || 'Ruthless User'}</h2>
                        <p className="text-sm text-zinc-400 font-mono mb-6">{session?.user?.email}</p>

                        <div className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 mb-2">
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">Plan</span>
                            <span className="text-xs font-bold text-pink-500">{(session?.user as any)?.planType || 'FREE'}</span>
                        </div>
                        <div className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">Status</span>
                            <span className="text-xs font-bold text-green-500">ACTIVE</span>
                        </div>
                    </motion.div>

                    {/* Stats / Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-1 md:col-span-2 space-y-6"
                    >
                        {/* Account Details */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                                <Shield className="w-5 h-5 text-zinc-500" /> Account Security
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-zinc-900 border border-white/10">
                                            <Mail className="w-5 h-5 text-zinc-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Email Address</p>
                                            <p className="text-xs text-zinc-500 font-mono">{session?.user?.email}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">Verified</span>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-zinc-900 border border-white/10">
                                            <Shield className="w-5 h-5 text-zinc-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Password</p>
                                            <p className="text-xs text-zinc-500 font-mono">••••••••••••</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 rounded-full bg-white/5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border border-white/10 hover:bg-white/10 transition-colors">Change</button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Mockup */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                                <Clock className="w-5 h-5 text-zinc-500" /> Recent Activity
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors cursor-default">
                                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                                    <p className="text-sm text-zinc-300 flex-1">Analyzed "Frontend_Dev_Resume.pdf"</p>
                                    <span className="text-xs text-zinc-600 font-mono">2h ago</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors cursor-default">
                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                    <p className="text-sm text-zinc-300 flex-1">Failed match "Senior_Manager.docx"</p>
                                    <span className="text-xs text-zinc-600 font-mono">1d ago</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors cursor-default">
                                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                    <p className="text-sm text-zinc-300 flex-1">Login detected</p>
                                    <span className="text-xs text-zinc-600 font-mono">1d ago</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </main>
    )
}
