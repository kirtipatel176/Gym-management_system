"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Check, Loader2, Zap, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

const PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        price: 49,
        features: ['Access to gym equipment', '1 group class per week', 'Locker access'],
        recommended: false,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 129,
        features: ['Everything in Basic', 'Unlimited group classes', 'Personal trainer session (monthly)', 'Nutrition guidance'],
        recommended: true,
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 249,
        features: ['Everything in Pro', '24/7 gym access', 'Weekly personal training', 'Spa & sauna access', 'Priority booking'],
        recommended: false,
    },
];

export default function SubscriptionPage() {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [currentPlan, setCurrentPlan] = useState<string | null>(null)

    // Simulating fetching current plan
    useEffect(() => {
        // In a real app, fetch from API
        // setCurrentPlan('pro')
    }, [])

    const handleSubscribe = async (planId: string) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/create-checkout-session', { planId });
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to start checkout. Please try again.');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Subscription & Billing</h2>
                    <p className="text-muted-foreground">
                        Choose the perfect plan for your fitness journey.
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {PLANS.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="h-full"
                    >
                        <Card className={`relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.recommended
                                ? 'border-2 border-indigo-600 shadow-lg shadow-indigo-500/10 scale-105 z-10'
                                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900'
                            }`}>
                            {plan.recommended && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
                            )}

                            {plan.recommended && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                                    <Badge className="bg-indigo-600 hover:bg-indigo-700 border-0 px-4 py-1 text-sm shadow-md">
                                        <Crown className="w-3 h-3 mr-1" />
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className={`${plan.recommended ? 'pt-8' : 'pt-6'}`}>
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold tracking-tight">${plan.price}</span>
                                    <span className="ml-1 text-lg text-muted-foreground font-medium">/month</span>
                                </div>
                                <CardDescription className="mt-2 text-base">
                                    Perfect for {plan.name.toLowerCase()} usage and standard features.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <ul className="space-y-4 mt-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.recommended ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                }`}>
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <span className="text-slate-700 dark:text-slate-300 leading-tight">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pb-8">
                                <Button
                                    className={`w-full py-6 text-base font-semibold transition-all ${plan.recommended
                                            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30'
                                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    variant={plan.recommended ? "default" : "outline"}
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className={`w-4 h-4 mr-2 ${plan.recommended ? 'fill-white' : ''}`} />
                                            Subscribe to {plan.name}
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="text-center text-sm text-muted-foreground mt-8">
                <p>Secure payment processing focused on your privacy and security.</p>
                <p className="mt-1">Cancel anytime through your account settings.</p>
            </div>
        </div>
    )
}
