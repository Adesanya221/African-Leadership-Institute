import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const { transactionId, referenceId } = await req.json();

    if (!transactionId) {
      return NextResponse.json({ error: 'transactionId is required' }, { status: 400 });
    }

    const privateKey = process.env.KKIAPAY_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json({ error: 'KKiaPay private key not configured' }, { status: 500 });
    }

    // Verify the transaction with KKiaPay
    const verifyRes = await fetch(
      `https://api.kkiapay.me/api/v1/transactions/${transactionId}/status`,
      { headers: { 'x-private-key': privateKey } }
    );

    if (!verifyRes.ok) {
      return NextResponse.json(
        { error: 'KKiaPay verification request failed', status: verifyRes.status },
        { status: 502 }
      );
    }

    const verifyData = await verifyRes.json();

    if (verifyData.status !== 'SUCCESS') {
      return NextResponse.json(
        { error: 'Transaction not verified', kkiapayStatus: verifyData.status },
        { status: 400 }
      );
    }

    // Mark registration as paid in Supabase
    if (referenceId) {
      const supabase = getSupabaseServer();
      const { error: dbError } = await supabase
        .from('registrations')
        .update({ payment_status: 'success' })
        .eq('reference_id', referenceId);

      if (dbError) {
        console.error('Supabase update error:', dbError);
      }
    }

    return NextResponse.json({ success: true, transactionId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
