import { Link, navigate } from "raviger";
import React, { useState, useEffect } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import SubmitBtn from "../../components/Common/Button/SubmitBtn";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { requestFailure } from "./userSlice";
import { RootState } from "../../app/store";
import Loading from "../../components/Common/Loading/Loading";
import { loginUser } from "./userActions";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
      setLoading(true);
      dispatch(loginUser({ username, password })).then((_) => {
        setLoading(false);
      });

      // successFullLogin();
    } catch (error) {
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
            value={password}
          />
        </div>

        <div className="p-3">
          {loading ? <Loading /> : <SubmitBtn title="Sign In" />}
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
