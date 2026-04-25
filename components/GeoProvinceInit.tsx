'use client';

import { useEffect } from 'react';
import { useGeoProvince } from '@/hooks/useGeoProvince';
import { useProvince } from '@/contexts/ProvinceContext';

export default function GeoProvinceInit() {
  const { province, isLoading, source } = useGeoProvince();
  const { setProvince, setGeoSource } = useProvince();

  useEffect(() => {
    if (isLoading) return;
    setGeoSource(source);
    // Only apply the geo result if the user has not manually selected a province
    try {
      const userPref = localStorage.getItem('mapletax:user-province');
      if (!userPref) setProvince(province);
    } catch {
      setProvince(province);
    }
  }, [province, isLoading, source, setProvince, setGeoSource]);

  return null;
}
