import React, { useState } from "react";
import { Status } from "../../types/statusTypes";
import Modal from "../../components/Common/Modal/Modal";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CreateTask from "../Tasks/CreateTask";
import TaskCard1 from "../Tasks/TaskCard1";
import DeleteIcon from "../../components/Common/Icons/DeleteIcon";
import Tooltip from "../../components/Common/Tooltip/Tooltip";
import { parseTaskDescription } from "../../types/taskTypes";
import EditIcon from "../../components/Common/Icons/EditIcon";
import EditStatus from "./EditStatus";
import AddIcon from "../../components/Common/Icons/AddIcon";

const StatusItem = (props: {
  status: Status;
  id: number;
  handleDeleteStatusCB: (statusId: number) => void;
}) => {
  const { status, id, handleDeleteStatusCB } = props;

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [editStatusModal, setEditStatusModal] = useState(false);
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
          <p className="text-xl font-semibold capitalize mr-3 w-full">
            {status.title.split(":")[0]}
          </p>

          {showDeleteBtn && (
            <div className="flex justify-between">
              <button
                className="focus:outline-none hover:bg-neutral-100 p-1 rounded-md mr-3"
                onClick={() => handleDeleteStatusCB(status?.id as number)}
              >
                <DeleteIcon />
              </button>
              <button
                className="focus:outline-none hover:bg-neutral-100 p-1 rounded-md"
                onClick={() => setEditStatusModal(true)}
              >
                <EditIcon />
              </button>
            </div>
          )}
        </div>
        <p className="text-md text-gray-500 mb-3 capitalize">
          {status?.description}
        </p>
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
                      <Tooltip
                        message={
                          parseTaskDescription(task?.description).description
                        }
                      >
                        <TaskCard1
                          task={task}
                          provided={provided}
                          boardId={id}
                          isVisible={isVisible}
                          setTaskVisibility={setTaskVisibility}
                        />
                      </Tooltip>
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
        <AddIcon />
        <span className="text-lg ml-2">Add Task</span>
      </button>
      <Modal open={editStatusModal} closeCB={() => setEditStatusModal(false)}>
        <EditStatus
          statusId={status?.id as number}
          boardId={id}
          handleCloseModal={() => setEditStatusModal(false)}
        />
      </Modal>
    </div>
  );
};

export default StatusItem;
