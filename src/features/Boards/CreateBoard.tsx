import React, { useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";

import { Board, validateBoard } from "../../types/boardTypes";
import { createBoard } from "../../utils/apiUtils";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  createBoardSuccess,
  requestFailure,
  requestStart,
  resetInputs,
  setDescription,
  setTitle,
} from "./boardSlice";
import { Errors } from "../../types/common";

export default function CreateBoard(props: { handleClose: () => void }) {
  const [errors, setErrors] = useState<Errors<Board>>({});
  const dispatch = useAppDispacth();
  const loading = useAppSelector((state: RootState) => state.boards.loading);
  const error = useAppSelector((state: RootState) => state.boards.error);
  const title = useAppSelector((state: RootState) => state.boards.title);
  const description = useAppSelector(
    (state: RootState) => state.boards.description
  );
  const { handleClose } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateBoard({ title, description });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createBoard({ title, description });
        dispatch(requestStart());
        if (data) {
          dispatch(createBoardSuccess(data));
          dispatch(resetInputs());
          handleClose();
          // window.location.reload();
        }
      } catch (error) {
        dispatch(requestFailure((error as string).toString()));
      }
    }
  };
  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold my-5 text-center">Create Board</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="title" className="text-lg font-semibold mr-2">
              Title{" "}
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                dispatch(setTitle(event.target.value));
              }}
              type="text"
              value={title || ""}
              name="title"
            />
          </div>
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="description" className="text-lg font-semibold mr-2">
              Description
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                dispatch(setDescription(event.target.value));
              }}
              type="text"
              name="description"
              value={description || ""}
            />
          </div>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 rounded py-2 px-3 text-white "
          disabled={loading}
        >
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
      {error ? <p>{error}</p> : ""}
    </div>
  );
}
