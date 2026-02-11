"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Dumbbell,
    Calendar,
    CreditCard,
    User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { data: session } = useSession()
    const role = (session?.user as any)?.role

    // Close sidebar on mobile on route change
    useEffect(() => {
        setMounted(true)
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = {
        ADMIN: [
            { name: "Overview", href: "/admin", icon: LayoutDashboard },
            { name: "Members", href: "/admin/members", icon: Users },
            { name: "Trainers", href: "/admin/trainers", icon: Dumbbell },
            { name: "Settings", href: "/admin/settings", icon: Settings },
        ],
        TRAINER: [
            { name: "Dashboard", href: "/trainer", icon: LayoutDashboard },
            { name: "Schedule", href: "/trainer/schedule", icon: Calendar },
            { name: "My Members", href: "/trainer/members", icon: Users },
            { name: "Workouts", href: "/trainer/workouts", icon: Dumbbell },
        ],
        MEMBER: [
            { name: "Dashboard", href: "/member", icon: LayoutDashboard },
            { name: "My Plan", href: "/member/plan", icon: CreditCard },
            { name: "Schedule", href: "/member/schedule", icon: Calendar },
            { name: "Profile", href: "/member/profile", icon: User },
        ],
    }

    const currentNavItems = role ? navItems[role as keyof typeof navItems] : []

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mounted && isSidebarOpen && window.innerWidth < 768 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isSidebarOpen ? 240 : 80,
                    translateX: isSidebarOpen || (mounted && window.innerWidth >= 768) ? 0 : -240
                }}
                className={`fixed md:relative z-50 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 overflow-hidden ${!isSidebarOpen && mounted && window.innerWidth < 768 ? 'hidden' : ''
                    }`}
            >
                <div className="p-4 flex items-center justify-between h-16">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
                            >
                                GymApp
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mx-auto font-bold text-xl text-indigo-500"
                            >
                                G
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-1 p-2 space-y-1">
                    {currentNavItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors relative group ${isActive
                                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="ml-3 font-medium truncate"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                    {/* Tooltip for collapsed state */}
                                    {!isSidebarOpen && (
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                            {item.name}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className={`flex items-center ${isSidebarOpen ? "gap-3" : "justify-center"}`}>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                {session?.user?.name?.[0] || "U"}
                            </AvatarFallback>
                        </Avatar>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
                                    {session?.user?.name}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">
                                    {role?.toLowerCase()}
                                </p>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        className={`mt-4 w-full ${isSidebarOpen ? "justify-start" : "justify-center px-0"} text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20`}
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && <span className="ml-2">Logout</span>}
                    </Button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Menu className="w-5 h-5" />
                    </Button>
                    <div className="md:hidden font-semibold text-lg">
                        GymApp
                    </div>
                    <div className="w-5" /> {/* Spacer */}
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
