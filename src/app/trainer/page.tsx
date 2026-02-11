"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function TrainerDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Trainer Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Today's Sessions", value: "8", icon: Calendar, color: "text-blue-500" },
                    { title: "Total Clients", value: "24", icon: Users, color: "text-green-500" },
                    { title: "Hours This Week", value: "32h", icon: Clock, color: "text-purple-500" },
                    { title: "Completed", value: "12", icon: CheckCircle, color: "text-orange-500" },
                ].map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.value}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Upcoming Sessions</CardTitle>
                        <CardDescription>You have 3 sessions remaining today</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { time: "10:00 AM", client: "Alice Johnson", type: "HIIT Workout" },
                                { time: "11:30 AM", client: "Bob Smith", type: "Strength Training" },
                                { time: "02:00 PM", client: "Charlie Brown", type: "Cardio Assessment" },
                            ].map((session, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-20 text-sm font-medium text-muted-foreground">{session.time}</div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.client}</p>
                                        <p className="text-xs text-muted-foreground">{session.type}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <Button size="sm" variant="outline">View</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Client Progress</CardTitle>
                        <CardDescription>Recent updates from your clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={`/avatars/0${i}.png`} alt="Avatar" />
                                        <AvatarFallback>C{i}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">Client {i}</p>
                                        <p className="text-xs text-muted-foreground">Logged a workout • 2h ago</p>
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
