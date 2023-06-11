import React, { useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import { Errors } from "../../types/common";
import { Status, validateStatus } from "../../types/statusTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { createStatus } from "./statusAction";
import { setDescription, setTitle } from "./statusSlice";
import { createSuccess } from "../../components/Common/Notifications";

export default function CreateStatus(props: {
  boardId: number;
  handleCloseModal: () => void;
}) {
  const { boardId, handleCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors<Status>>({});
  const dispatch = useAppDispacth();
  const { title, description, statusError } = useAppSelector(
    (state: RootState) => state.statuses
  );

  //handles submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateStatus({ title, description });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        dispatch(
          createStatus({ statusData: { title, description }, boardId })
        ).then((_) => {
          setLoading(false);
          createSuccess();
          handleCloseModal();
        });
      } catch (error) {}
    }
  };
  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold my-5 text-center">Create Status</h1>
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
        >
          {loading ? "Please wait.." : "Submit"}
        </button>
      </form>
      {statusError ? <p>{statusError}</p> : ""}
    </div>
  );
}
