"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { CalendarCheck, TrendingUp, Clock, BarChart, Calendar as CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AttendancePage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Mock data for attendance
    const attendanceDates = [
        new Date(2025, 1, 1),
        new Date(2025, 1, 3),
        new Date(2025, 1, 5),
        new Date(2025, 1, 7),
        new Date(2025, 1, 8),
        new Date(2025, 1, 10),
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Attendance History</h2>
                <p className="text-muted-foreground">
                    Track your gym visits and consistency.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">124</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3 Days</div>
                        <p className="text-xs text-muted-foreground">Keep it up!</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">75 min</div>
                        <p className="text-xs text-muted-foreground">+5m vs last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <BarChart className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Visits so far</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-12 lg:col-span-4">
                    <Card className="h-full border-slate-200 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription>View your attendance by date</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center p-6">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow-sm p-4"
                                modifiers={{
                                    attended: attendanceDates
                                }}
                                modifiersStyles={{
                                    attended: {
                                        backgroundColor: "var(--primary)",
                                        color: "white",
                                        fontWeight: "bold",
                                        borderRadius: "50%"
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-12 lg:col-span-8">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Detailed log of your recent visits</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { date: "Feb 10, 2025", checkIn: "09:03 AM", checkOut: "10:30 AM", duration: "1h 27m" },
                                    { date: "Feb 08, 2025", checkIn: "06:15 PM", checkOut: "07:45 PM", duration: "1h 30m" },
                                    { date: "Feb 07, 2025", checkIn: "08:50 AM", checkOut: "10:00 AM", duration: "1h 10m" },
                                    { date: "Feb 05, 2025", checkIn: "09:00 AM", checkOut: "10:15 AM", duration: "1h 15m" },
                                    { date: "Feb 03, 2025", checkIn: "09:05 AM", checkOut: "10:45 AM", duration: "1h 40m" },
                                ].map((log, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                                <CalendarIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm">Gym Check-in</div>
                                                <div className="text-xs text-muted-foreground">{log.date}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-sm">{log.checkIn} - {log.checkOut}</div>
                                            <div className="text-xs text-green-600 dark:text-green-400 font-medium">{log.duration}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
        </div >
    )
}
