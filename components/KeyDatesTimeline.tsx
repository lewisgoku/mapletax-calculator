'use client';

import { KEY_DATES_2026 } from '@/lib/registered-accounts/2026';

type Audience = 'Everyone' | 'Self-employed' | 'Investors' | 'Business owners';

interface TimelineEntry {
  date: string;
  title: string;
  explanation: string;
  audience: Audience;
}

const ENTRIES: TimelineEntry[] = [
  {
    date: KEY_DATES_2026.tfsaRoomReset,
    title: 'TFSA room resets',
    explanation: 'New $7,000 of TFSA contribution room becomes available for 2026.',
    audience: 'Everyone',
  },
  {
    date: KEY_DATES_2026.slipMailingDeadlineT4T5,
    title: 'T4 / T5 slip deadline',
    explanation: 'Employers and financial institutions must mail T4 and T5 slips by this date.',
    audience: 'Everyone',
  },
  {
    date: KEY_DATES_2026.netfileOpens2025Returns,
    title: 'NETFILE opens for 2025 returns',
    explanation: 'CRA begins accepting 2025 T1 returns via NETFILE (exact date may vary — confirm at canada.ca/netfile).',
    audience: 'Everyone',
  },
  {
    date: KEY_DATES_2026.q1Instalment,
    title: 'Q1 instalment due',
    explanation: 'First quarterly tax instalment for 2026 is due.',
    audience: 'Self-employed',
  },
  {
    date: KEY_DATES_2026.t3SlipMailing,
    title: 'T3 slip mailing deadline',
    explanation: 'Mutual fund trusts and ETFs must mail T3 slips by this date — often arrive in April.',
    audience: 'Investors',
  },
  {
    date: KEY_DATES_2026.t1FilingDeadline2025,
    title: 'T1 filing deadline + 2025 balance owing',
    explanation: '2025 personal tax return filing deadline. 2025 balance owing is also due today — even for self-employed filers.',
    audience: 'Everyone',
  },
  {
    date: KEY_DATES_2026.q2Instalment,
    title: 'Q2 instalment due + self-employed filing deadline',
    explanation: 'Second quarterly instalment due. Also the extended filing deadline for self-employed 2025 T1 returns.',
    audience: 'Self-employed',
  },
  {
    date: KEY_DATES_2026.q3Instalment,
    title: 'Q3 instalment due',
    explanation: 'Third quarterly tax instalment for 2026.',
    audience: 'Self-employed',
  },
  {
    date: KEY_DATES_2026.q4Instalment,
    title: 'Q4 instalment due',
    explanation: 'Final quarterly instalment for 2026. Also a key year-end business expense deadline.',
    audience: 'Self-employed',
  },
  {
    date: KEY_DATES_2026.yearEnd,
    title: 'Year-end hard deadline',
    explanation: 'Last day for 2026 TFSA, FHSA, RESP contributions; charitable donations; tax-loss selling; all 2026-year-end moves.',
    audience: 'Everyone',
  },
  {
    date: KEY_DATES_2026.rrspDeadlineFor2026TaxYear,
    title: 'RRSP deadline for 2026 tax year',
    explanation: 'Last day to make RRSP contributions deductible on the 2026 return. First 60 days of 2027.',
    audience: 'Everyone',
  },
];

const AUDIENCE_STYLES: Record<Audience, string> = {
  Everyone: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  'Self-employed': 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Investors: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  'Business owners': 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function KeyDatesTimeline() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let nextUpcomingIndex = -1;
  for (let i = 0; i < ENTRIES.length; i++) {
    const [y, m, d] = ENTRIES[i].date.split('-').map(Number);
    const entryDate = new Date(y, m - 1, d);
    if (entryDate >= now) {
      nextUpcomingIndex = i;
      break;
    }
  }

  return (
    <div className="space-y-0">
      {ENTRIES.map((entry, i) => {
        const [y, m, d] = entry.date.split('-').map(Number);
        const entryDate = new Date(y, m - 1, d);
        const isPast = entryDate < now;
        const isNext = i === nextUpcomingIndex;

        return (
          <div
            key={entry.date + entry.title}
            className={`relative flex gap-4 pb-6 ${isPast ? 'opacity-40' : ''}`}
          >
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div
                className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${
                  isNext
                    ? 'bg-[#C41E3A]'
                    : isPast
                    ? 'bg-neutral-300 dark:bg-neutral-600'
                    : 'bg-neutral-400 dark:bg-neutral-500'
                }`}
              />
              {i < ENTRIES.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              )}
            </div>

            {/* Content */}
            <div
              className={`min-w-0 flex-1 rounded-xl border px-4 py-3 ${
                isNext
                  ? 'border-l-4 border-[#C41E3A] border-t-neutral-200 border-r-neutral-200 border-b-neutral-200 dark:border-t-neutral-800 dark:border-r-neutral-800 dark:border-b-neutral-800'
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              <div className="flex flex-wrap items-start gap-2">
                <p
                  className={`tabular-nums text-xs font-semibold ${
                    isPast
                      ? 'text-neutral-400 dark:text-neutral-600'
                      : isNext
                      ? 'text-[#C41E3A]'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {formatDate(entry.date)}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${AUDIENCE_STYLES[entry.audience]}`}
                >
                  {entry.audience}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {entry.title}
              </p>
              <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                {entry.explanation}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
