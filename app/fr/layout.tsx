import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ProvinceProvider } from '@/contexts/ProvinceContext';
import GeoProvinceInit from '@/components/GeoProvinceInit';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import frMessages from '@/messages/fr.json';

export default function FrLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale('fr');
  return (
    <NextIntlClientProvider locale="fr" messages={frMessages}>
      <ProvinceProvider>
        <GeoProvinceInit />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </ProvinceProvider>
    </NextIntlClientProvider>
  );
}
