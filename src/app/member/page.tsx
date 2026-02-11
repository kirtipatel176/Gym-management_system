"use client"

import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Activity, Calendar, Zap, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Overview } from "@/components/dashboard/Overview"

export default function MemberDashboard() {
    const { data: session } = useSession()
    const router = useRouter()

    // Check subscription status
    const isSubscribed = session?.user?.subscriptionStatus === 'active'

    if (!isSubscribed) {
        return (
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome, {session?.user?.name?.split(' ')[0] || 'Member'} 👋
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Complete your subscription to unlock full access.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-lg col-span-full md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-2xl">Unlock Your Potential</CardTitle>
                            <CardDescription className="text-indigo-100">
                                Get access to personalized workout plans, progress tracking, and exclusive member content.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2">
                                    <div className="bg-white/20 p-1 rounded-full"><Activity className="w-4 h-4" /></div>
                                    <span>Advanced Performance Tracking</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-white/20 p-1 rounded-full"><Calendar className="w-4 h-4" /></div>
                                    <span>Unlimited Class Bookings</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-white/20 p-1 rounded-full"><Zap className="w-4 h-4" /></div>
                                    <span>Exclusive Member Discounts</span>
                                </li>
                            </ul>
                            <Button size="lg" variant="secondary" onClick={() => router.push('/member/subscription')} className="font-semibold text-indigo-700">
                                View Subscription Plans <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Why Subscribe?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                                <div>
                                    <p className="font-medium">Track Real Progress</p>
                                    <p className="text-sm text-muted-foreground">Visualize your journey with detailed charts.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="font-medium">Save Time</p>
                                    <p className="text-sm text-muted-foreground">Automated check-ins and payments.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {session?.user?.name?.split(' ')[0] || 'Member'} 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here&apos;s what&apos;s happening with your fitness journey today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => router.push('/member/workout-plan')}>
                        View Workout
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/member/attendance')}>
                        Check In
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Plan
                            </CardTitle>
                            <Zap className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Pro Member</div>
                            <p className="text-xs text-muted-foreground">
                                Valid until Dec 31, 2026
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Monthly Attendance
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12 Days</div>
                            <p className="text-xs text-muted-foreground">
                                +2 from last month
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Weight Goal
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-2.5 kg</div>
                            <Progress value={65} className="h-2 mt-2" />
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Next Session
                            </CardTitle>
                            <Clock className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">10:00 AM</div>
                            <p className="text-xs text-muted-foreground">
                                Tomorrow • HIIT
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Activity Graph Placeholder */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Activity Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>

                {/* Upcoming Classes */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Classes</CardTitle>
                        <CardDescription>
                            Your schedule for the week.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Yoga Flow", time: "09:00 AM", day: "Tomorrow", trainer: "Sarah J." },
                                { name: "HIIT Blast", time: "11:00 AM", day: "Sat, Feb 14", trainer: "Mike R." },
                                { name: "Cardio Mix", time: "05:00 PM", day: "Mon, Feb 16", trainer: "Sarah J." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.day} at {item.time}</p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                        {item.trainer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
