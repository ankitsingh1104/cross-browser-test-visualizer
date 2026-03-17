import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function TrendChart({ results }) {

  if (!results || results.length === 0) {
    return null;
  }

  const labels = results.map((r, i) => `Test ${i + 1}`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Execution Time (ms)",
        data: results.map(r => r.duration),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.3)",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" }
      },
      y: {
        ticks: { color: "white" }
      }
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Execution Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default TrendChart;