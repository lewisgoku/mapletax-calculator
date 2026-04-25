'use client';

// TODO: When deploying to Cloudflare Pages, replace this client-side
// IP geolocation with an Edge Middleware that reads the `cf-ipcountry` and
// `cf-region` request headers for instant, zero-latency server-side
// province detection with no third-party request. See CLAUDE.md "Geolocation".

import { useState, useEffect } from 'react';
import { PROVINCE_CODES } from '@/lib/rates/2026';

export type GeoSource = 'cache' | 'geo' | 'fallback';

export interface GeoProvinceResult {
  province: string;
  isLoading: boolean;
  source: GeoSource;
}

export const GEO_CACHE_KEY = 'mapletax:geo-province';
const GEO_CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

interface CacheEntry {
  code: string;
  timestamp: number;
}

export function readGeoCache(): string | null {
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (typeof entry.code !== 'string' || typeof entry.timestamp !== 'number') return null;
    if (Date.now() - entry.timestamp > GEO_CACHE_TTL) return null;
    if (!(PROVINCE_CODES as string[]).includes(entry.code)) return null;
    return entry.code;
  } catch {
    return null;
  }
}

export function writeGeoCache(code: string): void {
  try {
    localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ code, timestamp: Date.now() }));
  } catch {
    // Storage unavailable (private browsing, quota exceeded)
  }
}

export function mapIpapiResponse(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const { region_code, country_code } = data as Record<string, unknown>;
  if (country_code !== 'CA') return null;
  if (typeof region_code !== 'string' || region_code === '') return null;
  if (!(PROVINCE_CODES as string[]).includes(region_code)) return null;
  return region_code;
}

export async function resolveGeoProvince(): Promise<{ province: string; source: GeoSource }> {
  const cached = readGeoCache();
  if (cached) return { province: cached, source: 'cache' };

  try {
    const res = await fetch('https://ipapi.co/json/');
    const data: unknown = await res.json();
    const code = mapIpapiResponse(data);
    if (code) {
      writeGeoCache(code);
      return { province: code, source: 'geo' };
    }
  } catch {
    // Network error, API down, parse error — fall through to BC
  }

  return { province: 'BC', source: 'fallback' };
}

export function useGeoProvince(): GeoProvinceResult {
  const [state, setState] = useState<GeoProvinceResult>({
    province: 'BC',
    isLoading: true,
    source: 'fallback',
  });

  useEffect(() => {
    let cancelled = false;
    resolveGeoProvince().then(({ province, source }) => {
      if (!cancelled) setState({ province, isLoading: false, source });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
