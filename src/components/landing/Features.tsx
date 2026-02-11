"use client";

import { motion } from "framer-motion";
import { Users, CreditCard, Activity, Calendar, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Member Management",
        description: "Easily track memberships, attendance, and member profiles in one place with our intuitive CRM.",
        colSpan: "md:col-span-2",
        bg: "bg-blue-50/50 dark:bg-blue-900/10",
        color: "text-blue-600 dark:text-blue-400"
    },
    {
        icon: CreditCard,
        title: "Automated Payments",
        description: "Secure recurring billing and payment processing with Stripe integration.",
        colSpan: "md:col-span-1",
        bg: "bg-purple-50/50 dark:bg-purple-900/10",
        color: "text-purple-600 dark:text-purple-400"
    },
    {
        icon: Activity,
        title: "Workout Tracking",
        description: "Create and assign digital workout plans. Track progress with AI insights.",
        colSpan: "md:col-span-1",
        bg: "bg-green-50/50 dark:bg-green-900/10",
        color: "text-green-600 dark:text-green-400"
    },
    {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "Seamless booking system for classes and personal training sessions that syncs with everyone's calendars.",
        colSpan: "md:col-span-2",
        bg: "bg-orange-50/50 dark:bg-orange-900/10",
        color: "text-orange-600 dark:text-orange-400"
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Real-time insights into revenue, retention, and growth metrics to help you make data-driven decisions.",
        colSpan: "md:col-span-3 lg:col-span-3",
        bg: "bg-indigo-50/50 dark:bg-indigo-900/10",
        color: "text-indigo-600 dark:text-indigo-400"
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 relative bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                        Everything you need <br /> to run a <span className="text-gradient">modern gym</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Powerful features built for forward-thinking fitness businesses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`${feature.colSpan} p-8 rounded-3xl border border-border bg-card hover:bg-muted/50 transition-all group relative overflow-hidden`}
                        >
                            <div className={`absolute top-0 right-0 p-32 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${feature.bg.replace('/50', '').replace('/10', '')}`} />

                            <div className="relative z-10 h-full flex flex-col">
                                <div className={`mb-6 w-12 h-12 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.color} ring-1 ring-black/5 dark:ring-white/10`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                                    {feature.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
