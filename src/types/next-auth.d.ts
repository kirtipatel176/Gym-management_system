import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: 'ADMIN' | 'TRAINER' | 'MEMBER'
            phone?: string
            status?: string
        } & DefaultSession["user"]
    }

    interface User {
        role: 'ADMIN' | 'TRAINER' | 'MEMBER'
        id: string
        phone?: string
        status?: string
        subscriptionStatus?: string
        subscriptionId?: string
        planId?: string
        currentPeriodEnd?: Date
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: 'ADMIN' | 'TRAINER' | 'MEMBER'
        id: string
        phone?: string
        status?: string
    }
}
