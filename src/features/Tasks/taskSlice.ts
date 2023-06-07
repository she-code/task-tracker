import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Task,
  TaskDescriptionType,
  TaskStateType,
  UpdateTaskPayload,
} from "../../types/taskTypes";
import { getTaskApi } from "../../utils/apiUtils";

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
  priority: "low",
  is_completed: false,
  // due_date: new Date().toISOString().slice(0, 10),
};
export const fetchTask = createAsyncThunk(
  "task/fetchTask",
  async (
    { boardId, taskId }: { boardId: number; taskId: number },
    { dispatch }
  ) => {
    const response = await getTaskApi(boardId, taskId);
    // Assuming the response contains the task data
    return response.task;
  }
);
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
      state.title = "";
      state.description = "";
      state.due_date = "";
      state.priority = "low";
    },
    resetFields(state) {
      state.title = "";
      state.description = "";
      state.due_date = "";
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
    setDueDate(state, action: PayloadAction<string>) {
      state.due_date = action.payload;
    },
    setTaskDueDate(state, action: PayloadAction<string>) {
      state.task = {
        ...state.task,
        due_date: action.payload,
      };
    },
    setTaskFields(state, action: PayloadAction<UpdateTaskPayload>) {
      const { priority, due_date, is_completed } =
        action.payload.taskDescription;

      // Find the task based on its ID or any other identifier
      const taskToUpdate = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );

      if (taskToUpdate) {
        // Update the fields of the found task
        taskToUpdate.priority = priority;
        taskToUpdate.due_date = due_date;
        taskToUpdate.is_completed = is_completed;
      }
    },

    setPriority(state, action: PayloadAction<string>) {
      state.priority = action.payload;
    },
    setTaskPriority(state, action: PayloadAction<string>) {
      state.task.priority = action.payload;
    },
    setTaskCompleted(state, action: PayloadAction<boolean>) {
      state.task.is_completed = action.payload;
    },
    setCompleted(state, action: PayloadAction<boolean>) {
      state.is_completed = action.payload;
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
    updateTaskTitle: (
      state,
      action: PayloadAction<{ taskId: number; newTitle: string }>
    ) => {
      const { taskId, newTitle } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);

      if (taskToUpdate) {
        taskToUpdate.title = newTitle;
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      state.loading = false;
      state.error = null;
      // Map over the tasks array and update the status of the matching task
      state.tasks = state?.tasks?.map((task) =>
        task.id === id ? { ...task, status } : task
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
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.task = action.payload;
      // Extract the due date from the fetched task and set it
      const due_date = action.payload?.title?.split("_")[1]?.trim() || "";
      state.due_date = due_date;
    });
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
  setDueDate,
  setTaskDueDate,
  resetFields,
  updateTaskSuccess,
  updateTaskStatus,
  setDescription,
  setTaskDescription,
  setTaskTitle,
  setCompleted,
  setPriority,
  setTaskFields,
  setTaskPriority,
  setTaskCompleted,
  deleteTaskSuccess,
} = taskSlice.actions;
