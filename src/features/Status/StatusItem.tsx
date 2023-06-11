import React, { useState } from "react";
import { updateStatusTitleAction } from "./statusAction";
import { Status } from "../../types/statusTypes";
import Modal from "../../components/Common/Modal/Modal";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CreateTask from "../Tasks/CreateTask";
import TaskCard1 from "../Tasks/TaskCard1";
import { AppDispatch } from "../../app/store";
import DeleteIcon from "../../components/Common/Icons/DeleteIcon";

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
              <DeleteIcon />
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
