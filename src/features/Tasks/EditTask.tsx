import React, { useEffect, useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";

import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

import { Errors } from "../../types/common";
import { Task, validateTask } from "../../types/taskTypes";
import { setTaskDescription, setTaskDueDate, setTaskTitle } from "./taskSlice";
import { editTaskAction, fetchTask } from "./taskActions";

export default function EditTask(props: {
  boardId: number;
  taskId: number;
  handleCloseModal: () => void;
}) {
  const { handleCloseModal, boardId, taskId } = props;
  const [errors, setErrors] = useState<Errors<Task>>({});
  const dispatch = useAppDispacth();
  const task = useAppSelector((state: RootState) => state.tasks.task);
  // const loading = useAppSelector((state: RootState) => state.boards.loading);
  // const error = useAppSelector((state: RootState) => state.boards.error);

  // useEffect(() => {
  //   dispatch(fetchTask({ boardId, taskId }));
  //   // task.due_date = ;
  //   dispatch(setTaskDueDate(task.title?.split("_")[1]?.trim() || ""));
  //   console.log({ hh: task.due_date, task });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, boardId, taskId]);
  useEffect(() => {
    const fetchTaskData = async () => {
      await dispatch(fetchTask({ boardId, taskId }));
    };

    fetchTaskData();
  }, [dispatch, boardId, taskId]);

  useEffect(() => {
    if (task && task.title) {
      const dueDate = task.title.split("_")[1]?.trim();
      if (task.due_date !== dueDate) {
        dispatch(setTaskDueDate(dueDate));
        console.log({ hh: task?.due_date, task });
      }
    }
  }, [dispatch, task, task?.title]);
  // useEffect(() => {
  //   if (task && task.title) {
  //     const dueDate = task.title.split("_")[1]?.trim();
  //     dispatch(setTaskDueDate(dueDate));
  //   }
  // }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask(task);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        dispatch(editTaskAction({ task, boardId }));
        handleCloseModal();
      } catch (error) {
        console.log(error);
        // dispatch(requestFailure((error as string).toString()));
      }
    }
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
                dispatch(setTaskDescription(event.target.value));
              }}
              type="text"
              name="description"
              value={task?.description || ""}
            />
          </div>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="dueDate" className="text-lg font-semibold mr-2">
              Due Date
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                dispatch(setTaskDueDate(event.target.value));
                console.log({ event: event.target.value, due: task?.due_date });
              }}
              type="date"
              name="dueDate"
              value={task?.due_date || ""}
              // value={task?.description || ""}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 rounded py-2 px-3 text-white "
          // disabled={loading}
        >
          Submit
        </button>
      </form>
      {/* {error ? <p>{error}</p> : ""} */}
    </div>
  );
}
