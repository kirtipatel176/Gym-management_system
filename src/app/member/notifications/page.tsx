"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Info, CheckCircle, AlertTriangle } from "lucide-react"

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            title: "Membership Renewed",
            message: "Your Pro Plan membership has been successfully renewed for another month.",
            time: "2 hours ago",
            type: "success",
            read: false,
        },
        {
            id: 2,
            title: "Class Canceled",
            message: "The Yoga Flow session scheduled for tomorrow at 9:00 AM has been canceled by the instructor.",
            time: "Yesterday",
            type: "warning",
            read: true,
        },
        {
            id: 3,
            title: "New Feature Available",
            message: "Check out the new Progress Tracking dashboard to visualize your fitness journey!",
            time: "3 days ago",
            type: "info",
            read: true,
        },
        {
            id: 4,
            title: "Payment Failed",
            message: "We were unable to process your payment for the upcoming month. Please update your payment method.",
            time: "1 week ago",
            type: "error",
            read: true,
        },
    ]

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />
            case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />
            case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />
            case 'info':
            default: return <Info className="h-5 w-5 text-blue-500" />
        }
    }

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                <p className="text-muted-foreground">
                    Stay updated with important alerts and messages.
                </p>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-indigo-500' : ''}`}>
                        <CardContent className="p-4 flex gap-4 items-start">
                            <div className="mt-1 flex-shrink-0">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start">
                                    <h4 className={`text-sm font-semibold ${!notification.read ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {notification.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                        {notification.time}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                </p>
                            </div>
                            {!notification.read && (
                                <div className="mt-2">
                                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">New</Badge>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
