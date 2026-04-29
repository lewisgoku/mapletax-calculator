import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import '@/styles/print.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MapleTax Calculator — Free Canadian Tax Calculator',
    template: '%s | MapleTax Calculator',
  },
  description:
    'Free Canadian income tax calculator for 2025 and 2026. Calculate federal and provincial tax, CPP, EI, and take-home pay for all 13 provinces. No sign-up required.',
  metadataBase: new URL('https://mapletaxcalculator.ca'),
  openGraph: {
    images: [
      {
        url: 'https://mapletaxcalculator.ca/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Mapletax — Canadian tax calculators',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased" suppressHydrationWarning>
        {children}
        <Script
          defer
          data-domain="mapletaxcalculator.ca"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
