import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksSuccess, requestFailure, requestStart } from "./taskSlice";
import { getTasks } from "../../utils/apiUtils";

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
