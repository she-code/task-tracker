import { Link, navigate } from "raviger";
import React, { useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import EditBoard from "./EditBoard";
import { useAppDispacth } from "../../app/hooks";
import { deleteBoardAction } from "./boardActions";
import { deleteSuccess } from "../../components/Common/Notifications";

export default function BoardCard(props: {
  title: string;
  description: string;
  id: number;
  color: string;
}) {
  const { title, description, id, color } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useAppDispacth();

  //handles board deletion
  const handleDeleteBoard = (boardId: number) => {
    dispatch(deleteBoardAction(boardId)).then((res) => {
      deleteSuccess();
    });
  };

  return (
    <div
      className={` p-6  rounded-lg shadow-lg m-5    h-52   bg-white cursor-pointer hover:shadow-xl transition duration-300 ease-in-out ${color}`}
      onDoubleClick={(_) => navigate(`/boards/${id}`)}
    >
      <div className="flex justify-between">
        <p className="text-xl font-semibold capitalize text-gray-600">
          {title}
        </p>

        <div className="relative">
          <button
            className="inline-flex justify-center items-center space-x-2 bg-transparent px-3 
            py-2 rounded-md focus:outline-none cursor-pointer"
            onClick={() => setOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-violet-400 rounded-md shadow-lg flex flex-col  z-10 text-black">
              <Link
                href={`/boards/${id}`}
                className="  px-4 py-2 text-lg font-normal  text-center hover:bg-neutral-100 w-full"
              >
                View
              </Link>
              <button
                onClick={(_) => setShowEditModal(true)}
                className="hover:bg-neutral-100 w-full px-4 py-2 text-lg font-normal "
              >
                Edit
              </button>
              <button
                className=" px-4 py-2 text-lg font-normal text-center  hover:bg-neutral-100 w-full "
                onClick={(_) => handleDeleteBoard(id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-lg capitalize text-gray-500">{description}</p>
      </div>
      <Modal open={showEditModal} closeCB={() => setShowEditModal(false)}>
        <EditBoard id={id} handleCloseModal={() => setShowEditModal(false)} />
      </Modal>
    </div>
  );
}
