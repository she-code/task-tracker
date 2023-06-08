import React, { useState } from "react";
import { updateStatusTitleAction } from "./statusAction";
import { Status } from "../../types/statusTypes";
import Modal from "../../components/Common/Modal/Modal";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CreateTask from "../Tasks/CreateTask";
import TaskCard1 from "../Tasks/TaskCard1";
import { AppDispatch } from "../../app/store";

const StatusItem = (props: {
  status: Status;
  id: number;
  dispatch: AppDispatch;
  handleDeleteStatusCB: (statusId: number) => void;
  handleDescriptionChangeCB: (
    e: React.ChangeEvent<HTMLInputElement>,
    status: Status
  ) => void;
}) => {
  const {
    status,
    id,
    dispatch,
    handleDeleteStatusCB,
    handleDescriptionChangeCB,
  } = props;

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showTaskModel, setShowTaskModel] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>();
  const [taskVisibility, setTaskVisibility] = useState<{
    [taskId: string]: boolean;
  }>({});
  return (
    <div
      key={status?.id}
      onMouseEnter={() => setShowDeleteBtn(true)}
      onMouseLeave={() => setShowDeleteBtn(false)}
      className="p-4 bg-white m-3 rounded-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 w-96 
       scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  shadow-md   flex-shrink-0  h-fit max-h-[90%]"
    >
      <div>
        <div className="flex items-center">
          <input
            type="text"
            name={status.title}
            value={status?.title.split(":")[0]}
            id=""
            className="border-0 focus:outline-none focus:border-2 focus:border-green-500 p-2 rounded-md w-full capitalize text-xl font-semibold  mr-3"
            onChange={(e) =>
              dispatch(
                updateStatusTitleAction({
                  statusData: status,
                  newTitle: e.target.value,
                  boardId: id,
                })
              )
            }
          />
          {showDeleteBtn && (
            <button
              className="focus:outline-none "
              onClick={() => handleDeleteStatusCB(status?.id as number)}
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
          )}
        </div>
        <input
          type="text"
          name={status.description}
          value={status?.description}
          id=""
          className="border-0 focus:outline-none focus:border-2 pl-2 focus:border-green-500 focus:p-2 rounded-md w-full capitalize text-md mb-3 mr-3 text-gray-500"
          onChange={
            (e) => handleDescriptionChangeCB(e, status)
            // dispatch(
            //   updateStatusDescAction({
            //     statusData: status,
            //     newDesc: e.target.value,
            //   })
            // )
          }
        />
      </div>
      {status && (
        <Droppable droppableId={status?.id?.toString() || ""}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-[100px]"
            >
              {status?.tasks?.map((task, index) => {
                const taskId = task.id?.toString() || "";
                const isVisible = taskVisibility[taskId] || false;
                return (
                  <Draggable
                    key={task.id}
                    draggableId={task?.id?.toString() || ""}
                    index={index}
                  >
                    {(provided) => (
                      <TaskCard1
                        task={task}
                        provided={provided}
                        boardId={id}
                        isVisible={isVisible}
                        setTaskVisibility={setTaskVisibility}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      <Modal
        open={showTaskModel && selectedStatusId === status?.id}
        closeCB={() => {
          setShowTaskModel(false);
          setSelectedStatusId(null);
        }}
      >
        <CreateTask
          boardId={id}
          statusId={status?.id as number}
          handleClose={() => {
            setShowTaskModel(false);
            setSelectedStatusId(null);
          }}
        />
      </Modal>
      <button
        className="flex focus:outline-none  px-4 py-2 rounded-md w-full hover:bg-gray-200
        items-center justify-center mt-5 text-gray-500"
        onClick={() => {
          console.log(status.id);
          setShowTaskModel(true);
          setSelectedStatusId(status?.id as number);
        }}
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
  );
};

export default StatusItem;
