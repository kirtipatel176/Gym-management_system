"use client";

import { motion } from "framer-motion";
import { Dumbbell, Trophy, Users, Star } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel - Branding & Visuals */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-black">
                {/* Dynamic Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_#4f46e5_0%,_transparent_50%)] opacity-40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_#9333ea_0%,_transparent_50%)] opacity-40" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-white font-bold text-2xl">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                            <Dumbbell className="size-6 text-white" />
                        </div>
                        <span>FitCore</span>
                    </div>
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Transform your body, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Elevate your life.
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Join thousands of members who are achieving their fitness goals with our premium management platform.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4"
                    >
                        <div className="flex -space-x-4 rtl:space-x-reverse">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs text-white font-medium">
                                    <Users className="size-4" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                            </div>
                            <span className="text-sm text-gray-400">Trusted by 10,000+ members</span>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-10 text-sm text-gray-500">
                    © 2024 FitCore Inc. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-black/20">
                <div className="w-full max-w-[450px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
