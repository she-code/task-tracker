import React, { useEffect, useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import { Errors } from "../../types/common";
import { Status, validateStatus } from "../../types/statusTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchStatus, updateStatusAction } from "./statusAction";
import {
  clearStatus,
  updateStatusDesc,
  updateStatusTitle,
} from "./statusSlice";
import { updateSuccess } from "../../components/Common/Notifications";

import { RootState } from "../../app/store";

export default function EditStatus(props: {
  statusId: number;
  boardId: number;
  handleCloseModal: () => void;
}) {
  const { statusId, handleCloseModal, boardId } = props;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors<Status>>({});
  const dispatch = useAppDispacth();
  const status = useAppSelector((state: RootState) => state.statuses.status);

  //initial fetch of status data
  useEffect(() => {
    const fetchStatusData = async () => {
      await dispatch(fetchStatus({ statusId }));
    };

    fetchStatusData();
  }, [dispatch, statusId]);
  //handles submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateStatus(status as Status);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        dispatch(
          updateStatusAction({
            statusData: status,
            boardId: boardId,
          })
        ).then((_) => {
          setLoading(false);
          updateSuccess();
          handleCloseModal();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  //clears status on unmount
  useEffect(() => {
    return () => {
      dispatch(clearStatus());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold my-5 text-center">Edit Status</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-2  ">
          <div className="flex items-center">
            <label htmlFor="title" className="text-lg font-semibold mr-2">
              Title{" "}
            </label>
            <CustomInputField
              handleInputChangeCB={(event) => {
                dispatch(updateStatusTitle(event.target.value));
              }}
              type="text"
              value={status?.title.split(":")[0] || ""}
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
                dispatch(updateStatusDesc(event.target.value));
              }}
              type="text"
              name="description"
              value={status?.description || ""}
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
    </div>
  );
}
