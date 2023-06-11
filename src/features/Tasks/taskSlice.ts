import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStateType, UpdateTaskPayload } from "../../types/taskTypes";

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
  board: 0,
  priority: "low",
  is_completed: false,
  boardTasks: [],
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

      // Find the task based on its ID
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
    setStatus(state, action: PayloadAction<number>) {
      state.status = action.payload;
    },
    setBoard(state, action: PayloadAction<number>) {
      state.board = action.payload;
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
    updateTaskStatus: (state, action: PayloadAction<Task>) => {
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
    groupTaskByBoardId(state) {
      state.loading = false;
      state.error = null;
      // state.boardTasks = state.tasks.reduce((acc, task) => {
      //   const { board } = task;
      //   if (!acc[board]) {
      //     acc[board] = [];
      //   }
      //   acc[board].push(task);
      //   return acc;
      // })
    },
    clearTask(state) {
      state.task = {
        title: "",
        description: "",
        status: 0,
        board: 0,
      };
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
  setStatus,
  setBoard,
  setTaskCompleted,
  deleteTaskSuccess,
  groupTaskByBoardId,
  clearTask,
} = taskSlice.actions;
