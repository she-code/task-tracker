import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardStateType } from "../../types/boardTypes";

const initialState: BoardStateType = {
  //   title: "",
  //   description: "",
  loading: false,
  boards: [],
  error: null,
  board: {
    title: "",
    description: "",
  },
  title: "",
  description: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    getBoardsSuccess(state, action: PayloadAction<Board[]>) {
      state.loading = false;
      state.error = null;
      state.boards = action.payload;
    },

    createBoardSuccess(state, action: PayloadAction<Board>) {
      state.loading = false;
      state.error = null;
      state.boards.push(action.payload);
    },

    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setBoardTitle(state, action: PayloadAction<string>) {
      state.board.title = action.payload;
    },
    setBoardDescription(state, action: PayloadAction<string>) {
      state.board.description = action.payload;
    },
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateBoardSuccess(state, action: PayloadAction<Board>) {
      state.loading = false;
      state.error = null;
      state.boards = state.boards.map((board) =>
        board.id === action.payload.id ? action.payload : board
      );
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getBoardSuccess(state, action: PayloadAction<Board>) {
      state.loading = false;
      state.error = null;
      state.board = action.payload;
    },
    deleteBoardSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.error = null;
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
  },
});

export default boardSlice.reducer;
export const {
  getBoardsSuccess,
  requestStart,
  requestFailure,
  createBoardSuccess,
  setTitle,
  getBoardSuccess,
  updateBoardSuccess,
  setDescription,
  setBoardDescription,
  setBoardTitle,
  deleteBoardSuccess,
} = boardSlice.actions;
