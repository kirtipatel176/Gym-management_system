"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
    const { data: session } = useSession()

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={session?.user?.image || ""} />
                                <AvatarFallback className="text-lg bg-indigo-100 text-indigo-600">
                                    {session?.user?.name?.[0] || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Avatar</Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue={session?.user?.name || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue={session?.user?.email || ""} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end border-t p-4">
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage how you want to be notified.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Workout Reminders</Label>
                                <p className="text-sm text-muted-foreground">Get reminded about upcoming scheduled workouts.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Marketing Emails</Label>
                                <p className="text-sm text-muted-foreground">Receive news and special offers.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Manage your password and security settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end border-t p-4">
                        <Button variant="outline">Update Password</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
