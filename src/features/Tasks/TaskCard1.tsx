import React, { useEffect, useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import EditTask from "./EditTask";
import { Task, parseTaskDescription } from "../../types/taskTypes";
import { DraggableProvided } from "@hello-pangea/dnd";
import DeleteIcon from "../../components/Common/Icons/DeleteIcon";
import EditIcon from "../../components/Common/Icons/EditIcon";
import CheckIcon from "../../components/Common/Icons/CheckIcon";
import { deleteTaskAction } from "./taskActions";
import { useAppDispacth } from "../../app/hooks";
import { deleteSuccess } from "../../components/Common/Notifications";

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
  const [priority, setPriority] = useState<string>("");
  const [is_completed, setIsCompleted] = useState<boolean>(false);
  const dispatch = useAppDispacth();

  //sets task fields
  useEffect(() => {
    if (task && task?.description) {
      setPriority(parseTaskDescription(task?.description)?.priority);
      setIsCompleted(parseTaskDescription(task?.description)?.is_completed);
    }
  }, [task]);

  //handles task deletion
  const handleDeleteTask = () => {
    dispatch(deleteTaskAction({ taskId: task?.id as number, boardId })).then(
      (res) => {
        deleteSuccess();
      }
    );
  };
  return (
    <div
      className={` bg-gray-100 p-2 my-2 rounded-md flex justify-between items-center
       ${
         priority === "high"
           ? "border-b-2 border-red-500"
           : task?.priority === "medium"
           ? "border-b-2 border-yellow-500"
           : "border-b-2 border-green-500"
       }`}
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
      <p className="flex">
        {" "}
        <span className="mr-2 inline">{is_completed ? <CheckIcon /> : ""}</span>
        {task.title.split("_")[0]}
      </p>
      <div className="flex">
        <button
          className={`focus:outline-none ${
            isVisible ? "block" : "hidden"
          } hover:bg-gray-200 rounded py-1 px-2`}
          onClick={() => {
            setShowEditTaskModel(true);
          }}
        >
          <EditIcon />
        </button>
        <button
          className={`focus:outline-none ${
            isVisible ? "block" : "hidden"
          } hover:bg-gray-200 rounded py-1 px-2`}
          onClick={handleDeleteTask}
        >
          <DeleteIcon />
        </button>
      </div>

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
