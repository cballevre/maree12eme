import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TideFragment } from '../../models/tide';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  rows: TideFragment[];
}

const TideChartDisplay: React.FC<Props> = ({ rows }) => {
  const options = {
    responsive: true,
  };

  const data = {
    labels: rows.map((value) => value.time),
    datasets: [
      {
        label: 'Dataset 1',
        data: rows.map((value) => value.height),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default TideChartDisplay;
