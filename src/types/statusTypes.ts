import { Errors } from "./common";
import { Task } from "./taskTypes";

export type Status = {
  id?: number;
  title: string;
  description: string;
  created_date?: string;
  modified_date?: string;
  tasks?: Task[];
};

export type StatusStateType = {
  statusLoading: boolean;
  statusError: string | null;
  statuses: Status[];
  status: Status;
  title: string;
  description: string;
};

export const validateStatus = (status: Status) => {
  const { title, description } = status;
  const errors: Errors<Status> = {};
  if (title.length < 1) {
    errors.title = "Title is required";
  }
  if (title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  if (description.length < 1) {
    errors.description = "Description is required";
  }

  return errors;
};
