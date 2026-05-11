import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import Placeholder from '@/components/Placeholder';
export default function Page() {
  return <Placeholder locale="fr" />;
}
