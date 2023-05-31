import { createAsyncThunk } from "@reduxjs/toolkit";
import { createStatusApi, getStatusesApi } from "../../utils/apiUtils";
import { Status } from "../../types/statusTypes";
import {
  createStatusSuccess,
  getStatusesSuccess,
  requestFailure,
  requestStart,
} from "./statusSlice";
import { get } from "http";

export const createStatus = createAsyncThunk(
  "status/createStatus",
  async (
    { statusData, boardId }: { statusData: Status; boardId: number },
    { dispatch }
  ) => {
    try {
      dispatch(requestStart());
      const { title, description } = statusData;
      const updatedTitle = title.concat(`:${boardId}`);
      console.log({ title, description });
      const newStatus = await createStatusApi({
        title: updatedTitle,
        description,
      });
      console.log({ newStatus });
      dispatch(createStatusSuccess(newStatus));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const fetchStatuses = createAsyncThunk(
  "status/getStatuses",
  async (_, { dispatch }) => {
    try {
      dispatch(requestStart());
      const statuses = await getStatusesApi();
      console.log({ statuses });
      dispatch(getStatusesSuccess(statuses.results));
    } catch (error) {
      console.log(error);
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
