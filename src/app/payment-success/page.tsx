"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Confetti from 'react-confetti'

export default function PaymentSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { update } = useSession()
    const [countdown, setCountdown] = useState(5)
    const [showConfetti, setShowConfetti] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // Set mounted to true only on client side
        setIsMounted(true)

        // Refresh session to get updated subscription status
        update()

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push('/member')
                    router.refresh() // Force a full page refresh to get new session
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        // Stop confetti after 5 seconds
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false)
        }, 5000)

        return () => {
            clearInterval(timer)
            clearTimeout(confettiTimer)
        }
    }, [router, update])

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {isMounted && showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <Card className="border-green-500/50 shadow-2xl shadow-green-500/20">
                    <CardHeader className="text-center space-y-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                            className="mx-auto"
                        >
                            <div className="relative">
                                <CheckCircle className="h-24 w-24 text-green-500 mx-auto" strokeWidth={1.5} />
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 0.5
                                    }}
                                    className="absolute inset-0 bg-green-500/20 rounded-full"
                                />
                            </div>
                        </motion.div>

                        <CardTitle className="text-3xl font-bold text-green-600">
                            Payment Successful!
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                        >
                            <p className="text-xl font-semibold">
                                Subscription Activated! 🎉
                            </p>
                            <p className="text-muted-foreground">
                                Thank you for subscribing. Your membership is now active.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg"
                        >
                            <p className="text-sm text-muted-foreground">
                                Redirecting to your dashboard in
                            </p>
                            <p className="text-4xl font-bold text-primary mt-2">
                                {countdown}
                            </p>
                        </motion.div>

                        <Button
                            onClick={() => router.push('/member')}
                            className="w-full"
                            size="lg"
                        >
                            Go to Dashboard Now
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
