import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingDown, TrendingUp, Camera, Upload, Calendar } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function ProgressPage() {
    const [weightHistory] = useState([
        { date: 'Aug', weight: 85.0 },
        { date: 'Sep', weight: 84.2 },
        { date: 'Oct', weight: 82.5 },
        { date: 'Nov', weight: 81.0 },
        { date: 'Dec', weight: 79.8 },
        { date: 'Jan', weight: 78.5 },
    ])

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Progress Tracking</h2>
                <p className="text-muted-foreground">
                    Visualize your journey and track key metrics.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
                        <TrendingDown className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78.5 kg</div>
                        <p className="text-xs text-muted-foreground">-1.2kg from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Body Fat %</CardTitle>
                        <TrendingDown className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18.5%</div>
                        <p className="text-xs text-muted-foreground">-0.5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Muscle Mass</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">62.1 kg</div>
                        <p className="text-xs text-muted-foreground">+0.3kg from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-7">
                <Card className="md:col-span-4">
                    <CardHeader>
                        <CardTitle>Weight Progress</CardTitle>
                        <CardDescription>Last 6 months history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weightHistory}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        hide={false}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                        domain={['dataMin - 2', 'dataMax + 2']}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#0F172A', fontWeight: 600 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="weight"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 6, fill: '#6366f1', strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Update Measurements</CardTitle>
                        <CardDescription>Log your latest stats</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input id="weight" placeholder="0.0" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bodyFat">Body Fat (%)</Label>
                                    <Input id="bodyFat" placeholder="0.0" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Photo Check-in</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                                            <Camera className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Front View</span>
                                    </div>
                                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                                            <Camera className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Side View</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <Calendar className="h-3 w-3" />
                                    <span>Today, {new Date().toLocaleDateString()}</span>
                                </div>
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Save Entry
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
