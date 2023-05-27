import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStateType } from "../../types/taskTypes";

const initialState: TaskStateType = {
  //   title: "",
  //   description: "",
  loading: false,
  tasks: [],
  error: null,
  task: {
    title: "",
    description: "",
    status: 0,
    board: 0,
  },
  title: "",
  description: "",
  status: 0,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.loading = false;
      state.error = null;
      state.tasks = action.payload;
    },

    createTaskSuccess(state, action: PayloadAction<Task>) {
      state.loading = false;
      state.error = null;
      state.tasks.push(action.payload);
    },

    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setTaskTitle(state, action: PayloadAction<string>) {
      state.task.title = action.payload;
    },
    setTaskDescription(state, action: PayloadAction<string>) {
      state.task.description = action.payload;
    },
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess(state, action: PayloadAction<Task>) {
      state.loading = false;
      state.error = null;
      state.tasks = state.tasks.map((Task) =>
        Task.id === action.payload.id ? action.payload : Task
      );
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getTaskSuccess(state, action: PayloadAction<Task>) {
      state.loading = false;
      state.error = null;
      state.task = action.payload;
    },
    deleteTaskSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.error = null;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export default taskSlice.reducer;
export const {
  getTaskSuccess,
  getTasksSuccess,
  requestStart,
  requestFailure,
  createTaskSuccess,
  setTitle,
  updateTaskSuccess,
  setDescription,
  setTaskDescription,
  setTaskTitle,
  deleteTaskSuccess,
} = taskSlice.actions;
