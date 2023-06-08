import { Link, useQueryParams } from "raviger";
import React, { useState } from "react";
import CustomInputField from "../InputField/CustomInputField";
import { User } from "../../../types/userTypes";

export default function Header(props: {
  toggleSidebar: () => void;
  collapsed: boolean;
  currentUser: User;
}) {
  const { collapsed, toggleSidebar, currentUser } = props;
  const [searchString, setSearchString] = useState("");
  const [{ search }, setQuery] = useQueryParams<{ search: string }>();
  const [isOpen, setOpen] = React.useState(false);

  const updateSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };
  return (
    <div className="flex w-full  top-0 left-0 fixed  justify-between   text-gray-500 h-20 mr-5 bg-white">
      <div
        className={`flex items-center justify-between   w-60 px-2 
       border-b-white border-b-2 ${collapsed ? "bg-white" : "bg-zinc-800"}`}
      >
        <p
          className={`${
            collapsed
              ? "text-black text-2xl mr-3 "
              : "text-white text-2xl mr-3 "
          } `}
        >
          {" "}
          Task Tracker
        </p>
        <button onClick={toggleSidebar} className=" p-1 ">
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="mt-2 w-1/3 align-middle">
        <form
          className="mr-5"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery({ search: searchString });
          }}
        >
          <div className="relative h-10 w-full min-w-[200px] mb-5">
            <div className="absolute  top-7 right-3 grid h-5 w-5 -translate-y-2/4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <CustomInputField
              value={searchString}
              type="text"
              name="search"
              handleInputChangeCB={updateSearchString}
            />
          </div>
        </form>
      </div>
      <div className="flex align-middle">
        <button className="p-1 mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </button>
        <button className="p-1 mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </button>
      </div>
      <div className="relative mr-5 text-center  self-center">
        <button
          className="flex justify-center items-center space-x-2 bg-transparent px-3 
            py-2 rounded-md focus:outline-none  "
          onClick={() => setOpen(!isOpen)}
        >
          <span className="text-lg font-normal text-black text-center">
            {(currentUser?.name?.length as number) > 0
              ? currentUser?.name
              : currentUser?.username}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg flex flex-col  z-10">
            <Link
              href={`/profile`}
              className="  px-4 py-2 text-lg font-normal text-gray-600 text-center hover:bg-neutral-100 w-full"
            >
              Profile
            </Link>
            <Link
              href={`/logout`}
              className="  px-4 py-2 text-lg font-normal text-gray-600 text-center hover:bg-neutral-100 w-full"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
