import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.stripeCustomerId) {
            return NextResponse.json({ error: 'No customer found' }, { status: 404 });
        }

        // Create portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.NEXTAUTH_URL}/member`,
        });

        return NextResponse.json({ url: portalSession.url });
    } catch (error) {
        console.error('Portal session error:', error);
        return NextResponse.json(
            { error: 'Failed to create portal session' },
            { status: 500 }
        );
    }
}
