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
    // The PAYPAL_PAYMENT_URL env var should be your PayPal.Me link or
    // PayPal Standard button URL.  Example:
    //   https://www.paypal.com/paypalme/africanleadership/50USD
    // We append ?reference_id=... so the return page knows who paid.
    // ------------------------------------------------------------------------
    const paypalBaseUrl = process.env.PAYPAL_PAYMENT_URL;

    if (!paypalBaseUrl) {
      throw new Error('PAYPAL_PAYMENT_URL environment variable is not configured');
    }

    const separator = paypalBaseUrl.includes('?') ? '&' : '?';
    const paypalUrl = `${paypalBaseUrl}${separator}reference_id=${encodeURIComponent(referenceId)}&return=${encodeURIComponent(`${origin}/payment/success?reference_id=${referenceId}`)}`;

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
