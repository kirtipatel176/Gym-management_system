import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import { User } from '@/models';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
        console.error('[WEBHOOK] No signature found in headers');
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log(`[WEBHOOK] ✅ Event verified: ${event.type} [${event.id}]`);
    } catch (err) {
        console.error('[WEBHOOK] ❌ Signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    try {
        await dbConnect();

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log(`[WEBHOOK] Processing checkout.session.completed for session: ${session.id}`);

                if (session.mode === 'subscription' && session.customer) {
                    const userId = session.metadata?.userId;

                    if (userId) {
                        console.log(`[WEBHOOK] Updating user ${userId} with subscription ${session.subscription}`);
                        await User.findByIdAndUpdate(userId, {
                            subscriptionStatus: 'active',
                            subscriptionId: session.subscription as string,
                            planId: session.metadata?.planId,
                        });
                        console.log(`[WEBHOOK] ✅ User ${userId} subscription activated`);
                    } else {
                        console.warn(`[WEBHOOK] ⚠️ No userId in metadata for session ${session.id}`);
                    }
                }
                break;
            }

            case 'customer.subscription.created': {
                const subscription = event.data.object as Stripe.Subscription;
                console.log(`[WEBHOOK] Processing subscription.created: ${subscription.id}`);

                const user = await User.findOne({ stripeCustomerId: subscription.customer as string });

                if (user) {
                    user.subscriptionStatus = subscription.status as any;
                    user.subscriptionId = subscription.id;
                    user.currentPeriodEnd = new Date((subscription as any).current_period_end * 1000);
                    await user.save();
                    console.log(`[WEBHOOK] ✅ User ${user._id} subscription created: ${subscription.status}`);
                } else {
                    console.warn(`[WEBHOOK] ⚠️ No user found for customer ${subscription.customer}`);
                }
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                console.log(`[WEBHOOK] Processing subscription.updated: ${subscription.id} -> ${subscription.status}`);

                const user = await User.findOne({ stripeCustomerId: subscription.customer as string });

                if (user) {
                    user.subscriptionStatus = subscription.status as any;
                    user.currentPeriodEnd = new Date((subscription as any).current_period_end * 1000);
                    await user.save();
                    console.log(`[WEBHOOK] ✅ User ${user._id} subscription updated to ${subscription.status}`);
                } else {
                    console.warn(`[WEBHOOK] ⚠️ No user found for customer ${subscription.customer}`);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                console.log(`[WEBHOOK] Processing subscription.deleted: ${subscription.id}`);

                const user = await User.findOne({ stripeCustomerId: subscription.customer as string });

                if (user) {
                    user.subscriptionStatus = 'canceled';
                    user.subscriptionId = undefined;
                    user.currentPeriodEnd = undefined;
                    await user.save();
                    console.log(`[WEBHOOK] ✅ User ${user._id} subscription canceled`);
                } else {
                    console.warn(`[WEBHOOK] ⚠️ No user found for customer ${subscription.customer}`);
                }
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`[WEBHOOK] Processing invoice.payment_succeeded: ${invoice.id}`);

                if ((invoice as any).subscription) {
                    const user = await User.findOne({ stripeCustomerId: invoice.customer as string });

                    if (user) {
                        user.subscriptionStatus = 'active';
                        await user.save();
                        console.log(`[WEBHOOK] ✅ User ${user._id} payment succeeded, status: active`);
                    }
                }
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`[WEBHOOK] Processing invoice.payment_failed: ${invoice.id}`);

                if ((invoice as any).subscription) {
                    const user = await User.findOne({ stripeCustomerId: invoice.customer as string });

                    if (user) {
                        user.subscriptionStatus = 'past_due';
                        await user.save();
                        console.log(`[WEBHOOK] ⚠️ User ${user._id} payment failed, status: past_due`);
                    }
                }
                break;
            }

            default:
                console.log(`[WEBHOOK] ℹ️ Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('[WEBHOOK] ❌ Handler error:', error);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}
