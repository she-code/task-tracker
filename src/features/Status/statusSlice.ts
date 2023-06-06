import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Status,
  StatusStateType,
  StatusWithTasks,
} from "../../types/statusTypes";

const initialState: StatusStateType = {
  statusLoading: false,
  statusError: null,
  statuses: [],
  status: {
    title: "",
    description: "",
  },
  title: "",
  description: "",
};

const StatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    requestStart(state) {
      state.statusLoading = true;
      state.statusError = null;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.statusLoading = false;
      state.statusError = action.payload;
    },
    getStatusesSuccess(state, action: PayloadAction<Status[]>) {
      state.statusLoading = false;
      state.statusError = null;
      state.statuses = action.payload;
    },

    createStatusSuccess(state, action: PayloadAction<Status>) {
      state.statusLoading = false;
      state.statusError = null;
      state.statuses.push(action.payload);
      state.title = "";
      state.description = "";
    },
    setStatusTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setStatusDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setStatusWithTasks(state, action: PayloadAction<StatusWithTasks>) {
      state.statusWithTasks = action.payload;
    },
    updateStatus(state, action: PayloadAction<Status>) {
      state.statusLoading = false;
      state.statusError = null;
      state.statuses = state.statuses.map((status) =>
        status.id === action.payload.id ? action.payload : status
      );
    },
    deleteStatus(state, action: PayloadAction<number>) {
      state.statusLoading = false;
      state.statusError = null;
      state.statuses = state.statuses.filter(
        (status) => status.id !== action.payload
      );
    },
  },
});
export default StatusSlice.reducer;
export const {
  getStatusesSuccess,
  createStatusSuccess,
  requestFailure,
  requestStart,
  setStatusDescription,
  setStatusTitle,
  updateStatus,
  deleteStatus,
  setStatusWithTasks,
} = StatusSlice.actions;
