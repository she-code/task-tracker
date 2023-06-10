import React, { useEffect, useState } from "react";
import { RootState } from "../../app/store";
// import { fetchBoards } from "./boardActions";
import { useAppSelector, useAppDispacth } from "../../app/hooks";
import BoardCard from "./BoardCard";
import Modal from "../../components/Common/Modal/Modal";
import CreateBoard from "./CreateBoard";
import Loading from "../../components/Common/Loading/Loading";
import ModalOpenerBtn from "../../components/Common/Button/ModalOpenerBtn";
import BoardPagination from "../../components/Common/Pagination/BoardPagination";
import { Board } from "../../types/boardTypes";
import { Pagination } from "../../types/common";
import { getBoards } from "../../utils/apiUtils";
import { getBoardsSuccess, requestFailure } from "./boardSlice";
import SearchBar from "../../components/Common/Search/SearchBar";
import { navigate, useQueryParams } from "raviger";
import { getAuthToken } from "../../utils/storageUtils";

const BoardList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [limit] = useState(6);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [{ search }, setQuery] = useQueryParams<{ search: string }>();
  const [searchString, setSearchString] = useState("");

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
  // useEffect(() => {
  //   dispatch(fetchBoards());
  // }, [dispatch]);

  useEffect(() => {
    if (getAuthToken() === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const fetchBoards = async (offset: number, limit: number) => {
    try {
      console.log({ offset, limit });
      const data: Pagination<Board> = await getBoards({ offset, limit });
      if (!data) {
        throw Error("No data found");
      }
      setTotalPages(data.count / limit);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetches initial content on page reload
    fetchBoards((currentPage - 1) * limit, limit)
      .then((data: Pagination<Board> | undefined) => {
        if (data) {
          setCount(data.count);
          dispatch(getBoardsSuccess(data.results));
          console.log({ init: data.results });
          // Updates totalPages on page reload
          setTotalPages(Math.ceil(data.count / limit));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(error));
      });
  }, [currentPage, limit, dispatch, boards.length]);

  // Fetch boards and update pagination after API response
  useEffect(() => {
    setOffset((currentPage - 1) * limit);

    if (currentPage !== 1) {
      fetchBoards(offset, limit)
        .then((data: Pagination<Board> | undefined) => {
          if (data) {
            setCount(data.count);
            dispatch(getBoardsSuccess(data.results));
          }
        })
        .catch((error) => {
          dispatch(requestFailure(error));
        });
    }
  }, [currentPage, limit, offset, dispatch]);

  const updateSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery({ search: searchString });
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="w-10/12  mx-auto relative h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold my-5 text-white"> My Boards</h1>
        <div className="flex items-center">
          <SearchBar
            value={searchString}
            onSubmitCB={handleSearch}
            handleInputChangeCB={updateSearchString}
          />
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
      </div>
      {boards.length > 0 ? (
        <>
          <div className="grid md:grid-cols-3 sm:grid-cols-1  gap-3 mt-5 w-full">
            {boards
              ?.filter((board: Board) =>
                board.title.toLowerCase().includes(search?.toLowerCase() || "")
              )
              .map((board) => (
                <BoardCard
                  key={board.id}
                  title={board.title}
                  description={board.description}
                  id={board.id as number}
                  color={getRandomColor()}
                />
              ))}
          </div>
          <BoardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            count={count}
            offset={offset}
            limit={limit}
          />
          <Modal open={showModal} closeCB={() => setShowModal(false)}>
            <CreateBoard handleClose={() => setShowModal(false)} />
          </Modal>
        </>
      ) : (
        <div className="mt-5">
          <h2 className="text-2xl font-semibold text-white">
            No Board Created
          </h2>
        </div>
      )}
    </div>
  );
};

export default BoardList;
