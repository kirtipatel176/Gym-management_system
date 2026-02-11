"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Timer, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WorkoutPlanPage() {
    // Mock workout data
    const workouts: any = {
        monday: [
            { id: 1, name: "Barbell Squat", sets: 4, reps: "8-10", rpe: 8, notes: "Focus on depth" },
            { id: 2, name: "Bench Press", sets: 4, reps: "8-12", rpe: 8, notes: "Explosive movement" },
            { id: 3, name: "Bent Over Rows", sets: 3, reps: "10-12", rpe: 7, notes: "Squeeze at top" },
        ],
        tuesday: [], // Rest day
        wednesday: [
            { id: 4, name: "Deadlift", sets: 3, reps: "5", rpe: 9, notes: "Keep back straight" },
            { id: 5, name: "Overhead Press", sets: 4, reps: "8-10", rpe: 8, notes: "Core tight" },
        ],
        // ... other days
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Weekly Workout Plan</h2>
                <p className="text-muted-foreground">
                    Your personalized training schedule.
                </p>
            </div>

            <Tabs defaultValue="monday" className="w-full">
                <TabsList className="w-full justify-start overflow-auto h-auto p-1 mb-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <TabsTrigger key={day} value={day.toLowerCase()} className="px-6 py-2">
                            {day}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                    const dayKey = day.toLowerCase();
                    const dayWorkouts = workouts[dayKey] || [];
                    const isRestDay = dayWorkouts.length === 0;

                    return (
                        <TabsContent key={day} value={dayKey} className="space-y-4">
                            {isRestDay ? (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                            <Timer className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Rest Day</h3>
                                        <p className="text-muted-foreground mt-2 max-w-sm">
                                            Recovery is just as important as training. Take a walk, stretch, or just relax today.
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {dayWorkouts.map((exercise: any) => (
                                        <AccordionItem key={exercise.id} value={`item-${exercise.id}`} className="border rounded-lg px-4">
                                            <AccordionTrigger className="hover:no-underline">
                                                <div className="flex items-center gap-4 text-left">
                                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
                                                        <Dumbbell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{exercise.name}</div>
                                                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                                            <Badge variant="secondary" className="text-xs">{exercise.sets} Sets</Badge>
                                                            <span className="text-xs">•</span>
                                                            <span className="text-xs">{exercise.reps} Reps</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="pt-4 pb-2 space-y-4">
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                                                            <span className="text-muted-foreground block mb-1">RPE Target</span>
                                                            <span className="font-semibold">{exercise.rpe} / 10</span>
                                                        </div>
                                                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                                                            <span className="text-muted-foreground block mb-1">Rest Timer</span>
                                                            <span className="font-semibold">90 Seconds</span>
                                                        </div>
                                                    </div>
                                                    {exercise.notes && (
                                                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-100 dark:border-amber-900/50">
                                                            <span className="text-amber-800 dark:text-amber-200 text-sm font-medium block mb-1">Trainer Notes:</span>
                                                            <p className="text-amber-700 dark:text-amber-300 text-sm">{exercise.notes}</p>
                                                        </div>
                                                    )}
                                                    <Button size="sm" variant="outline" className="w-full gap-2">
                                                        <PlayCircle className="w-4 h-4" />
                                                        Watch Tutorial
                                                    </Button>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
    )
}
