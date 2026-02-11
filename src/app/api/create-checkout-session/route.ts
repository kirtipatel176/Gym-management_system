import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { stripe, STRIPE_PLANS, PlanType } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function POST(req: NextRequest) {
    try {
        // Get the session
        const session = await auth();

        if (!session?.user?.email) {
            console.error('[CHECKOUT] Unauthorized: No user session');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get plan from request body
        const body = await req.json();
        const { planId } = body as { planId: PlanType };

        if (!planId || !STRIPE_PLANS[planId]) {
            console.error('[CHECKOUT] Invalid plan:', planId);
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }

        console.log(`[CHECKOUT] Creating session for ${session.user.email} - Plan: ${planId}`);

        // Connect to database
        await dbConnect();

        // Find user
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            console.error('[CHECKOUT] User not found:', session.user.email);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user already has an active subscription
        if (user.subscriptionStatus === 'active' && user.subscriptionId) {
            console.log(`[CHECKOUT] User ${user._id} already has active subscription: ${user.subscriptionId}`);
            return NextResponse.json(
                { error: 'You already have an active subscription. Please cancel it first.' },
                { status: 400 }
            );
        }

        // Create or get Stripe customer
        let customerId = user.stripeCustomerId;

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name || undefined,
                metadata: {
                    userId: user._id.toString(),
                },
            });
            customerId = customer.id;
            user.stripeCustomerId = customerId;
            await user.save();
            console.log(`[CHECKOUT] Created Stripe customer: ${customerId}`);
        }

        // Create checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: STRIPE_PLANS[planId].priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXTAUTH_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/member`,
            metadata: {
                userId: user._id.toString(),
                planId,
            },
        });

        console.log(`[CHECKOUT] ✅ Session created: ${checkoutSession.id}`);
        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error('[CHECKOUT] ❌ Error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
