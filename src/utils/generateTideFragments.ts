import dayjs from 'dayjs';

import type { Tide, TideFragment } from '@/models/tide';

/**
 * Generates 7 tide fragments according to the "rule of twelfths" for graphical or tabular display.
 *
 * This function splits a tide interval into 7 parts, applying the rule of twelfths to estimate the tide height at each interval.
 * The first and last fragments correspond to the start and end of the tide, while the intermediate fragments are calculated based on the tide's range and whether the tide is rising or falling.
 *
 * @param tide - The tide object containing start/end times, heights, range, and direction (rising or falling).
 * @returns An array of 7 `TideFragment` objects, each representing a segment of the tide with computed date, time, and height.
 */
export function generateTideFragments(tide: Tide): TideFragment[] {
  const isTideRising = tide.isRising === 1;
  const startDateTime = dayjs(`${tide.start.date} ${tide.start.time}`);
  const intervalMinutes = tide.hour;

  // Règle des douzièmes pour chaque intervalle (cumulé)
  const twelfths = [0, 1, 3, 6, 9, 11, 12];

  return twelfths.map((twelfth, idx) => {
    let label: string;
    let date: string;
    let time: string;
    let height: number;
    const index = idx + 1;

    if (index === 1) {
      label = isTideRising ? 'BM' : 'PM';
      date = tide.start.date;
      time = tide.start.time;
      height = tide.start.height;
    } else if (index === 7) {
      label = isTideRising ? 'PM' : 'BM';
      date = tide.end.date;
      time = tide.end.time;
      height = tide.end.height;
    } else {
      label = isTideRising ? `PM -${7 - index}` : `PM +${index}`;
      const dt = startDateTime.add(intervalMinutes * (index - 1), 'minute');
      date = dt.format('YYYY-MM-DD');
      time = dt.format('HH:mm');
      const delta = isTideRising
        ? tide.range * (twelfth / 12)
        : tide.range * ((12 - twelfth) / 12);
      height = isTideRising
        ? tide.start.height + delta
        : tide.end.height + delta;
    }

    return {
      index,
      label,
      date,
      time,
      height,
      hour: undefined,
    };
  });
}
