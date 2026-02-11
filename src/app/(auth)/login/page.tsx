"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight, Github } from "lucide-react"

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Check for errors or messages in URL
    const urlError = searchParams.get("error")
    const registered = searchParams.get("registered")

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true)
        setError(null)
        try {
            const callbackUrl = searchParams.get("callbackUrl") || "/";

            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            console.log("Login result:", result);

            if (result?.error) {
                setError("Invalid email or password")
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.")
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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Welcome back</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Enter your email to sign in to your account
                </p>
            </div>

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

            {(error || urlError) && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm flex items-center gap-2"
                >
                    <AlertCircle className="h-4 w-4" />
                    {error || (urlError === "CredentialsSignin" ? "Invalid email or password" : "Authentication failed")}
                </motion.div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
                                        type="email"
                                        {...field}
                                        className="h-11 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.99] transition-all"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Password</FormLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
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

                    <Button
                        type="submit"
                        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200 dark:border-gray-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gray-50 dark:bg-black px-2 text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full h-10 bg-white dark:bg-black border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <Github className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                    <Button variant="outline" className="w-full h-10 bg-white dark:bg-black border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>
                </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Create an account
                </Link>
            </p>
        </motion.div>
    )
}
