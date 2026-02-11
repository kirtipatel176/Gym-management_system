import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function GET(req: NextRequest) {
    try {
        // Get the session
        const session = await auth();

        if (!session?.user?.email) {
            console.error('[PAYMENT_HISTORY] Unauthorized: No user session');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log(`[PAYMENT_HISTORY] Fetching for ${session.user.email}`);

        // Connect to database
        await dbConnect();

        // Find user
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            console.error('[PAYMENT_HISTORY] User not found:', session.user.email);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user has a Stripe customer ID
        if (!user.stripeCustomerId) {
            console.log('[PAYMENT_HISTORY] No Stripe customer ID found');
            return NextResponse.json({ payments: [] });
        }

        // Fetch invoices from Stripe
        const invoices = await stripe.invoices.list({
            customer: user.stripeCustomerId,
            limit: 10,
            status: 'paid', // Only fetch paid invoices
        });

        // Format payment history
        const payments = invoices.data.map((invoice) => {
            // Get the subscription item to find the plan
            const subscriptionItem = invoice.lines.data[0];
            const planName = subscriptionItem?.description || 'Membership';

            return {
                id: invoice.id,
                date: new Date(invoice.created * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                }),
                amount: `$${(invoice.amount_paid / 100).toFixed(2)}`,
                amountCents: invoice.amount_paid,
                status: invoice.status === 'paid' ? 'Paid' : invoice.status,
                planName,
                invoiceUrl: invoice.hosted_invoice_url,
                pdfUrl: invoice.invoice_pdf,
            };
        });

        console.log(`[PAYMENT_HISTORY] ✅ Found ${payments.length} payments`);
        return NextResponse.json({ payments });
    } catch (error) {
        console.error('[PAYMENT_HISTORY] ❌ Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch payment history' },
            { status: 500 }
        );
    }
}
