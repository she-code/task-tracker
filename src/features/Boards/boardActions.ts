import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBoardApi,
  deleteBoard,
  editBoard,
  getBoard,
  getBoards,
} from "../../utils/apiUtils";
import {
  requestFailure,
  requestStart,
  getBoardsSuccess,
  getBoardSuccess,
  deleteBoardSuccess,
  createBoardSuccess,
  updateBoardSuccess,
} from "./boardSlice";
import { Board } from "../../types/boardTypes";

// // Async thunk action for fetching boards
export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, { dispatch }) => {
    try {
      dispatch(requestStart());
      const boards = await getBoards();
      dispatch(getBoardsSuccess(boards.results));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const fetchBoard = createAsyncThunk(
  "boards/fetchBoard",
  async (id: number, { dispatch }) => {
    try {
      // dispatch(requestStart());
      const board = await getBoard(id);
      dispatch(getBoardSuccess(board));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
export const deleteBoardAction = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId: number, { dispatch }) => {
    try {
      //dispatch(requestStart());
      await deleteBoard(boardId);
      dispatch(deleteBoardSuccess(boardId));
      // navigate("/boards");
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const createBoardAction = createAsyncThunk(
  "boards/createBoard",
  async (boardData: Board, { dispatch }) => {
    try {
      // dispatch(requestStart());
      const newBoard = await createBoardApi(boardData);
      dispatch(createBoardSuccess(newBoard));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const updateBoardAction = createAsyncThunk(
  "boards/updateBoard",
  async (boardData: Board, { dispatch }) => {
    try {
      dispatch(requestStart());
      const updatedBoard = await editBoard(boardData, boardData?.id as number);
      dispatch(updateBoardSuccess(updatedBoard));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
