import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Task } from "../../../types/taskTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    title: {
      display: true,
      text: "Task Priority",
      color: "white",
      font: {
        size: 20,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white",
        font: {
          weight: "lighter",
          size: 16,
        },
      },
    },
    y: {
      ticks: {
        color: "white",
        display: false,
      },
    },
  },
  aspectRatio: 1.1,
};

export default function PriorityChart(props: { content: Task[] }) {
  const { content } = props;
  const highPriorityTasks = content.filter((task) => task?.priority === "high");
  const mediumPriorityTasks = content.filter(
    (task) => task?.priority === "medium"
  );
  const lowPriorityTasks = content.filter((task) => task?.priority === "low");

  const labels = ["High", "Medium", "Low"];

  const data = {
    labels,
    datasets: [
      {
        label: "All",
        data: [
          highPriorityTasks.length,
          mediumPriorityTasks.length,
          lowPriorityTasks.length,
        ],
        backgroundColor: [
          "rgb(131 98 191)",
          "rgb(130 53 165)",
          "rgba(255, 99, 132, 0.5)",
        ],
      },
    ],
  };
  return (
    <div className="w-full">
      <Bar options={options} data={data} />
    </div>
  );
}
