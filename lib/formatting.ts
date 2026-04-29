export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPercent(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`;
}

export function fmtBracket(lower: number, upper: number): string {
  if (lower === 0) return `First ${formatCurrency(upper)}`;
  if (!isFinite(upper)) return `Over ${formatCurrency(lower)}`;
  return `${formatCurrency(lower)} to ${formatCurrency(upper)}`;
}
