import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserSuccess,
  logoutSucces,
  requestFailure,
  requestStart,
} from "./userSlice";
import { login, logout, me, register } from "../../utils/apiUtils";
import { User } from "../../types/userTypes";
import { navigate } from "raviger";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { dispatch }) => {
    try {
      dispatch(requestStart());
      const user = await me();
      dispatch(getUserSuccess(user));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async (user: User, { dispatch }) => {
    try {
      dispatch(requestStart());
      const response = await register(user);

      if (response.detail === "Verification e-mail sent.") {
        navigate("/login");
      } else {
        dispatch(requestFailure("Unable to sign up"));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (_, { dispatch }) => {
    try {
      // dispatch(requestStart());
      // localStorage.removeItem("token");
      // navigate("/login");
      await logout();
      dispatch(logoutSucces());
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (
    { username, password1 }: { username: string; password1: string },
    { dispatch }
  ) => {
    try {
      dispatch(requestStart());
      const response = await login(username, password1);
      if (response) {
        localStorage.setItem("token", response.token);
        dispatch(fetchUser());
        navigate("/");
      } else {
        dispatch(requestFailure("Invalid Credentials"));
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
