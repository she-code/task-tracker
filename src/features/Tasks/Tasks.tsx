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
import Loading from "../../components/Common/Loading/Loading";
import CreateTaskWithOptions from "./CreateTaskWithOption";
import { getAuthToken } from "../../utils/storageUtils";
import { navigate } from "raviger";
import { clearBoards } from "../Boards/boardSlice";
import TaskRow from "./TaskRow";
import { deleteSuccess } from "../../components/Common/Notifications";
import TaskFilters from "./TaskFilters";
import TaskFilterMenu from "./TaskFilterMenu";

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

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    // isSmallScreen ? setToggle(true) : setToggle(false);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen]);
  //filters the tasks based on the selected option
  const handleTaskDelete = (taskId: number, boardId: number) => {
    dispatch(deleteTaskAction({ taskId, boardId })).then(() => {
      deleteSuccess();
    });
  };

  return (
    <div className=" w-10/12  mx-auto  ">
      <h1 className="text-3xl font-semibold my-5 text-white"> Tasks</h1>
      {isSmallScreen ? (
        <TaskFilterMenu
          gridView={gridView}
          setFilterOptions={setFilterOptions}
          setFilterTasks={setFilterTasks}
          setGridView={setGridView}
          setShowCreateTaskModal={setShowCreateTaskModal}
        />
      ) : (
        <TaskFilters
          gridView={gridView}
          setFilterOptions={setFilterOptions}
          setFilterTasks={setFilterTasks}
          setGridView={setGridView}
          setShowCreateTaskModal={setShowCreateTaskModal}
        />
      )}
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
                                key={task?.id}
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
