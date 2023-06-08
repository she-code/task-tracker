import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { debounce } from "lodash";

import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTasks, updateTaskStatusAction } from "../Tasks/taskActions";
import Loading from "../../components/Common/Loading/Loading";
import Modal from "../../components/Common/Modal/Modal";
import CreateStatus from "../Status/CreateStatus";
import {
  deleteStatusAction,
  fetchStatuses,
  updateStatusDescAction,
} from "../Status/statusAction";
import { Status } from "../../types/statusTypes";

import StatusItem from "../Status/StatusItem";
import {
  addStatusesToBoard,
  addTasksToBoard,
  clearBoardWithStatuses,
  updateTaksOnDnD,
} from "./boardSlice";
import { fetchBoard } from "./boardActions";
import NotFound from "../../components/Common/NotFound/NotFound";
import ModalOpenerBtn from "../../components/Common/Button/ModalOpenerBtn";

export default function Board(props: { id: number }) {
  const { id } = props;
  const [showStatusModel, setShowStatusModel] = useState(false);

  const dispatch = useAppDispacth();
  // const [statusDescription, setStatusDescription] = useState(status?.description);

  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const loading = useAppSelector((state: RootState) => state.tasks.loading);
  const error = useAppSelector((state: RootState) => state.tasks.error);
  const board = useAppSelector((state: RootState) => state.boards.board);

  const boardStatuses = useAppSelector(
    (state: RootState) => state.boards.statuses
  );

  const statuses = useAppSelector(
    (state: RootState) => state.statuses.statuses
  );

  useEffect(() => {
    dispatch(fetchBoard(id));
    if (board) {
      dispatch(fetchTasks(id));
      dispatch(fetchStatuses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  useEffect(() => {
    // Update the board statuses with the tasks
    board &&
      statuses?.forEach((status) => {
        const statusBoardId = status?.title?.split(":")[1];

        if (statusBoardId === id.toString()) {
          const updatedStatus = { ...status };
          const statusTasks = tasks.filter(
            (task) => task?.status_object?.id === status.id
          );
          updatedStatus.tasks = statusTasks;

          const existingStatus = boardStatuses.find(
            (boardStatus) => boardStatus?.id === status?.id
          );

          if (!existingStatus) {
            dispatch(addStatusesToBoard(updatedStatus));
          } else {
            const newTasks = statusTasks?.filter(
              (task) =>
                !existingStatus?.tasks?.find(
                  (existingTask) => existingTask.id === task.id
                )
            );

            if (newTasks.length > 0) {
              dispatch(addTasksToBoard(updatedStatus));
            }
          }
        } else {
          return;
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, statuses, tasks]);
  useEffect(() => {
    // Cleanup function when leaving the page
    return () => {
      dispatch(clearBoardWithStatuses());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: Status
  ) => {
    const newDesc = e.target.value;
    // setStatusDescription(newDesc);
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

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle dnd logic
    dispatch(updateTaksOnDnD(result));

    const taskToUpdate = boardStatuses?.find(
      (status: Status) => status?.id === parseInt(source?.droppableId)
    )?.tasks?.[source?.index];

    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        status: parseInt(destination?.droppableId),
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatedTaskResponse = await dispatch(
          updateTaskStatusAction({ task: updatedTask, id })
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return board ? (
    <div className="w-10/12   mx-auto  overflow-x-auto">
      <h1 className="text-3xl font-semibold my-5 text-white">{board?.title}</h1>
      <div className="flex justify-between w-[90%]">
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
          title="Add Task"
          onClickCB={() => setShowStatusModel(true)}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {boardStatuses?.length === 0 ? (
            <div className="m-5 text-center text-xl font-semibold">
              No Status Created
            </div>
          ) : (
            <div
              className="flex mt-5 max-w-[full] overflow-x-auto  h-[800px]
              scrollbar-thin scrollbar-thumb-gray-500  flex-no-wrap
              scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            >
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
        </>
      )}

      <Modal open={showStatusModel} closeCB={() => setShowStatusModel(false)}>
        <CreateStatus
          boardId={id}
          handleCloseModal={() => setShowStatusModel(false)}
        />
      </Modal>
    </div>
  ) : (
    <NotFound />
  );
}
