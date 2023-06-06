import React, { useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import { Errors } from "../../types/common";
import { Status } from "../../types/statusTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setDescription, setDueDate, setTitle } from "./taskSlice";
import { validateTask } from "../../types/taskTypes";
import { createTask } from "./taskActions";

export default function CreateTask(props: {
  boardId: number;
  statusId: number;
  handleClose: () => void;
}) {
  const { boardId, statusId, handleClose } = props;
  const [errors, setErrors] = useState<Errors<Status>>({});
  const dispatch = useAppDispacth();
  const { title, description, due_date } = useAppSelector(
    (state: RootState) => state.tasks
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask({
      title,
      description,
      status: statusId,
      board: boardId,
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log(statusId, title);
      try {
        dispatch(
          createTask({
            task: {
              title,
              description,
              status: statusId,
              board: boardId,
              due_date,
            },
            id: boardId,
          })
        );
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold my-5 text-center">Create Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="title" className="text-lg font-semibold mr-2">
              Title{" "}
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                dispatch(setTitle(event.target.value));
              }}
              type="text"
              value={title || ""}
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
                console.log(event.target.value);
                dispatch(setDescription(event.target.value));
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
            <label htmlFor="dueDate" className="text-lg font-semibold mr-2">
              Due Date
            </label>
            <input
              className="border-2 border-gray-200 border-l-blue-500 rounded-lg p-3 m-2 w-full focus:outline-none focus:border-l-green-500 focus:border-l-8"
              type="date"
              value={due_date || ""}
              onChange={(e) => {
                dispatch(setDueDate(e.target.value));
              }}
              name="dueDate"
              tabIndex={0}
              aria-label="dueDate"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 rounded py-2 px-3 text-white "
          //disabled={statusLoading}
        >
          Submit
        </button>
      </form>
      {/* {statusError ? <p>{statusError}</p> : ""} */}
    </div>
  );
}
