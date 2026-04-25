'use client';

import { createContext, useContext, useState } from 'react';

interface ProvinceContextType {
  province: string;
  setProvince: (code: string) => void;
}

const ProvinceContext = createContext<ProvinceContextType>({
  province: 'BC',
  setProvince: () => {},
});

export function ProvinceProvider({ children }: { children: React.ReactNode }) {
  const [province, setProvince] = useState('BC');
  return (
    <ProvinceContext.Provider value={{ province, setProvince }}>
      {children}
    </ProvinceContext.Provider>
  );
}

export function useProvince() {
  return useContext(ProvinceContext);
}
