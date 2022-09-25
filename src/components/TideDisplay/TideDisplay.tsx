import { Box, Stack, Switch, Typography } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { Tide, TideFragment } from '../../models/tide';
import TideChartDisplay from '../TideChartDisplay/TideChartDisplay';
import TideTableDisplay from '../TideTableDisplay/TideTableDisplay';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  tide: Tide;
}

const TideDisplay: React.FC<Props> = ({ tide }) => {
  const [displayType, setDisplayType] = useState<boolean>(true);

  const isTideRising = tide.isRising;

  const test = (
    previousValue: TideFragment[],
    currentValue: TideFragment,
    idx: number
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
              previousTideFragment.time
            )}`
          ).add(tide.hour, 'minute')
        : undefined;

    /* 
    
    height 1: start
    height 2: 1/6
    height 3: 2/6
    height 4: 3/6
    height 5: 3/6
    height 6: 2/6
    height 7: end
    
    */

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

  const data = useCallback(Array(7).fill({}).reduce(test, []), [tide]);

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Graphique</Typography>
        <Switch
          checked={displayType}
          onChange={() => setDisplayType(!displayType)}
        />
        <Typography>Liste</Typography>
      </Stack>
      {displayType ? (
        <TideChartDisplay rows={data} />
      ) : (
        <TideTableDisplay rows={data} />
      )}
    </Box>
  );
};

export default TideDisplay;
