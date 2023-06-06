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
import { Task } from "../../types/taskTypes";

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
      const { title, due_date } = task;
      let newTask: Task;
      console.log({ task });
      if (due_date === "") {
        newTask = await createTaskApi(task, id);
        console.log({ newTask });
      } else {
        const updatedTitle = title.concat(" _ ", due_date as string);
        const updatedTask = { ...task, title: updatedTitle };
        newTask = await createTaskApi(updatedTask, id);
        console.log({ newTask });
      }
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
export const updateTaskAction = createAsyncThunk(
  "tasks/updateTask",
  async ({ task, id }: { task: Task; id: number }, { dispatch }) => {
    try {
      const data: Task = {
        id: task.id,
        title: task.title.concat(" _ ", task.due_date as string),
        description: task.description,
        status: task.status,
        board: task.board,
      };
      const newTask: Task = await updateTaskApi(data, id, task.id as number);
      return newTask; // Return the updated task from the action
    } catch (error) {
      throw error;
    }
  }
);

export const editTaskAction = createAsyncThunk(
  "tasks/editTask",
  async ({ task, boardId }: { task: Task; boardId: number }, { dispatch }) => {
    try {
      const { due_date } = task;
      let newTask: Task;
      console.log({ task });
      if (due_date === "") {
        const data: Task = {
          id: task.id,
          title: task.title,
          description: task.description,
          status: task?.status_object?.id as number,
          board: task.board,
        };
        newTask = await updateTaskApi(data, boardId, task.id as number);
        console.log({ newTask }, "no");
      } else {
        const data: Task = {
          id: task.id,
          title: task.title.concat(" _ ", task.due_date as string),
          description: task.description,
          status: task?.status_object?.id as number,
          board: task.board,
        };
        newTask = await updateTaskApi(data, boardId, task.id as number);
        console.log({ newTask }, "yes", { data });
      }
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
