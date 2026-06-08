import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get('folder');

  if (!folder || folder.includes('..') || folder.includes('/')) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  try {
    const dir = path.join(process.cwd(), 'public', 'rooms', folder);
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort();
    return NextResponse.json({ images: files.map((f) => `/rooms/${folder}/${f}`) });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
