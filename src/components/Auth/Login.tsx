import { navigate } from "raviger";
import React, { useState, useEffect } from "react";
import { login } from "../../utils/apiUtils";
import CustomInputField from "../Common/InputField/CustomInputField";

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
    <div className="   align-middle">
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        <div className="p-2  ">
          <div className="flex items-center justify-between">
            <label htmlFor="username" className="text-lg font-semibold mr-2">
              Username
            </label>
            <CustomInputField
              handleInputChangeCB={(e) => setUserName(e.target.value)}
              type="text"
              value={username}
              name="username"
            />
          </div>
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
          <div className="flex items-center">
            <label htmlFor="password" className="text-lg font-semibold mr-2">
              Password
            </label>
            <CustomInputField
              handleInputChangeCB={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              value={password}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 rounded py-2 px-3 w-1/3 mx-auto text-white "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
