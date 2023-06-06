import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { debounce } from "lodash";

import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTasks, updateTaskAction } from "../Tasks/taskActions";
import Loading from "../../components/Common/Loading/Loading";
import Modal from "../../components/Common/Modal/Modal";
import CreateStatus from "../Status/CreateStatus";
import {
  deleteStatusAction,
  fetchStatuses,
  updateStatusDescAction,
} from "../Status/statusAction";
import { Status } from "../../types/statusTypes";
import { updateTaskStatus } from "../Tasks/taskSlice";

import StatusItem from "../Status/StatusItem";
import { addStatusesToBoard, addTasksToBoard } from "./boardSlice";

export default function Board(props: { id: number }) {
  const { id } = props;
  const [showStatusModel, setShowStatusModel] = useState(false);

  const dispatch = useAppDispacth();
  // const [statusDescription, setStatusDescription] = useState(status?.description);

  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const loading = useAppSelector((state: RootState) => state.tasks.loading);
  const error = useAppSelector((state: RootState) => state.tasks.error);
  const boardStatuses = useAppSelector(
    (state: RootState) => state.boards.statuses
  );

  const statuses = useAppSelector(
    (state: RootState) => state.statuses.statuses
  );

  useEffect(() => {
    dispatch(fetchTasks(id));
    dispatch(fetchStatuses());
  }, [dispatch, id]);

  useEffect(() => {
    statuses.forEach((status) => {
      const statusBoardId = status.title.split(":")[1];
      if (statusBoardId === id.toString()) {
        const updatedStatus = { ...status };
        const statusTasks = tasks.filter(
          (task) => task?.status_object?.id === status.id
        );
        updatedStatus.tasks = statusTasks;

        if (
          !boardStatuses.find((boardStatus) => boardStatus.id === status.id)
        ) {
          dispatch(addStatusesToBoard(updatedStatus));
        } else {
          dispatch(addTasksToBoard(updatedStatus));
        }
      }
    });

    console.log("updatedStatuses", boardStatuses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, statuses, tasks]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: Status
  ) => {
    const newDesc = e.target.value;
    // setStatusDescription(newDesc);
    console.log("newDesc", newDesc);
    debouncedUpdateStatusDesc(status, newDesc);
  };
  const dispatchUpdateStatusDesc = (statusData: Status, newDesc: string) => {
    dispatch(
      updateStatusDescAction({
        statusData: statusData,
        newDesc: newDesc,
      })
    );
  };
  const debouncedUpdateStatusDesc = debounce(dispatchUpdateStatusDesc, 500); // Adjust the debounce delay as needed

  useEffect(() => {
    return () => {
      debouncedUpdateStatusDesc.cancel();
    };
  }, [debouncedUpdateStatusDesc]);
  const handleDeleteStatus = (statusId: number) => {
    dispatch(deleteStatusAction({ statusId }));
  };
  if (error) {
    return <div>Error: {error}</div>;
  }
  // const handleDragEnd = (result: any) => {
  //   const { destination, source } = result;
  //   if (!destination) return;
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     console.log("same", destination, source);
  //     return;
  //   }
  //   // Handle drag end logic here
  //   const taskToUpdate = updatedStatuses.find(
  //     (status: Status) => status?.id === parseInt(source?.droppableId)
  //   )?.tasks?.[source?.index];
  //   console.log(result, { taskToUpdate, dec: destination?.droppableId });
  //   if (taskToUpdate) {
  //     const updatedTask = {
  //       id: taskToUpdate.id,
  //       title: taskToUpdate.title,
  //       description: taskToUpdate.description,
  //       status: parseInt(destination?.droppableId),
  //       board: taskToUpdate.board,
  //     };
  //     console.log({ updatedTask });
  //     dispatch(updateTaskAction({ task: updatedTask, id }));
  //   }
  // };

  const handleDragEnd = async (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Handle drag end logic here
    const taskToUpdate = boardStatuses?.find(
      (status: Status) => status?.id === parseInt(source?.droppableId)
    )?.tasks?.[source?.index];
    if (taskToUpdate) {
      const updatedTask = {
        id: taskToUpdate.id,
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: parseInt(destination?.droppableId),
        board: taskToUpdate.board,
      };
      try {
        const updatedTaskResponse = await dispatch(
          updateTaskAction({ task: updatedTask, id })
        );
        // After the update is successful, dispatch an action to update the frontend state with the updated task
        dispatch(updateTaskStatus(updatedTaskResponse));
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };
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
        <div className="flex mt-5">
          <DragDropContext onDragEnd={handleDragEnd}>
            {/* Display all the statuses having the given board id */}
            {Object.entries(boardStatuses)?.map(([key, status]) => {
              return (
                <StatusItem
                  key={status?.id}
                  status={status}
                  dispatch={dispatch}
                  id={id}
                  handleDeleteStatusCB={handleDeleteStatus}
                  handleDescriptionChangeCB={handleDescriptionChange}
                />
              );
            })}
          </DragDropContext>
        </div>
      )}

      <Modal open={showStatusModel} closeCB={() => setShowStatusModel(false)}>
        <CreateStatus
          boardId={id}
          handleCloseModal={() => setShowStatusModel(false)}
        />
      </Modal>
    </div>
  );
}
