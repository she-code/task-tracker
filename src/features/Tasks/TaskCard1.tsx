import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import EditTask from "./EditTask";
import { Task } from "../../types/taskTypes";
import { DraggableProvided } from "@hello-pangea/dnd";

export default function TaskCard1(props: {
  task: Task;
  boardId: number;
  provided: DraggableProvided;
  isVisible: boolean;
  setTaskVisibility: React.Dispatch<React.SetStateAction<{}>>;
}) {
  const [showEditTaskModel, setShowEditTaskModel] = useState(false);
  const { task, boardId, provided, isVisible, setTaskVisibility } = props;
  const taskId = task.id?.toString() || "";
  return (
    <div
      className="bg-gray-100 p-2 my-2 rounded-md flex justify-between items-center"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onDoubleClick={() => {
        setShowEditTaskModel(true);
      }}
      onMouseEnter={() => {
        setTaskVisibility((prevState) => ({
          ...prevState,
          [taskId]: true,
        }));
      }}
      onMouseLeave={() => {
        setTaskVisibility((prevState) => ({
          ...prevState,
          [taskId]: false,
        }));
      }}
    >
      <p>{task.title.split("_")[0]}</p>
      <button
        className={`focus:outline-none ${
          isVisible ? "block" : "hidden"
        } hover:bg-gray-200 rounded py-1 px-2`}
        onClick={() => {
          setShowEditTaskModel(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <Modal
        open={showEditTaskModel}
        closeCB={() => setShowEditTaskModel(false)}
      >
        <EditTask
          boardId={boardId}
          taskId={task.id as number}
          handleCloseModal={() => setShowEditTaskModel(false)}
        />
      </Modal>
    </div>
  );
}
