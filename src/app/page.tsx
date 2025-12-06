'use client'

import { useSession, signOut } from "next-auth/react"
import UploadSection from "@/components/UploadSection"
import AnalysisDashboard from "@/components/AnalysisDashboard"
import Chatbot from "@/components/Chatbot"
import PricingModal from "@/components/PricingModal"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Home() {
  const { data: session, status } = useSession()
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showPricing, setShowPricing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") return <div className="min-h-screen bg-black text-white p-12 flex items-center justify-center font-mono animate-pulse">Initializing...</div>

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden pt-24 pb-12 px-4 md:px-8">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        currentPlan={(session?.user as any)?.planType || 'FREE'}
      />

      {/* Navbar */}
      <Navbar
        user={session?.user as any}
        onOpenPricing={() => setShowPricing(true)}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-8">
            <UploadSection onAnalysisComplete={setAnalysisResult} />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8 space-y-8">
            <AnalysisDashboard data={analysisResult} />
          </div>
        </div>

        <Chatbot context={analysisResult} />
      </div>
    </main>
  )
}
