"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    CreditCard,
    Calendar,
    Dumbbell,
    Activity,
    Receipt,
    User,
    LogOut,
    Menu,
    X,
    Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { data: session } = useSession()

    // Using simple role check or default to MEMBER items
    const navItems = [
        { name: "Dashboard", href: "/member", icon: LayoutDashboard },
        { name: "Subscription", href: "/member/subscription", icon: CreditCard },
        { name: "Attendance", href: "/member/attendance", icon: Calendar },
        { name: "Workout Plan", href: "/member/workout-plan", icon: Dumbbell },
        { name: "Progress", href: "/member/progress", icon: Activity },
        { name: "Payments", href: "/member/payment-history", icon: Receipt },
        { name: "Notifications", href: "/member/notifications", icon: Bell },
        { name: "Profile", href: "/member/profile", icon: User },
    ]

    useEffect(() => {
        setMounted(true)
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close mobile sidebar on route change
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsMobileOpen(false)
        }
    }, [pathname, setIsMobileOpen])

    const sidebarVariants = {
        expanded: { width: 260 },
        collapsed: { width: 80 },
        mobileOpen: { x: 0, width: 260 },
        mobileClosed: { x: -260, width: 260 }
    }

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-black z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={
                    mounted && window.innerWidth < 1024
                        ? (isMobileOpen ? "mobileOpen" : "mobileClosed")
                        : (isSidebarOpen ? "expanded" : "collapsed")
                }
                variants={sidebarVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`fixed lg:relative z-50 h-screen bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden`}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/50">
                    <Link href="/" className="flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {(isSidebarOpen || (mounted && window.innerWidth < 1024)) ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                        <span className="text-white font-bold">F</span>
                                    </div>
                                    <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        FitCore
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="mx-auto"
                                >
                                    <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                        <span className="text-white font-bold text-xl">F</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>

                    {/* Toggle Button (Desktop only) */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex items-center justify-center w-6 h-6 rounded-half text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        {/* You could add a chevron icon here if desired */}
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-none">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={`relative flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}

                                    <item.icon
                                        className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                                            }`}
                                    />

                                    {(isSidebarOpen || window.innerWidth < 1024) && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="ml-3 font-medium truncate"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}

                                    {/* Tooltip for collapsed state */}
                                    {!isSidebarOpen && window.innerWidth >= 1024 && (
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-xl z-50 transform translate-y-0 group-hover:translate-x-1 transition-all">
                                            {item.name}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className={`flex items-center ${isSidebarOpen || window.innerWidth < 1024 ? "gap-3" : "justify-center"}`}>
                        <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-sm">
                            <AvatarImage src={session?.user?.image || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-medium">
                                {session?.user?.name?.[0] || "U"}
                            </AvatarFallback>
                        </Avatar>

                        {(isSidebarOpen || window.innerWidth < 1024) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 min-w-0"
                            >
                                <p className="text-sm font-semibold truncate text-slate-900 dark:text-slate-100">
                                    {session?.user?.name || "Member"}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {session?.user?.email}
                                </p>
                            </motion.div>
                        )}

                        {(isSidebarOpen || window.innerWidth < 1024) && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors rounded-full"
                                onClick={() => signOut({ callbackUrl: "/login" })}
                            >
                                <LogOut className="w-4 h-4" />
                            </Button>
                        )}
                    </div>

                    {(!isSidebarOpen && window.innerWidth >= 1024) && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mt-4 w-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                            <LogOut className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            </motion.aside>
        </>
    )
}
