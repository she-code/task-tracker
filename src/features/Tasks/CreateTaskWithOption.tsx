import React, { useEffect, useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import { Errors } from "../../types/common";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  setBoard,
  setDescription,
  setDueDate,
  setPriority,
  setStatus,
  setTitle,
} from "./taskSlice";
import { Task, validateTask } from "../../types/taskTypes";
import { createTask } from "./taskActions";
import { fetchStatuses } from "../Status/statusAction";
import { createSuccess } from "../../components/Common/Notifications";

export default function CreateTaskWithOptions(props: {
  // boardId: number;
  // statusId: number;
  handleClose: () => void;
}) {
  const { handleClose } = props;
  const [errors, setErrors] = useState<Errors<Task>>({});
  const [loading, setLoading] = useState(false);

  const boards = useAppSelector((state: RootState) => state.boards.boards);

  const statuses = useAppSelector(
    (state: RootState) => state.statuses.statuses
  );
  const dispatch = useAppDispacth();
  const {
    title,
    description,
    due_date,
    priority,
    status,
    board,
    is_completed,
  } = useAppSelector((state: RootState) => state.tasks);

  //fetch statuses
  useEffect(() => {
    dispatch(fetchStatuses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //set intial status and board
  useEffect(() => {
    if (statuses.length > 0) {
      dispatch(setStatus(statuses[0]?.id as number));
    }
    if (boards.length > 0) {
      dispatch(setBoard(boards[0]?.id as number));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handles submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask({
      title,
      description,
      status: status,
      board: board,
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        dispatch(
          createTask({
            task: {
              title,
              description,
              status: status,
              board: board,
              due_date,
              priority,
              is_completed,
            },
            id: board,
          })
        ).then((_) => {
          setLoading(false);
          createSuccess();
          handleClose();
        });
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
        <div className="p-2 flex mr-2">
          <div className="flex items-center">
            <label htmlFor="priority" className="text-lg font-semibold  ">
              Priority
            </label>
            <div className="mr-2">
              <select
                className="p-5 focus:outline-none   focus:border-l-green-500 focus:border-l-4 py-2 text-md "
                onChange={(e) => dispatch(setPriority(e.target.value))}
                value={priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mr-2">
            <label
              className="mr-2 text-xl font-semibold text-black"
              htmlFor="selectBoard"
            >
              Board
            </label>
            <select
              aria-label="Select Board"
              title="selectBoard"
              className="px-4 py-4 focus:outline-none font-light  focus:border-l-green-500 focus:border-l-4 rounded-md"
              onChange={(e) => dispatch(setBoard(Number(e.target.value)))}
              value={board}
            >
              {boards?.map((board) => (
                <option value={board.id} key={board.id}>
                  {board.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label
              className="mr-2 text-xl font-semibold text-black"
              htmlFor="selectStatus"
            >
              Status
            </label>
            <select
              aria-label="Select Statustatus"
              title="selectStatus"
              className="px-4 py-4 focus:outline-none font-light  focus:border-l-green-500 focus:border-l-4 rounded-md"
              onChange={(e) => dispatch(setStatus(Number(e.target.value)))}
              value={status}
            >
              {statuses?.map((status) => (
                <option value={status.id} key={status.id}>
                  {status.title.split(":")[0]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="dueDate" className="text-lg font-semibold mr-2">
              Due Date
            </label>
            <input
              className="border-2 border-gray-200 border-l-blue-500 rounded-lg p-3 m-2 w-full focus:outline-none focus:border-l-green-500 focus:border-l-8"
              type="datetime-local"
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
        >
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
