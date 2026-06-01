import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import crypto from 'crypto';

function generateSignature(data: Record<string, string>, passphrase: string): string {
  const pfData = { ...data, passphrase };

  const filtered = Object.fromEntries(
    Object.entries(pfData).filter(([, v]) => v !== '' && v !== undefined && v !== null)
  );

  const queryString = Object.keys(filtered)
    .sort()
    .map(key => `${key}=${encodeURIComponent(filtered[key]).replace(/%20/g, '+')}`)
    .join('&');

  return crypto.createHash('md5').update(queryString).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));

    const passphrase = process.env.PAYFAST_PASSPHRASE;
    const expectedAmountZar = parseFloat(process.env.PAYFAST_AMOUNT_ZAR ?? '2700').toFixed(2);

    if (!passphrase) {
      console.error('PAYFAST_PASSPHRASE not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // 1. Verify signature
    const { signature: receivedSig, ...dataWithoutSig } = params;
    const expectedSig = generateSignature(dataWithoutSig, passphrase);

    if (receivedSig !== expectedSig) {
      console.error('Payfast ITN: signature mismatch', { receivedSig, expectedSig });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // 2. Verify payment status
    if (params.payment_status !== 'COMPLETE') {
      console.warn('Payfast ITN: payment not complete', params.payment_status);
      return NextResponse.json({ ok: true });
    }

    // 3. Verify amount matches (within 1 cent tolerance)
    const receivedAmount = parseFloat(params.amount_gross ?? '0').toFixed(2);
    if (receivedAmount !== expectedAmountZar) {
      console.error('Payfast ITN: amount mismatch', { receivedAmount, expectedAmountZar });
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 });
    }

    // 4. Mark registration as paid in Supabase
    const referenceId = params.m_payment_id;
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

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred';
    console.error('Payfast ITN error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
