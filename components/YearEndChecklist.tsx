'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'mapletax_yearend_2026';

interface ChecklistItem {
  id: string;
  text: string;
  note?: string;
}

interface ChecklistGroup {
  id: string;
  title: string;
  subtitle?: string;
  items: ChecklistItem[];
}

const GROUPS: ChecklistGroup[] = [
  {
    id: 'registered-accounts',
    title: 'Registered Accounts',
    subtitle: 'December 31 deadline',
    items: [
      {
        id: 'tfsa-2026',
        text: 'Make TFSA contributions for 2026.',
        note: 'Unused room carries forward, but the tax-free growth opportunity for this year is permanently lost.',
      },
      {
        id: 'fhsa-2026',
        text: 'Make FHSA contributions for 2026 ($8,000 limit, or up to $16,000 with carry-forward room).',
        note: 'Hard deadline: December 31.',
      },
      {
        id: 'rrsp-plan-2026',
        text: 'Plan your RRSP contribution and verify your 2026 room.',
        note: 'Optional before year-end — contribution deadline is March 2, 2027. Room = 18% of 2025 earned income up to $33,810 plus unused carry-forward.',
      },
      {
        id: 'resp-2026',
        text: 'Make RESP contributions for children with room.',
        note: 'CESG is earned in the calendar year the contribution is made — contributions after December 31 count toward 2027.',
      },
      {
        id: 'overcontrib-check',
        text: 'Verify you have not over-contributed to any registered account.',
        note: 'TFSA over-contributions are penalized at 1%/month on the excess.',
      },
    ],
  },
  {
    id: 'charitable-donations',
    title: 'Charitable Donations',
    subtitle: 'December 31 deadline',
    items: [
      {
        id: 'donations-2026',
        text: 'Make all planned charitable donations to registered charities before December 31.',
      },
      {
        id: 'donate-securities',
        text: 'Consider donating appreciated securities instead of cash.',
        note: 'Capital gain on donated publicly-listed securities is zero AND you receive a full donation receipt at fair market value.',
      },
    ],
  },
  {
    id: 'capital-gains',
    title: 'Capital Gains and Losses',
    items: [
      {
        id: 'review-portfolio',
        text: 'Review non-registered investment accounts for unrealized gains and losses.',
      },
      {
        id: 'tax-loss-selling',
        text: 'Identify positions with unrealized losses to offset capital gains realized in 2026.',
      },
      {
        id: 'superficial-loss',
        text: 'Check the superficial loss rule: wait 30+ days before repurchasing a sold security.',
        note: 'You can immediately buy a similar-but-not-identical security to maintain market exposure.',
      },
      {
        id: 'settlement-cutoff',
        text: 'Verify brokerage settlement cutoff for year-end trades.',
        note: 'Canadian equities settle T+1. Sell by approximately December 29 to ensure December 31 settlement.',
      },
      {
        id: 'capital-gains-threshold',
        text: 'If significant capital gains: note the $250,000 annual threshold for the 1/2 inclusion rate.',
        note: 'Gains above $250,000 in a year are included at 2/3 for individuals.',
      },
    ],
  },
  {
    id: 'business',
    title: 'Business Owners and Self-Employed',
    items: [
      {
        id: 'q4-instalment',
        text: 'Make Q4 instalment payment (due December 15).',
      },
      {
        id: 'accelerate-expenses',
        text: 'Accelerate deductible business expenses before December 31.',
        note: 'Prepaid subscriptions, equipment purchases, advertising commitments.',
      },
      {
        id: 'collect-receipts',
        text: 'Collect all business receipts and reconcile with bank and card statements.',
      },
    ],
  },
  {
    id: 'admin',
    title: 'Year-End Administration',
    items: [
      {
        id: 'province-of-residence',
        text: 'Confirm your province of residence on December 31.',
        note: 'Your December 31 province determines which provincial tax rates apply to your entire 2026 income.',
      },
      {
        id: 'update-cra-status',
        text: 'Update marital status and dependant information with CRA via My Account.',
        note: 'Required if any changes in 2026: marriage, separation, new child, dependant turning 19.',
      },
      {
        id: 'beneficiary-designations',
        text: 'Review RRSP/TFSA beneficiary designations and life insurance beneficiaries.',
        note: 'Update these if any life events occurred in 2026.',
      },
      {
        id: 'medical-receipts',
        text: 'Gather receipts for medical expenses incurred in 2026.',
        note: 'The 12-month window lets you claim any period ending in 2026 — receipts from late 2025 may also qualify.',
      },
      {
        id: 't2200-logbook',
        text: 'Ensure T2200 is signed by employer or vehicle logbook is current.',
        note: 'Required to claim employment home-office or vehicle expenses for 2026.',
      },
    ],
  },
];

const TOTAL_ITEMS = GROUPS.reduce((sum, g) => sum + g.items.length, 0);

export default function YearEndChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: string[] = JSON.parse(stored);
        setChecked(new Set(parsed));
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const reset = () => {
    setChecked(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  };

  const doneCount = checked.size;
  const pct = TOTAL_ITEMS > 0 ? Math.round((doneCount / TOTAL_ITEMS) * 100) : 0;

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            {doneCount} of {TOTAL_ITEMS} items complete
          </span>
          <span className="tabular-nums text-neutral-500 dark:text-neutral-400">{pct}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={TOTAL_ITEMS}
          aria-label={`${doneCount} of ${TOTAL_ITEMS} checklist items complete`}
          className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700"
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Groups */}
      {GROUPS.map((group) => (
        <div key={group.id} className="space-y-2">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {group.title}
            </h3>
            {group.subtitle && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                — {group.subtitle}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {group.items.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={checked.has(item.id)}
                  onChange={() => toggle(item.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 accent-emerald-600 dark:border-neutral-600"
                />
                <div className="min-w-0">
                  <span
                    className={`text-sm leading-snug ${
                      checked.has(item.id)
                        ? 'text-neutral-400 line-through dark:text-neutral-600'
                        : 'text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    {item.text}
                  </span>
                  {item.note && !checked.has(item.id) && (
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      {item.note}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Reset */}
      <div className="pt-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-200"
        >
          Reset checklist
        </button>
      </div>
    </div>
  );
}
