import React, { useEffect, useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";

import { Board, validateBoard } from "../../types/boardTypes";
import { editBoard } from "../../utils/apiUtils";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  clearBoard,
  requestFailure,
  setBoardDescription,
  setBoardTitle,
  updateBoardSuccess,
} from "./boardSlice";
import { fetchBoard } from "./boardActions";
import { Errors } from "../../types/common";
import { updateSuccess } from "../../components/Common/Notifications";

export default function EditBoard(props: {
  id: number;
  handleCloseModal: () => void;
}) {
  const { handleCloseModal } = props;
  const [errors, setErrors] = useState<Errors<Board>>({});
  const dispatch = useAppDispacth();
  const board = useAppSelector((state: RootState) => state.boards.board);
  const [loading, setLoading] = useState(false);
  const error = useAppSelector((state: RootState) => state.boards.error);

  //initial fetch of board data
  useEffect(() => {
    dispatch(fetchBoard(props.id));
  }, [dispatch, props.id]);

  useEffect(() => {
    dispatch(clearBoard());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handles form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateBoard(board);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const data = await editBoard(board, props.id);
        dispatch(updateBoardSuccess(data));
        if (data) {
          setLoading(false);
          handleCloseModal();
          updateSuccess();
          // window.location.href = "/boards";
        }
      } catch (error) {
        dispatch(requestFailure((error as string).toString()));
      }
    }
  };
  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold my-5 text-center">Edit Board</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="title" className="text-lg font-semibold mr-2">
              Title{" "}
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                dispatch(setBoardTitle(event.target.value));
              }}
              type="text"
              value={board?.title || ""}
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
                dispatch(setBoardDescription(event.target.value));
              }}
              type="text"
              name="description"
              value={board?.description || ""}
            />
          </div>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 rounded py-2 px-3 text-white "
        >
          {loading ? "Please wait.." : "Submit"}
        </button>
      </form>
      {error ? <p>{error}</p> : ""}
    </div>
  );
}
