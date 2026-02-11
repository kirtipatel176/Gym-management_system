import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
});

// Stripe Price IDs for different plans
export const STRIPE_PLANS = {
    basic: {
        priceId: process.env.STRIPE_BASIC_PRICE_ID || 'price_basic',
        name: 'Basic',
        price: 49,
    },
    pro: {
        priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro',
        name: 'Pro',
        price: 129,
    },
    premium: {
        priceId: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium',
        name: 'Premium',
        price: 249,
    },
} as const;

export type PlanType = keyof typeof STRIPE_PLANS;
