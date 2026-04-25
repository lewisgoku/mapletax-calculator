'use client';

import { createContext, useContext, useState } from 'react';
import type { GeoSource } from '@/hooks/useGeoProvince';

interface ProvinceContextType {
  province: string;
  setProvince: (code: string) => void;
  geoSource: GeoSource | null;
  setGeoSource: (s: GeoSource) => void;
}

const ProvinceContext = createContext<ProvinceContextType>({
  province: 'BC',
  setProvince: () => {},
  geoSource: null,
  setGeoSource: () => {},
});

export function ProvinceProvider({ children }: { children: React.ReactNode }) {
  const [province, setProvince] = useState('BC');
  const [geoSource, setGeoSource] = useState<GeoSource | null>(null);
  return (
    <ProvinceContext.Provider value={{ province, setProvince, geoSource, setGeoSource }}>
      {children}
    </ProvinceContext.Provider>
  );
}

export function useProvince() {
  return useContext(ProvinceContext);
}
