import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { TwelveTideScale } from './TwelveTideScale';
import { TideFragment } from '../../models/tide';

ChartJS.register(
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
      xAxis: {
        type: 'twelveTideScale',
        offset: true,
        ticks: {
          callback: (value: number) => rows[value].time
        }
      },
      yAxis: {
        beginAtZero:true
      }
    }
  };

  const data = {
    labels: rows.map((value) => value.time),
    datasets: [
      {
        data: rows.map((value) => value.height),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // @ts-expect-error
  return <Line options={options} data={data} />;
};

export default TideChartDisplay;
