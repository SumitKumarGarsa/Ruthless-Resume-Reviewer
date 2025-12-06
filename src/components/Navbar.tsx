import { useState, useEffect } from 'react'
import Link from 'next/link'
import { signOut } from "next-auth/react"
import { LogOut, Zap, User, ChevronDown, Settings, CreditCard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
    user: {
        email?: string | null
        image?: string | null
        planType?: string
    } | undefined
    onOpenPricing: () => void
}

export default function Navbar({ user, onOpenPricing }: NavbarProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(user?.image)

    useEffect(() => {
        // Load from local storage on mount
        const storedImage = localStorage.getItem('userImage')
        if (storedImage) {
            setAvatarUrl(storedImage)
        }

        // Listen for updates
        const handleImageUpdate = (e: any) => {
            if (e.detail) {
                setAvatarUrl(e.detail)
            }
        }

        window.addEventListener('profile-image-update', handleImageUpdate)
        return () => window.removeEventListener('profile-image-update', handleImageUpdate)
    }, [])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-8">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
            >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                    <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-white leading-none">
                        RUTHLESS
                        <span className="text-pink-500 font-light ml-1">MATCHER</span>
                    </span>
                </div>
            </motion.div>

            {/* Right Actions */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-6"
            >
                {/* Plan Badge */}
                <button
                    onClick={onOpenPricing}
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white uppercase tracking-wider">
                        {user?.planType || 'FREE'}
                    </span>
                </button>

                <div className="h-4 w-px bg-white/10 hidden md:block" />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors outline-none"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-zinc-400 font-mono group-hover:text-white transition-colors">{user?.email}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center relative overflow-hidden">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-4 h-4 text-zinc-500" />
                            )}
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                        </div>
                        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-full mt-2 w-56 glass-panel rounded-xl border border-white/10 p-2 shadow-xl z-50 flex flex-col gap-1"
                            >
                                <div className="px-3 py-2 border-b border-white/5 mb-1 sm:hidden">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Signed in as</p>
                                    <p className="text-sm text-white font-mono truncate">{user?.email}</p>
                                </div>

                                <Link href="/profile" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left" onClick={() => setIsProfileOpen(false)}>
                                    <User className="w-4 h-4" /> Profile
                                </Link>
                                <Link href="/settings" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left" onClick={() => setIsProfileOpen(false)}>
                                    <Settings className="w-4 h-4" /> Settings
                                </Link>
                                <button onClick={() => { onOpenPricing(); setIsProfileOpen(false) }} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left sm:hidden">
                                    <CreditCard className="w-4 h-4" /> Upgrade Plan
                                </button>

                                <div className="h-px bg-white/5 my-1" />

                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </nav>
    )
}
