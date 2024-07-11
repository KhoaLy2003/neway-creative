import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, Legend, CategoryScale, LinearScale);

const OrderHistoryChart = ({ data }) => {
  const maxValue = Math.max(...Object.values(data), 10);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Number of Orders", // This is the label you want to display
        data: Object.values(data),
        backgroundColor: "#6C36FE",
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
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div style={{ height: "350px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrderHistoryChart;
