"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/dashboard/Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
            <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                {/* Mobile Header */}
                <header className="absolute top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-40 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
                        <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                    </Button>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">FitCore</span>
                    <div className="w-10" /> {/* Spacer for centering */}
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8 pt-20 lg:pt-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

