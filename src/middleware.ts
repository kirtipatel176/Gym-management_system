import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const user = req.auth?.user;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPublicRoute = ["/", "/login", "/register"].includes(nextUrl.pathname);
    const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            // Redirect based on role if already logged in
            switch (user?.role) {
                case "ADMIN":
                    return NextResponse.redirect(new URL("/admin", nextUrl));
                case "TRAINER":
                    return NextResponse.redirect(new URL("/trainer", nextUrl));
                case "MEMBER":
                    return NextResponse.redirect(new URL("/member", nextUrl));
                default:
                    // Default for generic users if role not set
                    return NextResponse.redirect(new URL("/", nextUrl));
            }
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        // If not logged in and not public, redirect to login
        // But we allow all other routes for now unless protected?
        // The previous middleware logic redirected to login if !public. 
        // Let's keep it safe:
        // If it's not a public route and user is not logged in, redirect.
        // Public routes: / (landing), /login, /register.

        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return NextResponse.redirect(
            new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
    }

    // Role-based access control logic
    if (isLoggedIn) {
        const role = user?.role;
        const subscriptionStatus = user?.subscriptionStatus;

        if (nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", nextUrl));
        }

        if (nextUrl.pathname.startsWith("/trainer") && role !== "TRAINER") {
            return NextResponse.redirect(new URL("/", nextUrl));
        }

        if (nextUrl.pathname.startsWith("/member")) {
            if (role !== "MEMBER") {
                return NextResponse.redirect(new URL("/", nextUrl));
            }

            // Allow access to specific member routes regardless of subscription status
            // This allows users to subscribe, view profile, and check payment history
            const allowedRoutes = [
                "/member", // Pricing/Dashboard base
                "/member/subscription",
                "/member/profile",
                "/member/payment-history",
                "/member/attendance",
                "/member/workout-plan",
                "/member/progress",
                "/member/notifications"
            ];

            const isAllowedRoute = allowedRoutes.some(route => nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/"));

            // If not on an allowed route and subscription is not active, redirect to pricing
            if (!isAllowedRoute && subscriptionStatus !== "active") {
                return NextResponse.redirect(new URL("/member/subscription", nextUrl));
            }
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
