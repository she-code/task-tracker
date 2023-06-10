import { navigate } from "raviger";
import React, { useState, useEffect } from "react";
import { login } from "../../utils/apiUtils";
import CustomInputField from "../../components/Common/InputField/CustomInputField";
import SubmitBtn from "../../components/Common/Button/SubmitBtn";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="items-center lg:w-1/3 mx-auto mt-20 md:w-1/2 sm:w-full">
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
        {/* <div className="p-2  ">
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="text-lg font-semibold mr-2">
              Email
            </label>
            <CustomInputField
              handleInputChangeCB={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
              name="email"
            />
          </div> */}
        {/* </div> */}
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
          <SubmitBtn title="Sign In" />
        </div>
      </form>
    </div>
  );
}
