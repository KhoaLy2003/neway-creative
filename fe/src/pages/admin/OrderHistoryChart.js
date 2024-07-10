import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend } from "chart.js";

ChartJS.register (
    BarElement,
    Legend,
    CategoryScale,
    LinearScale
);

const OrderHistoryChart = ({ data }) => {
  const maxValue = Math.max(...Object.values(data), 10);

  const chartData = {
    labels: Object.keys(data),
    // labels: sortedLabels,
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(data),
        // data: sortedLabels.map(label => data[label]),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: false,
        min: 0,
        max: maxValue,
        ticks: {
            stepSize: 1,
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
      <h2>Order History</h2>
      <div style={{ height: "500px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OrderHistoryChart;
