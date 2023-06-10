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
    password1: "",
    email: "",
  },
  username: "",
  name: "",
  password1: "",
  email: "",
  password2: "",
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
    setUserName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password1 = action.payload;
    },
    setPassword2(state, action: PayloadAction<string>) {
      state.password2 = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    logoutSucces(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});
export default userSlice.reducer;

export const {
  getUserSuccess,
  requestFailure,
  requestStart,
  setEmail,
  setPassword,
  setPassword2,
  setUserName,
  addUser,
  logoutSucces,
} = userSlice.actions;
