import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardStateType } from "../../types/boardTypes";
import { StatusWithTasks } from "../../types/statusTypes";
import { deleteTaskSuccess, updateTaskSuccess } from "../Tasks/taskSlice";
import { deleteStatus, updateStatus } from "../Status/statusSlice";

const initialState: BoardStateType = {
  loading: false,
  boards: [],
  error: null,
  board: {
    title: "",
    description: "",
  },
  title: "",
  description: "",
  statuses: [],
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
    resetInputs(state) {
      state.title = "";
      state.description = "";
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
      console.log(state.boards);
    },
    addStatusesToBoard(state, action: PayloadAction<StatusWithTasks>) {
      state.loading = false;
      state.error = null;
      state.statuses.push(action.payload);
    },
    removeStatusFromBoard(state, action: PayloadAction<number>) {
      state.loading = false;
      state.error = null;
      state.statuses = state.statuses.filter(
        (status) => status.id !== action.payload
      );
    },
    addTasksToBoard: (state, action: PayloadAction<StatusWithTasks>) => {
      const { id, tasks } = action.payload;
      state.statuses = state.statuses.map((boardStatus) =>
        boardStatus.id === id ? { ...boardStatus, tasks: tasks } : boardStatus
      );
    },
    clearBoardWithStatuses(state) {
      state.statuses = [];
    },
  },
  // extraReducers: {
  //   "task/updateTaskSuccess": (state, action) => {
  //     const { statusId, task } = action.payload;
  //     state.statuses = state.statuses.map((status) =>
  //       status.id === statusId
  //         ? {
  //             ...status,
  //             tasks: status.tasks?.map((boardTask) =>
  //               boardTask.id === task.id ? task : boardTask
  //             ),
  //           }
  //         : status
  //     );
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(updateTaskSuccess, (state, action) => {
      state.statuses = state.statuses.map((status) =>
        status.id === action.payload?.status_object?.id
          ? {
              ...status,
              tasks: status.tasks?.map((boardTask) =>
                boardTask.id === action.payload.id ? action.payload : boardTask
              ),
            }
          : status
      );
    });
    builder.addCase(updateStatus, (state, action) => {
      state.statuses = state.statuses.map((status) =>
        status.id === action.payload.id ? action.payload : status
      );
    });
    builder.addCase(deleteStatus, (state, action) => {
      state.statuses = state.statuses.filter(
        (status) => status.id !== action.payload
      );
    });

    builder.addCase(deleteTaskSuccess, (state, action) => {
      state.statuses = state.statuses.map((status) => {
        console.log(status.tasks, "from board slice");
        return {
          ...status,
          tasks: status.tasks?.filter((task) => task.id !== action.payload),
        };
      });
    });
  },
});

export default boardSlice.reducer;
export const {
  getBoardsSuccess,
  requestStart,
  requestFailure,
  createBoardSuccess,
  setTitle,
  addTasksToBoard,
  getBoardSuccess,
  updateBoardSuccess,
  setDescription,
  setBoardDescription,
  setBoardTitle,
  deleteBoardSuccess,
  resetInputs,
  addStatusesToBoard,
  removeStatusFromBoard,
  clearBoardWithStatuses,
} = boardSlice.actions;
