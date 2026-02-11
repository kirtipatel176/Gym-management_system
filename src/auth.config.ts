import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // Authorization is handled by middleware.ts with role-based redirects
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
                token.phone = user.phone
                token.status = user.status
                token.subscriptionStatus = user.subscriptionStatus
                token.planId = user.planId
                token.currentPeriodEnd = user.currentPeriodEnd
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as any
                session.user.id = token.id as string
                session.user.phone = token.phone as string
                session.user.status = token.status as string
                session.user.subscriptionStatus = token.subscriptionStatus as string
                session.user.planId = token.planId as string
                session.user.currentPeriodEnd = token.currentPeriodEnd as Date
            }
            return session
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig
