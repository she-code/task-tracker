import React, { useEffect, useState } from "react";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import SubmitBtn from "../../components/Common/Button/SubmitBtn";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { setEmail, setPassword, setPassword2, setUserName } from "./userSlice";
import { User, validateSignUpData } from "../../types/userTypes";
import { Errors } from "../../types/common";
import { signUpUser } from "./userActions";
import { Link, navigate } from "raviger";

export default function SignUp() {
  const { username, password2, password1, email, error } = useAppSelector(
    (state) => state.users
  );
  const [errors, setErrors] = useState<Errors<User>>({});
  const [displayError, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispacth();

  //redirects to home page if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignUpData({
      username,
      password1,
      password2,
      email,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      dispatch(signUpUser({ username, password1, password2, email })).then(
        (_) => {
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="items-center lg:w-[700px] mx-auto mt-20   md:w-2/3 sm:w-full">
      <h1 className="text-center text-3xl font-semibold text-white">SIGN UP</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="p-3">
          <label
            htmlFor="username"
            className="text-xl font-semibold text-white"
          >
            Username
          </label>
          <CustomInputField
            type="text"
            name="username"
            value={username}
            handleInputChangeCB={(e) => {
              dispatch(setUserName(e.target.value));
            }}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>
        <div className="p-3">
          <label htmlFor="email" className="text-xl font-semibold text-white">
            Email
          </label>
          <CustomInputField
            type="text"
            name="email"
            value={email}
            handleInputChangeCB={(e) => {
              dispatch(setEmail(e.target.value));
            }}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="p-3">
          <label
            htmlFor="passwords"
            className="text-xl font-semibold text-white"
          >
            Password
          </label>
          <CustomInputField
            type="password"
            name="password1"
            value={password1}
            handleInputChangeCB={(e) => {
              dispatch(setPassword(e.target.value));
            }}
          />
          {errors.password1 && (
            <p className="text-red-500">{errors.password1}</p>
          )}
        </div>
        <div className="p-3">
          <label
            htmlFor="passwords"
            className="text-xl font-semibold text-white"
          >
            Confirm Password
          </label>
          <CustomInputField
            type="password"
            name="password2"
            value={password2}
            handleInputChangeCB={(e) => {
              dispatch(setPassword2(e.target.value));
            }}
          />
          {errors.password2 && (
            <p className="text-red-500">{errors.password2}</p>
          )}
        </div>
        <div className="p-3">
          <SubmitBtn title={loading ? "Please wait..." : "Sign Up"} />
        </div>
      </form>

      <div>
        {displayError && (
          <p className="bg-red-500 text-white p-3 rounded-md text-xl mt-3">
            Unable to Sign Up. Please try again!
          </p>
        )}
      </div>
      <p className="text-white text-lg ml-4">
        Already have an account?
        <span>
          <Link
            href="/login"
            className="text-white text-lg font-semibold mr-2 ml-2"
          >
            Sign In{" "}
          </Link>
        </span>
      </p>
    </div>
  );
}
