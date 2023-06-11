import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserSuccess,
  logoutSucces,
  requestFailure,
  requestStart,
} from "./userSlice";
import { logout, me, register } from "../../utils/apiUtils";
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
      const response = await register(user);

      if (response.detail === "Verification e-mail sent.") {
        navigate("/login");
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
