import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, StatusStateType } from "../../types/statusTypes";

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
    },
    setStatusTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setStatusDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
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
} = StatusSlice.actions;
