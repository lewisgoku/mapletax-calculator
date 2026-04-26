import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ProvinceProvider } from '@/contexts/ProvinceContext';
import GeoProvinceInit from '@/components/GeoProvinceInit';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import enMessages from '@/messages/en.json';

export default function EnLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale('en');
  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <ProvinceProvider>
        <GeoProvinceInit />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </ProvinceProvider>
    </NextIntlClientProvider>
  );
}
