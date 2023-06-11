import { useEffect, useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";

import { RootState } from "../../app/store";
import { useAppSelector, useAppDispacth } from "../../app/hooks";
import { fetchBoards } from "../Boards/boardActions";
import { deleteTaskAction, fetchTasks } from "./taskActions";
import TaskCard from "./TaskCard";
import { parseTaskDescription } from "../../types/taskTypes";
import { setTaskFields } from "./taskSlice";
import Modal from "../../components/Common/Modal/Modal";
import ModalOpenerBtn from "../../components/Common/Button/ModalOpenerBtn";
import Loading from "../../components/Common/Loading/Loading";
import CreateTaskWithOptions from "./CreateTaskWithOption";
import { getAuthToken } from "../../utils/storageUtils";
import { navigate } from "raviger";
import { clearBoards } from "../Boards/boardSlice";
import TaskRow from "./TaskRow";
import { deleteSuccess } from "../../components/Common/Notifications";

export default function Todos() {
  const [gridView, setGridView] = useState(true);
  const dispatch = useAppDispacth();
  const boards = useAppSelector((state: RootState) => state.boards.boards);
  const loading = useAppSelector((state: RootState) => state.boards.loading);
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const [filterTasks, setFilterTasks] = useState("all");
  const [filterOptions, setFilterOptions] = useState("all");
  const [description, setDescription] = useState("");
  const [boardId, setBoardId] = useState(boards[0]?.id || 0);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  //checks the requird credentials
  useEffect(() => {
    if (getAuthToken() === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetches the boards
  useEffect(() => {
    dispatch(fetchBoards()).then(() => {
      setBoardId(boards[0]?.id || 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards.length]);

  //fetches the tasks for the selected board
  useEffect(() => {
    if (boardId === 0) {
      return;
    }
    dispatch(fetchTasks(boardId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, filterTasks, filterOptions, tasks.length]);

  //sets the task fields
  useEffect(() => {
    tasks?.forEach((task) => {
      if (task && task?.description) {
        const parsedTaskDescription = parseTaskDescription(task?.description);

        setDescription(parsedTaskDescription?.description);
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
  }, [dispatch, tasks]);

  //clears the boards
  useEffect(() => {
    return () => {
      dispatch(clearBoards());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //filters the tasks based on the selected option
  const handleTaskDelete = (taskId: number, boardId: number) => {
    dispatch(deleteTaskAction({ taskId, boardId })).then(() => {
      deleteSuccess();
    });
  };

  return (
    <div className=" w-10/12  mx-auto  ">
      <h1 className="text-3xl font-semibold my-5 text-white"> Tasks</h1>
      <div className="flex justify-between items-center">
        <div className="flex  flex-wrap">
          <select
            aria-label="Filter Tasks"
            title="Filter Tasks"
            className=" focus:outline-none px-4 py-4 mr-5 focus:border-l-green-500 focus:border-l-4  text-lg font-semibold rounded-md"
            onChange={(e) => setFilterTasks(e.target.value)}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="overdue">Overdue</option>
            <option value="upcoming">Upcoming</option>
            <option value="noDue">No Due Date</option>
          </select>
          <select
            className="p-5 focus:outline-none  px-4 py-4 focus:border-l-green-500 focus:border-l-4 text-lg  font-semibold rounded-md"
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
            onClickCB={() => setShowCreateTaskModal(true)}
          />
          <div className="flex ml-5">
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
          <div className="mt-6 text-white text-lg">No Boards are Created</div>
        ) : (
          <div className="flex items-center">
            <label
              className="mr-2 text-xl font-semibold text-white"
              htmlFor="selectBoard"
            >
              Board:{" "}
            </label>
            <select
              aria-label="Select Board"
              title="selectBoard"
              className="px-4 py-4 focus:outline-none font-light  focus:border-l-green-500 focus:border-l-4 rounded-md"
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
          <Loading />
        ) : gridView ? (
          <div>
            {tasks.length === 0 ? (
              <p className="text-white text-lg mt-5 text-center">
                No tasks created
              </p>
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
          <Loading />
        ) : (
          <div className="flex flex-col mt-5">
            {tasks.length === 0 ? (
              <p className="mt-6 text-lg text-white text-center">
                No Tasks Created
              </p>
            ) : (
              <div
                className={`overflow-x-auto sm:-mx-6 lg:-mx-8  max-h-[90%] overflow-y-auto   `}
              >
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
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
                      <tbody className="bg-glass">
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
                              <TaskRow
                                description={description}
                                handleTaskDelete={handleTaskDelete}
                                task={task}
                                index={index}
                              />
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
      <Modal
        open={showCreateTaskModal}
        closeCB={() => setShowCreateTaskModal(false)}
      >
        <CreateTaskWithOptions
          handleClose={() => setShowCreateTaskModal(false)}
        />
      </Modal>
    </div>
  );
}
