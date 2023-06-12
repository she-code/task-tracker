import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createStatusApi,
  deleteStatusApi,
  fetchStatusApi,
  getStatusesApi,
  updateStatusApi,
} from "../../utils/apiUtils";
import { Status } from "../../types/statusTypes";
import {
  createStatusSuccess,
  deleteStatus,
  getStatusSuccess,
  getStatusesSuccess,
  requestFailure,
  requestStart,
  updateStatus,
} from "./statusSlice";

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
      const newStatus = await createStatusApi({
        title: updatedTitle,
        description,
      });
      if (newStatus) {
        dispatch(createStatusSuccess(newStatus));
      }
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
      dispatch(getStatusesSuccess(statuses.results));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const updateStatusTitleAction = createAsyncThunk(
  "status/updateStatusTitle",
  async (
    {
      statusData,
      newTitle,
      boardId,
    }: { statusData: Status; newTitle: string; boardId: number },
    { dispatch }
  ) => {
    try {
      const updatedStatustitle = {
        ...statusData,
        title: newTitle.concat(`:${boardId}`),
      };
      const updatedStatus = await updateStatusApi(
        updatedStatustitle,
        updatedStatustitle.id as number
      );
      if (updatedStatus) {
        dispatch(updateStatus(updatedStatus));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const updateStatusDescAction = createAsyncThunk(
  "status/updateStatusDesc",
  async (
    { statusData, newDesc }: { statusData: Status; newDesc: string },
    { dispatch }
  ) => {
    try {
      const updatedStatusDesc = {
        ...statusData,
        description: newDesc,
      };
      const updatedStatus = await updateStatusApi(
        updatedStatusDesc,
        updatedStatusDesc.id as number
      );
      if (updatedStatus) {
        dispatch(updateStatus(updatedStatus));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const deleteStatusAction = createAsyncThunk(
  "status/deleteStatus",
  async ({ statusId }: { statusId: number }, { dispatch }) => {
    try {
      await deleteStatusApi(statusId);
      dispatch(deleteStatus(statusId));
      // dispatch(removeStatusFromBoard(statusId));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const updateStatusAction = createAsyncThunk(
  "status/updateStatus",
  async (
    { statusData, boardId }: { statusData: Status; boardId: number },
    { dispatch }
  ) => {
    try {
      const updatedStatustitle = {
        ...statusData,
        title: statusData?.title.concat(`:${boardId}`),
      };
      const updatedStatus = await updateStatusApi(
        updatedStatustitle,
        statusData?.id as number
      );
      if (updatedStatus) {
        dispatch(updateStatus(updatedStatus));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const fetchStatus = createAsyncThunk(
  "status/fetchStatus",
  async ({ statusId }: { statusId: number }, { dispatch }) => {
    try {
      // dispatch(requestStart());
      const status = await fetchStatusApi(statusId);
      if (status) {
        dispatch(getStatusSuccess(status));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
