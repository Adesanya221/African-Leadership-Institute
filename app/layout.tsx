import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tutu-reunion.vercel.app';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Tutu Fellows 20th Year Reunion – Victoria Falls 2026',
  description:
    'A landmark strategy retreat, the formal launch of the Tutu Fellows Alumni Organisation, and five extraordinary days at one of Africa\'s most spectacular natural wonders. 25–29 November 2026.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Tutu Fellows 20th Year Reunion – Victoria Falls 2026',
    description:
      'Join 20 cohorts of Archbishop Tutu Leadership Fellows for a landmark reunion. Strategy, celebration, and the formal launch of the Alumni Organisation. Victoria Falls, Zimbabwe.',
    url: siteUrl,
    siteName: 'African Leadership Institute',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tutu Fellows 20th Year Reunion – Victoria Falls 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutu Fellows 20th Year Reunion – Victoria Falls 2026',
    description:
      'Join 20 cohorts of Archbishop Tutu Leadership Fellows for a landmark reunion. 25–29 November 2026, Victoria Falls, Zimbabwe.',
    images: ['/og-image.png'],
  },
  keywords: [
    'Tutu Fellows',
    'African Leadership Institute',
    'AFLI',
    'Reunion',
    'Victoria Falls',
    'Zimbabwe',
    'Alumni',
    'Leadership',
    '2026',
  ],
  authors: [{ name: 'African Leadership Institute' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/AFLI%2020TH%20Background%20removed.png" type="image/png" />
        <link rel="apple-touch-icon" href="/AFLI%2020TH%20Background%20removed.png" />
        <meta name="theme-color" content="#9B1D6E" />
      </head>
      <body>{children}</body>
    </html>
  );
}
