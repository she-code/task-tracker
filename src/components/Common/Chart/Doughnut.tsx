import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Task } from "../../../types/taskTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props: { content: Task[] }) {
  const { content } = props;
  const completedTasks = content.filter((task) => task?.is_completed);
  const incompletedTasks = content.filter((task) => !task?.is_completed);
  const data = {
    labels: ["Completed Tasks", "Incomplete Tasks"],
    datasets: [
      {
        label: "Tasks",
        data: [completedTasks?.length ?? 0, incompletedTasks?.length ?? 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    aspectRatio: 1.1,
    responsive: true,
  };
  return (
    <div className="text-white w-full pb-4 lg:h-[600px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}
