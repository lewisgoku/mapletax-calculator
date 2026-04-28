import { describe, it, expect } from 'vitest';
import { get2025FilingStatus } from './deadlines';

describe('get2025FilingStatus', () => {
  it('returns upcoming with correct days when well before deadline', () => {
    const result = get2025FilingStatus(new Date(2026, 0, 1)); // Jan 1 2026
    expect(result.status).toBe('upcoming');
    if (result.status === 'upcoming') {
      expect(result.daysRemaining).toBe(119); // Jan 1 to Apr 30 = 119 days
    }
  });

  it('returns upcoming with 1 day remaining the day before deadline', () => {
    const result = get2025FilingStatus(new Date(2026, 3, 29)); // Apr 29 2026
    expect(result.status).toBe('upcoming');
    if (result.status === 'upcoming') {
      expect(result.daysRemaining).toBe(1);
    }
  });

  it('returns today on April 30, 2026', () => {
    const result = get2025FilingStatus(new Date(2026, 3, 30)); // Apr 30 2026
    expect(result.status).toBe('today');
  });

  it('returns self-employed-window on May 1, 2026', () => {
    const result = get2025FilingStatus(new Date(2026, 4, 1)); // May 1 2026
    expect(result.status).toBe('self-employed-window');
    if (result.status === 'self-employed-window') {
      expect(result.daysRemaining).toBe(45); // May 1 to June 15 = 45 days
    }
  });

  it('returns self-employed-window on June 15, 2026 (last day)', () => {
    const result = get2025FilingStatus(new Date(2026, 5, 15)); // Jun 15 2026
    expect(result.status).toBe('self-employed-window');
    if (result.status === 'self-employed-window') {
      expect(result.daysRemaining).toBe(0);
    }
  });

  it('returns passed on June 16, 2026 with correct days late', () => {
    const result = get2025FilingStatus(new Date(2026, 5, 16)); // Jun 16 2026
    expect(result.status).toBe('passed');
    if (result.status === 'passed') {
      // Apr 30 to Jun 16 = 47 days
      expect(result.daysLate).toBe(47);
    }
  });

  it('returns passed on December 1, 2026', () => {
    const result = get2025FilingStatus(new Date(2026, 11, 1)); // Dec 1 2026
    expect(result.status).toBe('passed');
  });

  it('returns passed on January 29, 2027 (last NETFILE day)', () => {
    const result = get2025FilingStatus(new Date(2027, 0, 29)); // Jan 29 2027
    expect(result.status).toBe('passed');
  });

  it('returns netfile-closed on January 30, 2027', () => {
    const result = get2025FilingStatus(new Date(2027, 0, 30)); // Jan 30 2027
    expect(result.status).toBe('netfile-closed');
  });

  it('returns netfile-closed well after NETFILE closes', () => {
    const result = get2025FilingStatus(new Date(2027, 5, 1)); // Jun 1 2027
    expect(result.status).toBe('netfile-closed');
  });
});
