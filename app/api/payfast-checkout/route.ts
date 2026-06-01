import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import crypto from 'crypto';

function generateSignature(data: Record<string, string>, passphrase: string): string {
  const pfData = { ...data, passphrase };

  // Remove empty / undefined values
  const filtered = Object.fromEntries(
    Object.entries(pfData).filter(([, v]) => v !== '' && v !== undefined && v !== null)
  );

  // Sort alphabetically and build query string (PHP urlencode style)
  const queryString = Object.keys(filtered)
    .sort()
    .map(key => `${key}=${encodeURIComponent(filtered[key]).replace(/%20/g, '+')}`)
    .join('&');

  return crypto.createHash('md5').update(queryString).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, country, cohort, phone, accommodation, notes } = body;

    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE;
    // Amount in ZAR — set PAYFAST_AMOUNT_ZAR to the ZAR equivalent of US$150
    const amountZar = parseFloat(process.env.PAYFAST_AMOUNT_ZAR ?? '2700').toFixed(2);
    const isSandbox = process.env.NODE_ENV !== 'production';

    if (!merchantId || !merchantKey || !passphrase) {
      throw new Error('Payfast environment variables not configured (PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE)');
    }

    // Generate reference ID and save registration to Supabase
    const supabase = getSupabase();
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceId = `AFLI-2026-${timestamp}-${random}`;

    const { error: dbError } = await supabase.from('registrations').insert({
      reference_id: referenceId,
      full_name: fullName,
      email,
      country,
      cohort,
      phone: phone || null,
      accommodation,
      notes: notes || null,
      payment_status: 'pending',
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
    }

    const origin = req.nextUrl.origin;
    const nameParts = fullName.trim().split(' ');
    const nameFirst = nameParts[0] ?? fullName;
    const nameLast = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameFirst;

    const rawDescription = `Deposit for ${fullName}. Cohort: ${cohort}. Accommodation: ${accommodation}`;
    const itemDescription = rawDescription.substring(0, 255);

    // Build all Payfast form fields (signature includes all of these + passphrase)
    const pfData: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${origin}/payment/success?reference_id=${referenceId}`,
      cancel_url: `${origin}/?payment=cancelled`,
      notify_url: `${origin}/api/payfast-itn`,
      name_first: nameFirst,
      name_last: nameLast,
      email_address: email,
      m_payment_id: referenceId,
      amount: amountZar,
      item_name: 'Tutu Fellows Reunion 2026 – Deposit',
      item_description: itemDescription,
    };

    // Signature is generated over all params (excluding merchant_key) + passphrase
    const { merchant_key: _mk, ...sigData } = pfData;
    void _mk;
    const signature = generateSignature(sigData, passphrase);
    pfData.signature = signature;

    const payfastUrl = isSandbox
      ? 'https://sandbox.payfast.co.za/eng/process'
      : 'https://www.payfast.co.za/eng/process';

    return NextResponse.json({ pfData, payfastUrl, referenceId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
