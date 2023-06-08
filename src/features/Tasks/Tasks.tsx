import React, { useEffect, useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { RootState } from "../../app/store";
import { useAppSelector, useAppDispacth } from "../../app/hooks";
import { fetchBoards } from "../Boards/boardActions";
import { deleteTaskAction, fetchTasks } from "./taskActions";
import TaskCard from "./TaskCard";
import { parseTaskDescription } from "../../types/taskTypes";
import { setTaskFields } from "./taskSlice";
import Modal from "../../components/Common/Modal/Modal";
import EditTask from "./EditTask";
import ModalOpenerBtn from "../../components/Common/Button/ModalOpenerBtn";

export default function Todos() {
  const [showModal, setShowModal] = useState(false);
  const [gridView, setGridView] = useState(true);
  const dispatch = useAppDispacth();
  const boards = useAppSelector((state: RootState) => state.boards.boards);
  const loading = useAppSelector((state: RootState) => state.boards.loading);
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const [filterTasks, setFilterTasks] = useState("today");
  const [filterOptions, setFilterOptions] = useState("all");
  const [description, setDescription] = useState("");
  const [boardId, setBoardId] = useState(boards[0]?.id || 0);

  useEffect(() => {
    dispatch(fetchBoards()).then(() => {
      setBoardId(boards[0]?.id || 0);
      console.log({ boardId });
    });
    console.log({ boardId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards.length]);

  useEffect(() => {
    if (boardId === 0) {
      return;
    }
    dispatch(fetchTasks(boardId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, filterTasks, filterOptions]);

  useEffect(() => {
    tasks?.forEach((task) => {
      if (task && task?.description) {
        const parsedTaskDescription = parseTaskDescription(task?.description);

        setDescription(parsedTaskDescription?.description);

        console.log(
          parsedTaskDescription.priority,
          parsedTaskDescription.due_date,
          parsedTaskDescription.is_completed
        );

        dispatch(
          setTaskFields({
            taskId: task.id as number,
            taskDescription: {
              due_date: parsedTaskDescription?.due_date || "",
              is_completed: parsedTaskDescription?.is_completed || false,
              priority: parsedTaskDescription?.priority || "low",
            },
          })
        );
      }
    });

    console.log({ tasks });
  }, [dispatch, tasks]);

  const handleTaskDelete = (taskId: number, boardId: number) => {
    dispatch(deleteTaskAction({ taskId, boardId }));
  };

  return (
    <div className=" w-10/12  mx-auto  ">
      <h1 className="text-3xl font-semibold my-5 text-white"> Tasks</h1>
      <div className="flex justify-between items-center">
        <div className="flex  flex-wrap mt-5 ">
          <select
            aria-label="Filter Tasks"
            title="Filter Tasks"
            className="p-5 focus:outline-none  mr-5 focus:border-l-green-500 focus:border-l-4 py-2 text-lg font-semibold"
            onChange={(e) => setFilterTasks(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="overdue">Overdue</option>
            <option value="upcoming">Upcoming</option>
            <option value="noDue">No Due Date</option>
          </select>
          <select
            className="p-5 focus:outline-none   focus:border-l-green-500 focus:border-l-4 py-2 text-lg  font-semibold"
            onChange={(e) => setFilterOptions(e.target.value)}
            aria-label="Filter Options"
            title="Filter Options"
          >
            <option selected hidden>
              Filter
            </option>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="high">High Priority</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
          </select>
        </div>

        <div className="flex">
          <ModalOpenerBtn
            icon={
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
                  d="M12 6v12m6-6H6"
                />
              </svg>
            }
            title="Add New"
            onClickCB={() => setShowModal(true)}
          />
          <div className="flex">
            <button
              className={`flex focus:outline-none border-2 border-r-0 border-gray-400 px-4 py-2  rounded-r-none items-center justify-center rounded-md ${
                gridView ? "bg-gray-200" : "bg-glass"
              }`}
              onClick={(_) => setGridView(true)}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>
            <button
              className={`flex focus:outline-none border-2 border-l-0 border-gray-400 px-4 py-2
              rounded-l-none  items-center justify-center rounded-md ${
                gridView ? "bg-glass" : "bg-gray-200"
              }`}
              onClick={(_) => setGridView(false)}
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
                  d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex  flex-wrap mt-5">
        {boards?.length === 0 ? (
          <div>No Boards are Created</div>
        ) : (
          <div className="flex items-center">
            <label className="mr-2 text-xl font-semibold" htmlFor="selectBoard">
              Board:{" "}
            </label>
            <select
              aria-label="Select Board"
              title="selectBoard"
              className="px-2 focus:outline-none font-light  focus:border-l-green-500 focus:border-l-4 py-2"
              onChange={(e) => setBoardId(Number(e.target.value))}
              value={boardId}
            >
              {boards?.map((board) => (
                <option value={board.id} key={board.id}>
                  {board.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div>loading</div>
        ) : gridView ? (
          <div>
            {tasks.length === 0 ? (
              <p>No tasks created</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4 mt-5 sm:grid-cols-1">
                {tasks &&
                  tasks
                    .filter((task) => {
                      const taskDueDate = new Date(task?.due_date || "");

                      // Filter based on filterTasks
                      switch (filterTasks) {
                        case "all":
                          break;
                        case "today":
                          if (!isToday(taskDueDate)) return false;
                          break;
                        case "overdue":
                          if (!isPast(taskDueDate)) return false;
                          break;
                        case "upcoming":
                          if (!isFuture(taskDueDate)) return false;
                          break;
                        case "noDue":
                          if (task.due_date) return false;
                          break;
                        default:
                          break;
                      }

                      // Filter based on filterOptions
                      switch (filterOptions) {
                        case "all":
                          break;
                        case "completed":
                          if (!task.is_completed) return false;
                          break;
                        case "incomplete":
                          if (task.is_completed) return false;
                          break;
                        case "high":
                          if (task.priority !== "high") return false;
                          break;
                        case "low":
                          if (task.priority !== "low") return false;
                          break;
                        case "medium":
                          if (task.priority !== "medium") return false;
                          break;
                        default:
                          break;
                      }

                      return true;
                    })
                    .map((task) => {
                      return (
                        <TaskCard
                          key={task.id}
                          task={task}
                          id={task.id as number}
                          boardId={task.board as number}
                          handleDeleteTaskActionCB={handleTaskDelete}
                        />
                      );
                    })}
              </div>
            )}
          </div>
        ) : loading ? (
          <div>loading</div>
        ) : (
          <div className="flex flex-col mt-5">
            {tasks.length === 0 ? (
              <p>No Tasks Created</p>
            ) : (
              <div
                className={`overflow-x-auto sm:-mx-6 lg:-mx-8  max-h-[90%] overflow-y-auto   `}
              >
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 bg-glass">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-white font-medium">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-xl">
                            #
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Priority
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Created At
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Due{" "}
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks &&
                          tasks
                            .filter((task) => {
                              const taskDueDate = new Date(
                                task?.due_date || ""
                              );

                              // Filter based on filterTasks
                              switch (filterTasks) {
                                case "today":
                                  if (!isToday(taskDueDate)) return false;
                                  break;
                                case "overdue":
                                  if (!isPast(taskDueDate)) return false;
                                  break;
                                case "upcoming":
                                  if (!isFuture(taskDueDate)) return false;
                                  break;
                                case "noDue":
                                  if (task.due_date) return false;
                                  break;
                                default:
                                  break;
                              }

                              // Filter based on filterOptions
                              switch (filterOptions) {
                                case "completed":
                                  if (!task.is_completed) return false;
                                  break;
                                case "incomplete":
                                  if (task.is_completed) return false;
                                  break;
                                case "high":
                                  if (task.priority !== "high") return false;
                                  break;
                                case "low":
                                  if (task.priority !== "low") return false;
                                  break;
                                case "medium":
                                  if (task.priority !== "medium") return false;
                                  break;
                                default:
                                  break;
                              }

                              return true;
                            })
                            .map((task, index) => (
                              <tr
                                className="border-b bg-neutral-100"
                                key={task.id}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  <p>{index + 1}</p>
                                </td>
                                <td
                                  className={`whitespace-nowrap px-6 py-4  text-lg capitalize ${
                                    task.is_completed
                                      ? "line-through"
                                      : "no-underline"
                                  }`}
                                >
                                  <p>{task.title}</p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-lg first-letter:capitalize">
                                  <p>{description}</p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-lg first-letter:capitalize">
                                  <p>{task.priority}</p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-lg capitalize">
                                  <p>
                                    {task.status_object?.title?.split(":")[0]}
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-lg">
                                  <p>{task.created_date?.split("T")[0]}</p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-lg first-letter:capitalize">
                                  <p>{task.due_date}</p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-lg">
                                  <div className="flex justify-between">
                                    <button
                                      className="mr-2"
                                      onClick={() => setShowModal(true)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-green-500"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      className="mr-2"
                                      onClick={() =>
                                        handleTaskDelete(
                                          task?.id as number,
                                          task.board
                                        )
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-red-500"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                                <Modal
                                  open={showModal}
                                  closeCB={() => setShowModal(false)}
                                >
                                  <EditTask
                                    boardId={task.board}
                                    taskId={task.id as number}
                                    handleCloseModal={() => setShowModal(false)}
                                  />
                                </Modal>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
