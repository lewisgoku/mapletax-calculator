import type { TaxBracket } from '@/lib/rates/types';

interface Props {
  brackets: TaxBracket[];
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function formatRate(rate: number): string {
  const pct = rate * 100;
  return pct % 1 === 0 ? `${pct}%` : `${pct.toFixed(2)}%`;
}

/** Returns display rows from a bracket array — exported for unit testing. */
export function buildBracketRows(
  brackets: TaxBracket[]
): { range: string; rate: string }[] {
  return brackets.map((bracket, i) => {
    const lower = i === 0 ? 0 : brackets[i - 1].upper;
    const isFirst = i === 0;
    const isLast = bracket.upper === Infinity;

    let range: string;
    if (isFirst && isLast) {
      range = 'All income';
    } else if (isFirst) {
      range = `First ${formatMoney(bracket.upper)}`;
    } else if (isLast) {
      range = `Over ${formatMoney(lower)}`;
    } else {
      range = `Over ${formatMoney(lower)} to ${formatMoney(bracket.upper)}`;
    }

    return { range, rate: formatRate(bracket.rate) };
  });
}

export default function BracketTable({ brackets }: Props) {
  const rows = buildBracketRows(brackets);

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
            >
              Income range
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500"
            >
              Tax rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 bg-white dark:divide-neutral-900 dark:bg-neutral-950">
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                {row.range}
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium text-neutral-900 dark:text-neutral-100">
                {row.rate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
