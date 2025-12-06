'use client'

import Navbar from "@/components/Navbar"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { User, Bell, Lock, Eye, Monitor, Save, Loader2, Check } from "lucide-react"
import { useState } from "react"
import PricingModal from "@/components/PricingModal"

export default function SettingsPage() {
    const { data: session } = useSession()
    const [showPricing, setShowPricing] = useState(false)
    const [activeTab, setActiveTab] = useState('general')
    // Mock settings state
    const [notifications, setNotifications] = useState(true)
    const [publicProfile, setPublicProfile] = useState(false)
    const [ruthlessMode, setRuthlessMode] = useState(true)

    const [isSaving, setIsSaving] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false)
            setIsSaved(true)
            setTimeout(() => setIsSaved(false), 2000)
        }, 1500)
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
                        System <span className="text-gradient-pink">Settings</span>
                    </h1>
                    <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                        Configuration // <span className="text-pink-500">Global Parameters</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Navigation Sidebar */}
                    <div className="col-span-1 space-y-2 hidden md:block">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold border flex items-center gap-3 transition-colors ${activeTab === 'general' ? 'bg-white/10 text-white border-white/10' : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'}`}
                        >
                            <Monitor className="w-4 h-4" /> General
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold border flex items-center gap-3 transition-colors ${activeTab === 'notifications' ? 'bg-white/10 text-white border-white/10' : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'}`}
                        >
                            <Bell className="w-4 h-4" /> Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold border flex items-center gap-3 transition-colors ${activeTab === 'privacy' ? 'bg-white/10 text-white border-white/10' : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'}`}
                        >
                            <Lock className="w-4 h-4" /> Privacy
                        </button>
                    </div>

                    {/* Settings Content */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'general' && (
                                <div className="glass-panel p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                                        <Monitor className="w-5 h-5 text-zinc-500" /> App Preferences
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-white mb-1">Ruthless Mode</p>
                                                <p className="text-xs text-zinc-500">Enable harsh critiques and unfiltered feedback.</p>
                                            </div>
                                            <button
                                                onClick={() => setRuthlessMode(!ruthlessMode)}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors ${ruthlessMode ? 'bg-pink-500' : 'bg-zinc-700'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${ruthlessMode ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                        <div className="h-px bg-white/5" />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-white mb-1">Dark Glass Theme</p>
                                                <p className="text-xs text-zinc-500">Only dark mode is supported.</p>
                                            </div>
                                            <button
                                                disabled
                                                className={`w-12 h-6 rounded-full p-1 transition-colors bg-zinc-800 opacity-50 cursor-not-allowed`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-zinc-500 transition-transform translate-x-6`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="glass-panel p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-zinc-500" /> Notifications
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-white mb-1">Email Alerts</p>
                                                <p className="text-xs text-zinc-500">Receive analysis results via email.</p>
                                            </div>
                                            <button
                                                onClick={() => setNotifications(!notifications)}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-green-500' : 'bg-zinc-700'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'privacy' && (
                                <div className="glass-panel p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-zinc-500" /> Privacy Control
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-white mb-1">Public Profile</p>
                                                <p className="text-xs text-zinc-500">Allow others to see your ruthless score.</p>
                                            </div>
                                            <button
                                                onClick={() => setPublicProfile(!publicProfile)}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors ${publicProfile ? 'bg-blue-500' : 'bg-zinc-700'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${publicProfile ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex items-center justify-between opacity-50">
                                            <div>
                                                <p className="text-sm font-bold text-white mb-1">Data Retention</p>
                                                <p className="text-xs text-zinc-500">Auto-delete uploads after 30 days.</p>
                                            </div>
                                            <div className="text-xs font-mono text-zinc-500">FORCED (30 DAYS)</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || isSaved}
                                    className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 min-w-[160px] justify-center ${isSaved
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-black hover:bg-zinc-200'
                                        }`}
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : isSaved ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Saved!
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}
