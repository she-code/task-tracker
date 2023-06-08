import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardStateType } from "../../types/boardTypes";
import { StatusWithTasks } from "../../types/statusTypes";
import {
  deleteTaskSuccess,
  updateTaskStatus,
  updateTaskSuccess,
} from "../Tasks/taskSlice";
import { deleteStatus, updateStatus } from "../Status/statusSlice";
import { DropResult } from "@hello-pangea/dnd";

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

    updateTaksOnDnD(state, action: PayloadAction<DropResult>) {
      const { source, destination } = action.payload;
      // Create a shallow copy of the state object
      const newState = { ...state };
      const sourceStatusIndex = newState?.statuses?.findIndex(
        (status) => status.id === parseInt(source?.droppableId)
      );

      if (sourceStatusIndex !== -1) {
        const sourceStatus = newState?.statuses[sourceStatusIndex];
        const sourceTasks = Array.isArray(sourceStatus?.tasks)
          ? [...sourceStatus.tasks]
          : [];

        const draggedTask = sourceTasks[source?.index];
        if (draggedTask) {
          draggedTask.status = parseInt(destination?.droppableId as string);
          // Remove the dragged task from the source tasks
          sourceTasks.splice(source?.index, 1);

          if (source?.droppableId === destination?.droppableId) {
            // Rearranging within the same status
            sourceTasks.splice(destination?.index, 0, draggedTask); // Insert the dragged task into the new position
          } else {
            // Moving to a different status
            const destinationStatusIndex = newState?.statuses?.findIndex(
              (status) =>
                status?.id === parseInt(destination?.droppableId as string)
            );

            if (destinationStatusIndex !== -1) {
              const destinationStatus =
                newState.statuses[destinationStatusIndex];
              const destinationTasks = Array.isArray(destinationStatus?.tasks)
                ? [...destinationStatus.tasks]
                : [];

              destinationTasks.splice(
                destination?.index as number,
                0,
                draggedTask
              ); // Insert the dragged task into the destination tasks

              newState.statuses[destinationStatusIndex] = {
                ...destinationStatus,
                tasks: destinationTasks,
              }; // Update the destination status tasks
            }
          }

          newState.statuses[sourceStatusIndex] = {
            ...sourceStatus,
            tasks: sourceTasks,
          }; // Update the source status tasks
        }
      }

      state = newState; // Assign the updated state directly
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

    builder.addCase(updateTaskStatus, (state, action) => {
      console.log("called");
      state.loading = false;
      state.error = null;
      state.statuses = state?.statuses?.map((status) =>
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
  updateTaksOnDnD,
} = boardSlice.actions;
