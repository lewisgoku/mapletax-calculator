'use client';

import { useEffect, useRef, useState } from 'react';
import { PROVINCES_2026, PROVINCE_CODES } from '@/lib/rates/2026';
import { useProvince } from '@/contexts/ProvinceContext';

// Split 13 provinces into two columns for the dropdown panel
const LEFT_CODES = PROVINCE_CODES.slice(0, 7);
const RIGHT_CODES = PROVINCE_CODES.slice(7);

export default function ProvincesDropdown() {
  const [open, setOpen] = useState(false);
  const { province, setProvince } = useProvince();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={[
          'flex items-center gap-1 font-bold uppercase text-xs tracking-tight transition-colors',
          open ? 'text-maple-red' : 'text-zinc-600 hover:text-maple-red dark:text-zinc-400 dark:hover:text-maple-red',
        ].join(' ')}
      >
        Provinces
        <svg
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select province"
          className="absolute left-0 top-full z-50 mt-2 w-72 border border-zinc-200 bg-white shadow-none dark:border-zinc-700 dark:bg-zinc-900"
        >
          <div className="grid grid-cols-2 p-2">
            {[LEFT_CODES, RIGHT_CODES].map((col, ci) => (
              <ul key={ci} className="flex flex-col">
                {col.map((code) => (
                  <li key={code}>
                    <button
                      role="option"
                      aria-selected={province === code}
                      onClick={() => {
                        setProvince(code);
                        setOpen(false);
                      }}
                      className={[
                        'w-full px-3 py-2 text-left font-bold text-xs uppercase tracking-tight transition-colors',
                        province === code
                          ? 'text-maple-red bg-surface-container-low'
                          : 'text-zinc-600 hover:text-maple-red hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-maple-red dark:hover:bg-zinc-800',
                      ].join(' ')}
                    >
                      {PROVINCES_2026[code].name}
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
