import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import type { FC } from 'react';
import { Line } from 'react-chartjs-2';

import type { TideFragment } from '@/models/tide';
import { TwelveTideScale } from '@/utils/TwelveTideScale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TwelveTideScale,
);

interface TideChartDisplayProps {
  rows: TideFragment[];
}

const TideChartDisplay: FC<TideChartDisplayProps> = ({ rows }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'twelveTideScale',
        offset: true,
        ticks: {
          callback: (value: number) => rows[value].time,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: rows.map((value) => value.time),
    datasets: [
      {
        data: rows.map((value) => value.height),
        borderColor: '#fb923c',
      },
    ],
  };

  // @ts-expect-error
  return <Line options={options} data={data} />;
};

export { TideChartDisplay };
