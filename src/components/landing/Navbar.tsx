"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-gray-200"
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground">
                        F
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">FitCore</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <Link href="#features" className="hover:text-primary transition-colors">
                    Features
                </Link>
                <Link href="#pricing" className="hover:text-primary transition-colors">
                    Pricing
                </Link>
                <Link href="#testimonials" className="hover:text-primary transition-colors">
                    Testimonials
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {session ? (
                    <>
                        <Link href={
                            session.user?.role === "ADMIN" ? "/admin" :
                                session.user?.role === "TRAINER" ? "/trainer" :
                                    session.user?.role === "MEMBER" ? "/member" :
                                        "/"
                        }>
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                        <Button onClick={() => signOut()} variant="outline">
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors hidden sm:block">
                            Sign In
                        </Link>
                        <Link href="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </>
                )}
            </div>
        </motion.nav>
    );
}
