import React, { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTasks } from "../Tasks/taskActions";
import TaskCard from "../Tasks/TaskCard";
import Loading from "../../components/Common/Loading/Loading";
import Modal from "../../components/Common/Modal/Modal";
import CreateStatus from "../Status/CreateStatus";
import { fetchStatuses } from "../Status/statusAction";

export default function Board(props: { id: number }) {
  const { id } = props;
  const [showStatusModel, setShowStatusModel] = useState(false);
  const dispatch = useAppDispacth();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const loading = useAppSelector((state: RootState) => state.tasks.loading);
  const error = useAppSelector((state: RootState) => state.tasks.error);
  const statuses = useAppSelector(
    (state: RootState) => state.statuses.statuses
  );

  useEffect(() => {
    dispatch(fetchTasks(id));
    dispatch(fetchStatuses());
  }, [dispatch, id]);

  // const groupedStatuses: Record<string, Status[]> = {};

  // statuses.forEach((status) => {
  //   const boardId = status.description.split(":")[1];
  //   if (groupedStatuses[boardId]) {
  //     groupedStatuses[boardId].push(status);
  //   } else {
  //     groupedStatuses[boardId] = [status];
  //   }
  // });

  // console.log({ groupedStatuses });

  // console.log(groupedStatuses);
  const filteredStatuses = statuses.filter((status) => {
    const statusBoardId = status.description.split(":")[1];
    return statusBoardId === id.toString();
  });
  const updatedStatuses = filteredStatuses.map((status) => {
    const updatedStatus = { ...status }; // Create a new object with the same properties
    const statusTasks = tasks.filter(
      (task) => task?.status_object?.id === status.id
    );
    updatedStatus.tasks = statusTasks; // Add the tasks to the `tasks` property of the new object
    return updatedStatus;
  });
  console.log({ updatedStatuses });
  // const groupedData: { [key: number]: { title: string; items: Task[] } } =
  //   tasks.reduce((acc, item) => {
  //     const { status_object } = item;
  //     const statusObjectId: number = status_object?.id as number;
  //     if (!acc[statusObjectId]) {
  //       acc[statusObjectId] = {
  //         title: status_object?.title as string,
  //         items: [],
  //       };
  //     }
  //     acc[statusObjectId].items.push(item);
  //     return acc;
  //   }, {} as { [key: number]: { title: string; items: Task[] } });

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="w-10/12  ml-64 mr-5 ">
      <h1 className="text-3xl font-semibold my-5"> My Tasks</h1>
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
        <button
          className="flex focus:outline-none bg-green-500 text-white px-4 py-2 rounded-lg  w-44 hover:bg-green-600
            items-center justify-center font-semibold"
          onClick={() => setShowStatusModel(true)}
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

          <span className="text-lg ml-2">Add List</span>
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex mt-5 ">
          {/* display all the statuses having the given board id */}
          {Object.entries(updatedStatuses).map((status) => (
            <div
              key={status[1].id}
              className="p-5  bg-white m-3 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 
                scrollbar-thumb-rounded-full scrollbar-track-rounded-full max-h-screen"
            >
              <h2 className="font-semibold text-lg capitalize ml-2">
                {status[1].title}
              </h2>

              <div>
                {status[1]?.tasks?.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    id={task.id as number}
                    boardId={task.board as number}
                  />
                ))}
              </div>
              <button
                className="flex focus:outline-none  px-4 py-2 rounded-md w-full hover:bg-gray-200
                  items-center justify-center mt-5 text-gray-500"
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

                <span className="text-lg ml-2">Add Task</span>
              </button>
            </div>
          ))}
        </div>
      )}
      <Modal open={showStatusModel} closeCB={() => setShowStatusModel(false)}>
        <CreateStatus boardId={id} />
      </Modal>
    </div>
  );
}
