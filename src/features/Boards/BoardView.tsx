import React, { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { fetchBoards } from "./boardActions";
import { useAppSelector, useAppDispacth } from "../../app/hooks";
import BoardCard from "./BoardCard";
import Modal from "../../components/Common/Modal/Modal";
import CreateBoard from "./CreateBoard";
import Loading from "../../components/Common/Loading/Loading";
import ModalOpenerBtn from "../../components/Common/Button/ModalOpenerBtn";

const BoardList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispacth();
  const boards = useAppSelector((state: RootState) => state.boards.boards);
  const loading = useAppSelector((state: RootState) => state.boards.loading);
  const error = useAppSelector((state: RootState) => state.boards.error);
  const getRandomColor = () => {
    const gradients = [
      "bg-gradient-to-r from-red-500 to-yellow-500",
      "bg-gradient-to-r from-blue-500 to-purple-500",
      "bg-gradient-to-r from-green-500 to-teal-500",
      "bg-gradient-to-r from-pink-500 to-rose-500",
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-indigo-500 to-blue-500",
    ];
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  };
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="w-10/12  mx-auto ">
      {boards.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold my-5 text-white">
              {" "}
              My Boards
            </h1>
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
              title="New Board"
              onClickCB={() => setShowModal(true)}
            />
          </div>

          <div className="flex  flex-wrap mt-5">
            {boards?.map((board) => (
              <BoardCard
                key={board.id}
                title={board.title}
                description={board.description}
                id={board.id as number}
                color={getRandomColor()}
              />
            ))}
          </div>
          <Modal open={showModal} closeCB={() => setShowModal(false)}>
            <CreateBoard handleClose={() => setShowModal(false)} />
          </Modal>
        </>
      ) : (
        <div className="mt-5">
          <h2 className="text-2xl font-semibold">No Board Created</h2>
        </div>
      )}
    </div>
  );
};

export default BoardList;
