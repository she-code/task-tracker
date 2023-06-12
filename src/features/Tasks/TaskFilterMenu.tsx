import React, { useState } from "react";
import Tooltip from "../../components/Common/Tooltip/Tooltip";
import AddIcon from "../../components/Common/Icons/AddIcon";

export default function TaskFilterMenu(props: {
  setFilterTasks: (filter: string) => void;
  setFilterOptions: (filterOptions: string) => void;
  setShowCreateTaskModal: (showTaskModal: boolean) => void;
  gridView: boolean;
  setGridView: (gridView: boolean) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  const {
    setFilterTasks,
    setFilterOptions,
    setShowCreateTaskModal,
    gridView,
    setGridView,
  } = props;
  return (
    <div className="relative">
      <Tooltip message="Options">
        <button
          className="inline-flex justify-center items-center space-x-2 bg-transparent  bg-white text-brown px-2
    py-2 rounded-md focus:outline-none "
          onClick={() => setOpen(!isOpen)}
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
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
      </Tooltip>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg flex flex-col  z-10">
          <select
            aria-label="Filter Tasks"
            title="Filter Tasks"
            className=" focus:outline-none px-4 py-4 mr-5 focus:border-l-green-500 focus:border-l-4  text-lg font-semibold rounded-md"
            onChange={(e) => setFilterTasks(e.target.value)}
            defaultValue=""
          >
            <option disabled value="">
              Date
            </option>
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
            defaultValue=""
          >
            <option disabled value="">
              Filter
            </option>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="high">High Priority</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
          </select>
          <button
            className="flex focus:outline-none text-brown px-2 my-3 bg-neutral-100   
            rounded-md items-center justify-center py-2"
            onClick={() => setShowCreateTaskModal(true)}
          >
            <AddIcon />
            Add New Task
          </button>

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
      )}
    </div>
  );
}
