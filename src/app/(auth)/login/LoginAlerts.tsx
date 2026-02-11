"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

export function LoginAlerts() {
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error")
    const registered = searchParams.get("registered")

    return (
        <>
            {registered && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm flex items-center gap-2"
                >
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Account created successfully! Please sign in.
                </motion.div>
            )}

            {urlError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm flex items-center gap-2"
                >
                    <AlertCircle className="h-4 w-4" />
                    {urlError === "CredentialsSignin" ? "Invalid email or password" : "Authentication failed"}
                </motion.div>
            )}
        </>
    )
}
