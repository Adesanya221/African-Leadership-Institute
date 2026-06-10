import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import crypto from 'crypto';

function verifyITNSignature(params: Record<string, string>, passphrase: string): string {
  // For ITN, use fields in the order Payfast posted them (NOT alphabetical sort).
  // Passphrase is always appended at the END.
  const queryString = Object.entries(params)
    .filter(([key, val]) => key !== 'signature' && val !== '' && val !== undefined && val !== null)
    .map(([key, val]) => `${key}=${encodeURIComponent(val).replace(/%20/g, '+')}`)
    .join('&');

  const stringToHash = `${queryString}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`;

  return crypto.createHash('md5').update(stringToHash).digest('hex');
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
    const { signature: receivedSig } = params;
    const expectedSig = verifyITNSignature(params, passphrase);

    if (receivedSig !== expectedSig) {
      console.error('Payfast ITN: signature mismatch', { receivedSig, expectedSig });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // 2. Confirm validity with Payfast's server (Security check 4 in Payfast docs).
    // Post the exact received data back to Payfast — they reply VALID or INVALID.
    const isSandbox = process.env.NODE_ENV !== 'production';
    const validateUrl = isSandbox
      ? 'https://sandbox.payfast.co.za/eng/query/validate'
      : 'https://www.payfast.co.za/eng/query/validate';

    try {
      const validateRes = await fetch(validateUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const validateText = await validateRes.text();
      if (validateText.trim() !== 'VALID') {
        console.error('Payfast ITN: server validation failed', validateText);
        return NextResponse.json({ error: 'Payfast validation failed' }, { status: 400 });
      }
    } catch (validateErr) {
      console.error('Payfast ITN: could not reach validation server', validateErr);
      return NextResponse.json({ error: 'Validation server unreachable' }, { status: 500 });
    }

    // 3. Verify payment status
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
