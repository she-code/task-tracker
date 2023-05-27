import { Board } from "./boardTypes";
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
};

export type TaskStateType = {
  task: Task;
  tasks: Task[];
  loading: boolean;
  error: string | null;
  title: string;
  description: string;
  status: number;
};
