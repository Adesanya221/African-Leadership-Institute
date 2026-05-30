import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

/**
 * PayPal Webhook / IPN Handler
 *
 * To set this up:
 * 1. In your PayPal Business account, go to Settings → Notifications → IPN
 * 2. Set the IPN URL to: https://your-domain.com/api/webhook/paypal
 * 3. Enable "Receive IPN messages"
 *
 * For PayPal Standard buttons you can also set "notify_url" in the form.
 *
 * This endpoint auto-marks registrations as "paid" when PayPal confirms payment.
 */

export async function POST(req: NextRequest) {
  try {
    // PayPal sends application/x-www-form-urlencoded data for IPN
    const body = await req.text();
    const params = new URLSearchParams(body);

    const paymentStatus = params.get('payment_status');
    const custom = params.get('custom');       // Should contain our reference_id
    const txnId = params.get('txn_id');
    const receiverEmail = params.get('receiver_email');

    // Log for debugging
    console.log('PayPal webhook received:', {
      paymentStatus,
      custom,
      txnId,
      receiverEmail,
    });

    // Only process completed payments
    if (paymentStatus !== 'Completed') {
      return NextResponse.json({ status: 'ignored', reason: 'payment not completed' });
    }

    // Extract reference_id from custom field
    const referenceId = custom || params.get('item_number');

    if (!referenceId) {
      console.warn('PayPal webhook: no reference_id found');
      return NextResponse.json({ status: 'ignored', reason: 'no reference_id' });
    }

    // Update Supabase
    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('registrations')
      .update({
        payment_status: 'success',
        lemon_order_id: txnId, // Re-using this column for PayPal txn_id
      })
      .eq('reference_id', referenceId);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Failed to update registration' },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 'success', referenceId });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred';
    console.error('PayPal webhook error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
