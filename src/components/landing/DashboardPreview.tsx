"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Users, CreditCard, Activity, TrendingUp } from "lucide-react";

export function DashboardPreview() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                            Data that drives <span className="text-gradient">Growth</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Stop guessing. Start knowing. Our real-time analytics dashboard gives you
                            the insights you need to scale your fitness business with confidence.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ perspective: "1000px" }}
                    className="relative mx-auto max-w-6xl"
                >
                    {/* Glass Container / Browser Window */}
                    <div className="relative rounded-2xl border border-white/20 bg-white/50 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 dark:bg-black/40">
                        {/* Browser Header */}
                        <div className="h-12 border-b border-black/5 dark:border-white/5 flex items-center px-4 justify-between bg-white/50 dark:bg-black/20">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/10" />
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/10" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-black/10" />
                            </div>
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 text-xs font-medium text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                fitcore.app/dashboard
                            </div>
                            <div className="w-8" />
                        </div>

                        {/* Dashboard Interior */}
                        <div className="p-6 md:p-8 bg-gradient-to-br from-white/40 to-white/10 dark:from-white/5 dark:to-transparent">
                            {/* Stats Grid */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                                {[
                                    { label: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: CreditCard, color: "text-blue-500" },
                                    { label: "Active Members", value: "2,350", change: "+15%", icon: Users, color: "text-purple-500" },
                                    { label: "New Signups", value: "+122", change: "+42%", icon: TrendingUp, color: "text-green-500" },
                                    { label: "Active Now", value: "573", change: "+12%", icon: Activity, color: "text-orange-500" },
                                ].map((stat, i) => (
                                    <div key={i} className="p-5 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-2 rounded-lg bg-white dark:bg-white/10 ${stat.color} shadow-sm`}>
                                                <stat.icon className="w-5 h-5" />
                                            </div>
                                            <span className="flex items-center text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-500/20 px-2 py-0.5 rounded-full">
                                                {stat.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</div>
                                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Chart Area */}
                                <div className="lg:col-span-2 bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-xl p-6 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
                                        <div className="flex gap-2">
                                            {['1D', '1W', '1M', '1Y'].map((period) => (
                                                <button key={period} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${period === '1M' ? 'bg-primary text-primary-foreground' : 'hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground'}`}>
                                                    {period}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
                                        {[35, 60, 45, 75, 50, 65, 80, 55, 70, 45, 90, 60, 75, 50, 85].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0, opacity: 0 }}
                                                whileInView={{ height: `${h}%`, opacity: 1 }}
                                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                                className="flex-1 bg-gradient-to-t from-primary/80 to-primary rounded-t-sm hover:opacity-100 transition-opacity relative group"
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    ${h}k
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Side Panel / Recent Activity */}
                                <div className="bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-xl p-6 shadow-sm flex flex-col">
                                    <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
                                    <div className="space-y-6">
                                        {[
                                            { user: "Sarah J.", action: "New Membership", time: "2 min ago", amount: "+$49.00" },
                                            { user: "Mike T.", action: "Class Booking", time: "15 min ago", amount: "+$15.00" },
                                            { user: "Emma W.", action: "Pro Plan Upgrade", time: "1 hr ago", amount: "+$80.00" },
                                            { user: "James L.", action: "Merch Purchase", time: "2 hr ago", amount: "+$35.50" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                        {item.user[0]}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.user}</div>
                                                        <div className="text-xs text-muted-foreground">{item.action}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold text-foreground">{item.amount}</div>
                                                    <div className="text-[10px] text-muted-foreground">{item.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-6">
                                        <button className="w-full py-2 rounded-lg border border-primary/20 text-primary text-sm font-medium hover:bg-primary/5 transition-colors">
                                            View All Transactions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
