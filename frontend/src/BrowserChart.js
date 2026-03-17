import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BrowserChart({ results }) {

  const browsers = ['Chromium', 'Firefox', 'WebKit'];

  const passedCounts = browsers.map(browser =>
    results.filter(r => r.browser === browser && r.status === 'passed').length
  );

  const failedCounts = browsers.map(browser =>
    results.filter(r => r.browser === browser && r.status === 'failed').length
  );

  const data = {
    labels: browsers,
    datasets: [
      {
        label: 'Passed',
        data: passedCounts,
        backgroundColor: 'green'
      },
      {
        label: 'Failed',
        data: failedCounts,
        backgroundColor: 'red'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Cross Browser Test Results'
      }
    }
  };

  return <Bar data={data} options={options} />;
}

export default BrowserChart;