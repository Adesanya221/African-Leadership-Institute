import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

const LEMONSQUEEZY_API = 'https://api.lemonsqueezy.com/v1';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;

    if (!apiKey || !storeId || !variantId) {
      throw new Error('Lemon Squeezy environment variables are not configured');
    }

    const body = await req.json();
    const { fullName, email, country, cohort, phone, accommodation, notes } = body;

    // Save registration to Supabase
    const supabase = getSupabase();
    const { error: dbError } = await supabase.from('registrations').insert({
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

    const response = await fetch(`${LEMONSQUEEZY_API}/checkouts`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email,
              name: fullName,
              custom: {
                full_name: fullName,
                email,
                country,
                cohort,
                phone: phone || '',
                accommodation,
                notes: notes || '',
              },
            },
            product_options: {
              name: 'Tutu Fellows 20th Year Reunion – Registration Deposit',
              description: `Deposit for ${fullName} | Cohort: ${cohort} | Accommodation: ${accommodation}`,
              redirect_url: `${origin}/payment/success`,
            },
            checkout_options: {
              embed: false,
              dark: false,
              logo: true,
            },
            expires_at: null,
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: storeId,
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: variantId,
              },
            },
          },
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMsg =
        result?.errors?.[0]?.detail || 'Failed to create checkout session';
      throw new Error(errorMsg);
    }

    const checkoutUrl = result.data.attributes.url;

    return NextResponse.json({ url: checkoutUrl });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
