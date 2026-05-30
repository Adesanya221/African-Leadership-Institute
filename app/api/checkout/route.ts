import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// ── Lemon Squeezy (commented out – kept for reference) ──────────────────────
// const LEMONSQUEEZY_API = 'https://api.lemonsqueezy.com/v1';
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, country, cohort, phone, accommodation, notes } = body;

    // Generate unique AFLI reference ID
    const supabase = getSupabase();
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceId = `AFLI-2026-${timestamp}-${random}`;

    // Save registration to Supabase
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
      // Don't block payment if DB save fails — log it and continue
    }

    const origin = req.nextUrl.origin;

    // ── PayPal redirect (replaces Lemon Squeezy) ─────────────────────────────
    //
    // STEP 1: Paste your PayPal link in the Vercel env var PAYPAL_PAYMENT_URL
    //
    // Option A – PayPal Standard Button (BEST – auto-returns after payment)
    //   https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=...&amount=150&currency_code=USD
    //
    // Option B – PayPal.Me (SIMPLE – user must manually come back)
    //   https://www.paypal.com/paypalme/africanleadership/150USD
    //   Note: PayPal.Me does NOT support auto-return. Users pay and stay on PayPal.
    //   For auto-return, use Option A (PayPal Standard Button) instead.
    // ------------------------------------------------------------------------
    const paypalBaseUrl = process.env.PAYPAL_PAYMENT_URL;

    if (!paypalBaseUrl) {
      throw new Error('PAYPAL_PAYMENT_URL environment variable is not configured');
    }

    const isPayPalStandard = paypalBaseUrl.includes('paypal.com/cgi-bin');

    let paypalUrl: string;

    if (isPayPalStandard) {
      // PayPal Standard – we can append return & custom fields
      const separator = paypalBaseUrl.includes('?') ? '&' : '?';
      paypalUrl = `${paypalBaseUrl}${separator}custom=${encodeURIComponent(referenceId)}&return=${encodeURIComponent(`${origin}/payment/success?reference_id=${referenceId}`)}&cancel_return=${encodeURIComponent(`${origin}/?payment=cancelled`)}`;
    } else {
      // PayPal NCP link — do not append params, PayPal will reject them
      paypalUrl = paypalBaseUrl;
    }

    return NextResponse.json({ url: paypalUrl, referenceId });
    // ────────────────────────────────────────────────────────────────────────

    /* ── Lemon Squeezy checkout (kept for reference) ────────────────────────
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;

    if (!apiKey || !storeId || !variantId) {
      throw new Error('Lemon Squeezy environment variables are not configured');
    }

    const response = await fetch(`${LEMONSQUEEZY_API}/checkouts`, { ... });
    const result = await response.json();
    const checkoutUrl = result.data.attributes.url;
    return NextResponse.json({ url: checkoutUrl });
    ───────────────────────────────────────────────────────────────────────*/
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
