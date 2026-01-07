import { clsx, type ClassValue } from 'clsx';
import { Time } from 'lightweight-charts';
import { twMerge } from 'tailwind-merge';

/**
 * Combine multiple class-value inputs into a single className string and resolve Tailwind CSS class conflicts.
 *
 * @returns A single space-separated class string with conflicting Tailwind classes merged according to Tailwind rules
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric value as a localized currency or plain numeric string.
 *
 * @param value - The numeric value to format; if `null`, `undefined`, or `NaN` returns a zero representation.
 * @param digits - Number of fraction digits to show; defaults to 2.
 * @param currency - ISO 4217 currency code to use when showing a currency symbol; defaults to `'USD'`.
 * @param showSymbol - When `true` or `undefined`, include the currency symbol; when `false`, return a plain number string.
 * @returns A localized formatted string (currency when `showSymbol` is `true`/`undefined`, otherwise a plain number). When `value` is missing or `NaN` returns `'$0.00'` unless `showSymbol` is `false`, in which case returns `'0.00'`.
 */
export function formatCurrency(
  value: number | null | undefined,
  digits?: number,
  currency?: string,
  showSymbol?: boolean,
) {
  if (value === null || value === undefined || isNaN(value)) {
    return showSymbol !== false ? '$0.00' : '0.00';
  }

  if (showSymbol === undefined || showSymbol === true) {
    return value.toLocaleString(undefined, {
      style: 'currency',
      currency: currency?.toUpperCase() || 'USD',
      minimumFractionDigits: digits ?? 2,
      maximumFractionDigits: digits ?? 2,
    });
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits ?? 2,
    maximumFractionDigits: digits ?? 2,
  });
}

/**
 * Format a numeric change value as a percentage string with one decimal place.
 *
 * @param change - The numeric change value (e.g., `2.5` for 2.5%). If `null`, `undefined`, or `NaN`, it is treated as zero.
 * @returns The change formatted to one decimal place followed by `%` (for example, `2.5%`). Returns `0.0%` for `null`, `undefined`, or `NaN` inputs.
 */
export function formatPercentage(change: number | null | undefined): string {
  if (change === null || change === undefined || isNaN(change)) {
    return '0.0%';
  }
  const formattedChange = change.toFixed(1);
  return `${formattedChange}%`;
}

/**
 * Selects CSS and icon classes that reflect whether a numeric value is trending up or down.
 *
 * @param value - The numeric change to evaluate; positive indicates an upward trend, zero or negative indicates a downward trend
 * @returns An object with:
 *  - `textClass` — text color class (`green` when up, `red` when down)
 *  - `bgClass` — background color class (light green when up, light red when down)
 *  - `iconClass` — icon identifier (`icon-up` when up, `icon-down` when down)
 */
export function trendingClasses(value: number) {
  const isTrendingUp = value > 0;

  return {
    textClass: isTrendingUp ? 'text-green-400' : 'text-red-400',
    bgClass: isTrendingUp ? 'bg-green-500/10' : 'bg-red-500/10',
    iconClass: isTrendingUp ? 'icon-up' : 'icon-down',
  };
}

/**
 * Convert a date to a concise human-readable relative time string.
 *
 * @param date - The reference date to compare with the current time. Accepts a `Date`, a numeric timestamp, or an ISO/date string.
 * @returns A short relative time string:
 * - `just now` for times less than 60 seconds ago
 * - `X min` for times less than 60 minutes ago
 * - `X hour` or `X hours` for times less than 24 hours ago
 * - `X day` or `X days` for times less than 7 days ago
 * - `X week` or `X weeks` for times less than 4 weeks ago
 * - `YYYY-MM-DD` (ISO date) for older dates
 */
export function timeAgo(date: string | number | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime(); // difference in ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''}`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''}`;

  // Format date as YYYY-MM-DD
  return past.toISOString().split('T')[0];
}

/**
 * Converts an array of OHLC tuples into objects compatible with lightweight-charts and removes consecutive duplicate timestamps.
 *
 * Each input tuple is expected as [time, open, high, low, close], where `time` is a numeric timestamp (seconds).
 *
 * @param data - Array of OHLC tuples to convert.
 * @returns An array of objects with keys `time` (cast to `Time`), `open`, `high`, `low`, and `close`; consecutive entries with the same `time` are deduplicated (first occurrence kept).
 */
export function convertOHLCData(data: OHLCData[]) {
  return data
    .map((d) => ({
      time: d[0] as Time, // ensure seconds, not ms
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter((item, index, arr) => index === 0 || item.time !== arr[index - 1].time);
}

export const ELLIPSIS = 'ellipsis' as const;
export const buildPageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | typeof ELLIPSIS)[] => {
  const MAX_VISIBLE_PAGES = 5;

  const pages: (number | typeof ELLIPSIS)[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push(ELLIPSIS);
  }

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push(ELLIPSIS);
  }

  pages.push(totalPages);

  return pages;
};