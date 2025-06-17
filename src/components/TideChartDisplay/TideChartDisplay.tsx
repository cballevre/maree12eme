import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { TwelveTideScale } from './TwelveTideScale';
import { TideFragment } from '../../models/tide';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TwelveTideScale
);

interface Props {
  rows: TideFragment[];
}

const TideChartDisplay: React.FC<Props> = ({ rows }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        type: 'twelveTideScale',
        offset: true,
        ticks: {
          callback: (value: number) => rows[value].time
        }
      },
      y: {
        beginAtZero:true
      }
    }
  };

  const data = {
    labels: rows.map((value) => value.time),
    datasets: [
      {
        data: rows.map((value) => value.height),
        borderColor: '#fb923c'
      },
    ],
  };

  // @ts-expect-error
  return <Line options={options} data={data} />;
};

export default TideChartDisplay;
