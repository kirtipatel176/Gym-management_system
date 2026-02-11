"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Loader2, ArrowRight, UserCircle, Dumbbell, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

const ROLES = ["MEMBER", "TRAINER"] as const;

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["MEMBER", "TRAINER"]),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function RegisterPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "MEMBER",
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true)
        setError(null)
        try {
            await axios.post("/api/auth/register", values)
            router.push("/login?registered=true")
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Create an account</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Join us today and start your journey
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">I want to join as a</FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-2 gap-4">
                                            {ROLES.map((role) => (
                                                <div
                                                    key={role}
                                                    className={cn(
                                                        "cursor-pointer relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                                                        field.value === role
                                                            ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20"
                                                            : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-black/50"
                                                    )}
                                                    onClick={() => field.onChange(role)}
                                                >
                                                    {field.value === role && (
                                                        <div className="absolute top-2 right-2 text-indigo-600">
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                    {role === "MEMBER" ? (
                                                        <UserCircle className={cn("h-8 w-8 mb-2", field.value === role ? "text-indigo-600" : "text-gray-400")} />
                                                    ) : (
                                                        <Dumbbell className={cn("h-8 w-8 mb-2", field.value === role ? "text-indigo-600" : "text-gray-400")} />
                                                    )}
                                                    <span className={cn("text-sm font-semibold", field.value === role ? "text-indigo-900 dark:text-indigo-100" : "text-gray-600 dark:text-gray-400")}>
                                                        {role === "MEMBER" ? "Member" : "Trainer"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} className="h-11 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.99] transition-all" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name@example.com" type="email" {...field} className="h-11 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.99] transition-all" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 234 567 890" {...field} className="h-11 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.99] transition-all" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="h-11 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-indigo-500/20 pr-10 active:scale-[0.99] transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="h-11 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-indigo-500/20 pr-10 active:scale-[0.99] transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create Account <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Sign in
                </Link>
            </div>
        </motion.div>
    )
}
