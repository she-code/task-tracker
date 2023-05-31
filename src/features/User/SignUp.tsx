import React from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import SubmitBtn from "../../components/Common/Button/SubmitBtn";

export default function SignUp() {
  return (
    <div className="items-center lg:w-1/3 mx-auto mt-20 md:w-1/2 sm:w-full">
      <h1 className="text-center text-3xl font-semibold">Sign Up</h1>
      <form action="">
        <div className="p-3">
          <label
            htmlFor="username "
            className="text-xl font-semibold text-gray-600"
          >
            Username
          </label>
          <CustomInputField
            type="text"
            name="username"
            value="text"
            handleInputChangeCB={() => {}}
          />
        </div>
        <div className="p-3">
          <label htmlFor="name" className="text-xl font-semibold text-gray-600">
            Name
          </label>
          <CustomInputField
            type="name"
            name="name"
            value="name"
            handleInputChangeCB={() => {}}
          />
        </div>
        <div className="p-3">
          <label
            htmlFor="passwords"
            className="text-xl font-semibold text-gray-600"
          >
            Password
          </label>
          <CustomInputField
            type="passwords"
            name="passwords"
            value="passwords"
            handleInputChangeCB={() => {}}
          />
        </div>
        <div className="p-3">
          <SubmitBtn title="Sign Up" />
        </div>
      </form>
    </div>
  );
}
