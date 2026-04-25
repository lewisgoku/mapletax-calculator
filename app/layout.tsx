import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ProvinceProvider } from '@/contexts/ProvinceContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <ProvinceProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ProvinceProvider>
      </body>
    </html>
  );
}
