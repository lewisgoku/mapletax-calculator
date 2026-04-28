'use client';

import { useState, useEffect } from 'react';
import { get2025FilingStatus } from '@/lib/filing/deadlines';

const DISMISS_KEY = 'mapletax:banner-dismissed-tax-filing-2025';

export default function DeadlineStatusBanner() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    setDismissed(wasDismissed);
    setMounted(true);
  }, []);

  if (!mounted || dismissed) return null;

  const filingStatus = get2025FilingStatus(new Date());

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  }

  let borderColor = 'border-neutral-400';
  let textColor = 'text-neutral-700 dark:text-neutral-300';
  let message: string;

  if (filingStatus.status === 'upcoming') {
    if (filingStatus.daysRemaining < 14) {
      borderColor = 'border-amber-500';
      textColor = 'text-amber-800 dark:text-amber-200';
      message = `The April 30 filing deadline is in ${filingStatus.daysRemaining} day${filingStatus.daysRemaining === 1 ? '' : 's'}. File now — late filing adds penalties on top of any balance owing.`;
    } else {
      message = `The April 30 filing deadline is in ${filingStatus.daysRemaining} days. File early to get your refund faster.`;
    }
  } else if (filingStatus.status === 'today') {
    borderColor = 'border-[#C41E3A]';
    textColor = 'text-[#C41E3A] dark:text-red-400';
    message = 'Today is the April 30 filing deadline. File now to avoid late penalties.';
  } else if (filingStatus.status === 'passed') {
    borderColor = 'border-amber-500';
    textColor = 'text-amber-800 dark:text-amber-200';
    message = 'The April 30 deadline has passed. You can still file — the longer you wait, the larger the penalty on any balance owing.';
  } else if (filingStatus.status === 'self-employed-window') {
    borderColor = 'border-neutral-400';
    message = 'If you\'re self-employed, your filing deadline is June 15. However, any balance owing accrues interest from May 1.';
  } else {
    // netfile-closed
    borderColor = 'border-neutral-400';
    message = 'NETFILE is closed for 2025 returns. You can still file a paper return or through a tax professional using EFILE.';
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full border-l-4 ${borderColor} bg-transparent px-4 py-3 sm:px-6`}
    >
      <div className="mx-auto max-w-[1200px] flex items-start justify-between gap-4">
        <p className={`text-sm leading-relaxed ${textColor}`}>{message}</p>
        <button
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
