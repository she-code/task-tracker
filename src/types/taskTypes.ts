import { Board } from "./boardTypes";
import { Errors } from "./common";
import { Status } from "./statusTypes";

export type Task = {
  id?: number;
  created_date?: string;
  modified_date?: string;
  title: string;
  description: string;
  status: number;
  board: number;
  board_object?: Board;
  status_object?: Status;
  due_date?: string | null;
  priority?: string;
  is_completed?: boolean;
};

export type TaskStateType = {
  task: Task;
  tasks: Task[];
  loading: boolean;
  error: string | null;
  title: string;
  description: string;
  status: number;
  due_date?: string | null;
  priority?: string;
  is_completed?: boolean;
};

export type TaskDescriptionType = {
  description?: string;
  priority?: string;
  due_date?: string | null;
  is_completed?: boolean;
};

export type UpdateTaskPayload = {
  taskId: number;
  taskDescription: TaskDescriptionType;
};
export const validateTask = (task: Task) => {
  const { title, description, board, status } = task;
  const errors: Errors<Task> = {};
  if (title.length < 1) {
    errors.title = "Title is required";
  }
  if (title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  if (description.length < 1) {
    errors.description = "Description is required";
  }
  if (board === 0) {
    errors.board = "Board is required";
  }
  if (status === 0) {
    errors.status = "Status is required";
  }

  return errors;
};

export const parseTaskDescription = (desc: string) => {
  const { priority, description, due_date, is_completed } = JSON.parse(desc);
  return { priority, description, due_date, is_completed };
};

export const stringifyTaskDescription = (desc: TaskDescriptionType) => {
  const { priority, description, due_date, is_completed } = desc;
  return JSON.stringify({ priority, description, due_date, is_completed });
};
