import { Link, navigate } from "raviger";
import React, { useState, useEffect } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import SubmitBtn from "../../components/Common/Button/SubmitBtn";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { requestFailure } from "./userSlice";
import { RootState } from "../../app/store";
import { loginUser } from "./userActions";
import { Errors } from "../../types/common";
import { User, validateSignInData } from "../../types/userTypes";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password1, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors<User>>({});

  const dispatch = useAppDispacth();
  const [loading, setLoading] = useState(false);
  const error = useAppSelector((state: RootState) => state.users.error);
  const [displayError, setDisplayError] = useState(false);

  //sets time out for error message
  useEffect(() => {
    if (error) {
      setDisplayError(true);

      const timeout = setTimeout(() => {
        setDisplayError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  //handles login
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const validationErrors = validateSignInData(username, password1);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setLoading(true);
        dispatch(loginUser({ username, password1 })).then((_) => {
          setLoading(false);
        });
      }
      // successFullLogin();
    } catch (error) {
      console.log(error);
      dispatch(requestFailure((error as string).toString()));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="items-center  lg:w-[700px] mx-auto mt-20  md:w-2/3 sm:w-full">
      <h1 className="text-center text-3xl font-semibold text-white">SIGN IN</h1>{" "}
      <form onSubmit={handleSubmit}>
        <div className="p-3  ">
          <label
            htmlFor="username"
            className="text-white text-lg font-semibold mr-2"
          >
            Username
          </label>
          <CustomInputField
            handleInputChangeCB={(e) => setUserName(e.target.value)}
            type="text"
            value={username}
            name="username"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        <div className="p-2  ">
          <label
            htmlFor="password"
            className="text-lg font-semibold mr-2 text-white"
          >
            Password
          </label>
          <CustomInputField
            handleInputChangeCB={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            value={password1}
          />
          {errors.password1 && (
            <p className="text-red-500">{errors.password1}</p>
          )}
        </div>

        <div className="p-3">
          <SubmitBtn title={loading ? "Please wait..." : "Sign In"} />
        </div>
      </form>
      <p className="text-white text-lg ml-4">
        New User?
        <span>
          <Link
            href="/signup"
            className="text-white text-lg font-semibold mr-2 ml-2"
          >
            Create Account
          </Link>
        </span>
      </p>
      <div>
        {displayError && (
          <p className="bg-red-500 text-white p-3 rounded-md text-xl mt-3">
            Unable to login with the given credentials. Please try again!
          </p>
        )}
      </div>
    </div>
  );
}
