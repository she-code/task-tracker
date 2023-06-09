import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSuccess, requestFailure } from "./userSlice";
import { me, register } from "../../utils/apiUtils";
import { User } from "../../types/userTypes";
import { navigate } from "raviger";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { dispatch }) => {
    try {
      // dispatch(requestStart());
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
      console.log("response", response);

      if (response.status === 201) {
        // dispatch(getUserSuccess(user));
        console.log("response", response);
        navigate("/login");
      }
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
