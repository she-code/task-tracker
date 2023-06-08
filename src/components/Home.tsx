import React from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { format } from "date-fns";

export default function Home() {
  const user = useAppSelector((state: RootState) => state.users.user);
  return (
    <div className=" w-10/12  md:ml-64   sm:ml-20 mr-5">
      <p className="text-xl  text-gray-600 mt-3">
        {format(new Date(), "EEEE, MMMM d")}
      </p>
      <h1 className="text-3xl font-bold mt-5 text-gray-600">
        Welcome, {user?.name ? user.name : user?.username}
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-1  gap-4">
        <div className="bg-white shadow-lg rounded-lg p-5 mt-5 ">
          <h1 className="text-2xl font-semibold text-gray-600">Boards</h1>
          <p className="text-3xl font-bold text-gray-600 mt-2">10</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 mt-5 ">
          <h1 className="text-2xl font-semibold text-gray-600">Status</h1>
          <p className="text-3xl font-bold text-gray-600 mt-2">10</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 mt-5 ">
          <h1 className="text-2xl font-semibold text-gray-600">Tasks</h1>
          <p className="text-3xl font-bold text-gray-600 mt-2">10</p>
        </div>
      </div>
    </div>
  );
}
