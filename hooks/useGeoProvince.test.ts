import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  readGeoCache,
  writeGeoCache,
  mapIpapiResponse,
  resolveGeoProvince,
  GEO_CACHE_KEY,
} from './useGeoProvince';

// In-memory localStorage mock
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach((k) => { delete store[k]; }); },
};

let mockFetch: ReturnType<typeof vi.fn>;

beforeEach(() => {
  localStorageMock.clear();
  vi.stubGlobal('localStorage', localStorageMock);
  mockFetch = vi.fn();
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ---------------------------------------------------------------------------
// readGeoCache
// ---------------------------------------------------------------------------

describe('readGeoCache', () => {
  it('returns null when cache is empty', () => {
    expect(readGeoCache()).toBeNull();
  });

  it('returns province code on fresh cache hit', () => {
    writeGeoCache('ON');
    expect(readGeoCache()).toBe('ON');
  });

  it('returns null when cache entry is expired (>30 days)', () => {
    const expired = { code: 'ON', timestamp: Date.now() - 31 * 24 * 60 * 60 * 1000 };
    localStorageMock.setItem(GEO_CACHE_KEY, JSON.stringify(expired));
    expect(readGeoCache()).toBeNull();
  });

  it('returns null for an unknown province code stored in cache', () => {
    localStorageMock.setItem(GEO_CACHE_KEY, JSON.stringify({ code: 'XX', timestamp: Date.now() }));
    expect(readGeoCache()).toBeNull();
  });

  it('returns null when cache JSON is malformed', () => {
    localStorageMock.setItem(GEO_CACHE_KEY, 'not-json{{{');
    expect(readGeoCache()).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// mapIpapiResponse
// ---------------------------------------------------------------------------

describe('mapIpapiResponse', () => {
  it('returns province code for valid Canadian IP', () => {
    expect(mapIpapiResponse({ country_code: 'CA', region_code: 'ON' })).toBe('ON');
    expect(mapIpapiResponse({ country_code: 'CA', region_code: 'BC' })).toBe('BC');
    expect(mapIpapiResponse({ country_code: 'CA', region_code: 'QC' })).toBe('QC');
    expect(mapIpapiResponse({ country_code: 'CA', region_code: 'NU' })).toBe('NU');
  });

  it('returns null for non-Canadian IP', () => {
    expect(mapIpapiResponse({ country_code: 'US', region_code: 'CA' })).toBeNull();
    expect(mapIpapiResponse({ country_code: 'GB', region_code: 'ENG' })).toBeNull();
    expect(mapIpapiResponse({ country_code: 'AU', region_code: 'NSW' })).toBeNull();
  });

  it('returns null for unknown Canadian region code', () => {
    expect(mapIpapiResponse({ country_code: 'CA', region_code: 'ZZ' })).toBeNull();
    expect(mapIpapiResponse({ country_code: 'CA', region_code: 'USA' })).toBeNull();
  });

  it('returns null for empty region code', () => {
    expect(mapIpapiResponse({ country_code: 'CA', region_code: '' })).toBeNull();
  });

  it('returns null for null, undefined, or non-object data', () => {
    expect(mapIpapiResponse(null)).toBeNull();
    expect(mapIpapiResponse(undefined)).toBeNull();
    expect(mapIpapiResponse('string')).toBeNull();
    expect(mapIpapiResponse(42)).toBeNull();
    expect(mapIpapiResponse({})).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// resolveGeoProvince
// ---------------------------------------------------------------------------

describe('resolveGeoProvince', () => {
  it('returns cached result without fetching when cache is fresh', async () => {
    writeGeoCache('AB');
    const result = await resolveGeoProvince();
    expect(result).toEqual({ province: 'AB', source: 'cache' });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fetches, returns geo result, and writes cache on cache miss', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ country_code: 'CA', region_code: 'ON' }),
    });
    const result = await resolveGeoProvince();
    expect(result).toEqual({ province: 'ON', source: 'geo' });
    expect(readGeoCache()).toBe('ON');
  });

  it('falls back to BC on API failure (network error)', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const result = await resolveGeoProvince();
    expect(result).toEqual({ province: 'BC', source: 'fallback' });
  });

  it('falls back to BC for non-Canadian IP', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ country_code: 'US', region_code: 'WA' }),
    });
    const result = await resolveGeoProvince();
    expect(result).toEqual({ province: 'BC', source: 'fallback' });
  });

  it('falls back to BC for unknown region code from Canadian IP', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ country_code: 'CA', region_code: 'ZZ' }),
    });
    const result = await resolveGeoProvince();
    expect(result).toEqual({ province: 'BC', source: 'fallback' });
  });

  it('does not write cache on fallback', async () => {
    mockFetch.mockRejectedValueOnce(new Error('down'));
    await resolveGeoProvince();
    expect(readGeoCache()).toBeNull();
  });
});
