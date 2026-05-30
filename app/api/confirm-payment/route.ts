import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const { reference_id } = await req.json();

    if (!reference_id) {
      return NextResponse.json(
        { error: 'reference_id is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('registrations')
      .update({ payment_status: 'success' })
      .eq('reference_id', reference_id);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Failed to update payment status' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
