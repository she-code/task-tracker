import { isEmpty } from "lodash";
import { Errors } from "./common";

export type User = {
  id?: number;
  username: string;
  password1: string;
  name?: string;
  email: string;
  password2?: string;
};

export type UserStateType = {
  loading: boolean;
  users: User[];
  error: string | null;
  user: User | null;
  username: string;
  name: string;
  password1: string;
  email: string;
  password2: string;
};

export const validateSignUpData = (user: User) => {
  const { username, email, password1, password2 } = user;
  const errors: Errors<User> = {};
  if (username.length < 1) {
    errors.username = "Username is required";
  }
  if (username.length > 150) {
    errors.username = "Username must be less than 150 characters";
  }
  if (email?.length < 1) {
    errors.email = "Emial is required";
  }
  if (password1.length < 1) {
    errors.password1 = "Password is required";
  }
  if (isEmpty(password2)) {
    errors.password2 = "Confirm Password is required";
  }

  return errors;
};
