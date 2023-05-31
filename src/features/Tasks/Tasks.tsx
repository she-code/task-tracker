import React, { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { useAppSelector, useAppDispacth } from "../../app/hooks";
import { fetchBoards } from "../Boards/boardActions";
import { fetchTasks } from "./taskActions";
import TaskCard from "./TaskCard";

export default function Todos() {
  const [showModal, setShowModal] = useState(false);
  const [boardId, setBoardId] = useState(0);
  const [gridView, setGridView] = useState(true);
  const dispatch = useAppDispacth();
  const boards = useAppSelector((state: RootState) => state.boards.boards);
  const loading = useAppSelector((state: RootState) => state.boards.loading);
  const error = useAppSelector((state: RootState) => state.boards.error);
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchBoards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (boardId === 0) {
      return;
    }
    dispatch(fetchTasks(boardId));
    console.log(tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" w-10/12  ml-64 mr-5">
      <h1 className="text-3xl font-semibold my-5"> To Do</h1>
      <div className="flex justify-between">
        <button className="flex focus:outline-none border-2 border-gray-400 px-4 py-2 rounded  w-44  items-center justify-center">
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
          <span className="text-lg ml-2">Filter </span>
        </button>

        <div className="flex">
          <button
            className="flex focus:outline-none border-2 border-gray-400 px-4 py-2 rounded-md mr-3 w-44  items-center justify-center"
            onClick={() => setShowModal(true)}
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
                d="M12 6v12m6-6H6"
              />
            </svg>

            <span className="text-lg ml-2">Add New</span>
          </button>
          <div className="flex">
            <button
              className={`flex focus:outline-none border-2 border-r-0 border-gray-400 px-4 py-2  rounded-r-none items-center justify-center rounded-md ${
                gridView ? "bg-gray-200" : "bg-white"
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
                gridView ? "bg-white" : "bg-gray-200"
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
        <select
          className="px-2 focus:outline-none font-light  focus:border-l-green-500 focus:border-l-4 py-2"
          onChange={(e) => setBoardId(Number(e.target.value))}
        >
          <option value="" defaultValue=" Select Board" disabled selected>
            Select Board
          </option>{" "}
          {boards?.map((board) => (
            <option value={board.id} key={board.id}>
              {board.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        {loading ? (
          <div>loading</div>
        ) : gridView ? (
          <div>
            {tasks.length === 0 ? (
              <p>No tasks created</p>
            ) : (
              <div className="grid grid-cols-3 gap-4 mt-5">
                {tasks &&
                  tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      id={task.id as number}
                      boardId={task.board as number}
                    />
                  ))}
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
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
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
                            Status
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Created At
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks &&
                          tasks.map((task, index) => (
                            <tr
                              className="border-b bg-neutral-100"
                              key={task.id}
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                <p>{index + 1}</p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4  text-lg capitalize">
                                <p>{task.title}</p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-lg first-letter:capitalize">
                                <p>{task.description}</p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-lg capitalize">
                                <p>{task.status_object?.title}</p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-lg">
                                <p>{task.created_date?.split("T")[0]}</p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-lg">
                                <div className="flex justify-between">
                                  <button className="mr-2">
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
                                  <button className="mr-2">
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
      {/* <Modal open={showModal} closeCB={() => setShowModal(false)}>
        <CreateBoard />
      </Modal> */}
    </div>
  );
}
