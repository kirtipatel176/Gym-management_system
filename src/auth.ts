import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import dbConnect from "@/lib/db"
import { User } from "@/models"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                await dbConnect();

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await User.findOne({ email });
                    if (!user) return null

                    const passwordsMatch = await bcrypt.compare(password, user.password || "")
                    if (passwordsMatch) {
                        // Return user object with subscription data
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            name: user.name,
                            role: user.role,
                            subscriptionStatus: user.subscriptionStatus,
                            planId: user.planId,
                            currentPeriodEnd: user.currentPeriodEnd,
                        }
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // On sign in, add user data to token
            if (user) {
                token.id = user.id
                token.role = user.role
                token.subscriptionStatus = user.subscriptionStatus
                token.planId = user.planId
                token.currentPeriodEnd = user.currentPeriodEnd
            }
            return token
        },
        async session({ session, token }) {
            // Expose token data to client session
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.subscriptionStatus = token.subscriptionStatus as string
                session.user.planId = token.planId as string
                session.user.currentPeriodEnd = token.currentPeriodEnd as Date
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})
