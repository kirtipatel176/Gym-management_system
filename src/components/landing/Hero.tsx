"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle, Star, Sparkles, TrendingUp, Users, Activity } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section ref={targetRef} className="relative pt-32 pb-32 overflow-hidden bg-background">
            {/* Premium Mesh Background */}
            <div className="absolute inset-0 mesh-gradient-light opacity-60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <motion.div
                        style={{ opacity, y }}
                        className="flex-1 text-center lg:text-left pt-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-primary/20 text-primary text-sm font-semibold mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                    Revolutionizing Gym Management
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-foreground">
                                Manage less, <br />
                                <span className="text-gradient">Grow more.</span>
                            </h1>

                            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                The all-in-one platform designed for modern fitness businesses.
                                Automate memberships, scheduling, and payments with
                                <span className="font-semibold text-foreground"> elegance & speed</span>.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 bg-gradient-to-r from-primary to-purple-600 border-0">
                                    Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-2 hover:bg-muted/50 transition-all hover:scale-105">
                                    <PlayCircle className="mr-2 w-5 h-5" /> View Demo
                                </Button>
                            </div>

                            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm font-medium text-muted-foreground">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 relative overflow-hidden">
                                            <Image
                                                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i * 123}`}
                                                alt="User"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-xs text-primary font-bold">
                                        +2k
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span>Trusted by top gyms</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ scale }}
                        className="flex-1 w-full max-w-[650px] lg:max-w-none relative"
                    >
                        {/* Main Image Container */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3] group">
                            <Image
                                src="/hero-gym.png"
                                alt="Modern Gym Interior"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Floating UI Card 1: Revenue */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-4 max-w-[200px]"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium">Monthly Revenue</div>
                                    <div className="text-lg font-bold text-gray-900">+$12,450</div>
                                </div>
                            </motion.div>

                            {/* Floating UI Card 2: Active Members */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium">Active Members</div>
                                    <div className="text-lg font-bold text-gray-900">2,350</div>
                                </div>
                            </motion.div>

                            {/* Floating UI Card 3: Live Activity */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3"
                            >
                                <div className="relative">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                                </div>
                                <span className="text-white font-medium text-sm">Gym is currently at 78% capacity</span>
                            </motion.div>
                        </div>

                        {/* Decorative background blur */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 opacity-20 blur-3xl -z-10 rounded-full" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
