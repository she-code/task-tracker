import React, { useEffect, useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";

import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

import { Errors } from "../../types/common";
import {
  Task,
  parseTaskDescription,
  stringifyTaskDescription,
  validateTask,
} from "../../types/taskTypes";
import { clearTask, setTaskDescription, setTaskTitle } from "./taskSlice";
import { deleteTaskAction, editTaskAction, fetchTask } from "./taskActions";
import {
  deleteSuccess,
  updateSuccess,
} from "../../components/Common/Notifications";

export default function EditTask(props: {
  boardId: number;
  taskId: number;
  // statusId: number;
  handleCloseModal: () => void;
}) {
  const { handleCloseModal, boardId, taskId } = props;
  const [errors, setErrors] = useState<Errors<Task>>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispacth();
  const task = useAppSelector((state: RootState) => state.tasks.task);
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  //initial fetch of task data
  useEffect(() => {
    const fetchTaskData = async () => {
      await dispatch(fetchTask({ boardId, taskId }));
    };

    fetchTaskData();
  }, [dispatch, boardId, taskId]);

  //sets task fields
  useEffect(() => {
    if (task && task?.description) {
      setDescription(parseTaskDescription(task?.description)?.description);
      setPriority(parseTaskDescription(task?.description)?.priority);
      setDueDate(parseTaskDescription(task?.description)?.due_date);
      setIsCompleted(parseTaskDescription(task?.description)?.is_completed);
    }
  }, [task]);

  //updates task description
  useEffect(() => {
    const updatedDescription = stringifyTaskDescription({
      description: description,
      priority: priority,
      due_date: dueDate,
      is_completed: isCompleted,
    });
    dispatch(setTaskDescription(updatedDescription));
  }, [description, priority, dueDate, isCompleted, dispatch]);

  //clears task on unmount
  useEffect(() => {
    return () => {
      dispatch(clearTask());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handles form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask(task);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        dispatch(editTaskAction({ task, boardId })).then((_) => {
          setLoading(false);
          updateSuccess();
        });
        handleCloseModal();
      } catch (error) {
        console.log(error);
        // dispatch(requestFailure((error as string).toString()));
      }
    }
  };

  //handles delete task
  const handleDeleteTask = () => {
    dispatch(deleteTaskAction({ taskId, boardId })).then((_) => {
      deleteSuccess();
    });
    handleCloseModal();
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold my-5 text-center">Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="title" className="text-lg font-semibold mr-2">
              Title{" "}
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                dispatch(setTaskTitle(event.target.value));
              }}
              type="text"
              value={task?.title.split("_")[0] || ""}
              name="title"
            />
          </div>
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="description" className="text-lg font-semibold mr-2">
              Description
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                setDescription(event.target.value);
              }}
              type="text"
              name="description"
              value={description || ""}
            />
          </div>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="p-2  ">
          <div className="flex items-center">
            <label
              htmlFor="priority"
              className="text-lg font-semibold mr-2 mt-5"
            >
              Priority
            </label>
            <div className=" mt-5">
              <select
                className="p-5 focus:outline-none   focus:border-l-green-500 focus:border-l-4 py-2 text-md "
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="dueDate" className="text-lg font-semibold mr-2">
              Due Date
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                setDueDate(event.target.value);
              }}
              type="datetime-local"
              name="dueDate"
              value={dueDate || ""}
              // value={task?.description || ""}
            />
          </div>
        </div>
        <div className="p-2  ">
          <div className="flex items-center">
            <label
              htmlFor="isCompleted"
              className="text-lg font-semibold mr-2 mt-5"
            >
              IS Completed
            </label>
            <div className=" mt-5">
              <input
                type="checkbox"
                value={isCompleted ? "true" : "false"}
                checked={isCompleted}
                onChange={(e) => {
                  setIsCompleted(e.target.checked);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-600 rounded py-2 px-3 text-white "
          >
            {loading ? "Loading..." : "Save"}
          </button>
          <button
            className="bg-gray-600 rounded py-2 px-3 text-white "
            onClick={(e) => {
              e.preventDefault();
              handleDeleteTask();
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
