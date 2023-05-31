import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSuccess, requestFailure } from "./userSlice";
import { me } from "../../utils/apiUtils";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { dispatch }) => {
    try {
      // dispatch(requestStart());
      const user = await me();
      console.log({ user });
      dispatch(getUserSuccess(user));
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
