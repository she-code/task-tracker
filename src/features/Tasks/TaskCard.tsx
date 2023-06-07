import { Link } from "raviger";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import { useAppDispacth } from "../../app/hooks";
import { Task, parseTaskDescription } from "../../types/taskTypes";
import { setTaskFields } from "./taskSlice";
import EditTask from "./EditTask";

export default function TaskCard(props: {
  task: Task;
  id: number;
  boardId: number;
  handleDeleteTaskActionCB: (taskId: number, boardId: number) => void;
}) {
  const { task, id, boardId, handleDeleteTaskActionCB } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useAppDispacth();
  useEffect(() => {
    if (task && task.description) {
      setDescription(parseTaskDescription(task?.description).description);
      console.log(
        parseTaskDescription(task?.description).priority,
        parseTaskDescription(task?.description).due_date,
        parseTaskDescription(task?.description).is_completed
      );
      dispatch(
        setTaskFields({
          taskId: task.id as number,
          taskDescription: {
            due_date: parseTaskDescription(task?.description).due_date || "",
            is_completed:
              parseTaskDescription(task?.description).is_completed || false,
            priority: parseTaskDescription(task?.description).priority || "low",
          },
        })
      );
    }
    console.log({ task });
  }, [dispatch, task]);
  return (
    <div className=" bg-gray-300 rounded-lg shadow-lg m-5 p-5  ">
      <div className="flex justify-between">
        <p
          className={`capitalize ${
            task?.priority === "high"
              ? "bg-red-500"
              : task?.priority === "medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          } px-3 py-2 text-white rounded-md
          ${task?.is_completed && "line-through"}
          `}
        >
          {task?.priority}
        </p>

        <div className="relative">
          <button
            className="inline-flex justify-center items-center space-x-2 bg-transparent px-3 
            py-2 rounded-md focus:outline-none "
            onClick={() => setOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg flex flex-col  z-10">
              <Link
                href={`/boards/${id}`}
                className="  px-4 py-2 text-lg font-normal text-neutral text-center hover:bg-neutral-100 w-full"
              >
                View
              </Link>
              <button
                onClick={(_) => setShowEditModal(true)}
                className="hover:bg-neutral-100 w-full px-4 py-2 text-lg font-normal text-neutral"
              >
                Edit
              </button>
              <button
                className=" px-4 py-2 text-lg font-normal text-center text-neutral hover:bg-neutral-100 w-full "
                onClick={() => handleDeleteTaskActionCB(id as number, boardId)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p
        className={`text-xl font-semibold capitalize mt-3           ${
          task?.is_completed && "line-through"
        }
`}
      >
        {task?.title}
      </p>

      <div className={`mt-3`}>
        <p
          className={` text-lg capitalize text-gray-500           ${
            task?.is_completed && "line-through"
          }
`}
        >
          {description}
        </p>
        <p className={`${task?.is_completed && "line-through"}`}>
          {" "}
          {task.due_date !== ""
            ? `Due on: ${new Date(
                task?.due_date as string
              ).toLocaleDateString()}`
            : "No Due Date"}
        </p>
      </div>
      <Modal open={showEditModal} closeCB={() => setShowEditModal(false)}>
        <EditTask
          boardId={task?.board}
          taskId={task?.id as number}
          handleCloseModal={() => setShowEditModal(false)}
        />{" "}
      </Modal>
    </div>
  );
}
