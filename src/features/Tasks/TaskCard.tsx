import { Link } from "raviger";
import React, { useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import EditTask from "./EditTask";

export default function TaskCard(props: {
  title: string;
  description: string;
  id: number;
  boardId: number;
}) {
  const { title, description, id, boardId } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  //handles formField deletion
  const handleDeleteBoard = (boardId: number) => {
    // dispatch(deleteBoardAction(boardId));
  };

  return (
    <div className="bg-gray-400 rounded-lg shadow-lg m-5 p-5 w-80  h-44">
      <div className="flex justify-between">
        <p className="text-xl font-semibold ">{title}</p>

        <div className="relative">
          <button
            className="inline-flex justify-center items-center space-x-2 bg-transparent px-3 
            py-2 rounded-md focus:outline-none "
            onClick={() => setOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg flex flex-col  z-10">
              <Link
                href={`/boards/${id}`}
                className="  px-4 py-2 text-lg font-normal text-neutral text-center hover:bg-neutral-100 w-full"
              >
                View
              </Link>
              <button
                onClick={(_) => setShowEditModal(true)}
                className="hover:bg-neutral-100 w-full px-4 py-2 text-lg font-normal text-neutral"
              >
                Edit
              </button>
              <button
                className=" px-4 py-2 text-lg font-normal text-center text-neutral hover:bg-neutral-100 w-full "
                onClick={(_) => handleDeleteBoard(id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-lg">{description}</p>
      </div>
      <Modal open={showEditModal} closeCB={() => setShowEditModal(false)}>
        <EditTask id={id} boardId={boardId} />
      </Modal>
    </div>
  );
}
