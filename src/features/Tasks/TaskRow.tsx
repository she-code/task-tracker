import React, { useState } from "react";
import DeleteIcon from "../../components/Common/Icons/DeleteIcon";
import EditIcon from "../../components/Common/Icons/EditIcon";
import Modal from "../../components/Common/Modal/Modal";
import EditTask from "./EditTask";
import { Task } from "../../types/taskTypes";

export default function TaskRow(props: {
  task: Task;
  index: number;
  description: string;
  handleTaskDelete: (taskId: number, boardId: number) => void;
}) {
  const { task, index, description, handleTaskDelete } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <tr
      className="border-b  even:hover:bg-neutral-100 odd:hover:bg-slate-400 cursor-pointer"
      key={task?.id}
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        <p>{index + 1}</p>
      </td>
      <td
        className={`whitespace-nowrap px-6 py-4  text-lg capitalize ${
          task?.is_completed ? "line-through" : "no-underline"
        }`}
      >
        <p>{task?.title}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-lg first-letter:capitalize">
        <p>{description}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-lg first-letter:capitalize">
        <p>{task?.priority}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-lg capitalize">
        <p>{task?.status_object?.title?.split(":")[0]}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-lg">
        <p>{task?.created_date?.split("T")[0]}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-lg first-letter:capitalize">
        <p>
          {task?.due_date?.split("T")[0]} at {task?.due_date?.split("T")[1]}
        </p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-lg">
        <div className="flex justify-between">
          <button className="mr-2" onClick={() => setShowModal(true)}>
            <EditIcon />
          </button>
          <button
            className="mr-2"
            onClick={() => handleTaskDelete(task?.id as number, task.board)}
          >
            <DeleteIcon />
          </button>
        </div>
      </td>
      <Modal open={showModal} closeCB={() => setShowModal(false)}>
        <EditTask
          boardId={task.board}
          taskId={task.id as number}
          handleCloseModal={() => setShowModal(false)}
        />
      </Modal>
    </tr>
  );
}
