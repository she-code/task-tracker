import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserStateType } from "../../types/userTypes";

const initialState: UserStateType = {
  //   title: "",
  //   description: "",
  loading: false,
  users: [],
  error: null,
  user: {
    username: "",
    password: "",
  },
  username: "",
  name: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default userSlice.reducer;

export const { getUserSuccess, requestFailure, requestStart } =
  userSlice.actions;
