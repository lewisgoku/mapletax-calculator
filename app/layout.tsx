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
  verification: {
    google: 'kC1G4hT1IzRVphzmlKAbTOs-SxUMWSf1FAN0d18iWyg',
  },
  openGraph: {
    images: [
      {
        url: 'https://mapletaxcalculator.ca/og-default.png',
        width: 1200,
        height: 630,
        alt: 'MapleTax — Free Canadian income tax calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mapletaxca',
    title: 'MapleTax Calculator — Free Canadian Tax Calculator',
    description:
      'Free Canadian income tax calculator for 2025 and 2026. Calculate federal and provincial tax, CPP, EI, and take-home pay for all 13 provinces.',
    images: ['https://mapletaxcalculator.ca/og-default.png'],
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6448891849672753"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://plausible.io/js/pa-uHTbDKoCd4wPDITFChn20.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};
          plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init();
        `}</Script>
      </body>
    </html>
  );
}
