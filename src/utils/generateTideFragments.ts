import dayjs, { type Dayjs } from 'dayjs';

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

  const reducer = (
    previousValue: TideFragment[],
    _: TideFragment,
    idx: number,
  ): TideFragment[] => {
    let label: string;
    let date: string;
    let time: string;
    const index = idx + 1;
    let height: number;

    const previousTideFragment = previousValue[previousValue.length - 1];
    const computedDatetime: Dayjs | undefined =
      previousTideFragment !== undefined
        ? dayjs(
            `${String(previousTideFragment.date)} ${String(
              previousTideFragment.time,
            )}`,
          ).add(tide.hour, 'minute')
        : undefined;

    switch (index) {
      case 1:
        label = isTideRising ? 'BM' : 'PM';
        date = tide.start.date;
        time = tide.start.time;
        height = tide.start.height;
        break;
      case 7:
        label = isTideRising ? 'PM' : 'BM';
        date = tide.end.date;
        time = tide.end.time;
        height = tide.end.height;
        break;
      default:
        label = isTideRising ? `PM -${7 - index}` : `PM +${index}`;
        date =
          computedDatetime !== undefined
            ? computedDatetime.format('YYYY-MM-DD')
            : '';
        time =
          computedDatetime !== undefined
            ? computedDatetime.format('HH:mm')
            : '';

        height = Number(previousTideFragment.height);
        if (index === 3 || index === 6) {
          if (isTideRising) {
            height += tide.range * (2 / 12);
          } else {
            height -= tide.range * (2 / 12);
          }
        } else if (index === 4 || index === 5) {
          if (isTideRising) {
            height += tide.range * (3 / 12);
          } else {
            height -= tide.range * (3 / 12);
          }
        } else {
          if (isTideRising) {
            height += tide.range * (1 / 12);
          } else {
            height -= tide.range * (1 / 12);
          }
        }
        break;
    }

    previousValue.push({
      index,
      label,
      date,
      time,
      height,
      hour: undefined,
    });
    return previousValue;
  };

  return Array(7).fill({}).reduce(reducer, []);
}
