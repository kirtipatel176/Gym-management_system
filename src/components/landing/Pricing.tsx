"use client";

import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Starter",
        price: "$49",
        description: "Perfect for small gyms and studios just getting started.",
        features: [
            "Up to 100 members",
            "Basic reporting",
            "Member portal",
            "Email support",
        ],
    },
    {
        name: "Pro",
        price: "$129",
        description: "Everything you need to scale your fitness business.",
        popular: true,
        features: [
            "Unlimited members",
            "Advanced revenue analytics",
            "Automated marketing",
            "Custom branded app",
            "24/7 Priority support",
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large chains and franchises with custom needs.",
        features: [
            "Dedicated account manager",
            "Multi-location management",
            "API access",
            "White-label solution",
            "On-site training",
        ],
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-background">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                        Simple, transparent <span className="text-gradient">pricing</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Choose the plan that fits your growth stage. No hidden fees. Cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-3xl flex flex-col transition-all duration-300 ${plan.popular
                                    ? "bg-white dark:bg-zinc-900 border-2 border-primary shadow-2xl shadow-primary/20 scale-105 z-10"
                                    : "bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:shadow-xl"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                                </div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? "bg-primary/10 text-primary" : "bg-gray-100 dark:bg-white/10 text-gray-500"}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className={`w-full py-6 text-base font-semibold rounded-xl transition-all ${plan.popular
                                        ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                                        : "bg-gray-100 dark:bg-white/10 text-foreground hover:bg-gray-200 dark:hover:bg-white/20"
                                    }`}
                                variant={plan.popular ? "default" : "secondary"}
                            >
                                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
