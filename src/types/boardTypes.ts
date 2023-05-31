import { Errors } from "./common";

export type Board = {
  id?: number;
  created_date?: string;
  modified_date?: string;
  title: string;
  description: string;
};
export type BoardStateType = {
  board: Board;
  boards: Board[];
  loading: boolean;
  error: string | null;
  title: string;
  description: string;
};

export const validateBoard = (board: Board) => {
  const { title, description } = board;
  const errors: Errors<Board> = {};
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
