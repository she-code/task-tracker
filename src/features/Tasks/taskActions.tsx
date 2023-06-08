import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTaskSuccess,
  deleteTaskSuccess,
  getTaskSuccess,
  getTasksSuccess,
  requestFailure,
  requestStart,
  updateTaskSuccess,
} from "./taskSlice";
import {
  createTaskApi,
  deleteTaskApi,
  getTaskApi,
  getTasks,
  updateTaskApi,
} from "../../utils/apiUtils";
import { Task, stringifyTaskDescription } from "../../types/taskTypes";

export const fetchTasks = createAsyncThunk(
  "boards/fetchBoards",
  async (boardId: number, { dispatch }) => {
    try {
      dispatch(requestStart());
      const tasks = await getTasks(boardId);
      dispatch(getTasksSuccess(tasks.results));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ task, id }: { task: Task; id: number }, { dispatch }) => {
    try {
      const { description, due_date, priority, is_completed } = task;
      let newTask: Task;

      const updatedTask = {
        ...task,
        description: stringifyTaskDescription({
          description: description,
          priority: priority,
          due_date: due_date,
          is_completed: is_completed,
        }),
      };
      newTask = await createTaskApi(updatedTask, id);
      console.log({ newTask });
      // }
      if (newTask) {
        dispatch(createTaskSuccess(newTask));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async (
    { boardId, taskId }: { boardId: number; taskId: number },
    { dispatch }
  ) => {
    try {
      const task = await getTaskApi(boardId, taskId);
      dispatch(getTaskSuccess(task));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
// export const updateTaskStatusAction = createAsyncThunk(
//   "tasks/updateTaskStatus",
//   async ({ task, id }: { task: Task; id: number }, { dispatch }) => {
//     try {
//       // const data: Task = {
//       //   ...task,
//       //   status: task?.status_object?.id as number,
//       // };
//       const newTask: Task = await updateTaskApi(task, id, task.id as number);
//       return newTask; // Return the updated task from the action
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const updateTaskStatusAction = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ task, id }: { task: Task; id: number }, { dispatch }) => {
    try {
      const newTask: Task = await updateTaskApi(task, id, task.id as number);

      // Retrieve the updated task's status ID from the API response
      const updatedTaskWithStatus = {
        ...newTask,
        status: newTask?.status_object?.id,
      };

      return updatedTaskWithStatus; // Return the updated task from the action
    } catch (error) {
      throw error;
    }
  }
);
export const editTaskAction = createAsyncThunk(
  "tasks/editTask",
  async ({ task, boardId }: { task: Task; boardId: number }, { dispatch }) => {
    try {
      // const { due_date, description, priority, is_completed } = task;
      let newTask: Task;
      console.log({ task });
      const updatedTask: Task = {
        ...task,
        status: task?.status_object?.id as number,
      };
      newTask = await updateTaskApi(updatedTask, boardId, task.id as number);
      console.log({ newTask }, "yes", { st: task.status });

      if (newTask) {
        dispatch(updateTaskSuccess(newTask));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
export const deleteTaskAction = createAsyncThunk(
  "tasks/deleteTask",
  async (
    { taskId, boardId }: { taskId: number; boardId: number },
    { dispatch }
  ) => {
    try {
      //dispatch(requestStart());
      await deleteTaskApi(taskId, boardId);
      dispatch(deleteTaskSuccess(taskId));
      // navigate("/boards");
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
