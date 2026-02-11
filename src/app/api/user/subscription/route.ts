import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email }).select(
            'subscriptionStatus planId currentPeriodEnd stripeCustomerId subscriptionId'
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            subscriptionStatus: user.subscriptionStatus || 'inactive',
            planId: user.planId,
            currentPeriodEnd: user.currentPeriodEnd,
            stripeCustomerId: user.stripeCustomerId,
            subscriptionId: user.subscriptionId,
        });
    } catch (error) {
        console.error('User subscription fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subscription info' },
            { status: 500 }
        );
    }
}
