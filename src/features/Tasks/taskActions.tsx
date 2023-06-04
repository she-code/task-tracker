import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTaskSuccess,
  getTasksSuccess,
  requestFailure,
  requestStart,
} from "./taskSlice";
import { createTaskApi, getTasks } from "../../utils/apiUtils";
import { Task } from "../../types/taskTypes";

export const fetchTasks = createAsyncThunk(
  "boards/fetchBoards",
  async (boardId: number, { dispatch }) => {
    try {
      dispatch(requestStart());
      const tasks = await getTasks(boardId);
      console.log({ tasks: tasks.results });
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
      dispatch(requestStart());

      const newTask = await createTaskApi(task, id);
      console.log({ newTask });
      dispatch(createTaskSuccess(newTask));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
