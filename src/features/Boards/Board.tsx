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
  clearBoard,
  clearBoardWithStatuses,
  updateTaksOnDnD,
} from "./boardSlice";
import { fetchBoard } from "./boardActions";
import NotFound from "../../components/Common/NotFound/NotFound";
import ModalOpenerBtn from "../../components/Common/Button/ModalOpenerBtn";
import { getAuthToken } from "../../utils/storageUtils";
import { navigate } from "raviger";
import CheckIcon from "../../components/Common/Icons/CheckIcon";
import { deleteSuccess } from "../../components/Common/Notifications";

export default function Board(props: { id: number }) {
  const { id } = props;
  const [showStatusModel, setShowStatusModel] = useState(false);

  const dispatch = useAppDispacth();
  const [statusD, setStatusData] = useState<Status | null>(null);
  const [newDescription, setNewDescription] = useState("");
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const loading = useAppSelector((state: RootState) => state.tasks.loading);
  const board = useAppSelector((state: RootState) => state.boards.board);

  const boardStatuses = useAppSelector(
    (state: RootState) => state.boards.statuses
  );

  const statuses = useAppSelector(
    (state: RootState) => state.statuses.statuses
  );

  //redirects to login page if user is not authenticated
  useEffect(() => {
    if (getAuthToken() === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetches initial data
  useEffect(() => {
    dispatch(fetchBoard(id));
    if (board) {
      dispatch(fetchTasks(id));
      dispatch(fetchStatuses());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  // Updates the board statuses with the tasks
  useEffect(() => {
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

  // Updates the board statuses with the tasks
  useEffect(() => {
    return () => {
      dispatch(clearBoardWithStatuses());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //clears the board when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearBoard());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: Status
  ) => {
    const newDesc = e?.target?.value;
    // setStatusDescription(newDesc);
    setNewDescription(newDesc);
    setStatusData(status);
    // debouncedUpdateStatusDesc(status, newDesc);
  };
  // const [inputValue, setInputValue] = React.useState("");
  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   status: Status
  // ) => {
  //   setInputValue(event.target.value);
  //   setStatusData(status);
  // };
  // const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  // useEffect(() => {
  //   const delayInputTimeoutId = setTimeout(() => {
  //     setDebouncedInputValue(inputValue);
  //   }, 500);
  //   return () => clearTimeout(delayInputTimeoutId);
  // }, [inputValue, 500]);

  const dispatchUpdateStatusDesc = (statusData: Status, newDesc: string) => {
    dispatch(
      updateStatusDescAction({
        statusData: statusData,
        newDesc: newDesc,
      })
    );
  };
  const debouncedUpdateStatusDesc = debounce(handleDescriptionChange, 200);
  useEffect(() => {
    dispatch(
      updateStatusDescAction({
        statusData: statusD as Status,
        newDesc: newDescription,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDescription]);

  useEffect(() => {
    return () => {
      debouncedUpdateStatusDesc.cancel();
    };
  }, [debouncedUpdateStatusDesc]);

  //deltes a status
  const handleDeleteStatus = (statusId: number) => {
    dispatch(deleteStatusAction({ statusId })).then(() => {
      deleteSuccess();
    });
  };

  // useEffect(() => {
  //   if (debouncedInputValue) {
  //     dispatch(
  //       updateStatusDescAction({
  //         statusData: statusD as Status,
  //         newDesc: debouncedInputValue,
  //       })
  //     );
  //   }
  // }, [debouncedInputValue, dispatch, statusD]);

  //handles drag and drop
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
      <div className="flex justify-between w-[90%] items-center">
        <div className="flex">
          <p className="text-white mr-2">
            {" "}
            <span className="bg-red-500 px-2 py-2 rounded focus:outline-none inline-block mr-1 w-9"></span>
            High
          </p>
          <p className="text-white mr-2">
            {" "}
            <span className="bg-yellow-500 px-2 py-2 rounded focus:outline-none inline-block mr-1 w-9"></span>
            Medium
          </p>
          <p className="text-white mr-2">
            {" "}
            <span className="bg-green-500 px-2 py-2 rounded focus:outline-none inline-block mr-1 w-9"></span>
            Low
          </p>
          <p className="flex text-white ">
            {" "}
            <span className="mr-2 inline bg-white text-brown px-2 py-1">
              {<CheckIcon />}
            </span>
            Completed{" "}
          </p>
        </div>
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
          title="Add List"
          onClickCB={() => setShowStatusModel(true)}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {boardStatuses?.length === 0 ? (
            <div className="m-5 text-center text-2xl font-semibold text-white">
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
